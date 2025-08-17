package com.property_pulse.backend.service;

import com.property_pulse.backend.Model.User;
import com.property_pulse.backend.dto.AuthResponse;
import com.property_pulse.backend.dto.LoginRequest;
import com.property_pulse.backend.dto.RegisterRequest;
import com.property_pulse.backend.repository.UserRepository;
import com.property_pulse.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        try {
            // Validate input
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("Email is required");
            }
            
            if (request.getPassword() == null || request.getPassword().length() < 6) {
                throw new IllegalArgumentException("Password must be at least 6 characters long");
            }
            
            if (request.getFirstName() == null || request.getFirstName().trim().isEmpty()) {
                throw new IllegalArgumentException("First name is required");
            }
            
            if (request.getLastName() == null || request.getLastName().trim().isEmpty()) {
                throw new IllegalArgumentException("Last name is required");
            }

            // Check if user already exists
            if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
                throw new IllegalArgumentException("An account with this email already exists");
            }

            // Create new user
            var user = new User(
                request.getFirstName().trim(),
                request.getLastName().trim(),
                request.getEmail().trim().toLowerCase(),
                request.getPhone() != null ? request.getPhone().trim() : null,
                passwordEncoder.encode(request.getPassword())
            );

            User savedUser = userRepository.save(user);
            log.info("User successfully registered with ID: {}", savedUser.getId());

            var jwtToken = jwtService.generateToken(savedUser);

            return AuthResponse.builder()
                .token(jwtToken)
                .message("Account created successfully! Welcome to Property Pulse.")
                .build();
                
        } catch (IllegalArgumentException e) {
            log.warn("Registration validation failed: {}", e.getMessage());
            throw e; // Re-throw validation errors as-is

        } catch (Exception e) {
            log.error("Unexpected error during registration", e);
            throw new RuntimeException("Registration failed. Please try again later.");
        }

    }

    public AuthResponse authenticate(LoginRequest request) {
        try {
            // Input validation
            if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
                throw new IllegalArgumentException("Email is required");
            }
            
            if (request.getPassword() == null || request.getPassword().isEmpty()) {
                throw new IllegalArgumentException("Password is required");
            }

            String email = request.getEmail().trim().toLowerCase();
            
            // Check if user exists BEFORE attempting authentication
            // This prevents the confusing 403 error
            var userOptional = userRepository.findByEmail(email);

            if (userOptional.isEmpty()) {
                log.warn("Login attempt with non-existent email: {}", email);
                // Don't reveal that the email doesn't exist - security best practice
                throw new BadCredentialsException("Invalid email or password");
            }
            
            var user = userOptional.get();
            
            // Check if account is active
            if (!user.isEnabled()) {
                log.warn("Login attempt for disabled account: {}", email);
                throw new DisabledException("Account is disabled. Please contact support.");
            }

            // Now attempt authentication
            try {
                authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, request.getPassword())
                );
                log.info("Authentication successful for user: {}", email);
            } catch (BadCredentialsException e) {
                log.warn("Invalid password for email: {}", email);
                // Generic message - don't reveal whether email exists or password is wrong
                throw new BadCredentialsException("Invalid email or password");
            }

            // Generate JWT token
            var jwtToken = jwtService.generateToken(user);
            log.info("JWT token generated successfully for user: {}", email);

            return AuthResponse.builder()
                .token(jwtToken)
                .message("Welcome back to Property Pulse!")
                .build();

        } catch (BadCredentialsException e) {
            log.warn("Bad credentials: {}", e.getMessage());
            throw e; // Re-throw with same message

        } catch (DisabledException e) {
            log.warn("Account disabled: {}", e.getMessage());
            throw e; // Re-throw with same message

        } catch (LockedException e) {
            log.warn("Account locked: {}", e.getMessage());
            throw new RuntimeException("Account is locked. Please contact support.");

        } catch (IllegalArgumentException e) {
            log.warn("Validation error: {}", e.getMessage());
            throw e; // Re-throw validation errors

        } catch (AuthenticationException e) {
            log.error("Authentication exception: {}", e.getMessage());
            throw new BadCredentialsException("Authentication failed");

        } catch (Exception e) {
            log.error("Unexpected error during authentication for email: {}", request.getEmail(), e);
            throw new RuntimeException("Login failed. Please try again later.");

        }
    }
}