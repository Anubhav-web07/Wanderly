'use client';

import React, { useState } from 'react';
import PreferenceForm, { TripPreferences } from './PreferenceForm';
import FilterBar, { FilterState } from './FilterBar';
import RecommendationsGrid, { MOCK_DESTINATIONS } from './RecommendationsGrid';
import BudgetCalculator from './BudgetCalculator';
import TravelTips from './TravelTips';
import { Destination } from './DestinationCard';

export default function TripDiscoveryClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<Destination[]>([]);
  const [displayedResults, setDisplayedResults] = useState<Destination[]>([]);

  // BACKEND: POST /api/recommendations with TripPreferences payload
  const handleSearch = async (prefs: TripPreferences) => {
    setIsLoading(true);
    setHasSearched(true);

    await new Promise(r => setTimeout(r, 1800));

    // Filter mock data based on preferences
    let filtered = MOCK_DESTINATIONS.filter(dest => {
      if (prefs.continent !== 'Any Region' && dest.continent !== prefs.continent) return false;
      if (prefs.budget !== 'custom') {
        if (prefs.budget === 'low' && dest.budgetTier !== 'low') return false;
        if (prefs.budget === 'high' && dest.budgetTier !== 'high') return false;
      }
      return true;
    });

    if (filtered.length === 0) filtered = MOCK_DESTINATIONS.slice(0, 5);

    setResults(filtered);
    setDisplayedResults(filtered);
    setIsLoading(false);
  };

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...results];

    if (filters.budgetFilter !== 'all') {
      filtered = filtered.filter(d => d.budgetTier === filters.budgetFilter);
    }
    if (filters.ratingFilter !== 'all') {
      const minRating = parseFloat(filters.ratingFilter);
      filtered = filtered.filter(d => d.rating >= minRating);
    }
    if (filters.regionFilter !== 'all') {
      filtered = filtered.filter(d => d.continent === filters.regionFilter);
    }

    // Sort
    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.estimatedCost - b.estimatedCost);
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.estimatedCost - a.estimatedCost);
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'trending') {
      filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    } else {
      filtered.sort((a, b) => b.matchScore - a.matchScore);
    }

    setDisplayedResults(filtered);
  };

  const displayList = hasSearched ? displayedResults : MOCK_DESTINATIONS;

  return (
    <div className="space-y-6">
      {/* Main layout: form left, results right on large screens */}
      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] 2xl:grid-cols-[420px_1fr] gap-6 items-start">
        {/* Preference Form */}
        <div className="xl:sticky xl:top-24">
          <PreferenceForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Results */}
        <div className="space-y-4">
          {(hasSearched || !isLoading) && (
            <FilterBar
              totalResults={displayList.length}
              onFilterChange={handleFilterChange}
            />
          )}
          <RecommendationsGrid
            isLoading={isLoading}
            destinations={displayedResults}
            hasSearched={hasSearched}
          />
        </div>
      </div>

      {/* Budget Calculator */}
      <BudgetCalculator />

      {/* Travel Tips */}
      <TravelTips />
    </div>
  );
}