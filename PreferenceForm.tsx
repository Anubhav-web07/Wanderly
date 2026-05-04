'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Globe,
  Calendar,
  Users,
  Clock,
  Sliders,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

export interface TripPreferences {
  budget: 'low' | 'medium' | 'high' | 'custom';
  customBudget: string;
  continent: string;
  country: string;
  activities: string[];
  travelStyle: string[];
  duration: string;
  season: string;
  travelers: string;
}

interface PreferenceFormProps {
  onSearch: (prefs: TripPreferences) => void;
  isLoading: boolean;
}

const ACTIVITIES = [
  'Hiking', 'Nightlife', 'Shopping', 'Sightseeing', 'Adventure Sports',
  'Food Exploration', 'History & Culture', 'Relaxation', 'Photography',
  'Wildlife Safari', 'Snorkeling / Diving', 'Skiing', 'Cycling', 'Yoga & Wellness',
];

const TRAVEL_STYLES = [
  'Beach', 'Mountains', 'City', 'Nature', 'Luxury', 'Cultural', 'Road Trip', 'Backpacking',
];

const CONTINENTS = [
  'Any Region', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia / Oceania', 'Middle East',
];

const SEASONS = [
  'Any Season', 'Spring (Mar–May)', 'Summer (Jun–Aug)', 'Autumn (Sep–Nov)', 'Winter (Dec–Feb)',
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const BUDGET_TIERS = [
  { value: 'low', label: 'Budget', range: 'Under $1,000', color: 'border-emerald-400 bg-emerald-50 text-emerald-700' },
  { value: 'medium', label: 'Mid-Range', range: '$1,000–$3,000', color: 'border-sky-400 bg-sky-50 text-sky-700' },
  { value: 'high', label: 'Premium', range: '$3,000–$7,000', color: 'border-purple-400 bg-purple-50 text-purple-700' },
  { value: 'custom', label: 'Custom', range: 'Set your own', color: 'border-amber-400 bg-amber-50 text-amber-700' },
];

export default function PreferenceForm({ onSearch, isLoading }: PreferenceFormProps) {
  const [prefs, setPrefs] = useState<TripPreferences>({
    budget: 'medium',
    customBudget: '',
    continent: 'Any Region',
    country: '',
    activities: ['Sightseeing', 'Food Exploration'],
    travelStyle: ['City'],
    duration: '7',
    season: 'Any Season',
    travelers: '2',
  });

  const toggleActivity = (activity: string) => {
    setPrefs(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const toggleStyle = (style: string) => {
    setPrefs(prev => ({
      ...prev,
      travelStyle: prev.travelStyle.includes(style)
        ? prev.travelStyle.filter(s => s !== style)
        : [...prev.travelStyle, style],
    }));
  };

  return (
    <div className="card-base p-6 lg:p-8 space-y-7">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Sparkles size={20} className="text-primary" />
          Plan Your Perfect Trip
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us your preferences and we'll find destinations that match your style and budget.
        </p>
      </div>

      {/* Budget */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
          <DollarSign size={15} className="text-primary" />
          Travel Budget
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BUDGET_TIERS.map((tier) => (
            <button
              key={`budget-${tier.value}`}
              onClick={() => setPrefs(prev => ({ ...prev, budget: tier.value as TripPreferences['budget'] }))}
              className={`p-3 rounded-xl border-2 text-left transition-all duration-150 ${
                prefs.budget === tier.value
                  ? tier.color
                  : 'border-border bg-white text-muted-foreground hover:border-primary/40'
              }`}
            >
              <div className="font-semibold text-sm">{tier.label}</div>
              <div className="text-xs mt-0.5 opacity-80">{tier.range}</div>
            </button>
          ))}
        </div>
        {prefs.budget === 'custom' && (
          <div className="relative mt-2">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
            <input
              type="number"
              placeholder="Enter your total budget"
              value={prefs.customBudget}
              onChange={e => setPrefs(prev => ({ ...prev, customBudget: e.target.value }))}
              className="input-base pl-8"
            />
          </div>
        )}
      </div>

      {/* Region + Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Globe size={15} className="text-primary" />
            Continent / Region
          </label>
          <div className="relative">
            <select
              value={prefs.continent}
              onChange={e => setPrefs(prev => ({ ...prev, continent: e.target.value }))}
              className="input-base appearance-none pr-10 cursor-pointer"
            >
              {CONTINENTS.map(c => (
                <option key={`continent-${c}`} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Specific Country <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Japan, Italy, Mexico..."
            value={prefs.country}
            onChange={e => setPrefs(prev => ({ ...prev, country: e.target.value }))}
            className="input-base"
          />
        </div>
      </div>

      {/* Duration + Travelers + Season */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Clock size={15} className="text-primary" />
            Duration (days)
          </label>
          <input
            type="number"
            min="1"
            max="90"
            value={prefs.duration}
            onChange={e => setPrefs(prev => ({ ...prev, duration: e.target.value }))}
            className="input-base font-tabular"
            placeholder="7"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users size={15} className="text-primary" />
            Travelers
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={prefs.travelers}
            onChange={e => setPrefs(prev => ({ ...prev, travelers: e.target.value }))}
            className="input-base font-tabular"
            placeholder="2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Calendar size={15} className="text-primary" />
            Travel Season
          </label>
          <div className="relative">
            <select
              value={prefs.season}
              onChange={e => setPrefs(prev => ({ ...prev, season: e.target.value }))}
              className="input-base appearance-none pr-10 cursor-pointer"
            >
              {SEASONS.map(s => (
                <option key={`season-${s}`} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Travel Style */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Sliders size={15} className="text-primary" />
          Travel Style
        </label>
        <div className="flex flex-wrap gap-2">
          {TRAVEL_STYLES.map(style => (
            <button
              key={`style-${style}`}
              onClick={() => toggleStyle(style)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                prefs.travelStyle.includes(style)
                  ? 'bg-primary text-white border-primary' :'bg-white text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Sparkles size={15} className="text-primary" />
          Activities You Enjoy
          <span className="text-xs text-muted-foreground font-normal">({prefs.activities.length} selected)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {ACTIVITIES.map(activity => (
            <button
              key={`activity-${activity}`}
              onClick={() => toggleActivity(activity)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                prefs.activities.includes(activity)
                  ? 'bg-accent text-white border-accent' :'bg-white text-muted-foreground border-border hover:border-accent/50 hover:text-foreground'
              }`}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={() => onSearch(prefs)}
        disabled={isLoading}
        className="btn-primary w-full py-3.5 text-base font-bold justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Finding destinations...
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Find My Perfect Destinations
          </>
        )}
      </button>
    </div>
  );
}