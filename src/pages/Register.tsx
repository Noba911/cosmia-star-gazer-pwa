
import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import SocialLoginButton from '@/components/SocialLoginButton';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '', 
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    zodiacSign: '',
    stylePreference: '',
    agreedToTerms: false
  });

  const zodiacSigns = [
    { value: 'aries', label: 'Aries' },
    { value: 'taurus', label: 'Taurus' },
    { value: 'gemini', label: 'Gemini' },
    { value: 'cancer', label: 'Cancer' },
    { value: 'leo', label: 'Leo' },
    { value: 'virgo', label: 'Virgo' },
    { value: 'libra', label: 'Libra' },
    { value: 'scorpio', label: 'Scorpio' },
    { value: 'sagittarius', label: 'Sagittarius' },
    { value: 'capricorn', label: 'Capricorn' },
    { value: 'aquarius', label: 'Aquarius' },
    { value: 'pisces', label: 'Pisces' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration form submitted:', formData);
    // Handle registration logic here
  };

  return (
    <div className="cosmic-gradient min-h-screen">
      <div className="h-12"></div>

      <header className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-white/80 glass-effect shadow-sm hover:bg-white"
          >
            <ArrowLeft className="h-5 w-5 text-violet-700" />
          </Button>
          <h1 className="text-xl font-semibold text-violet-800">Sign Up</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="px-6">
        <section className="mb-6 text-center">
          <p className="text-violet-600 font-medium">Create your account to begin your daily cosmic journey</p>
        </section>

        <form onSubmit={handleSubmit} className="space-y-5 mb-8">
          <div>
            <Label htmlFor="fullName" className="block text-sm font-medium text-violet-800 mb-2">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="w-full bg-white/80 glass-effect border-violet-200 rounded-xl px-4 py-3 text-violet-800 placeholder-violet-400 focus:ring-violet-400 focus:border-transparent"
            />
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-violet-800 mb-2">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full bg-white/80 glass-effect border-violet-200 rounded-xl px-4 py-3 text-violet-800 placeholder-violet-400 focus:ring-violet-400 focus:border-transparent"
            />
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-violet-800 mb-2">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full bg-white/80 glass-effect border-violet-200 rounded-xl px-4 py-3 pr-12 text-violet-800 placeholder-violet-400 focus:ring-violet-400 focus:border-transparent"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-400 hover:text-violet-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-violet-800 mb-2">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full bg-white/80 glass-effect border-violet-200 rounded-xl px-4 py-3 text-violet-800 placeholder-violet-400 focus:ring-violet-400 focus:border-transparent"
            />
          </div>

          <div>
            <Label htmlFor="dateOfBirth" className="block text-sm font-medium text-violet-800 mb-2">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full bg-white/80 glass-effect border-violet-200 rounded-xl px-4 py-3 text-violet-800 focus:ring-violet-400 focus:border-transparent"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-violet-800 mb-2">
              Zodiac Sign
            </Label>
            <Select value={formData.zodiacSign} onValueChange={(value) => handleInputChange('zodiacSign', value)}>
              <SelectTrigger className="w-full bg-white/80 glass-effect border-violet-200 rounded-xl px-4 py-3 text-violet-800 focus:ring-violet-400 focus:border-transparent">
                <SelectValue placeholder="Auto-detect from date of birth" />
              </SelectTrigger>
              <SelectContent className="bg-white border-violet-200">
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign.value} value={sign.value} className="text-violet-800">
                    {sign.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-violet-800 mb-3">
              Horoscope Style Preference
            </Label>
            <div className="space-y-3">
              {[
                { value: 'poetic', label: 'Poetic' },
                { value: 'classic', label: 'Classic' },
                { value: 'daily-tip', label: 'Daily Tip' }
              ].map((style) => (
                <label key={style.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="stylePreference"
                    value={style.value}
                    checked={formData.stylePreference === style.value}
                    onChange={(e) => handleInputChange('stylePreference', e.target.value)}
                    className="text-violet-600 focus:ring-violet-400"
                  />
                  <span className="text-violet-700 font-medium">{style.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <Checkbox
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => handleInputChange('agreedToTerms', checked as boolean)}
                className="mt-1"
              />
              <span className="text-sm text-violet-700">
                I agree to the{' '}
                <span className="text-violet-600 font-medium underline cursor-pointer">Terms of Use</span>
                {' '}and{' '}
                <span className="text-violet-600 font-medium underline cursor-pointer">Privacy Policy</span>
              </span>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-violet transition-all duration-300 transform hover:scale-105"
          >
            <Star className="h-4 w-4 mr-2" />
            Create Account
          </Button>
        </form>

        <section className="mb-6">
          <div className="flex items-center">
            <div className="flex-1 h-px bg-violet-200"></div>
            <span className="px-4 text-sm text-violet-600 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-violet-200"></div>
          </div>
        </section>

        <section className="mb-6">
          <div className="space-y-3">
            <SocialLoginButton
              icon={<i className="fa-brands fa-google text-red-500"></i>}
              text="Continue with Google"
              variant="google"
            />
            <SocialLoginButton
              icon={<i className="fa-brands fa-apple"></i>}
              text="Continue with Apple"
              variant="apple"
            />
          </div>
        </section>

        <section className="text-center mb-8">
          <span className="text-violet-600">Already have an account? </span>
          <button
            onClick={() => {/* Handle navigation to login */}}
            className="text-violet-700 font-semibold underline cursor-pointer hover:text-violet-800"
          >
            Log In
          </button>
        </section>
      </main>

      <div className="h-8"></div>
    </div>
  );
};

export default Register;
