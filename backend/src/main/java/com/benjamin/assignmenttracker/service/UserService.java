package com.benjamin.assignmenttracker.service;

import java.time.LocalDate;
import java.util.Optional;

import com.benjamin.assignmenttracker.dto.RegisterDto;
import com.benjamin.assignmenttracker.model.Authority;
import com.benjamin.assignmenttracker.model.User;
import com.benjamin.assignmenttracker.repository.AuthorityRepository;
import com.benjamin.assignmenttracker.util.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.benjamin.assignmenttracker.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private CustomPasswordEncoder customPasswordEncoder;

	@Autowired
	private AuthorityRepository authRepo;
	public Optional<User> findUserByUserName(String username) {
		return userRepo.findByUsername(username);
	}
	public void createUser(RegisterDto registerDto){
		User newUser = new User();
		newUser.setUsername(registerDto.getUsername());
		newUser.setName(registerDto.getName());
		newUser.setCohortStartDate(LocalDate.now());
		String encodedPassword = customPasswordEncoder.getPasswordEncoder().encode(registerDto.getPassword());
		newUser.setPassword(encodedPassword);
		userRepo.save(newUser);
		Authority authority = new Authority();
		authority.setAuthority("ROLE_STUDENT");
		authority.setUser(newUser);
		authRepo.save(authority);

		if(registerDto.getIsAdmin()==true){
			Authority adminauth = new Authority();
			authority.setAuthority("ROLE_ADMIN");
			authority.setUser(newUser);
			authRepo.save(adminauth);
		}

		if(registerDto.getIsCodereviewer()==true){
			Authority codereviewAuth = new Authority();
			authority.setAuthority("ROLES_CODE_REVIEWER");
			authority.setUser(newUser);
			authRepo.save(codereviewAuth);
		}

	}
}
