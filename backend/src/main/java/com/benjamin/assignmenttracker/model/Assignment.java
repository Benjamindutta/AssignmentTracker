package com.benjamin.assignmenttracker.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="assignment")
public class Assignment {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String status;
	private Integer number;
	private String githubUrl;
	private String branch;
	private String assignmentViedeoUrl;
	
	@ManyToOne(optional=false)
	private User assignedTo;
	
	@ManyToOne
	private User codeReviewer;
	
	
	public User getCodeReviewer() {
		return codeReviewer;
	}
	public void setCodeReviewer(User codeReviewer) {
		this.codeReviewer = codeReviewer;
	}
	public Long getId() { 
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	
	public User getAssignedTo() {
		return assignedTo;
	}
	public void setAssignedTo(User assignedTo) {
		this.assignedTo = assignedTo;
	}
	public String getGithubUrl() {
		return githubUrl;
	}
	public void setGithubUrl(String githubUrl) {
		this.githubUrl = githubUrl;
	}
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	public String getAssignmentViedeoUrl() {
		return assignmentViedeoUrl;
	}
	public void setAssignmentViedeoUrl(String assignmentViedeoUrl) {
		this.assignmentViedeoUrl = assignmentViedeoUrl;
	}
	
}
