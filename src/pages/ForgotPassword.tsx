import React, { useState } from 'react';
import { ArrowLeft, Key, Send, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendReset = async () => {
    if (!email.trim()) {
      setEmailError(true);
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError(true);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowConfirmation(true);
    }, 2000);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(false);
    }
  };

  return (
    <div className="cosmic-gradient min-h-screen">
      <div className="h-12"></div>

      <header className="px-6 py-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/80 glass-effect border border-violet-200 flex items-center justify-center shadow-sm p-0"
        >
          <ArrowLeft className="h-4 w-4 text-violet-600" />
        </Button>
        <h1 className="text-lg font-semibold text-violet-800">Forgot Password</h1>
        <div className="w-10"></div>
      </header>

      <main className="px-6 py-8">
        <section className="mb-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-violet-100 flex items-center justify-center">
              <Key className="text-violet-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-violet-800 mb-3">Reset your password</h2>
            <p className="text-violet-600 text-sm leading-relaxed px-4">
              Enter the email you used to sign up. We'll send you a link to reset your password.
            </p>
          </div>
        </section>

        {!showConfirmation ? (
          <>
            <section className="mb-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-violet-700 mb-2">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-4 bg-white/80 glass-effect border rounded-2xl text-violet-800 placeholder-violet-400 focus:ring-violet-400 focus:border-transparent shadow-sm ${
                      emailError ? 'border-red-400' : 'border-violet-200'
                    }`}
                  />
                </div>

                <Button
                  onClick={handleSendReset}
                  disabled={isLoading}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-violet transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Reset Link
                    </>
                  )}
                </Button>
              </div>
            </section>

            <section className="text-center">
              <p className="text-violet-600 text-sm">
                Remembered your password?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-violet-700 font-semibold hover:text-violet-800 transition-colors ml-1"
                >
                  Log In
                </button>
              </p>
            </section>
          </>
        ) : (
          <section className="mb-8">
            <div className="bg-white/70 glass-effect rounded-2xl p-6 shadow-lg border border-violet-100 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Mail className="text-green-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-violet-800 mb-2">Check your inbox</h3>
              <p className="text-violet-600 text-sm leading-relaxed">
                We've sent a password reset link to your email address.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="px-6 py-8 text-center">
        <div className="space-y-4">
          <div className="flex flex-col space-y-3">
            <button className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors">
              Privacy Policy
            </button>
            <button className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors">
              Terms of Use
            </button>
            <button className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors">
              Contact
            </button>
          </div>
          
          <div className="pt-4 border-t border-violet-200">
            <select className="bg-white/80 glass-effect border border-violet-200 text-violet-700 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
          </div>
        </div>
      </footer>

      <div className="h-8"></div>
    </div>
  );
};

export default ForgotPassword;
