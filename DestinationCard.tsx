'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { Heart, Star, DollarSign, Clock, Calendar, ArrowRight, Zap,  } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  imageAlt: string;
  estimatedCost: number;
  budgetTier: 'low' | 'medium' | 'high';
  rating: number;
  reviewCount: number;
  bestTime: string;
  duration: string;
  topActivities: string[];
  description: string;
  matchScore: number;
  trending?: boolean;
  flagEmoji: string;
}

interface DestinationCardProps {
  destination: Destination;
}

const budgetBadgeVariant: Record<string, 'green' | 'blue' | 'purple'> = {
  low: 'green',
  medium: 'blue',
  high: 'purple',
};

const budgetLabel: Record<string, string> = {
  low: 'Budget',
  medium: 'Mid-Range',
  high: 'Premium',
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSaving(true);
    // BACKEND: POST /api/saved-destinations { destinationId: destination.id }
    await new Promise(r => setTimeout(r, 400));
    setSaved(!saved);
    setSaving(false);
  };

  return (
    <div className="card-base overflow-hidden group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <AppImage
          src={destination.image}
          alt={destination.imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-card" />

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            saved
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 backdrop-blur-sm text-muted-foreground hover:bg-white hover:text-rose-500'
          }`}
          aria-label={saved ? 'Remove from saved' : 'Save destination'}
        >
          {saving ? (
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <Heart size={16} fill={saved ? 'white' : 'none'} />
          )}
        </button>

        {/* Trending badge */}
        {destination.trending && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold shadow">
              <Zap size={11} />
              Trending
            </span>
          </div>
        )}

        {/* Match score */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-primary shadow">
            <Zap size={11} className="text-primary" />
            {destination.matchScore}% match
          </span>
        </div>

        {/* Destination name overlay */}
        <div className="absolute bottom-3 right-3 text-right">
          <div className="text-white font-bold text-base drop-shadow-lg">
            {destination.flagEmoji} {destination.name}
          </div>
          <div className="text-white/80 text-xs drop-shadow">{destination.country}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Rating + Budget */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-foreground font-tabular">{destination.rating}</span>
            <span className="text-xs text-muted-foreground">({destination.reviewCount.toLocaleString()})</span>
          </div>
          <Badge variant={budgetBadgeVariant[destination.budgetTier] as 'green' | 'blue'}>
            {budgetLabel[destination.budgetTier]}
          </Badge>
        </div>

        {/* Cost */}
        <div className="flex items-center gap-1.5">
          <DollarSign size={14} className="text-accent" />
          <span className="text-lg font-bold text-foreground font-tabular">
            ${destination.estimatedCost.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">/ person est.</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {destination.bestTime}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {destination.duration}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
          {destination.description}
        </p>

        {/* Activity tags */}
        <div className="flex flex-wrap gap-1.5">
          {destination.topActivities.slice(0, 3).map(activity => (
            <span
              key={`${destination.id}-activity-${activity}`}
              className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground font-medium"
            >
              {activity}
            </span>
          ))}
          {destination.topActivities.length > 3 && (
            <span className="px-2 py-0.5 rounded-full bg-muted text-xs text-muted-foreground font-medium">
              +{destination.topActivities.length - 3} more
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href="/destination-detail"
          className="btn-primary w-full justify-center text-sm mt-auto"
        >
          Explore {destination.name}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}