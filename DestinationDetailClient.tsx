'use client';

import React, { useState } from 'react';
import DestinationHero from './DestinationHero';
import DestinationTabs from './DestinationTabs';
import DestinationSidebar from './DestinationSidebar';

// BACKEND: GET /api/destinations/:id — replace with real fetch
export const DESTINATION_DATA = {
  id: 'dest-kyoto-001',
  name: 'Kyoto',
  country: 'Japan',
  continent: 'Asia',
  flagEmoji: '🇯🇵',
  rating: 4.9,
  reviewCount: 18420,
  budgetTier: 'medium' as const,
  estimatedCost: 1850,
  duration: '5–8 days',
  bestTime: 'March–May, October–November',
  description: `Kyoto, Japan's ancient imperial capital, is a city where the past lives and breathes alongside the present. With over 2,000 temples and shrines, 17 UNESCO World Heritage Sites, and a culinary tradition spanning centuries, Kyoto is widely considered one of the world's greatest travel destinations.

Walk through the thousand torii gates of Fushimi Inari at dawn, meditate in the rock garden of Ryoan-ji, or watch geisha glide through the lantern-lit streets of Gion. In spring, the city transforms under a canopy of cherry blossoms; in autumn, maple leaves paint the hillsides in scarlet and gold.`,
  images: [
  {
    id: 'img-fushimi',
    src: "https://images.unsplash.com/photo-1715963443302-4c194d8b5981",
    alt: 'Thousands of red torii gates lining the mountain path at Fushimi Inari shrine in Kyoto at golden hour'
  },
  {
    id: 'img-arashiyama',
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_11e1f5a46-1772890337012.png",
    alt: 'Towering bamboo grove path in Arashiyama district of Kyoto with soft morning light filtering through'
  },
  {
    id: 'img-kinkakuji',
    src: "https://images.unsplash.com/photo-1707905629017-fa2c62be297a",
    alt: 'Golden Kinkaku-ji Temple reflecting perfectly in a still pond surrounded by manicured Japanese gardens'
  },
  {
    id: 'img-gion',
    src: "https://img.rocket.new/generatedImages/rocket_gen_img_1dfdb76cc-1772249607038.png",
    alt: 'Traditional wooden machiya townhouses lining a cobblestone street in Gion district at night with lanterns'
  }],

  attractions: [
  {
    id: 'attr-fushimi',
    name: 'Fushimi Inari Taisha',
    type: 'Shrine',
    entryFee: 'Free',
    duration: '2–3 hours',
    rating: 4.9,
    description: 'Over 10,000 vermilion torii gates winding up Mount Inari. Visit at 5am to experience it crowd-free.',
    image: "https://images.unsplash.com/photo-1714520846714-4ada9777124c",
    imageAlt: 'Vermilion torii gates creating a tunnel pathway up Mount Inari at Fushimi Inari shrine'
  },
  {
    id: 'attr-arashiyama',
    name: 'Arashiyama Bamboo Grove',
    type: 'Nature',
    entryFee: 'Free',
    duration: '1–2 hours',
    rating: 4.8,
    description: 'Towering bamboo stalks creating a mesmerizing green tunnel. Best visited at dawn before tour groups arrive.',
    image: "https://images.unsplash.com/photo-1691921609479-1c2bb1a40383",
    imageAlt: 'Dense bamboo grove with tall green stalks and dappled sunlight in Arashiyama Kyoto'
  },
  {
    id: 'attr-kinkakuji',
    name: 'Kinkaku-ji (Golden Pavilion)',
    type: 'Temple',
    entryFee: '$5',
    duration: '1 hour',
    rating: 4.8,
    description: 'The iconic gold-leaf covered Zen temple perfectly mirrored in its surrounding pond. One of Japan\'s most photographed sites.',
    image: "https://images.unsplash.com/photo-1704631862733-9d7c300df8d0",
    imageAlt: 'Golden Kinkaku-ji temple with gold leaf exterior reflecting in mirror-like pond with blue sky'
  },
  {
    id: 'attr-gion',
    name: 'Gion District',
    type: 'Cultural Quarter',
    entryFee: 'Free',
    duration: '2–3 hours',
    rating: 4.7,
    description: 'Kyoto\'s famous geisha district with preserved machiya townhouses, exclusive ochaya teahouses, and evening lantern glow.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dfdb76cc-1772249607038.png",
    imageAlt: 'Traditional Japanese machiya wooden buildings with lanterns illuminating cobblestone street in Gion district'
  },
  {
    id: 'attr-nishiki',
    name: 'Nishiki Market',
    type: 'Market',
    entryFee: 'Free',
    duration: '1–2 hours',
    rating: 4.6,
    description: 'A narrow five-block shopping street nicknamed "Kyoto\'s Kitchen" — 100+ vendors selling pickled vegetables, tofu, fresh fish, and street snacks.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14e837bb1-1775817264407.png",
    imageAlt: 'Colorful narrow Nishiki Market street in Kyoto with vendors selling fresh food and traditional goods'
  },
  {
    id: 'attr-ryoanji',
    name: 'Ryoan-ji Rock Garden',
    type: 'Temple Garden',
    entryFee: '$5',
    duration: '1 hour',
    rating: 4.7,
    description: 'Japan\'s most famous Zen rock garden — 15 carefully placed stones in white gravel. No matter where you stand, one stone is always hidden from view.',
    image: "https://images.unsplash.com/photo-1691430754086-1ac0df06bf5b",
    imageAlt: 'Famous Ryoanji temple Zen rock garden with 15 stones arranged in white raked gravel surrounded by ancient walls'
  }],

  itinerary: [
  {
    id: 'day-1',
    day: 1,
    title: 'Arrival & Gion Evening',
    totalCost: 180,
    items: [
    { id: 'day1-item1', time: '14:00', activity: 'Check into ryokan in Higashiyama district', cost: 120, type: 'accommodation' },
    { id: 'day1-item2', time: '16:00', activity: 'Stroll through Gion District, spot geisha in Hanamikoji Street', cost: 0, type: 'sightseeing' },
    { id: 'day1-item3', time: '18:30', activity: 'Kaiseki dinner at Nakamura-ro (reserve in advance)', cost: 60, type: 'food' }]

  },
  {
    id: 'day-2',
    day: 2,
    title: 'Temples & Sacred Paths',
    totalCost: 210,
    items: [
    { id: 'day2-item1', time: '05:30', activity: 'Fushimi Inari Taisha — hike the torii gate trail at dawn', cost: 0, type: 'sightseeing' },
    { id: 'day2-item2', time: '10:00', activity: 'Tofuku-ji Temple and its maple garden', cost: 8, type: 'sightseeing' },
    { id: 'day2-item3', time: '13:00', activity: 'Ramen lunch at Ichiran Kyoto Shijo', cost: 18, type: 'food' },
    { id: 'day2-item4', time: '15:00', activity: 'Kiyomizudera Temple with valley views', cost: 7, type: 'sightseeing' },
    { id: 'day2-item5', time: '19:00', activity: 'Pontocho Alley dinner — Yakitori and sake', cost: 55, type: 'food' },
    { id: 'day2-item6', time: '22:00', activity: 'Ryokan accommodation', cost: 122, type: 'accommodation' }]

  },
  {
    id: 'day-3',
    day: 3,
    title: 'Arashiyama & Zen Gardens',
    totalCost: 175,
    items: [
    { id: 'day3-item1', time: '07:00', activity: 'Arashiyama Bamboo Grove — arrive before 8am for empty paths', cost: 0, type: 'sightseeing' },
    { id: 'day3-item2', time: '09:00', activity: 'Tenryu-ji Zen Garden (UNESCO)', cost: 12, type: 'sightseeing' },
    { id: 'day3-item3', time: '11:30', activity: 'Sagano Romantic Train through maple valley', cost: 18, type: 'transport' },
    { id: 'day3-item4', time: '13:30', activity: 'Tofu cuisine lunch in Arashiyama', cost: 25, type: 'food' },
    { id: 'day3-item5', time: '15:30', activity: 'Ryoan-ji Rock Garden meditation', cost: 5, type: 'sightseeing' },
    { id: 'day3-item6', time: '18:00', activity: 'Kinkaku-ji at closing hour (fewer crowds)', cost: 5, type: 'sightseeing' },
    { id: 'day3-item7', time: '22:00', activity: 'Hotel accommodation', cost: 110, type: 'accommodation' }]

  },
  {
    id: 'day-4',
    day: 4,
    title: 'Markets, Nishiki & Nijo Castle',
    totalCost: 160,
    items: [
    { id: 'day4-item1', time: '09:00', activity: 'Nishiki Market — street food tour (pickles, tamago, mochi)', cost: 25, type: 'food' },
    { id: 'day4-item2', time: '11:00', activity: 'Nijo Castle — shogun\'s palace with nightingale floors', cost: 8, type: 'sightseeing' },
    { id: 'day4-item3', time: '13:30', activity: 'Ramen and gyoza lunch near Kyoto Station', cost: 20, type: 'food' },
    { id: 'day4-item4', time: '15:00', activity: 'Kimono rental and photoshoot in Higashiyama', cost: 45, type: 'activity' },
    { id: 'day4-item5', time: '18:30', activity: 'Farewell omakase dinner (book 2 weeks ahead)', cost: 62, type: 'food' }]

  },
  {
    id: 'day-5',
    day: 5,
    title: 'Day Trip to Nara',
    totalCost: 95,
    items: [
    { id: 'day5-item1', time: '08:30', activity: 'Train to Nara (45 min from Kyoto)', cost: 12, type: 'transport' },
    { id: 'day5-item2', time: '10:00', activity: 'Nara Deer Park — feed wild deer senbei crackers', cost: 5, type: 'activity' },
    { id: 'day5-item3', time: '11:30', activity: 'Todai-ji Temple — world\'s largest bronze Buddha', cost: 8, type: 'sightseeing' },
    { id: 'day5-item4', time: '13:30', activity: 'Naramachi lunch — traditional sake and soba', cost: 22, type: 'food' },
    { id: 'day5-item5', time: '16:00', activity: 'Return to Kyoto, evening at Philosopher\'s Path', cost: 12, type: 'transport' },
    { id: 'day5-item6', time: '19:00', activity: 'Last dinner — street ramen in Kyoto Station', cost: 18, type: 'food' },
    { id: 'day5-item7', time: '22:00', activity: 'Hotel accommodation', cost: 18, type: 'accommodation' }]

  }],

  expenses: {
    total: 1850,
    breakdown: [
    { id: 'exp-accommodation', category: 'Accommodation', amount: 620, percentage: 33.5, color: '#0EA5E9' },
    { id: 'exp-food', category: 'Food & Dining', amount: 420, percentage: 22.7, color: '#10B981' },
    { id: 'exp-transport', category: 'Flights & Transport', amount: 480, percentage: 25.9, color: '#8B5CF6' },
    { id: 'exp-activities', category: 'Activities & Entry', amount: 220, percentage: 11.9, color: '#F59E0B' },
    { id: 'exp-misc', category: 'Shopping & Misc', amount: 110, percentage: 5.9, color: '#F43F5E' }]

  },
  activities: [
  { id: 'act-temples', name: 'Temple Hopping', category: 'Culture', duration: 'Full day', cost: '$10–20', difficulty: 'Easy', description: 'Visit 5–7 temples in a single day following the Higashiyama walking trail.' },
  { id: 'act-cooking', name: 'Japanese Cooking Class', category: 'Food', duration: '3 hours', cost: '$65–90', difficulty: 'Easy', description: 'Learn to make sushi, miso soup, and tamagoyaki with a local chef in a traditional machiya kitchen.' },
  { id: 'act-tea', name: 'Tea Ceremony Experience', category: 'Culture', duration: '1 hour', cost: '$30–50', difficulty: 'Easy', description: 'Participate in a formal matcha tea ceremony in a historic teahouse in Uji or Higashiyama.' },
  { id: 'act-geisha', name: 'Geisha District Night Walk', category: 'Culture', duration: '2 hours', cost: 'Free', difficulty: 'Easy', description: 'Self-guided evening stroll through Gion and Pontocho with the best chance of spotting geiko and maiko.' },
  { id: 'act-cycling', name: 'Cycling Tour', category: 'Active', duration: 'Half day', cost: '$20–35', difficulty: 'Moderate', description: 'Cycle through Fushimi, Nishiki, and Philosopher\'s Path with a local guide. Best in cherry blossom season.' },
  { id: 'act-zazen', name: 'Zazen Meditation', category: 'Wellness', duration: '2 hours', cost: '$15', difficulty: 'Easy', description: 'Participate in a guided Zen meditation session at Kennin-ji or Shunkoin Temple with an English-speaking monk.' },
  { id: 'act-sake', name: 'Fushimi Sake Brewery Tour', category: 'Food', duration: '2 hours', cost: '$25–40', difficulty: 'Easy', description: 'Tour one of Fushimi\'s 30 sake breweries — Japan\'s second largest sake-producing region — with tasting included.' },
  { id: 'act-kimono', name: 'Kimono Rental & Photoshoot', category: 'Cultural Experience', duration: '3 hours', cost: '$35–60', difficulty: 'Easy', description: 'Rent a traditional kimono and have professional photos taken in Higashiyama\'s preserved historic streets.' }]

};

export default function DestinationDetailClient() {
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'expenses' | 'activities'>('overview');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero */}
      <DestinationHero destination={DESTINATION_DATA} />

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] 2xl:grid-cols-[1fr_380px] gap-6 items-start">
        {/* Tabs Content */}
        <DestinationTabs
          destination={DESTINATION_DATA}
          activeTab={activeTab}
          onTabChange={setActiveTab} />
        

        {/* Sidebar */}
        <div className="xl:sticky xl:top-24">
          <DestinationSidebar destination={DESTINATION_DATA} />
        </div>
      </div>
    </div>);

}