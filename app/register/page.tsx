'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Sparkles, User, Mail, Lock, AlertCircle, Heart } from 'lucide-react';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    parentEmail: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: formData.age ? parseInt(formData.age) : undefined,
        parentEmail: formData.parentEmail || undefined,
      });
      router.push('/my-stories');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo/ks-transparent-logo.png"
              alt="ImagiKids"
              width={120}
              height={120}
              className="mx-auto"
            />
          </Link>
          <h1 className="text-4xl font-bold text-purple-600 mt-4">Join Imagi Kids!</h1>
          <p className="text-gray-600 mt-2">Create your account and start writing amazing stories</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={50}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none"
                  placeholder="At least 6 characters"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-1">Must be at least 6 characters</p>
            </div>

            {/* Age (Optional) */}
            <div>
              <label htmlFor="age" className="block text-gray-700 font-medium mb-2">
                Your Age (Optional)
              </label>
              <div className="relative">
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="5"
                  max="100"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none"
                  placeholder="How old are you?"
                />
              </div>
            </div>

            {/* Parent Email (Optional) */}
            <div>
              <label htmlFor="parentEmail" className="block text-gray-700 font-medium mb-2">
                Parent&apos;s Email (Optional)
              </label>
              <div className="relative">
                <Heart className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="parentEmail"
                  name="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:outline-none"
                  placeholder="parent@email.com"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-1">
                For kids under 13, we recommend adding a parent&apos;s email
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-purple-600 font-bold hover:text-purple-700 hover:underline"
              >
                Login here!
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-700 hover:underline font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
