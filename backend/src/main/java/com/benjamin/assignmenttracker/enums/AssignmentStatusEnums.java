package com.benjamin.assignmenttracker.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnums {
	PENDING_SUBMISSION("PENDING SUBMISSIONS",1),
	SUBMITTED("SUBMITTED",2),
	IN_REVIEW("IN REVIEW",3),
	NEEDS_UPDATE("NEEDS UPDATE",4),
	COMPLETED("COMPLETED",5),
	RESUBMITTED("RESUBMITTED",6);
	
	private String status;
	
	private int step;

	

	public int getStep() {
		return step;
	}

	public void setStep(int step) {
		this.step = step;
	}

	private AssignmentStatusEnums(String status, int step) {
		this.status = status;
		this.step = step;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}
