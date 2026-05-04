'use client';

import React from 'react';
import DestinationCard, { Destination } from './DestinationCard';
import { DestinationCardSkeleton } from '@/components/ui/LoadingSkeleton';
import { MapPin, Sparkles } from 'lucide-react';

// Mock destination data — BACKEND: GET /api/destinations?preferences={...}
export const MOCK_DESTINATIONS: Destination[] = [
{
  id: 'dest-kyoto-001',
  name: 'Kyoto',
  country: 'Japan',
  continent: 'Asia',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15034bfe1-1772535094141.png",
  imageAlt: 'Traditional Japanese temple surrounded by cherry blossom trees in Kyoto with red torii gates',
  estimatedCost: 1850,
  budgetTier: 'medium',
  rating: 4.9,
  reviewCount: 18420,
  bestTime: 'Mar–May, Oct–Nov',
  duration: '5–8 days',
  topActivities: ['Sightseeing', 'History & Culture', 'Food Exploration', 'Photography'],
  description: 'Ancient temples, traditional tea houses, and breathtaking cherry blossoms make Kyoto Japan\'s cultural heart. Wander through bamboo forests and zen gardens.',
  matchScore: 97,
  trending: true,
  flagEmoji: '🇯🇵'
},
{
  id: 'dest-santorini-002',
  name: 'Santorini',
  country: 'Greece',
  continent: 'Europe',
  image: "https://images.unsplash.com/photo-1618478751717-b2fc9412fd11",
  imageAlt: 'White-washed buildings with blue domed churches overlooking the Aegean Sea in Santorini at sunset',
  estimatedCost: 2650,
  budgetTier: 'high',
  rating: 4.8,
  reviewCount: 24110,
  bestTime: 'Apr–Oct',
  duration: '4–6 days',
  topActivities: ['Beach', 'Relaxation', 'Food Exploration', 'Photography'],
  description: 'Iconic blue-domed churches, volcanic beaches, and world-class sunsets. Santorini is the quintessential Mediterranean escape for couples and luxury travelers.',
  matchScore: 93,
  trending: true,
  flagEmoji: '🇬🇷'
},
{
  id: 'dest-bali-003',
  name: 'Bali',
  country: 'Indonesia',
  continent: 'Asia',
  image: "https://images.unsplash.com/photo-1707170204450-27a133f4f120",
  imageAlt: 'Lush green rice terraces cascading down a hillside in Bali with tropical palm trees and misty mountains',
  estimatedCost: 980,
  budgetTier: 'low',
  rating: 4.7,
  reviewCount: 31580,
  bestTime: 'Apr–Sep',
  duration: '7–14 days',
  topActivities: ['Yoga & Wellness', 'Sightseeing', 'Hiking', 'Nightlife'],
  description: 'Terraced rice paddies, sacred temples, surf beaches, and a thriving wellness scene. Bali offers extraordinary experiences at an unbeatable price point.',
  matchScore: 91,
  trending: false,
  flagEmoji: '🇮🇩'
},
{
  id: 'dest-patagonia-004',
  name: 'Patagonia',
  country: 'Argentina / Chile',
  continent: 'South America',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_111dda823-1772161176360.png",
  imageAlt: 'Dramatic jagged granite peaks of Torres del Paine rising above turquoise glacial lakes in Patagonia',
  estimatedCost: 2200,
  budgetTier: 'medium',
  rating: 4.9,
  reviewCount: 9870,
  bestTime: 'Nov–Mar',
  duration: '10–14 days',
  topActivities: ['Hiking', 'Adventure Sports', 'Photography', 'Wildlife Safari'],
  description: 'Glaciers, granite spires, and raw wilderness at the end of the world. Patagonia delivers once-in-a-lifetime trekking through some of Earth\'s most dramatic landscapes.',
  matchScore: 88,
  trending: false,
  flagEmoji: '🇦🇷'
},
{
  id: 'dest-marrakech-005',
  name: 'Marrakech',
  country: 'Morocco',
  continent: 'Africa',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_16721eb2b-1772749588153.png",
  imageAlt: 'Vibrant Djemaa el-Fna square in Marrakech with orange juice stalls, storytellers and the Koutoubia mosque at dusk',
  estimatedCost: 1100,
  budgetTier: 'low',
  rating: 4.6,
  reviewCount: 15230,
  bestTime: 'Mar–May, Sep–Nov',
  duration: '4–7 days',
  topActivities: ['History & Culture', 'Shopping', 'Food Exploration', 'Sightseeing'],
  description: 'Labyrinthine medinas, fragrant spice souks, and palatial riads. Marrakech assaults the senses in the best possible way — a feast of color, scent, and sound.',
  matchScore: 85,
  trending: false,
  flagEmoji: '🇲🇦'
},
{
  id: 'dest-queenstown-006',
  name: 'Queenstown',
  country: 'New Zealand',
  continent: 'Australia / Oceania',
  image: "https://images.unsplash.com/photo-1662408078279-4c50f5c8ec2b",
  imageAlt: 'Queenstown waterfront with Lake Wakatipu and the Remarkables mountain range reflected in calm blue water',
  estimatedCost: 2900,
  budgetTier: 'high',
  rating: 4.8,
  reviewCount: 12640,
  bestTime: 'Dec–Feb, Jun–Aug',
  duration: '5–10 days',
  topActivities: ['Adventure Sports', 'Hiking', 'Skiing', 'Sightseeing'],
  description: 'The adventure capital of the world. Bungee jumping, skydiving, jet boating, and world-class skiing set against some of the most spectacular alpine scenery on Earth.',
  matchScore: 82,
  trending: true,
  flagEmoji: '🇳🇿'
},
{
  id: 'dest-lisbon-007',
  name: 'Lisbon',
  country: 'Portugal',
  continent: 'Europe',
  image: "https://images.unsplash.com/photo-1705365503854-26885a34741d",
  imageAlt: 'Colorful tiled buildings on steep hillside streets of Lisbon with yellow tram and Tagus river in background',
  estimatedCost: 1450,
  budgetTier: 'medium',
  rating: 4.7,
  reviewCount: 20190,
  bestTime: 'Mar–May, Sep–Oct',
  duration: '4–6 days',
  topActivities: ['History & Culture', 'Food Exploration', 'Nightlife', 'Sightseeing'],
  description: 'Europe\'s sunniest capital charms visitors with its iconic yellow trams, melancholic fado music, world-class pastéis de nata, and an electric nightlife scene.',
  matchScore: 90,
  trending: true,
  flagEmoji: '🇵🇹'
},
{
  id: 'dest-costa-rica-008',
  name: 'Costa Rica',
  country: 'Costa Rica',
  continent: 'North America',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12714ba49-1772248019713.png",
  imageAlt: 'Dense tropical rainforest canopy in Costa Rica with a hanging bridge walkway and misty volcano in background',
  estimatedCost: 1680,
  budgetTier: 'medium',
  rating: 4.7,
  reviewCount: 13450,
  bestTime: 'Dec–Apr',
  duration: '7–12 days',
  topActivities: ['Wildlife Safari', 'Hiking', 'Adventure Sports', 'Beach'],
  description: 'Pura vida! Zip-line through cloud forests, spot sloths in the wild, surf Pacific waves, and soak in natural hot springs beneath active volcanoes.',
  matchScore: 86,
  trending: false,
  flagEmoji: '🇨🇷'
}];


