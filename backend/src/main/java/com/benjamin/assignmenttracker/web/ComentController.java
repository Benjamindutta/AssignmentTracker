package com.benjamin.assignmenttracker.web;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.benjamin.assignmenttracker.dto.CommentDto;
import com.benjamin.assignmenttracker.model.Comment;
import com.benjamin.assignmenttracker.model.User;
import com.benjamin.assignmenttracker.service.CommentService;

@RestController
@RequestMapping("/api/comments")
public class ComentController {
	
	@Autowired
	private CommentService commentservice;
	@PostMapping("")
	public ResponseEntity<Comment> createComment(@RequestBody CommentDto commentdto,@AuthenticationPrincipal User user){
		
		Comment comment=commentservice.save(commentdto,user);
		return ResponseEntity.ok(comment);
	}
	
	@GetMapping("")
	public ResponseEntity<Set<Comment>> getComments(@RequestParam Long assignmentId){
		System.out.println(assignmentId.getClass().getName());
		
		Set<Comment> comments=commentservice.getCommentsByAssignmentId(assignmentId);
		System.out.println(comments);
		return ResponseEntity.ok(comments);
	}
	
	@PutMapping("{commentId}")
	public ResponseEntity<Comment> updateComment(@RequestBody CommentDto commentdto,@AuthenticationPrincipal User user){
		
		Comment comment=commentservice.save(commentdto,user);
		return ResponseEntity.ok(comment);
	}
	
	 @DeleteMapping("{commentId}")
	    public ResponseEntity<?> deleteComment (@PathVariable Long commentId) {
	        try {
	            commentservice.delete(commentId);
	            return ResponseEntity.ok("Comment deleted");
	        } catch (Exception e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatusCode.valueOf(0)).build();
	        }
	        
	    }
}
