-- Property Pulse Database Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to update the updated_at column on row updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Users and Authentication
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

-- Property listings - property data
CREATE TABLE property_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    street_number INTEGER NOT NULL,
    street_name TEXT NOT NULL,
    city_name TEXT NOT NULL,
    state_name TEXT NOT NULL,
    zip_code TEXT,
    latitude NUMERIC(10, 8) NOT NULL,
    longitude NUMERIC(11, 8) NOT NULL,

    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    sqft INTEGER,
    year_built INTEGER,
    property_type TEXT NOT NULL CHECK (property_type IN ('single_family', 'condo', 'townhouse', 'duplex', 'apartment', 'commercial', 'land')),
    image_url TEXT NOT NULL,
    property_description TEXT,
    features TEXT [],

    price NUMERIC(12, 2) NOT NULL,
    estimated_rent NUMERIC(10, 2),
    property_taxes_annual NUMERIC(10, 2),
    is_published BOOLEAN DEFAULT true,
    listing_status TEXT DEFAULT 'active' CHECK (listing_status IN ('active', 'pending', 'sold', 'off_market')),
    days_on_market INTEGER DEFAULT 0,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI Predictions
CREATE TABLE ai_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES property_listings(id) ON DELETE CASCADE,
    
    investment_score NUMERIC(5, 2) CHECK (investment_score BETWEEN 0 AND 100),
    cash_flow_score NUMERIC(5, 2) CHECK (cash_flow_score BETWEEN 0 AND 100),
    appreciation_score NUMERIC(5, 2) CHECK (appreciation_score BETWEEN 0 AND 100),
    risk_score NUMERIC(5, 2) CHECK (risk_score BETWEEN 0 AND 100),

    predicted_rent NUMERIC(10, 2),
    predicted_appreciation NUMERIC(10, 2),
    predicted_cash_flow NUMERIC(10, 2),
    predicted_cap_rate NUMERIC(5, 3),

    model_version TEXT NOT NULL,
    confidence_level NUMERIC(5, 2),
    prediction_notes TEXT,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_property_model UNIQUE(property_id, model_version)
);

-- User inquiries and questions
CREATE TABLE user_inquiries (

    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    property_id UUID REFERENCES property_listings(id) ON DELETE SET NULL,
    
    user_name TEXT,
    user_email TEXT,
    user_phone TEXT,

    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    inquiry_type TEXT DEFAULT 'general' CHECK (inquiry_type IN ('investment', 'general inquiry', 'support')),

    responded BOOLEAN DEFAULT false,
    response_date TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT contact_info_check CHECK ((user_id IS NOT NULL) OR (user_name IS NOT NULL AND user_email IS NOT NULL))
);

-- User favorites
CREATE TABLE user_favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES property_listings(id) ON DELETE CASCADE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT unique_favorite UNIQUE(user_id, property_id)
);

-- Multiple images per property
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES property_listings(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create triggers for tables with updated_at columns
-- Trigger for property_listings table
CREATE TRIGGER update_property_listings_updated_at
    BEFORE UPDATE ON property_listings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_inquiries table
CREATE TRIGGER update_user_inquiries_updated_at
    BEFORE UPDATE ON user_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_property_location ON property_listings (city_name, state_name, zip_code);
CREATE INDEX idx_property_type ON property_listings (property_type);
CREATE INDEX idx_user_email ON users (email);
CREATE INDEX idx_user_favorites ON user_favorites (user_id, property_id);
CREATE INDEX idx_ai_predictions_property ON ai_predictions (property_id);
CREATE INDEX idx_ai_predictions_model ON ai_predictions (model_version);
CREATE INDEX idx_property_price ON property_listings (price);
CREATE INDEX idx_property_status ON property_listings (listing_status, is_published);
CREATE INDEX idx_investment_score ON ai_predictions (investment_score DESC);
CREATE INDEX idx_images_property ON property_images (property_id);