package com.property_pulse.backend.dto;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {

    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String role;

    public String getFullName() {
        return firstName + " " + lastName;
    }
    
}