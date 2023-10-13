package com.benjamin.assignmenttracker.dto;

import com.benjamin.assignmenttracker.enums.AssignmentEnums;
import com.benjamin.assignmenttracker.enums.AssignmentStatusEnums;
import com.benjamin.assignmenttracker.model.Assignment;

public class AssignmentResponseDto {
		private Assignment assignment;
		private AssignmentEnums[] assignmentsenums=AssignmentEnums.values();
		private AssignmentStatusEnums[] statusenums=AssignmentStatusEnums.values();
		public Assignment getAssignment() {
			return assignment;
		}
		public void setAssignment(Assignment assignment) {
			this.assignment = assignment;
		}
		public AssignmentEnums[] getAssignmentsenums() {
			return assignmentsenums;
		}
		public void setAssignmentsenums(AssignmentEnums[] assignmentsenums) {
			this.assignmentsenums = assignmentsenums;
		}
		public AssignmentResponseDto(Assignment assignment) {
			super();
			this.assignment = assignment;
		}
		public AssignmentStatusEnums[] getStatusenums() {
			return statusenums;
		}
		public void setStatusenums(AssignmentStatusEnums[] statusenums) {
			this.statusenums = statusenums;
		}
		
		
		
}