interface RecommendationsGridProps {
  isLoading: boolean;
  destinations: Destination[];
  hasSearched: boolean;
}

export default function RecommendationsGrid({ isLoading, destinations, hasSearched }: RecommendationsGridProps) {
  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="animate-pulse h-6 w-48 bg-muted rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) =>
          <DestinationCardSkeleton key={`skeleton-card-${i + 1}`} />
          )}
        </div>
      </div>);

  }

  if (destinations.length === 0 && hasSearched) {
    return (
      <div className="card-base p-16 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
          <MapPin size={28} className="text-muted-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">No destinations found</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Try adjusting your budget, region, or activity preferences to discover more destinations that fit your style.
          </p>
        </div>
        <button className="btn-secondary text-sm">Reset Filters</button>
      </div>);

  }

  if (!hasSearched) {
    return (
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Sparkles size={18} className="text-primary" />
          <h2 className="text-lg font-bold text-foreground">Popular Destinations Right Now</h2>
          <span className="text-xs text-muted-foreground">— Customize above for personalized results</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
          {MOCK_DESTINATIONS.map((dest) =>
          <DestinationCard key={dest.id} destination={dest} />
          )}
        </div>
      </div>);

  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={18} className="text-primary" />
        <h2 className="text-lg font-bold text-foreground">
          Your Personalized Recommendations
        </h2>
        <span className="badge-blue ml-1">{destinations.length} matches</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
        {destinations.map((dest) =>
        <DestinationCard key={dest.id} destination={dest} />
        )}
      </div>
    </div>);

}