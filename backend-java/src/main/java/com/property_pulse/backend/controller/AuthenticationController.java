package com.property_pulse.backend.controller;

import com.property_pulse.backend.dto.AuthResponse;
import com.property_pulse.backend.dto.LoginRequest;
import com.property_pulse.backend.dto.RegisterRequest;
import com.property_pulse.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            log.info("Registration attempt for email: {}", request.getEmail());
            AuthResponse response = authenticationService.register(request);
            log.info("Registration successful for email: {}", request.getEmail());
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            // Validation errors - 400 Bad Request
            log.warn("Registration validation failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(AuthResponse.builder()
                    .token(null)
                    .message(e.getMessage())
                    .build());
                    
        } catch (RuntimeException e) {
            // Business logic errors (like email already exists) - 409 Conflict
            log.error("Registration failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(AuthResponse.builder()
                    .token(null)
                    .message(e.getMessage())
                    .build());
                    
        } catch (Exception e) {
            // Unexpected errors - 500 Internal Server Error
            log.error("Unexpected error during registration", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(AuthResponse.builder()
                    .token(null)
                    .message("Registration failed. Please try again later.")
                    .build());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody LoginRequest request) {
        try {
            log.info("Login attempt for email: {}", request.getEmail());
            AuthResponse response = authenticationService.authenticate(request);
            log.info("Login successful for email: {}", request.getEmail());
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            // Validation errors (missing email/password) - 400 Bad Request
            log.warn("Login validation failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(AuthResponse.builder()
                    .token(null)
                    .message(e.getMessage())
                    .build());
                    
        } catch (BadCredentialsException e) {
            // Invalid credentials - 401 Unauthorized (NOT 403!)
            log.warn("Invalid credentials for email: {}", request.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(AuthResponse.builder()
                    .token(null)
                    .message("Invalid email or password")
                    .build());
                    
        } catch (DisabledException e) {
            // Account disabled - 401 Unauthorized
            log.warn("Login attempt for disabled account: {}", request.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(AuthResponse.builder()
                    .token(null)
                    .message("Account is disabled. Please contact support.")
                    .build());
                    
        } catch (RuntimeException e) {
            // Other business logic errors - 401 Unauthorized
            log.error("Authentication failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(AuthResponse.builder()
                    .token(null)
                    .message(e.getMessage())
                    .build());
                    
        } catch (Exception e) {
            // Unexpected errors - 500 Internal Server Error
            log.error("Unexpected error during login", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(AuthResponse.builder()
                    .token(null)
                    .message("Login failed. Please try again later.")
                    .build());
        }
    }
}