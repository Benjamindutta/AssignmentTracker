package com.benjamin.assignmenttracker.filter;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.benjamin.assignmenttracker.repository.UserRepository;
import com.benjamin.assignmenttracker.util.JwtUtil;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.userdetails.UserDetails;

@Component
public class JwtFilter extends OncePerRequestFilter{
	
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private JwtUtil jwtTokenUtil;

	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		// Get authorization header and validate
        final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (header==null|| !header.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }
     
        
        // Get jwt token and validate
        final String token = header.split(" ")[1].trim();
        
     // Get user identity and set it on the spring security context
        UserDetails userDetails = userRepo
            .findByUsername(jwtTokenUtil.getUsernameFromToken(token))
            .orElse(null);
        
        if (!jwtTokenUtil.validateToken(token,userDetails)) {
            chain.doFilter(request, response);
            return;
        }

        

        UsernamePasswordAuthenticationToken
            authentication = new UsernamePasswordAuthenticationToken(
                userDetails, userDetails.getPassword(),
                userDetails == null ?
                    List.of() : userDetails.getAuthorities()
            );

        authentication.setDetails(
            new WebAuthenticationDetailsSource().buildDetails(request)
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(request, response);
		
	}
	
	
	
}
