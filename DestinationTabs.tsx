'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { MapPin, Clock, DollarSign, Star, ChevronDown, ChevronUp, Ticket, Utensils, Car, Compass, Zap,  } from 'lucide-react';
import { DESTINATION_DATA } from './DestinationDetailClient';
import ExpenseChart from './ExpenseChart';

type TabKey = 'overview' | 'itinerary' | 'expenses' | 'activities';

interface DestinationTabsProps {
  destination: typeof DESTINATION_DATA;
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'itinerary', label: 'Day-by-Day Itinerary' },
  { key: 'expenses', label: 'Expense Breakdown' },
  { key: 'activities', label: 'Activities' },
];

const activityTypeIcon: Record<string, React.ElementType> = {
  accommodation: MapPin,
  sightseeing: Compass,
  food: Utensils,
  transport: Car,
  activity: Zap,
};

const activityTypeColor: Record<string, string> = {
  accommodation: 'bg-purple-100 text-purple-700',
  sightseeing: 'bg-sky-100 text-sky-700',
  food: 'bg-amber-100 text-amber-700',
  transport: 'bg-slate-100 text-slate-600',
  activity: 'bg-emerald-100 text-emerald-700',
};

const activityDifficultyColor: Record<string, string> = {
  Easy: 'badge-green',
  Moderate: 'badge-amber',
  Challenging: 'badge-rose',
};

