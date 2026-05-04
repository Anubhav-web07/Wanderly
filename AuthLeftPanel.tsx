import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { Star, MapPin, Zap, Shield, Globe } from 'lucide-react';

const features = [
{
  id: 'feat-ai',
  icon: Zap,
  title: 'AI-Matched Destinations',
  desc: 'Our engine combines budget, region, and activity data to surface trips you\'ll actually love.'
},
{
  id: 'feat-itinerary',
  icon: MapPin,
  title: 'Day-by-Day Itineraries',
  desc: 'Every destination comes with a complete plan — activities, timings, and cost breakdowns.'
},
{
  id: 'feat-budget',
  icon: Shield,
  title: 'Real Budget Transparency',
  desc: 'No hidden surprises. See accommodation, food, transport, and activity costs before you book.'
},
{
  id: 'feat-global',
  icon: Globe,
  title: '340+ Destinations Worldwide',
  desc: 'From budget backpacking in Southeast Asia to luxury escapes in the Maldives.'
}];


const testimonials = [
{
  id: 'test-1',
  name: 'Priya Nair',
  location: 'Mumbai → Kyoto',
  text: 'Found Kyoto in under 2 minutes after setting my budget and "culture + food" preferences. The itinerary was spot-on.',
  rating: 5,
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_11ca0f56f-1763296594616.png",
  avatarAlt: 'Young Indian woman with dark hair smiling in professional headshot'
},
{
  id: 'test-2',
  name: 'Marcus Osei',
  location: 'London → Patagonia',
  text: 'The expense breakdown saved me from a nasty budget shock. I knew exactly what to expect before booking flights.',
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1728957567504-e12877206d5b",
  avatarAlt: 'Young Black man with short hair smiling in casual outdoor setting'
}];


export default function AuthLeftPanel() {
  return (
    <div className="relative w-full flex flex-col overflow-hidden bg-gradient-sky">
      {/* Background image */}
      <div className="absolute inset-0">
        <AppImage
          src="https://images.unsplash.com/photo-1607870228419-5a4b34a6adfb"
          alt="Aerial view of turquoise ocean with tropical islands and lush green coastline in golden afternoon light"
          fill
          priority
          className="object-cover opacity-30"
          sizes="55vw" />
        
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/80 via-sky-500/70 to-emerald-600/60" />
      </div>
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-10 xl:p-14 justify-between">
        {/* Top */}
        <div>
          <div className="flex items-center gap-2.5 mb-12">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Globe size={18} className="text-white" />
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">WanderWise</span>
          </div>

          <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight text-balance">
            Your next adventure<br />
            <span className="text-sky-200">starts here.</span>
          </h2>
          <p className="text-white/80 mt-4 text-base leading-relaxed max-w-md">
            Join 2.1 million travelers who discovered their perfect destination using WanderWise's AI-powered recommendation engine.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 my-8">
          {features?.map((feat) =>
          <div key={feat?.id} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <feat.icon size={15} className="text-white" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{feat?.title}</div>
                <div className="text-white/70 text-xs mt-0.5 leading-relaxed">{feat?.desc}</div>
              </div>
            </div>
          )}
        </div>

        {/* Testimonials */}
        <div className="space-y-3">
          {testimonials?.map((t) =>
          <div key={t?.id} className="flex gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <AppImage
              src={t?.avatar}
              alt={t?.avatarAlt}
              width={40}
              height={40}
              className="rounded-full object-cover shrink-0 w-10 h-10" />
            
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-xs">{t?.name}</span>
                  <span className="text-white/50 text-xs">·</span>
                  <span className="text-white/60 text-xs flex items-center gap-1">
                    <MapPin size={10} />
                    {t?.location}
                  </span>
                </div>
                <p className="text-white/80 text-xs leading-relaxed line-clamp-2">{t?.text}</p>
                <div className="flex gap-0.5 mt-1.5">
                  {Array.from({ length: t?.rating })?.map((_, i) =>
                <Star key={`star-${t?.id}-${i + 1}`} size={11} className="fill-amber-300 text-amber-300" />
                )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}