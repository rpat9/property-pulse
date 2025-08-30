package com.property_pulse.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/keepalive")
@Slf4j
@RequiredArgsConstructor
public class KeepAliveController {

    private final JdbcTemplate jdbcTemplate;

    @GetMapping
    public ResponseEntity<String> pingDatabase() {
        log.info("Starting database ping..");
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            log.info("Database ping successful");
            return ResponseEntity.ok("Database pinged successfully at: " + java.time.LocalDateTime.now());
        } catch (Exception e) {
            log.error("Database ping failed", e);
            return ResponseEntity.status(500).body("Database ping failed: " + e.getMessage());
        }
    }
}