function OverviewTab({ destination }: { destination: typeof DESTINATION_DATA }) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="card-base p-6">
        <h3 className="text-base font-bold text-foreground mb-3">About Kyoto</h3>
        <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {destination.description}
        </div>
      </div>

      {/* Attractions grid */}
      <div>
        <h3 className="text-base font-bold text-foreground mb-4">Must-Visit Attractions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {destination.attractions.map(attr => (
            <div key={attr.id} className="card-base overflow-hidden flex gap-0 group hover:shadow-card-hover transition-all duration-200">
              <div className="relative w-28 shrink-0">
                <AppImage
                  src={attr.image}
                  alt={attr.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="112px"
                />
              </div>
              <div className="p-3.5 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-sm text-foreground leading-tight">{attr.name}</div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-foreground font-tabular">{attr.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span className="px-1.5 py-0.5 rounded-md bg-muted text-xs font-medium">{attr.type}</span>
                  <span className="flex items-center gap-0.5">
                    <Ticket size={10} />
                    {attr.entryFee}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock size={10} />
                    {attr.duration}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                  {attr.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="card-base overflow-hidden">
        <div className="bg-gradient-to-br from-sky-50 to-emerald-50 h-64 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border">
          <MapPin size={32} className="text-primary" />
          <div className="text-center">
            <div className="font-semibold text-foreground">Interactive Map</div>
            <p className="text-xs text-muted-foreground mt-1">
              Google Maps integration — see all attractions, restaurants, and hotels on the map
            </p>
            {/* BACKEND: Embed Google Maps with destination coordinates */}
          </div>
          <button className="btn-secondary text-sm">
            Open in Google Maps
          </button>
        </div>
      </div>
    </div>
  );
}

function ItineraryTab({ destination }: { destination: typeof DESTINATION_DATA }) {
  const [openDays, setOpenDays] = useState<string[]>(['day-1', 'day-2']);

  const toggleDay = (dayId: string) => {
    setOpenDays(prev =>
      prev.includes(dayId) ? prev.filter(d => d !== dayId) : [...prev, dayId]
    );
  };

  const totalCost = destination.itinerary.reduce((sum, d) => sum + d.totalCost, 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="card-base p-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {destination.itinerary.length}-day itinerary
          <span className="text-foreground font-semibold ml-1">for Kyoto</span>
        </div>
        <div className="text-sm font-bold text-foreground">
          Total: <span className="text-primary font-tabular">${totalCost.toLocaleString()}</span>
          <span className="text-muted-foreground font-normal"> / person</span>
        </div>
      </div>

      {/* Day accordions */}
      {destination.itinerary.map(day => {
        const isOpen = openDays.includes(day.id);
        return (
          <div key={day.id} className="card-base overflow-hidden">
            <button
              onClick={() => toggleDay(day.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                  D{day.day}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground text-sm">{day.title}</div>
                  <div className="text-xs text-muted-foreground">{day.items.length} activities</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-primary font-tabular">${day.totalCost}</span>
                {isOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-2.5 border-t border-border pt-3 animate-slide-up">
                {day.items.map(item => {
                  const IconComp = activityTypeIcon[item.type] || Compass;
                  return (
                    <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${activityTypeColor[item.type]}`}>
                        <IconComp size={13} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm font-medium text-foreground leading-snug">{item.activity}</div>
                          <span className="text-xs font-bold text-foreground font-tabular shrink-0">
                            {item.cost === 0 ? <span className="text-accent">Free</span> : `$${item.cost}`}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ExpensesTab({ destination }: { destination: typeof DESTINATION_DATA }) {
  return (
    <div className="space-y-5">
      {/* Chart */}
      <div className="card-base p-6">
        <h3 className="text-base font-bold text-foreground mb-4">Cost Distribution</h3>
        <ExpenseChart data={destination.expenses.breakdown} total={destination.expenses.total} />
      </div>

      {/* Itemized breakdown */}
      <div className="card-base p-6">
        <h3 className="text-base font-bold text-foreground mb-4">Detailed Breakdown (per person, {destination.duration})</h3>
        <div className="space-y-3">
          {destination.expenses.breakdown.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{item.category}</span>
                  <span className="text-sm font-bold text-foreground font-tabular">${item.amount.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-tabular w-10 text-right">{item.percentage}%</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="font-bold text-foreground">Total Estimated Cost</span>
          <span className="text-xl font-bold text-primary font-tabular">${destination.expenses.total.toLocaleString()}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Per person estimate based on {destination.duration} trip. Flights from North America add approximately $800–1,200.
        </p>
      </div>

      {/* Budget tips */}
      <div className="card-base p-5 bg-emerald-50 border-emerald-200">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign size={16} className="text-emerald-600" />
          <h4 className="text-sm font-bold text-emerald-800">Money-Saving Tips for Kyoto</h4>
        </div>
        <ul className="space-y-2 text-sm text-emerald-700">
          {[
            'Buy a 1-day or 2-day Kyoto bus pass (¥700/¥1,400) — unlimited rides on all city buses',
            'Many temples and shrines are free or under $5 — skip the pricier ones if budget is tight',
            'Eat at standing ramen shops near Kyoto Station — full bowl for $6–8',
            'Book a guesthouse in Fushimi instead of central Kyoto — 40% cheaper, 15 min by train',
            'Visit popular spots at opening time (8–9am) to avoid ¥1,000+ fast-pass queues',
          ].map((tip, i) => (
            <li key={`kyoto-tip-${i + 1}`} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ActivitiesTab({ destination }: { destination: typeof DESTINATION_DATA }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {destination.activities.map(activity => (
          <div key={activity.id} className="card-base p-4 hover:shadow-card-hover transition-all duration-200 group">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-semibold text-foreground text-sm">{activity.name}</h4>
              <span className={activityDifficultyColor[activity.difficulty] || 'badge-slate'}>
                {activity.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2.5">
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {activity.duration}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign size={11} />
                {activity.cost}
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-muted font-medium">
                {activity.category}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{activity.description}</p>
            <button className="mt-3 text-xs font-semibold text-primary hover:text-sky-600 flex items-center gap-1 transition-colors opacity-0 group-hover:opacity-100">
              Book this activity <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DestinationTabs({ destination, activeTab, onTabChange }: DestinationTabsProps) {
  return (
    <div className="space-y-5">
      {/* Tab nav */}
      <div className="flex gap-0 border-b border-border overflow-x-auto scrollbar-hide">
        {TABS.map(tab => (
          <button
            key={`tab-${tab.key}`}
            onClick={() => onTabChange(tab.key)}
            className={`px-5 py-3 text-sm whitespace-nowrap transition-all duration-150 ${
            activeTab === tab.key ? 'tab-active' : 'tab-inactive'
          }`}
        >
          {tab.label}
        </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in">
        {activeTab === 'overview' && <OverviewTab destination={destination} />}
        {activeTab === 'itinerary' && <ItineraryTab destination={destination} />}
        {activeTab === 'expenses' && <ExpensesTab destination={destination} />}
        {activeTab === 'activities' && <ActivitiesTab destination={destination} />}
      </div>
    </div>
  );
}