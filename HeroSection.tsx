import React from 'react';
import { MapPin, Star, Users, Globe } from 'lucide-react';

const stats = [
  { id: 'stat-destinations', value: '340+', label: 'Destinations', icon: MapPin },
  { id: 'stat-rating', value: '4.9', label: 'Avg Rating', icon: Star },
  { id: 'stat-travelers', value: '2.1M', label: 'Happy Travelers', icon: Users },
  { id: 'stat-countries', value: '87', label: 'Countries', icon: Globe },
];

export default function HeroSection() {
  return (
    <div className="relative rounded-3xl overflow-hidden mb-8 min-h-[280px] lg:min-h-[340px]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-sky" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-between h-full min-h-[280px] lg:min-h-[340px]">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold mb-4">
            <Star size={12} className="fill-amber-300 text-amber-300" />
            AI-Powered Travel Discovery
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight text-balance">
            Find Your Perfect<br />
            <span className="text-sky-200">Next Adventure</span>
          </h1>
          <p className="text-white/80 mt-3 text-base lg:text-lg max-w-xl leading-relaxed">
            Tell us your budget, interests, and travel style — we'll match you with destinations you'll love from 340+ worldwide.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-4 mt-8">
          {stats?.map(stat => (
            <div key={stat?.id} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/15 backdrop-blur-sm">
              <stat.icon size={16} className="text-white/80" />
              <span className="text-white font-bold text-base font-tabular">{stat?.value}</span>
              <span className="text-white/70 text-xs">{stat?.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}