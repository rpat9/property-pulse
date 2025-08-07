package com.property_pulse.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.Map;
import java.util.HashMap;

@Controller
public class UserSignUp {

    @GetMapping("/api/register")
    public Map<String, String> signup() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Success");
        return response;
    }
    
}