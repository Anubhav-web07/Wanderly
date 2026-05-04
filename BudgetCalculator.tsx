'use client';

import React, { useState } from 'react';
import { Calculator, Users, Clock, Info } from 'lucide-react';

interface CostItem {
  id: string;
  category: string;
  dailyCost: number;
  emoji: string;
}

const DEFAULT_COSTS: CostItem[] = [
  { id: 'calc-accommodation', category: 'Accommodation', dailyCost: 120, emoji: '🏨' },
  { id: 'calc-food', category: 'Food & Dining', dailyCost: 60, emoji: '🍽️' },
  { id: 'calc-transport', category: 'Local Transport', dailyCost: 25, emoji: '🚌' },
  { id: 'calc-activities', category: 'Activities & Tours', dailyCost: 80, emoji: '🎯' },
  { id: 'calc-shopping', category: 'Shopping & Souvenirs', dailyCost: 40, emoji: '🛍️' },
  { id: 'calc-misc', category: 'Miscellaneous', dailyCost: 20, emoji: '💡' },
];

export default function BudgetCalculator() {
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [costs, setCosts] = useState<CostItem[]>(DEFAULT_COSTS);
  const [isOpen, setIsOpen] = useState(false);

  const totalPerDay = costs.reduce((sum, c) => sum + c.dailyCost, 0);
  const totalPerPerson = totalPerDay * days;
  const totalGroup = totalPerPerson * travelers;

  const updateCost = (id: string, value: number) => {
    setCosts(prev => prev.map(c => c.id === id ? { ...c, dailyCost: Math.max(0, value) } : c));
  };

  return (
    <div className="card-base overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calculator size={18} className="text-primary" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-foreground">Budget Calculator</div>
            <div className="text-xs text-muted-foreground">Estimate your trip cost before you go</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-primary font-tabular">
            ${totalGroup.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground">total</span>
          <svg
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-4 border-t border-border animate-slide-up">
          {/* Controls */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Clock size={12} />
                Duration (days)
              </label>
              <input
                type="number"
                min="1"
                max="90"
                value={days}
                onChange={e => setDays(Number(e.target.value))}
                className="input-base text-sm font-tabular"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Users size={12} />
                Travelers
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={travelers}
                onChange={e => setTravelers(Number(e.target.value))}
                className="input-base text-sm font-tabular"
              />
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Daily Cost per Person</div>
            {costs.map(cost => (
              <div key={cost.id} className="flex items-center gap-3">
                <span className="text-base w-6 shrink-0">{cost.emoji}</span>
                <span className="text-sm text-foreground flex-1 font-medium">{cost.category}</span>
                <div className="relative w-28">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    value={cost.dailyCost}
                    onChange={e => updateCost(cost.id, Number(e.target.value))}
                    className="input-base text-sm pl-6 py-1.5 text-right font-tabular"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-primary/5 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Daily total (per person)</span>
              <span className="font-semibold font-tabular">${totalPerDay.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{days} days per person</span>
              <span className="font-semibold font-tabular">${totalPerPerson.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base border-t border-border pt-2 mt-2">
              <span className="font-bold text-foreground">Total for {travelers} traveler{travelers > 1 ? 's' : ''}</span>
              <span className="font-bold text-primary font-tabular text-lg">${totalGroup.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground flex items-start gap-1.5">
            <Info size={12} className="shrink-0 mt-0.5" />
            Estimates vary by destination. Flight costs not included. Adjust values to match your destination's cost of living.
          </p>
        </div>
      )}
    </div>
  );
}