// Enums based on database CHECK constraints
export type PropertyType = 
  | 'single_family' 
  | 'condo' 
  | 'townhouse' 
  | 'duplex' 
  | 'apartment' 
  | 'commercial' 
  | 'land';

export type ListingStatus = 
  | 'active' 
  | 'pending' 
  | 'sold' 
  | 'off_market';

export type InquiryType = 
  | 'investment' 
  | 'general inquiry' 
  | 'support';

// Core property interface matching property_listings table
export interface PropertyListing {
    id: string;
    title: string;
    street_number: number;
    street_name: string;
    city_name: string;
    state_name: string;
    zip_code?: string;
    latitude: number;
    longitude: number;
    bedrooms: number;
    bathrooms: number;
    sqft?: number;
    year_built?: number;
    property_type: PropertyType;
    image_url: string;
    property_description?: string;
    features?: string[];
    price: number;
    estimated_rent?: number;
    property_taxes_annual?: number;
    is_published: boolean;
    listing_status: ListingStatus;
    days_on_market: number;
    created_by?: string;
    created_at: string;
    updated_at: string;
}

// AI Predictions interface matching ai_predictions table
export interface AIPrediction {
    id: string;
    property_id: string;
    investment_score?: number;
    cash_flow_score?: number;
    appreciation_score?: number;
    risk_score?: number;
    predicted_rent?: number;
    predicted_appreciation?: number;
    predicted_cash_flow?: number;
    predicted_cap_rate?: number;
    model_version: string;
    confidence_level?: number;
    prediction_notes?: string;
    created_at: string;
}

// Property Images interface matching property_images table
export interface PropertyImage {
    id: string;
    property_id: string;
    image_url: string;
    is_primary: boolean;
    uploaded_at: string;
}

// User Favorite interface matching user_favorites table
export interface UserFavorite {
    id: string;
    user_id: string;
    property_id: string;
    created_at: string;
}

// User Inquiry interface matching user_inquiries table
export interface UserInquiry {
    id: string;
    user_id?: string;
    property_id?: string;
    user_name?: string;
    user_email?: string;
    user_phone?: string;
    subject: string;
    message: string;
    inquiry_type: InquiryType;
    responded: boolean;
    response_date?: string;
    created_at: string;
    updated_at: string;
}

// Extended property interface for detailed views (with joined data)
export interface PropertyDetails extends PropertyListing {
    ai_predictions?: AIPrediction;
    property_images?: PropertyImage[];
    // For authenticated users
    is_favorited?: boolean; 
}

// Search and filtering interfaces
export interface PropertySearchFilters {
    city_name?: string;
    state_name?: string;
    zip_code?: string;
    property_type?: PropertyType[];
    min_price?: number;
    max_price?: number;
    bedrooms?: number;
    bathrooms?: number;
    min_sqft?: number;
    max_sqft?: number;
    listing_status?: ListingStatus[];
    min_investment_score?: number;
}

export interface PropertySearchResponse {
    properties: PropertyListing[];
    total_count: number;
    page: number;
    limit: number;
    has_more: boolean;
}

// Request interfaces for API calls
export interface CreateInquiryRequest {
    property_id?: string;
    subject: string;
    message: string;
    inquiry_type: InquiryType;
    // For non-authenticated users
    user_name?: string;
    user_email?: string;
    user_phone?: string;
}