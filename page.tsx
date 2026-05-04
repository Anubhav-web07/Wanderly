import React from 'react';
import AppLayout from '@/components/AppLayout';
import HeroSection from './components/HeroSection';
import TripDiscoveryClient from './components/TripDiscoveryClient';

export default function TripDiscoveryPage() {
  return (
    <AppLayout>
      <HeroSection />
      <TripDiscoveryClient />
    </AppLayout>
  );
}