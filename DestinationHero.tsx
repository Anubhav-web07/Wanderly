'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import {
  Heart,
  Share2,
  Star,
  MapPin,
  Clock,
  Calendar,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';

interface HeroProps {
  destination: {
    id: string;
    name: string;
    country: string;
    flagEmoji: string;
    rating: number;
    reviewCount: number;
    budgetTier: 'low' | 'medium' | 'high';
    estimatedCost: number;
    duration: string;
    bestTime: string;
    images: { id: string; src: string; alt: string }[];
  };
}

const budgetBadgeVariant: Record<string, 'green' | 'blue'> = {
  low: 'green',
  medium: 'blue',
  high: 'blue',
};

const budgetLabel: Record<string, string> = {
  low: 'Budget-Friendly',
  medium: 'Mid-Range',
  high: 'Premium',
};

export default function DestinationHero({ destination }: HeroProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);

  const nextImage = () => setActiveImage(i => (i + 1) % destination.images.length);
  const prevImage = () => setActiveImage(i => (i - 1 + destination.images.length) % destination.images.length);

  return (
    <div className="space-y-4">
      {/* Back nav */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={15} />
        Back to Discovery
      </Link>

      {/* Image gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[320px] md:h-[420px] rounded-2xl overflow-hidden">
        {/* Main image */}
        <div className="md:col-span-3 relative group">
          <AppImage
            src={destination.images[activeImage].src}
            alt={destination.images[activeImage].alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 75vw"
          />
          <div className="absolute inset-0 bg-gradient-hero" />

          {/* Navigation arrows */}
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-white transition-all duration-150 opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-white transition-all duration-150 opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {destination.images.map((_, i) => (
              <button
                key={`dot-${i + 1}`}
                onClick={() => setActiveImage(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === activeImage ? 'bg-white w-4' : 'bg-white/50'
                }`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="hidden md:flex flex-col gap-2">
          {destination.images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveImage(i)}
              className={`relative flex-1 rounded-xl overflow-hidden transition-all duration-200 ${
                i === activeImage ? 'ring-2 ring-primary ring-offset-1' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <AppImage
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="20vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Destination header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground">
              {destination.flagEmoji} {destination.name}
            </h1>
            <Badge variant={budgetBadgeVariant[destination.budgetTier]}>
              {budgetLabel[destination.budgetTier]}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-primary" />
              {destination.country}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="font-semibold text-foreground">{destination.rating}</span>
              <span>({destination.reviewCount.toLocaleString()} reviews)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-accent" />
              Recommended: {destination.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-primary" />
              Best: {destination.bestTime}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSaved(!saved)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150 ${
              saved
                ? 'bg-rose-50 border-rose-200 text-rose-600' :'bg-white border-border text-muted-foreground hover:border-rose-200 hover:text-rose-500'
            }`}
          >
            <Heart size={15} fill={saved ? 'currentColor' : 'none'} />
            {saved ? 'Saved' : 'Save'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white text-muted-foreground text-sm font-medium hover:border-primary/40 hover:text-primary transition-all duration-150">
            <Share2 size={15} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}