package com.property_pulse.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
import com.property_pulse.backend.Model.User;
import com.property_pulse.backend.dto.UserProfile;

@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/profile")
    public ResponseEntity<UserProfile> getUserProfile(Authentication authentication) {
        try {
            User user = (User) authentication.getPrincipal();
            
            log.debug("Fetching profile for user: {}", user.getEmail());
            
            UserProfile response = UserProfile.builder()
                    .id(user.getId())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .role(user.getRole().toString())
                    .build();
                    
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error fetching user profile", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}