import { PropertyListing, PropertyDetails, PropertySearchFilters, PropertySearchResponse, CreateInquiryRequest } from "../types/property.types";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const propertyService = {
    /**
     * Search properties with filters
     */
    searchProperties: async (filters: PropertySearchFilters, page = 1, limit = 20) : Promise<PropertySearchResponse> => {
        //TODO: Complete implementation of searchProperties
        return Promise.resolve({
            properties: [],
            total_count: 0,
            page: page,
            limit: limit,
            has_more: false
        });
    },

    /**
     * Get single property with all details (including AI predictions and images)
     */
    getPropertyById: async (id: string): Promise<PropertyDetails> => {
        //TODO: Complete implementation of getPropertyById
        return Promise.resolve({
            id: id,
            title: "",
            street_number: 0,
            street_name: "",
            city_name: "",
            state_name: "",
            zip_code: "",
            latitude: 0,
            longitude: 0,
            bedrooms: 0,
            bathrooms: 0,
            sqft: 0,
            year_built: 0,
            property_type: "single_family",
            image_url: "",
            property_description: "",
            features: [""],
            price: 0,
            estimated_rent: 0,
            property_taxes_annual: 0,
            is_published: true,
            listing_status: "active",
            days_on_market: 0,
            created_by: "",
            created_at: "",
            updated_at: "", 
        });
    },

    toggleFavorite: async (propertyId: string): Promise<void> => {
        //TODO: Complete implementation of toggleFavorite
        return Promise.resolve();
    },

    getUserFavorites: async (): Promise<PropertyListing[]> => {
        // TODO: Complete implementation of getUserFavorites
        return Promise.resolve([
            {
                id: "1",
                title: "Sample Property",
                street_number: 123,
                street_name: "Main St",
                city_name: "Sample City",
                state_name: "Sample State",
                zip_code: "12345",
                latitude: 40.7128,
                longitude: -74.0060,
                bedrooms: 3,
                bathrooms: 2,
                sqft: 1500,
                year_built: 2000,
                property_type: "single_family",
                image_url: "https://example.com/image.jpg",
                property_description: "A beautiful sample property.",
                features: ["Garage", "Garden"],
                price: 300000,
                estimated_rent: 2000,
                property_taxes_annual: 3000,
                is_published: true,
                listing_status: "active",
                days_on_market: 10,
                created_by: "user123",
                created_at: "2023-01-01T00:00:00Z",
                updated_at: "2023-01-02T00:00:00Z"
            }
        ]);
    },

    /**
   * Create property inquiry
   */
    createInquiry: async (inquiryData: CreateInquiryRequest): Promise<void> => {
        // TODO: Complete implementation of createInquiry
        return Promise.resolve();
    }
    
}