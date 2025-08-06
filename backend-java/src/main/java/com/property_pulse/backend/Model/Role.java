package com.property_pulse.backend.Model;

public enum Role {
    USER("user"),
    ADMIN("amdin");

    private final String value;

    Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }

}