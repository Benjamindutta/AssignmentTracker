package com.benjamin.assignmenttracker.repository;


import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.benjamin.assignmenttracker.model.Assignment;
import com.benjamin.assignmenttracker.model.User;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment,Long> {
	
	Set<Assignment> findByassignedTo(User user);
	@Query("select a from Assignment a where a.status='SUBMITTED' and (a.codeReviewer is null or a.codeReviewer=:codeReviewer)"+
	" or a.codeReviewer=:codeReviewer")
	Set<Assignment> findBycodeReviewer(User codeReviewer);
}
