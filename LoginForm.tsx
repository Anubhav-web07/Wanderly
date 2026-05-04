'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

// Demo credentials
const DEMO_CREDENTIALS = { email: 'alex.chen@wanderwise.app', password: 'Explore2026!' };

export default function LoginForm({ onSwitchToSignup }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  // BACKEND: POST /api/auth/login { email, password }
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError('');
    await new Promise(r => setTimeout(r, 1200));

    if (data.email === DEMO_CREDENTIALS.email && data.password === DEMO_CREDENTIALS.password) {
      setSuccess(true);
    } else {
      setAuthError('Invalid credentials — use the demo accounts below to sign in.');
    }
    setIsLoading(false);
  };

  const fillDemo = () => {
    setValue('email', DEMO_CREDENTIALS.email);
    setValue('password', DEMO_CREDENTIALS.password);
  };

  if (success) {
    return (
      <div className="text-center py-10 space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Welcome back!</h3>
        <p className="text-sm text-muted-foreground">Redirecting you to your personalized dashboard...</p>
        <Link href="/" className="btn-primary inline-flex">
          Go to Trip Discovery
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
        <span className="text-xs text-muted-foreground">or continue with email</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Auth error */}
      {authError && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-sm text-rose-700">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          {authError}
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="login-email" className="text-sm font-semibold text-foreground">
          Email Address
        </label>
        <div className="relative">
          <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            className={`input-base pl-10 ${errors.email ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-200' : ''}`}
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
        <div className="flex items-center justify-between">
          <label htmlFor="login-password" className="text-sm font-semibold text-foreground">
            Password
          </label>
          <button type="button" className="text-xs text-primary hover:text-sky-600 font-medium transition-colors">
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            className={`input-base pl-10 pr-11 ${errors.password ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-200' : ''}`}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
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

      {/* Remember me */}
      <div className="flex items-center gap-2.5">
        <input
          id="remember-me"
          type="checkbox"
          className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
          {...register('rememberMe')}
        />
        <label htmlFor="remember-me" className="text-sm text-muted-foreground cursor-pointer select-none">
          Remember me for 30 days
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full py-3 font-bold justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Signing in...
          </>
        ) : (
          'Sign In to WanderWise'
        )}
      </button>

      {/* Demo credentials box */}
      <div className="p-4 rounded-xl border border-dashed border-primary/40 bg-primary/5 space-y-2.5">
        <div className="text-xs font-semibold text-primary flex items-center gap-1.5">
          <Zap size={12} />
          Demo Account — click to autofill
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">Email</div>
            <div className="text-xs font-medium text-foreground truncate">{DEMO_CREDENTIALS.email}</div>
          </div>
          <div className="min-w-0">
            <div className="text-xs text-muted-foreground">Password</div>
            <div className="text-xs font-medium text-foreground">{DEMO_CREDENTIALS.password}</div>
          </div>
          <button
            type="button"
            onClick={fillDemo}
            className="btn-secondary text-xs px-3 py-1.5 shrink-0"
          >
            Use
          </button>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-primary font-semibold hover:text-sky-600 transition-colors"
        >
          Create one free
        </button>
      </p>
    </form>
  );
}

function Zap({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}