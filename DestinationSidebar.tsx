'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Users, Thermometer, CheckCircle, Plane, Star, ArrowRight, Zap,  } from 'lucide-react';
import { DESTINATION_DATA } from './DestinationDetailClient';

interface SidebarProps {
  destination: typeof DESTINATION_DATA;
}

const WEATHER_MONTHS = [
  { id: 'month-jan', month: 'Jan', temp: 6, rain: 'Low', score: 3 },
  { id: 'month-feb', month: 'Feb', temp: 7, rain: 'Low', score: 3 },
  { id: 'month-mar', month: 'Mar', temp: 11, rain: 'Med', score: 5 },
  { id: 'month-apr', month: 'Apr', temp: 17, rain: 'Med', score: 5 },
  { id: 'month-may', month: 'May', temp: 22, rain: 'Med', score: 4 },
  { id: 'month-jun', month: 'Jun', temp: 26, rain: 'High', score: 3 },
  { id: 'month-jul', month: 'Jul', temp: 30, rain: 'High', score: 2 },
  { id: 'month-aug', month: 'Aug', temp: 31, rain: 'High', score: 2 },
  { id: 'month-sep', month: 'Sep', temp: 26, rain: 'Med', score: 3 },
  { id: 'month-oct', month: 'Oct', temp: 20, rain: 'Low', score: 5 },
  { id: 'month-nov', month: 'Nov', temp: 14, rain: 'Low', score: 5 },
  { id: 'month-dec', month: 'Dec', temp: 8, rain: 'Low', score: 3 },
];

const scoreColor = (score: number) => {
  if (score >= 5) return 'bg-emerald-400';
  if (score >= 4) return 'bg-sky-400';
  if (score >= 3) return 'bg-amber-300';
  return 'bg-rose-300';
};

const QUICK_FACTS = [
  { id: 'fact-currency', label: 'Currency', value: 'Japanese Yen (¥)' },
  { id: 'fact-language', label: 'Language', value: 'Japanese' },
  { id: 'fact-timezone', label: 'Timezone', value: 'JST (UTC+9)' },
  { id: 'fact-visa', label: 'Visa', value: 'Visa-free (90 days)' },
  { id: 'fact-power', label: 'Power Plug', value: 'Type A/B (100V)' },
  { id: 'fact-tip', label: 'Tipping', value: 'Not customary' },
];

export default function DestinationSidebar({ destination }: SidebarProps) {
  const [travelers, setTravelers] = useState(2);

  const totalGroupCost = destination.estimatedCost * travelers;

  return (
    <div className="space-y-4">
      {/* Quick Stats Card */}
      <div className="card-base p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-foreground">Trip Summary</h3>
          <span className="badge-blue">
            <Zap size={11} />
            97% match
          </span>
        </div>

        {/* Cost estimate */}
        <div className="bg-primary/5 rounded-xl p-4 text-center">
          <div className="text-xs text-muted-foreground mb-1">Estimated Cost</div>
          <div className="text-3xl font-extrabold text-primary font-tabular">
            ${destination.estimatedCost.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">per person · {destination.duration}</div>
        </div>

        {/* Travelers */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
            <Users size={12} />
            Number of Travelers
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTravelers(t => Math.max(1, t - 1))}
              className="w-9 h-9 rounded-xl border border-border bg-white flex items-center justify-center font-bold text-lg text-muted-foreground hover:border-primary hover:text-primary transition-all duration-150"
            >
              −
            </button>
            <span className="flex-1 text-center font-bold text-foreground text-lg font-tabular">{travelers}</span>
            <button
              onClick={() => setTravelers(t => Math.min(20, t + 1))}
              className="w-9 h-9 rounded-xl border border-border bg-white flex items-center justify-center font-bold text-lg text-muted-foreground hover:border-primary hover:text-primary transition-all duration-150"
            >
              +
            </button>
          </div>
          {travelers > 1 && (
            <div className="text-center text-sm font-semibold text-foreground">
              Group total: <span className="text-primary font-tabular">${totalGroupCost.toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className="space-y-2.5 text-sm">
          <div className="flex items-center gap-2.5">
            <Calendar size={14} className="text-primary shrink-0" />
            <div>
              <span className="text-muted-foreground">Best time: </span>
              <span className="font-semibold text-foreground">{destination.bestTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock size={14} className="text-accent shrink-0" />
            <div>
              <span className="text-muted-foreground">Recommended: </span>
              <span className="font-semibold text-foreground">{destination.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Star size={14} className="fill-amber-400 text-amber-400 shrink-0" />
            <div>
              <span className="font-semibold text-foreground">{destination.rating}</span>
              <span className="text-muted-foreground"> ({destination.reviewCount.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="btn-primary w-full justify-center py-3 font-bold">
          <Plane size={15} />
          Start Planning Trip
          <ArrowRight size={14} />
        </button>

        <Link
          href="/"
          className="btn-secondary w-full justify-center text-sm"
        >
          Explore Other Destinations
        </Link>
      </div>

      {/* Best Time to Visit — Weather Calendar */}
      <div className="card-base p-5">
        <div className="flex items-center gap-2 mb-4">
          <Thermometer size={16} className="text-primary" />
          <h4 className="text-sm font-bold text-foreground">Best Time to Visit</h4>
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {WEATHER_MONTHS.map(m => (
            <div key={m.id} className="flex flex-col items-center gap-1">
              <div
                className={`w-full h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold ${scoreColor(m.score)}`}
                title={`${m.month}: ${m.temp}°C, ${m.rain} rainfall`}
              >
                {m.temp}°
              </div>
              <span className="text-[10px] text-muted-foreground">{m.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" /> Best</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-sky-400 inline-block" /> Good</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-300 inline-block" /> Fair</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-rose-300 inline-block" /> Avoid</span>
        </div>
      </div>

      {/* Quick Facts */}
      <div className="card-base p-5">
        <h4 className="text-sm font-bold text-foreground mb-3">Quick Facts</h4>
        <div className="space-y-2">
          {QUICK_FACTS.map(fact => (
            <div key={fact.id} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{fact.label}</span>
              <span className="font-medium text-foreground">{fact.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Traveler Checklist */}
      <div className="card-base p-5">
        <h4 className="text-sm font-bold text-foreground mb-3">Before You Go</h4>
        <div className="space-y-2">
          {[
            { id: 'check-passport', text: 'Valid passport (6+ months)', done: true },
            { id: 'check-insurance', text: 'Travel insurance', done: false },
            { id: 'check-flights', text: 'Book flights 6–8 weeks early', done: false },
            { id: 'check-accommodation', text: 'Reserve ryokan in advance', done: false },
            { id: 'check-ic', text: 'Get IC Card (Suica/Pasmo)', done: false },
            { id: 'check-esim', text: 'Purchase Japan eSIM', done: false },
          ].map(item => (
            <div key={item.id} className="flex items-center gap-2.5 text-sm">
              {item.done ? (
                <CheckCircle size={15} className="text-accent shrink-0" />
              ) : (
                <div className="w-[15px] h-[15px] rounded-full border-2 border-border shrink-0" />
              )}
              <span className={item.done ? 'text-muted-foreground line-through' : 'text-foreground'}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety notice */}
      <div className="card-base p-4 bg-emerald-50 border-emerald-200 flex gap-3">
        <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-bold text-emerald-800">Safe Destination</div>
          <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
            Japan consistently ranks among the world's safest countries for tourists. Low crime, excellent public transit, and world-class healthcare infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}