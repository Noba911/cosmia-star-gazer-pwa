
import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SocialLoginButton from '@/components/SocialLoginButton';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/home');
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`
        }
      });

      if (error) {
        toast({
          title: "Google Sign In Failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Google Sign In Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  const handleAppleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/home`
        }
      });

      if (error) {
        toast({
          title: "Apple Sign In Failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Apple Sign In Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="cosmic-gradient min-h-screen">
      <div className="h-12"></div>

      <header className="px-6 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-violet-700" />
        </Button>
        <h1 className="text-xl font-semibold text-violet-800">Log In</h1>
        <div className="w-10"></div>
      </header>

      <main className="px-6 pt-8">
        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold text-violet-800 mb-2">Welcome back to Cosmia</h2>
          <p className="text-violet-600 font-medium">Log in to read your daily stars</p>
        </section>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-violet-700 mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full bg-white/80 glass-effect border-violet-200 text-violet-800 placeholder-violet-400 px-4 py-4 rounded-xl focus:ring-violet-400 focus:border-transparent transition-all shadow-sm"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-violet-700 mb-2">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full bg-white/80 glass-effect border-violet-200 text-violet-800 placeholder-violet-400 px-4 py-4 pr-12 rounded-xl focus:ring-violet-400 focus:border-transparent transition-all shadow-sm"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-violet-400 hover:text-violet-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <div className="mt-8 mb-8">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-violet transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="h-4 w-4 mr-2" />
              {isLoading ? "Signing In..." : "Log In"}
            </Button>
          </div>
        </form>

        <section className="mb-8">
          <div className="flex items-center">
            <div className="flex-1 h-px bg-violet-200"></div>
            <span className="px-4 text-sm text-violet-600 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-violet-200"></div>
          </div>
        </section>

        <section className="mb-12">
          <div className="space-y-3">
            <SocialLoginButton
              icon={<i className="fa-brands fa-google text-red-500"></i>}
              text="Continue with Google"
              variant="google"
              onClick={handleGoogleLogin}
            />
            <SocialLoginButton
              icon={<i className="fa-brands fa-apple"></i>}
              text="Continue with Apple"
              variant="apple"
              onClick={handleAppleLogin}
            />
          </div>
        </section>

        <section className="text-center">
          <p className="text-violet-600 font-medium">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-violet-700 hover:text-violet-800 font-semibold transition-colors cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </section>
      </main>

      <div className="h-16"></div>
    </div>
  );
};

export default Login;
