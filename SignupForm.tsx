'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const TRAVEL_STYLES = [
  { id: 'ts-beach', label: 'Beach & Coastal', emoji: '🏖️' },
  { id: 'ts-mountains', label: 'Mountains & Trekking', emoji: '⛰️' },
  { id: 'ts-city', label: 'City Breaks', emoji: '🏙️' },
  { id: 'ts-adventure', label: 'Adventure Sports', emoji: '🪂' },
  { id: 'ts-cultural', label: 'History & Culture', emoji: '🏛️' },
  { id: 'ts-luxury', label: 'Luxury & Spa', emoji: '✨' },
  { id: 'ts-food', label: 'Food & Culinary', emoji: '🍜' },
  { id: 'ts-wildlife', label: 'Wildlife & Nature', emoji: '🦁' },
  { id: 'ts-backpacking', label: 'Budget Backpacking', emoji: '🎒' },
  { id: 'ts-nightlife', label: 'Nightlife & Music', emoji: '🎶' },
];

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '', agreeTerms: false },
  });

  const password = watch('password');

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleNextStep = async () => {
    const valid = await trigger(['fullName', 'email', 'password', 'confirmPassword', 'agreeTerms']);
    if (valid) setStep(2);
  };

  // BACKEND: POST /api/auth/signup { fullName, email, password, travelStyles: selectedStyles }
  const onSubmit = async (data: SignupFormData) => {
    if (selectedStyles.length === 0) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setSuccess(true);
    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="text-center py-10 space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Account created!</h3>
        <p className="text-sm text-muted-foreground">
          Welcome to WanderWise. Your personalized recommendations are ready.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          Discover Your Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-2">
        <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-200 ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
          1
        </div>
        <div className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
        <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-200 ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
          2
        </div>
        <div className="text-xs text-muted-foreground ml-1">
          {step === 1 ? 'Your details' : 'Travel style'}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          {/* Social auth */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-white text-sm font-medium text-foreground hover:bg-muted/50 transition-all duration-150 active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-white text-sm font-medium text-foreground hover:bg-muted/50 transition-all duration-150 active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.701z" />
              </svg>
              Apple
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or sign up with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Full name */}
          <div className="space-y-1.5">
            <label htmlFor="signup-name" className="text-sm font-semibold text-foreground">
              Full Name
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                className={`input-base pl-10 ${errors.fullName ? 'border-rose-400' : ''}`}
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle size={11} />
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="signup-email" className="text-sm font-semibold text-foreground">
              Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                className={`input-base pl-10 ${errors.email ? 'border-rose-400' : ''}`}
                {...register('email', {
                  required: 'Email address is required',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle size={11} />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label htmlFor="signup-password" className="text-sm font-semibold text-foreground">
              Password
            </label>
            <p className="text-xs text-muted-foreground">Minimum 8 characters with at least one number.</p>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Create a strong password"
                className={`input-base pl-10 pr-11 ${errors.password ? 'border-rose-400' : ''}`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  pattern: { value: /(?=.*[0-9])/, message: 'Password must include at least one number' },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle size={11} />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label htmlFor="signup-confirm" className="text-sm font-semibold text-foreground">
              Confirm Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                id="signup-confirm"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Repeat your password"
                className={`input-base pl-10 pr-11 ${errors.confirmPassword ? 'border-rose-400' : ''}`}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match',
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle size={11} />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-2.5">
              <input
                id="agree-terms"
                type="checkbox"
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer mt-0.5"
                {...register('agreeTerms', { required: 'You must agree to the terms to continue' })}
              />
              <label htmlFor="agree-terms" className="text-sm text-muted-foreground cursor-pointer select-none leading-relaxed">
                I agree to WanderWise's{' '}
                <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle size={11} />
                {errors.agreeTerms.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleNextStep}
            className="btn-primary w-full py-3 font-bold justify-center"
          >
            Continue to Travel Style
            <ArrowRight size={15} />
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary font-semibold hover:text-sky-600 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
          <div>
            <h3 className="text-base font-bold text-foreground">What's your travel style?</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Select all that apply — we'll use this to personalize your destination recommendations.
              <span className="text-rose-500 ml-1">*</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {TRAVEL_STYLES.map(style => (
              <button
                key={style.id}
                type="button"
                onClick={() => toggleStyle(style.id)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border-2 text-left transition-all duration-150 ${
                  selectedStyles.includes(style.id)
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <span className="text-xl">{style.emoji}</span>
                <span className="text-xs font-semibold leading-tight">{style.label}</span>
                {selectedStyles.includes(style.id) && (
                  <CheckCircle size={14} className="text-primary ml-auto shrink-0" />
                )}
              </button>
            ))}
          </div>

          {selectedStyles.length === 0 && (
            <p className="text-xs text-amber-600 flex items-center gap-1">
              <AlertCircle size={11} />
              Select at least one travel style to continue
            </p>
          )}

          {selectedStyles.length > 0 && (
            <div className="text-xs text-emerald-600 flex items-center gap-1">
              <CheckCircle size={11} />
              {selectedStyles.length} style{selectedStyles.length > 1 ? 's' : ''} selected — great choices!
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-ghost border border-border flex-1 justify-center py-3"
            >
              <ArrowLeft size={14} />
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading || selectedStyles.length === 0}
              className="btn-primary flex-[2] py-3 font-bold justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create My Account
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}