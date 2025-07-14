
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Star, Sparkles, Moon, AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const AIGeneration = () => {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showError, setShowError] = useState(false);

  const messages = [
    "Consulting the stars...",
    "Tuning in to cosmic energies...",
    "Channeling today's message...",
    "Aligning with your zodiac sign...",
    "Reading celestial patterns..."
  ];

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate('/home');
  };

  const handleRetry = () => {
    setShowError(false);
    setProgress(0);
    setCurrentMessage(0);
  };

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15 + 5;
        if (newProgress >= 100) {
          setTimeout(() => {
            navigate('/home'); // Navigate to home or horoscope result page
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 800);

    // Simulate potential error (10% chance after 8 seconds)
    const errorTimeout = setTimeout(() => {
      if (Math.random() < 0.1) {
        setShowError(true);
      }
    }, 8000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(errorTimeout);
    };
  }, [navigate, messages.length]);

  return (
    <div className="bg-gradient-to-br from-violet-50 to-indigo-100 min-h-screen">
      <div className="h-12"></div>

      <header className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-filter backdrop-blur-20 border border-violet-200 shadow-sm hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 text-violet-600" />
          </Button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-violet-800">Preparing Your Horoscope...</h1>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-filter backdrop-blur-20 border border-violet-200 shadow-sm hover:bg-white"
          >
            <X className="w-4 h-4 text-violet-600" />
          </Button>
        </div>
      </header>

      {!showError ? (
        <main className="px-6 flex flex-col items-center justify-center h-[500px]">
          
          <section className="mb-12 text-center">
            <div className="relative w-48 h-48 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 opacity-20 animate-pulse"></div>
              
              <div className="absolute inset-4 rounded-full bg-white/20 backdrop-filter backdrop-blur-20 border border-violet-200 flex items-center justify-center">
                <div className="relative animate-spin" style={{ animationDuration: '3s' }}>
                  <Star className="w-16 h-16 text-violet-500" style={{ animation: 'float 3s ease-in-out infinite' }} />
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-5 h-5 text-violet-400 animate-pulse" />
                  </div>
                  <div className="absolute -bottom-2 -left-2">
                    <Moon className="w-4 h-4 text-violet-300" style={{ animation: 'float 3s ease-in-out infinite 0.5s' }} />
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Star className="w-3 h-3 text-violet-400 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              <div className="absolute -bottom-4 right-8">
                <Star className="w-2 h-2 text-violet-300 animate-pulse" style={{ animationDelay: '1.5s' }} />
              </div>
              <div className="absolute top-8 -left-4">
                <Star className="w-2 h-2 text-violet-400 animate-pulse" style={{ animationDelay: '2s' }} />
              </div>
            </div>
          </section>

          <section className="mb-8 text-center">
            <h2 className="text-xl font-semibold text-violet-800 mb-2">{messages[currentMessage]}</h2>
            <p className="text-sm text-violet-600">This may take a few moments</p>
          </section>

          <section className="w-full mb-8">
            <Progress value={progress} className="w-full h-2 mb-4" />
            
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </section>

          <section className="w-full">
            <div className="bg-white/70 backdrop-filter backdrop-blur-20 rounded-2xl p-6 shadow-lg border border-violet-100">
              <div className="flex items-center mb-3">
                <Sparkles className="w-4 h-4 text-violet-500 mr-2" />
                <span className="font-medium text-violet-800">Cosmic Tip Loading...</span>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-violet-100 rounded animate-pulse"></div>
                <div className="h-3 bg-violet-100 rounded animate-pulse w-3/4"></div>
                <div className="h-3 bg-violet-100 rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          </section>

        </main>
      ) : (
        <section className="px-6">
          <div className="bg-white/80 backdrop-filter backdrop-blur-20 rounded-2xl p-6 shadow-lg border border-red-200 text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Something went wrong</h3>
            <p className="text-sm text-gray-600 mb-6">We couldn't connect to the cosmic energies right now</p>
            <Button
              onClick={handleRetry}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-xl shadow-[0_10px_25px_rgba(102,126,234,0.15)]"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </section>
      )}

      <div className="h-8"></div>
    </div>
  );
};

export default AIGeneration;
