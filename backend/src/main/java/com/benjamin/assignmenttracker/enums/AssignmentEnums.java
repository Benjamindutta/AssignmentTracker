package com.benjamin.assignmenttracker.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnums {
	ASSIGNMENT_1(1,"HTML Assignment"),
	ASSIGNMENT_2(2,"Guessing game"),
	ASSIGNMENT_3(3,"User Login"),
	ASSIGNMENT_4(4,"Student course List"),
	ASSIGNMENT_5(5,"Custom Array List"),
	ASSIGNMENT_6(6,"Report with streams"),
	ASSIGNMENT_7(7,"Unit testing"),
	ASSIGNMENT_8(8,"Multithreadin "),
	ASSIGNMENT_9(9,"Spring MVC"),
	ASSIGNMENT_10(10,"Restful services"),
	ASSIGNMENT_11(11,"Full-stact development"),
	ASSIGNMENT_12(12,"Reports with SQL"),
	ASSIGNMENT_13(13,"Online bank"),
	ASSIGNMENT_14(14,"chatting with js");
	
	private int assignmentNum;
	private String assignmentName;

	
	
	private AssignmentEnums(int assignmentNum, String assignmentName) {
	
		this.assignmentNum = assignmentNum;
		this.setAssignmentName(assignmentName);
	}

	public int getAssignmentNum() {
		return assignmentNum;
	}

	public void setAssignmentNum(int assignmentNum) {
		this.assignmentNum = assignmentNum;
	}

	public String getAssignmentName() {
		return assignmentName;
	}

	public void setAssignmentName(String assignmentName) {
		this.assignmentName = assignmentName;
	}
	
	
	
}
