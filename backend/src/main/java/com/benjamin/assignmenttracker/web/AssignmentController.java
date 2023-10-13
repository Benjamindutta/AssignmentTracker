package com.benjamin.assignmenttracker.web;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.benjamin.assignmenttracker.dto.AssignmentResponseDto;
import com.benjamin.assignmenttracker.enums.AuthorityEnums;
import com.benjamin.assignmenttracker.model.Assignment;
import com.benjamin.assignmenttracker.model.User;
import com.benjamin.assignmenttracker.service.AssignmentService;
import com.benjamin.assignmenttracker.service.UserService;
import com.benjamin.assignmenttracker.util.AuthorityUtil;

@RestController
@RequestMapping("/api/assignments/")
public class AssignmentController {

	@Autowired
	private AssignmentService assignmentService;
	@Autowired
	private UserService userService;
	@PostMapping("")
	public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
		Assignment newassignment = new Assignment();

		newassignment = assignmentService.createAssignment(user);
		return ResponseEntity.ok(newassignment);
	}
	
	@GetMapping("")
	public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user ) {
		Set<Assignment> assignments=assignmentService.findByuser(user);
		return ResponseEntity.ok(assignments);
	}
	
	@GetMapping("{assignmentId}")
	public ResponseEntity<?> getAssignmentById(@PathVariable Long assignmentId,@AuthenticationPrincipal User user){
		Optional<Assignment> assignment=assignmentService.getAssignmentbyId(assignmentId);
		return ResponseEntity.ok(new AssignmentResponseDto(assignment.orElse(new Assignment())));
	}
	
	@PutMapping("{assignmentId}")
	public ResponseEntity<?> updateAssignmentById(@PathVariable Long assignmentId,
			@RequestBody Assignment assignment,
			@AuthenticationPrincipal User user){
			//add codereviewer to the assignment if it was claimed
		if(assignment.getCodeReviewer()!=null) {
			User codeReviewer=assignment.getCodeReviewer();
			codeReviewer=userService.findUserByUserName(codeReviewer.getUsername()).orElse(new User());
			if(AuthorityUtil.hasRole(AuthorityEnums.ROLES_CODE_REVIEWER.toString(), codeReviewer)) {
				assignment.setCodeReviewer(codeReviewer);
			}
		}
		
		Assignment assignmentN=assignmentService.save(assignment);
		
		return ResponseEntity.ok(assignmentN);
	}
}
