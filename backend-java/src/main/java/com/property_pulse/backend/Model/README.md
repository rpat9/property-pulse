# Data Models

## Overview

This document details the data models and their relationships in the Property Pulse application.

## Entity Relationship Diagram

```
User 1:N PropertyListing
PropertyListing 1:1 AIPrediction
User 1:N UserFavorite N:1 PropertyListing
PropertyListing 1:N PropertyImage
```

## Models

### User

```java
public class User implements UserDetails {
    UUID id
    String firstName
    String lastName
    String email
    String phone
    boolean isActive
    String passwordHash
    Role role
    ZonedDateTime createdAt
}
```

- Primary key: id (UUID)
- Unique constraints: email
- Role values: user, admin

### Property Listing

```sql
CREATE TABLE property_listings (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    street_number INTEGER NOT NULL,
    street_name TEXT NOT NULL,
    city_name TEXT NOT NULL,
    state_name TEXT NOT NULL,
    zip_code TEXT,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    /* ... other fields ... */
);
```

### AI Prediction

```sql
CREATE TABLE ai_predictions (
    id UUID PRIMARY KEY,
    property_id UUID REFERENCES property_listings(id),
    investment_score NUMERIC(5, 2),
    cash_flow_score NUMERIC(5, 2),
    /* ... other fields ... */
);
```

## Database Constraints

### Foreign Keys

- `property_listings.created_by` → `users.id`
- `ai_predictions.property_id` → `property_listings.id`
- `user_favorites.user_id` → `users.id`
- `user_favorites.property_id` → `property_listings.id`

### Check Constraints

- `users.role`: Must be 'user' or 'admin'
- `property_listings.property_type`: Must be one of the defined types
- `property_listings.listing_status`: Must be one of the defined statuses

## Indexes

```sql
CREATE INDEX idx_property_location ON property_listings (city_name, state_name, zip_code);
CREATE INDEX idx_property_type ON property_listings (property_type);
CREATE INDEX idx_user_email ON users (email);
/* ... other indexes ... */
```
