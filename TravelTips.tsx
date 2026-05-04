import React from 'react';
import { Lightbulb, Shield, CreditCard, Smartphone, AlertTriangle, CheckCircle } from 'lucide-react';

const tips = [
  {
    id: 'tip-booking',
    icon: CreditCard,
    color: 'text-sky-600 bg-sky-50',
    title: 'Book flights 6–8 weeks early',
    body: 'For international flights, the sweet spot for lowest fares is typically 6–8 weeks before departure. Use fare alerts to track price drops.',
  },
  {
    id: 'tip-insurance',
    icon: Shield,
    color: 'text-emerald-600 bg-emerald-50',
    title: 'Always get travel insurance',
    body: 'Medical evacuation from remote destinations can cost $50,000+. A comprehensive travel insurance policy typically costs $50–150 for a 2-week trip.',
  },
  {
    id: 'tip-esim',
    icon: Smartphone,
    color: 'text-purple-600 bg-purple-50',
    title: 'Use an eSIM for data abroad',
    body: 'International eSIMs (Airalo, Holafly) cost $5–15 for 1GB of regional data — far cheaper than roaming fees or airport SIM cards.',
  },
  {
    id: 'tip-currency',
    icon: CreditCard,
    color: 'text-amber-600 bg-amber-50',
    title: 'Withdraw cash at bank ATMs',
    body: 'Use a no-foreign-fee debit card (Wise, Charles Schwab) and withdraw at bank ATMs only. Airport currency exchange desks charge up to 15% markup.',
  },
  {
    id: 'tip-shoulder',
    icon: CheckCircle,
    color: 'text-teal-600 bg-teal-50',
    title: 'Travel in shoulder season',
    body: 'Visiting 3–4 weeks before or after peak season saves 20–40% on accommodation and flights, with 60% fewer crowds at major attractions.',
  },
  {
    id: 'tip-scams',
    icon: AlertTriangle,
    color: 'text-rose-600 bg-rose-50',
    title: 'Research common local scams',
    body: 'Before each destination, spend 10 minutes reading about common tourist scams. Taxi overcharging, fake tour operators, and "broken" meters are universal.',
  },
];

export default function TravelTips() {
  return (
    <div className="card-base p-6">
      <div className="flex items-center gap-2 mb-5">
        <Lightbulb size={18} className="text-amber-500" />
        <h3 className="text-base font-bold text-foreground">Smart Travel Tips</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips?.map(tip => (
          <div key={tip?.id} className="flex gap-3 p-4 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors duration-150">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tip?.color}`}>
              <tip.icon size={16} />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground mb-0.5">{tip?.title}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{tip?.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}