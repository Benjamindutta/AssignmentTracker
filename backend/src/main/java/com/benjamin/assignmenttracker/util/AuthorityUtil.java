package com.benjamin.assignmenttracker.util;

import com.benjamin.assignmenttracker.model.User;

public class AuthorityUtil {
	public static boolean hasRole(String role,User user) {
		return user.getAuthorities()
			.stream()
			.filter(auth->auth.getAuthority().equals(role))
			.count()>0;
	}
}
