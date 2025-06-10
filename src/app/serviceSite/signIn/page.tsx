'use client';

import React, { useState } from 'react';
import { 
  Eye, EyeOff, Mail, Lock, User, Phone, Car, Calendar, CheckCircle, ArrowRight, Facebook, Chrome
} from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  favoriteTrack?: string;
  experienceLevel?: string;
  vehicleInfo?: string;
}

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    favoriteTrack: '',
    experienceLevel: '',
    vehicleInfo: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tracks = [
    'Calabogie Motorsports Park',
    'Canadian Tire Motorsport Park',
    'Shannonville Motorsports Park',
    'Mosport International Raceway',
    'Grand Bend Motorplex',
    'Other'
  ];

  const experienceLevels = [
    'Beginner (0-5 track days)',
    'Intermediate (6-20 track days)',
    'Advanced (21+ track days)',
    'Professional/Instructor'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Sign up specific validations
    if (isSignUp) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Form submitted:', formData);
      // Here you would normally handle the actual authentication
    }, 2000);
  };

  const handleSocialAuth = (provider: string) => {
    console.log(`${provider} authentication clicked`);
    // Handle social authentication
  };

  return (
    <div className="service-site min-h-screen bg-[#0b0b0b] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Join Our Crew' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400">
            {isSignUp 
              ? 'Create your account to start booking professional track day support'
              : 'Sign in to manage your bookings and crew services'
            }
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-900 rounded-lg p-8 shadow-2xl">
          {/* Tab Toggle */}
          <div className="flex gap-2 mb-8 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                !isSignUp 
                  ? 'bg-[#ff352a] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                isSignUp 
                  ? 'bg-[#ff352a] text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Social Auth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialAuth('Google')}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
            >
              <Chrome className="w-5 h-5 mr-3" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialAuth('Facebook')}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-gray-600 transition-colors"
            >
              <Facebook className="w-5 h-5 mr-3" />
              Continue with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">or</span>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Sign Up Fields */}
            {isSignUp && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={formData.firstName || ''}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.firstName ? 'border-red-500' : 'border-gray-700 focus:border-[#ff352a]'
                      }`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && <p className="text-red-500 text-xs mt-1 px-2 py-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={formData.lastName || ''}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                        errors.lastName ? 'border-red-500' : 'border-gray-700 focus:border-[#ff352a]'
                      }`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && <p className="text-red-500 text-xs mt-1 px-2 py-1">{errors.lastName}</p>}
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-700 focus:border-[#ff352a]'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 px-2 py-1">{errors.email}</p>}
            </div>

            {/* Phone (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-700 focus:border-[#ff352a]'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1 px-2 py-1">{errors.phone}</p>}
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                    errors.password ? 'border-red-500' : 'border-gray-700 focus:border-[#ff352a]'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3  p-0.5 rounded top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 px-2 py-1">{errors.password}</p>}
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword || ''}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition-colors ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-700 focus:border-[#ff352a]'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 px-2 py-1">{errors.confirmPassword}</p>}
              </div>
            )}

            {/* Additional Sign Up Fields */}
            {isSignUp && (
              <>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Favorite Track (Optional)
                  </label>
                  <select
                    value={formData.favoriteTrack || ''}
                    onChange={(e) => handleInputChange('favoriteTrack', e.target.value)}
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#ff352a] focus:outline-none"
                  >
                    <option value="">Select a track...</option>
                    {tracks.map(track => (
                      <option key={track} value={track}>{track}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Experience Level (Optional)
                  </label>
                  <select
                    value={formData.experienceLevel || ''}
                    onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#ff352a] focus:outline-none"
                  >
                    <option value="">Select your experience...</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Primary Vehicle (Optional)
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={formData.vehicleInfo || ''}
                      onChange={(e) => handleInputChange('vehicleInfo', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#ff352a] focus:outline-none"
                      placeholder="e.g. 2023 BMW M3 Competition"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Remember Me / Forgot Password */}
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#ff352a] bg-gray-800 border-gray-600 rounded focus:ring-[#ff352a] focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-300">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-[#ff352a]  px-1 rounded hover:text-[#e82e24] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Terms Agreement (Sign Up only) */}
            {isSignUp && (
              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#ff352a] bg-gray-800 border-gray-600 rounded focus:ring-[#ff352a] focus:ring-2 mt-1"
                />
                <span className="ml-2 text-sm text-gray-300">
                  I agree to the{' '}
                  <button type="button" className="text-[#ff352a]  px-1 rounded hover:text-[#e82e24] transition-colors">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-[#ff352a] px-1 rounded hover:text-[#e82e24] transition-colors">
                    Privacy Policy
                  </button>
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-[#ff352a] hover:bg-[#e82e24] disabled:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Footer Text */}
          <div className="mt-6 text-center text-sm text-gray-400">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-[#ff352a] px-1 rounded hover:text-[#e82e24] transition-colors font-medium"
                >
                  Sign in here
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-[#ff352a] hover:text-[#e82e24] px-1 rounded transition-colors font-medium"
                >
                  Sign up here
                </button>
              </>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-[#ff352a]" />
              Secure & Encrypted
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-[#ff352a]" />
              Professional Crew
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1 text-[#ff352a]" />
              24/7 Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;