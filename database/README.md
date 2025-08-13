# Database Documentation

## Overview

Property Pulse uses PostgreSQL (via Supabase) as its primary database. This document outlines the database structure, migrations, and management practices.

## Schema Structure

The database schema (`schema.sql`) defines several key tables that form the core of our application:

### Core Tables

1. **users** - User accounts and authentication
2. **property_listings** - Real estate property information
3. **ai_predictions** - ML-based predictions for properties
4. **user_inquiries** - User questions and support requests
5. **user_favorites** - User-saved properties
6. **property_images** - Property image management

## Database Extensions

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Used for UUID generation in PostgreSQL.

## Automated Functions

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';
```

Automatically updates `updated_at` timestamps.

## Table Details

### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    is_active BOOLEAN DEFAULT true,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Property Listings Table

```sql
CREATE TABLE property_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    street_number INTEGER NOT NULL,
    street_name TEXT NOT NULL,
    /* ... other fields ... */
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Performance Optimization

### Indexes

```sql
-- Location-based queries
CREATE INDEX idx_property_location ON property_listings (city_name, state_name, zip_code);

-- Property type searches
CREATE INDEX idx_property_type ON property_listings (property_type);

-- Email lookups
CREATE INDEX idx_user_email ON users (email);

-- Favorites lookups
CREATE INDEX idx_user_favorites ON user_favorites (user_id, property_id);

-- AI prediction queries
CREATE INDEX idx_ai_predictions_property ON ai_predictions (property_id);
CREATE INDEX idx_ai_predictions_model ON ai_predictions (model_version);

-- Price-based searches
CREATE INDEX idx_property_price ON property_listings (price);

-- Status filtering
CREATE INDEX idx_property_status ON property_listings (listing_status, is_published);

-- Investment score sorting
CREATE INDEX idx_investment_score ON ai_predictions (investment_score DESC);

-- Property images
CREATE INDEX idx_images_property ON property_images (property_id);
```

## Data Integrity

### Foreign Key Relationships

- Property Listings → Users (created_by)
- AI Predictions → Property Listings
- User Favorites → Users and Property Listings
- Property Images → Property Listings

### Check Constraints

```sql
-- Role validation
CHECK (role IN ('user', 'admin'))

-- Property type validation
CHECK (property_type IN ('single_family', 'condo', 'townhouse', 'duplex', 'apartment', 'commercial', 'land'))

-- Listing status validation
CHECK (listing_status IN ('active', 'pending', 'sold', 'off_market'))

-- Score range validations
CHECK (investment_score BETWEEN 0 AND 100)
CHECK (cash_flow_score BETWEEN 0 AND 100)
CHECK (appreciation_score BETWEEN 0 AND 100)
CHECK (risk_score BETWEEN 0 AND 100)
```

## Backup and Recovery

Database backups are handled by Supabase's automated backup system:

- Daily automated backups
- Point-in-time recovery (PITR)
- 30-day retention period

## Development Practices

### Local Development

1. Use environment variables for database credentials
2. Never commit sensitive database information
3. Use prepared statements for all queries
4. Test database changes locally before deployment

### Schema Changes

1. Document all schema changes in `schema.sql`
2. Use additive changes when possible
3. Plan for backward compatibility
4. Test migrations thoroughly

## Monitoring

Monitor database health using:

- Supabase Dashboard
- Application-level logging
- Query performance metrics

## Future Considerations

- Implement database sharding for scalability
- Add materialized views for complex queries
- Implement table partitioning for large tables
- Consider read replicas for scaling

## Contributing

When making database changes:

1. Update `schema.sql`
2. Document changes in this README
3. Create migration scripts if needed
4. Test thoroughly before deployment
5. Update any affected application code
