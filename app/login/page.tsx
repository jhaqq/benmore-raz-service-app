'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    
    try {
      // In production, this would authenticate with API
      // await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(data) });
      
      // Mock authentication - in production, this would call the backend
      if (data.email === 'demo@servicepro.com' && data.password === 'demo123') {
        // Redirect to bookings or homepage
        router.push('/bookings');
      } else {
        setError('root', { 
          message: 'Invalid email or password. Try demo@servicepro.com / demo123' 
        });
      }
    } catch (error) {
      setError('root', { 
        message: 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-800 rounded-md flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-xl">S</span>
            </div>
            <span className="text-2xl font-medium text-gray-900">ServicePro</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Demo Credentials Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Email:</strong> demo@servicepro.com</p>
                <p><strong>Password:</strong> demo123</p>
              </div>
            </div>

            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{errors.root.message}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`
                    appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 bg-white
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${errors.email ? 'border-red-300' : 'border-gray-300'}
                  `}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`
                    appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 text-gray-900 bg-white 
                    focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
                    ${errors.password ? 'border-red-300' : 'border-gray-300'}
                  `}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`
                  w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                  transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${isValid && !isSubmitting
                    ? 'btn-primary'
                    : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}