import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Calendar, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { PropertyDetails as PropertyDetailsType } from '../types/property.types';

// Mock data for now
const mockPropertyDetails: PropertyDetailsType = {
  id: "1",
  title: "Seaside Serenity Villa",
  street_number: 123,
  street_name: "Ocean View Drive",
  city_name: "Malibu",
  state_name: "California",
  zip_code: "90265",
  latitude: 34.0259,
  longitude: -118.7798,
  bedrooms: 4,
  bathrooms: 3,
  sqft: 2500,
  year_built: 2020,
  property_type: "single_family",
  image_url: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  property_description: "Discover the epitome of paradise with the Seaside Serenity Villa, a modern oasis designed for breathtaking ocean views from every angle. This property is the epitome of coastal living.",
  features: [
    "Gourmet kitchen with top-of-the-line appliances",
    "Private beach access for morning strolls and sunset views",
    "Master suite with spa-inspired bathroom and ocean-facing balcony",
    "Private garage and ample storage space"
  ],
  price: 1250000,
  estimated_rent: 8500,
  property_taxes_annual: 15000,
  is_published: true,
  listing_status: "active",
  days_on_market: 15,
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
  property_images: [
    {
      id: "1",
      property_id: "1",
      image_url: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      is_primary: true,
      uploaded_at: "2024-01-15T10:00:00Z"
    },
    // Add more images using the same URL just for testing UI purposes right now
    ...Array(8).fill(null).map((_, i) => ({
      id: `${i + 2}`,
      property_id: "1",
      image_url: "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      is_primary: false,
      uploaded_at: "2024-01-15T10:00:00Z"
    }))
  ]
};

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyDetailsType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // For now, just set mock data
    setProperty(mockPropertyDetails);
  }, [id]);

  if (!property) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const nextImage = () => {
    if (property.property_images && currentImageIndex < property.property_images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setSelectedThumbnail(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
      setSelectedThumbnail(currentImageIndex - 1);
    }
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedThumbnail(index);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                    {property.title}
                    </h1>
                    <div className="flex items-center text-[var(--color-text-secondary)] mb-4">
                    <MapPin size={16} className="mr-2" />
                    <span>{property.city_name}, {property.state_name}</span>
                    </div>
                </div>
            
                <div className="text-right">
                    <div className="text-3xl font-bold text-[var(--color-text-primary)]">
                        ${property.price.toLocaleString()}
                    </div>
                    <button
                        onClick={toggleFavorite}
                        className="mt-2 p-2 rounded-full bg-[var(--color-card)] border border-[var(--color-outline)] hover:bg-[var(--btn-bg-color)] transition-colors cursor-pointer"
                    >
                        <Heart 
                            size={20} 
                            className={isFavorite ? "fill-red-500 text-red-500" : "text-[var(--color-text-secondary)]"} 
                        />
                    </button>
                </div>
            </div>

            {/* Image Gallery Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
            
                {/* Thumbnail Gallery */}
                <div className="lg:order-1">
                    <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
                        {property.property_images?.map((image, index) => (
                            <button
                                key={image.id}
                                onClick={() => selectImage(index)}
                                className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                                    selectedThumbnail === index 
                                    ? 'border-[var(--color-primary)]' 
                                    : 'border-transparent hover:border-[var(--color-outline)]'
                                }`}
                            >
                                <img
                                    src={image.image_url}
                                    alt={`Property view ${index + 1}`}
                                    className="w-full h-full object-cover cursor-pointer"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Image Display */}
                <div className="lg:col-span-2 lg:order-2">
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                        <img
                            src={property.property_images?.[currentImageIndex]?.image_url || property.image_url}
                            alt={property.title}
                            className="w-full h-full object-cover"
                        />
                        
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevImage}
                            disabled={currentImageIndex === 0}
                            className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        
                        <button
                            onClick={nextImage}
                            disabled={!property.property_images || currentImageIndex === property.property_images.length - 1}
                            className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {property.property_images?.length || 1}
                        </div>
                    </div>
                </div>

            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
                {/* Left Column - Description */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Description */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
                            Description
                        </h2>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed">
                            {property.property_description}
                        </p>
                    </div>

                    {/* Property Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <Bed size={24} className="text-[var(--color-primary)]" />
                            </div>
                            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
                                {property.bedrooms}
                            </div>
                            <div className="text-sm text-[var(--color-text-secondary)]">Bedrooms</div>
                        </div>

                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <Bath size={24} className="text-[var(--color-primary)]" />
                            </div>
                            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
                                {property.bathrooms}
                            </div>
                            <div className="text-sm text-[var(--color-text-secondary)]">Bathrooms</div>
                        </div>

                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <Square size={24} className="text-[var(--color-primary)]" />
                            </div>
                            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
                                {property.sqft?.toLocaleString()}
                            </div>
                            <div className="text-sm text-[var(--color-text-secondary)]">Square Feet</div>
                        </div>

                        <div className="text-center">
                            <div className="flex justify-center mb-2">
                                <Calendar size={24} className="text-[var(--color-primary)]" />
                            </div>
                            <div className="text-2xl font-bold text-[var(--color-text-primary)]">
                                {property.year_built}
                            </div>
                            <div className="text-sm text-[var(--color-text-secondary)]">Year Built</div>
                        </div>
                    </div>

                    {/* Key Features and Amenities */}
                    <div>
                        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
                            Key Features and Amenities
                        </h2>
                        <div className="space-y-3">
                            {property.features?.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-[var(--color-text-secondary)]">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Pricing Details */}
                <div className="lg:col-span-1">
                    <div className="bg-[var(--color-card)] rounded-xl p-6 border border-[var(--color-outline)]">
                        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">
                            Comprehensive Pricing Details
                        </h2>
                        
                        <div className="space-y-6">
                            {/* Base Price */}
                            <div>
                                <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-4">Base</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Property price and assessment history</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-[var(--color-outline)] pb-3">
                                        <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                                            ${property.price.toLocaleString()}
                                        </span>
                                        <span className="text-sm text-[var(--color-text-secondary)]">Additional Fees</span>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Costs */}
                            <div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Property tax based on current year assessment</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">
                                            ${property.property_taxes_annual?.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Home insurance with adequate property protection</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">$1,200</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Homeowners fee</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">$300</span>
                                    </div>
                                </div>
                            </div>

                            {/* Monthly Costs */}
                            <div className="border-t border-[var(--color-outline)] pt-4">
                                <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Monthly Costs</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Property tax</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">
                                            ${Math.round((property.property_taxes_annual || 0) / 12).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Homeowner Association fee</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">$300</span>
                                    </div>
                                </div>
                            </div>

                            {/* Predicted Costs */}
                            <div className="border-t border-[var(--color-outline)] pt-4">
                                <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Predicted Costs</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Closing fee</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">$1,250,000</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Potential closing fee (approx: 2-7%)</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">$87,500</span>
                                    </div>
                                </div>
                            </div>

                            {/* Monthly Expenses */}
                            <div className="border-t border-[var(--color-outline)] pt-4">
                                <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Monthly Expenses</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Principal and Interest</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">$1,800</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Property Insurance Tax</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">$300</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Monthly payment based on terms and interest only</span>
                                        <span className="font-semibold text-[var(--color-text-primary)]">$300</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    );
    
}