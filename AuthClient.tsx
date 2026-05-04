'use client';

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AuthLeftPanel from './AuthLeftPanel';

export default function AuthClient() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[60%]">
        <AuthLeftPanel />
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12 xl:px-16 bg-white">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-sky flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <span className="text-2xl font-extrabold text-foreground tracking-tight">WanderWise</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              {mode === 'login' ? 'Welcome back, explorer' : 'Start your journey'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ?'Sign in to access your saved trips and personalized recommendations.' :'Create your account and discover destinations tailored to your travel style.'}
            </p>
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-xl bg-muted p-1 gap-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === 'login' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === 'signup' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <div className="animate-fade-in">
            {mode === 'login' ? (
              <LoginForm onSwitchToSignup={() => setMode('signup')} />
            ) : (
              <SignupForm onSwitchToLogin={() => setMode('login')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}