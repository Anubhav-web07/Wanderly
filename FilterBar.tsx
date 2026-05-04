'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, Star, DollarSign, Globe, Tag } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface FilterBarProps {
  totalResults: number;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  sortBy: string;
  budgetFilter: string;
  ratingFilter: string;
  regionFilter: string;
  activityFilter: string;
}

const SORT_OPTIONS = [
  { value: 'match', label: 'Best Match' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'trending', label: 'Trending Now' },
];

const BUDGET_OPTIONS = [
  { value: 'all', label: 'All Budgets' },
  { value: 'low', label: 'Budget (< $1,000)' },
  { value: 'medium', label: 'Mid-Range ($1K–$3K)' },
  { value: 'high', label: 'Premium ($3K+)' },
];

const RATING_OPTIONS = [
  { value: 'all', label: 'Any Rating' },
  { value: '4.5', label: '4.5+ Stars' },
  { value: '4.0', label: '4.0+ Stars' },
  { value: '3.5', label: '3.5+ Stars' },
];

const REGION_OPTIONS = [
  { value: 'all', label: 'All Regions' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'North America', label: 'North America' },
  { value: 'South America', label: 'South America' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Australia / Oceania', label: 'Australia / Oceania' },
];

const ACTIVITY_OPTIONS = [
  { value: 'all', label: 'All Activities' },
  { value: 'beach', label: 'Beach' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'culture', label: 'Culture & History' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'adventure', label: 'Adventure Sports' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'wildlife', label: 'Wildlife' },
];

function FilterSelect({
  value,
  onChange,
  options,
  icon: Icon,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  icon: React.ElementType;
}) {
  return (
    <div className="relative">
      <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-base pl-8 pr-8 py-2 text-sm appearance-none cursor-pointer min-w-[140px]"
      >
        {options.map(opt => (
          <option key={`filter-${opt.value}`} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
    </div>
  );
}

export default function FilterBar({ totalResults, onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'match',
    budgetFilter: 'all',
    ratingFilter: 'all',
    regionFilter: 'all',
    activityFilter: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="card-base p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Results count */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {totalResults} destinations found
          </span>
        </div>

        <div className="flex-1 flex flex-wrap items-center gap-2 sm:justify-end">
          {/* Sort */}
          <FilterSelect
            value={filters.sortBy}
            onChange={v => updateFilter('sortBy', v)}
            options={SORT_OPTIONS}
            icon={Tag}
          />

          {/* Toggle more filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border transition-all duration-150 ${
              showFilters
                ? 'bg-primary text-white border-primary' :'bg-white text-muted-foreground border-border hover:border-primary/50'
            }`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {(filters.budgetFilter !== 'all' || filters.ratingFilter !== 'all' || filters.regionFilter !== 'all' || filters.activityFilter !== 'all') && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                !
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2 animate-slide-up">
          <FilterSelect
            value={filters.budgetFilter}
            onChange={v => updateFilter('budgetFilter', v)}
            options={BUDGET_OPTIONS}
            icon={DollarSign}
          />
          <FilterSelect
            value={filters.ratingFilter}
            onChange={v => updateFilter('ratingFilter', v)}
            options={RATING_OPTIONS}
            icon={Star}
          />
          <FilterSelect
            value={filters.regionFilter}
            onChange={v => updateFilter('regionFilter', v)}
            options={REGION_OPTIONS}
            icon={Globe}
          />
          <FilterSelect
            value={filters.activityFilter}
            onChange={v => updateFilter('activityFilter', v)}
            options={ACTIVITY_OPTIONS}
            icon={Tag}
          />
          <button
            onClick={() => {
              const reset: FilterState = { sortBy: 'match', budgetFilter: 'all', ratingFilter: 'all', regionFilter: 'all', activityFilter: 'all' };
              setFilters(reset);
              onFilterChange(reset);
            }}
            className="text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-2 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}