package com.benjamin.assignmenttracker.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.benjamin.assignmenttracker.enums.AssignmentStatusEnums;
import com.benjamin.assignmenttracker.enums.AuthorityEnums;
import com.benjamin.assignmenttracker.model.Assignment;
import com.benjamin.assignmenttracker.model.User;
import com.benjamin.assignmenttracker.repository.AssignmentRepository;

@Service
public class AssignmentService {

	@Autowired
	private AssignmentRepository assignmentRepo;

	public Assignment createAssignment(User user) {
		System.out.println(user);
		Assignment assignment = new Assignment();
		assignment.setStatus(AssignmentStatusEnums.PENDING_SUBMISSION.getStatus());
		assignment.setNumber(findNextAssignmentNumber(user));
		assignment.setAssignedTo(user);
		return assignmentRepo.save(assignment);
	}

	private Integer findNextAssignmentNumber(User user) {
		Set<Assignment> assignmentsByUser = assignmentRepo.findByassignedTo(user);
		if (assignmentsByUser == null) {
			return 1;
		}
		Optional<Integer> nextAssignmentNumOpt = assignmentsByUser.stream().sorted((a1, a2) -> {
			if (a1.getNumber() == null)
				return 1;
			if (a2.getNumber() == null)
				return 1;
			return a2.getNumber().compareTo(a1.getNumber());
		}).map(assignment -> {
			if (assignment.getNumber() == null)
				return 1;
			return assignment.getNumber() + 1;
		}).findFirst();
		
		return nextAssignmentNumOpt.orElse(1);
	}

	public Set<Assignment> findByuser(User user){
		
		boolean hasCodeReviewer=user.getAuthorities()
			.stream()
			.filter(auth->AuthorityEnums.ROLES_CODE_REVIEWER.toString().equals(auth.getAuthority()))
			.count()>0;
			
			
		if(hasCodeReviewer) {
				return assignmentRepo.findBycodeReviewer(user);
			}
		
		return assignmentRepo.findByassignedTo(user);
	}

	public Optional<Assignment> getAssignmentbyId(Long assignmentId) {
		return assignmentRepo.findById(assignmentId);

	}

	public Assignment save(Assignment assignment) {
		return assignmentRepo.save(assignment);
	}

}
