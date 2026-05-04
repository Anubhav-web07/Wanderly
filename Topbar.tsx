'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { Search, Heart, User, Menu, X, MapPin, Moon, Sun,  } from 'lucide-react';

const navLinks = [
  { label: 'Discover', href: '/' },
  { label: 'Destination', href: '/destination-detail' },
  { label: 'Sign In', href: '/sign-up-login' },
];

interface TopbarProps {
  darkMode?: boolean;
  onToggleDark?: () => void;
}

export default function Topbar({ darkMode = false, onToggleDark }: TopbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-10 2xl:px-16">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <AppLogo size={36} />
            <span className="font-extrabold text-xl text-foreground tracking-tight hidden sm:block">
              WanderWise
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={`nav-${link.href}`}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  pathname === link.href
                    ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="btn-ghost p-2 rounded-xl"
              aria-label="Toggle search"
            >
              <Search size={18} />
            </button>

            {/* Saved */}
            <button className="btn-ghost p-2 rounded-xl relative" aria-label="Saved destinations">
              <Heart size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Dark mode */}
            <button
              onClick={onToggleDark}
              className="btn-ghost p-2 rounded-xl"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Sign In CTA */}
            <Link
              href="/sign-up-login"
              className="hidden md:flex btn-primary text-sm px-4 py-2"
            >
              <User size={15} />
              Sign In
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden btn-ghost p-2 rounded-xl"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar Expansion */}
        {searchOpen && (
          <div className="pb-3 animate-slide-up">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations, countries, activities..."
                className="input-base pl-10 pr-4"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white animate-slide-up">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={`mobile-nav-${link.href}`}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  pathname === link.href
                    ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <MapPin size={16} />
                {link.label}
              </Link>
            ))}
            <Link
              href="/sign-up-login"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2 justify-center"
            >
              <User size={15} />
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}