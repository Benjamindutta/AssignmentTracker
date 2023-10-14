package com.benjamin.assignmenttracker.web;

import com.benjamin.assignmenttracker.dto.RegisterDto;
import com.benjamin.assignmenttracker.model.User;
import com.benjamin.assignmenttracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users/")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;


    @PostMapping("register")
    private ResponseEntity<?> registerUser(@RequestBody RegisterDto registerDto) {
//        System.out.println(registerDto.toString()+"  registered");
        Optional<User> user=userService.findUserByUserName(registerDto.getUsername());
//        System.out.println(user);
        if(!userService.findUserByUserName(registerDto.getUsername()).isEmpty()){
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }else{
            userService.createUser(registerDto);
            Map<String, String> data = new HashMap<>();
            data.put("Message", "Registered User");
            return new ResponseEntity<>(data,HttpStatus.OK);
        }
    }
}
