package com.benjamin.assignmenttracker.service;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.benjamin.assignmenttracker.dto.CommentDto;
import com.benjamin.assignmenttracker.model.Assignment;
import com.benjamin.assignmenttracker.model.Comment;
import com.benjamin.assignmenttracker.model.User;
import com.benjamin.assignmenttracker.repository.AssignmentRepository;
import com.benjamin.assignmenttracker.repository.CommentRepository;

import java.util.Set;
@Service
public class CommentService {
	
	@Autowired
	private CommentRepository commentrepository;
	@Autowired
	private AssignmentRepository assignmentRepo;
	
	@SuppressWarnings("deprecation")
	public Comment save(CommentDto commentdto,User user) {
		 Comment comment = new Comment();
	        Assignment assignment = assignmentRepo.getById(commentdto.getAssignmentId());
	        
	        comment.setId(commentdto.getId());
	        comment.setAssignment(assignment);
	        comment.setText(commentdto.getText());
	        comment.setCreatedBy(user);
	        if (comment.getId() == null)
	            comment.setCreatedDate(ZonedDateTime.now());
	        else
	            comment.setCreatedDate(commentdto.getCreatedDate());

	        Comment savedComment = commentrepository.save(comment);
		return savedComment;
	}

	public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
			Set<Comment> comments=commentrepository.findByAssignmentId(assignmentId);
		return comments;
	}
	 public void delete(Long commentId) {
	        commentrepository.deleteById(commentId);
	        
	    }
}
