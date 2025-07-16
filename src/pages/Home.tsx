import { useState, useEffect } from "react";
import { Home as HomeIcon, Settings, Info, ChevronLeft, ChevronRight, Sparkles, Menu, Star, X, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAIHoroscope } from "@/hooks/useAIHoroscope";

const Home = () => {
  const navigate = useNavigate();
  const { profile, loading } = useUserProfile();
  const [activeStyle, setActiveStyle] = useState("Poetic");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cosmicTipDate, setCosmicTipDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use user's style preference when profile loads
  const userStylePreference = profile?.style_preference;
  const effectiveStyle = userStylePreference ? 
    (userStylePreference === 'daily-tip' ? 'Daily Tip' : 
     userStylePreference.charAt(0).toUpperCase() + userStylePreference.slice(1)) : 
    activeStyle;

  // Use user's zodiac sign or default to leo
  const userZodiacSign = profile?.zodiac_sign || 'leo';
  const zodiacDisplayName = userZodiacSign.charAt(0).toUpperCase() + userZodiacSign.slice(1);
  
  console.log('Current user zodiac sign:', userZodiacSign);
  console.log('Profile data in Home:', profile);

  // Generate AI horoscope
  const { content: aiContent, loading: aiLoading, regenerate } = useAIHoroscope(
    userZodiacSign, 
    userStylePreference || activeStyle.toLowerCase(), 
    currentDate,
    profile?.full_name || 'Dear Friend'
  );
  
  // Zodiac sign emojis
  const zodiacEmojis = {
    aries: '♈',
    taurus: '♉', 
    gemini: '♊',
    cancer: '♋',
    leo: '♌',
    virgo: '♍',
    libra: '♎',
    scorpio: '♏',
    sagittarius: '♐',
    capricorn: '♑',
    aquarius: '♒',
    pisces: '♓'
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCosmicTip = (date: Date) => {
    const tips = [
      "Mercury's alignment suggests this is the perfect time to have that important conversation you've been putting off.",
      "Venus in your sector encourages you to express your creative side today. Start that artistic project you've been dreaming about.",
      "Mars energy is strong today - channel it into physical activities or tackling challenging tasks with determination.",
      "Jupiter's influence brings expansion opportunities. Say yes to new experiences and broaden your horizons.",
      "Saturn reminds you to focus on long-term goals. Take a practical step toward your biggest dream today."
    ];
    return tips[date.getDate() % tips.length];
  };

  const handleStyleSwitch = (style: string) => {
    setActiveStyle(style);
    console.log(`Switched to ${style} style`);
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(currentDate.getDate() - 1);
    setCurrentDate(previousDay);
    console.log(`Showing horoscope for ${formatDate(previousDay)}`);
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    const today = new Date();
    if (nextDay <= today) {
      setCurrentDate(nextDay);
      console.log(`Showing horoscope for ${formatDate(nextDay)}`);
    } else {
      console.log("Cannot show future horoscopes");
    }
  };

  const handleCosmicTipPrevious = () => {
    const previousDay = new Date(cosmicTipDate);
    previousDay.setDate(cosmicTipDate.getDate() - 1);
    setCosmicTipDate(previousDay);
    console.log(`Showing cosmic tip for ${formatDate(previousDay)}`);
  };

  const handleCosmicTipNext = () => {
    const nextDay = new Date(cosmicTipDate);
    nextDay.setDate(cosmicTipDate.getDate() + 1);
    const today = new Date();
    if (nextDay <= today) {
      setCosmicTipDate(nextDay);
      console.log(`Showing cosmic tip for ${formatDate(nextDay)}`);
    } else {
      console.log("Cannot show future cosmic tips");
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(true);
    console.log("Menu opened");
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    console.log("Menu closed");
  };

  const handleNavigateToSettings = () => {
    setIsMenuOpen(false);
    navigate('/settings');
  };

  const handleNavigateToAbout = () => {
    setIsMenuOpen(false);
    navigate('/about');
  };

  const handleGenerateNewHoroscope = () => {
    console.log("Generating new horoscope...");
    regenerate();
  };

  const isNextDayDisabled = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    return nextDay > new Date();
  };

  const isCosmicTipNextDisabled = () => {
    const nextDay = new Date(cosmicTipDate);
    nextDay.setDate(cosmicTipDate.getDate() + 1);
    return nextDay > new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen cosmic-gradient flex items-center justify-center">
        <div className="text-violet-800">Loading your horoscope...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-gradient">
      {/* Status bar buffer */}
      <div className="h-12"></div>

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-violet-800 tracking-wide">Cosmia</h1>
          <Star className="w-4 h-4 text-violet-500" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-violet-600 font-medium">{formatShortDate(currentDate)}</span>
          <button 
            onClick={handleMenuClick}
            className="p-2 text-violet-600 hover:text-violet-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Menu Modal */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="bg-white border-violet-200 shadow-lg max-w-sm mx-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl font-bold text-violet-800 text-center">Menu</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-3">
            <Button
              onClick={handleNavigateToSettings}
              variant="ghost"
              className="w-full bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-xl p-4 h-auto flex items-center justify-start transition-all duration-300 shadow-sm"
            >
              <Settings className="h-5 w-5 text-violet-600 mr-4" />
              <span className="text-violet-800 font-medium">Settings</span>
            </Button>

            <Button
              onClick={handleNavigateToAbout}
              variant="ghost"
              className="w-full bg-violet-50 hover:bg-violet-100 border border-violet-200 rounded-xl p-4 h-auto flex items-center justify-start transition-all duration-300 shadow-sm"
            >
              <Info className="h-5 w-5 text-violet-600 mr-4" />
              <span className="text-violet-800 font-medium">About Us</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <main className="px-6 pb-24">
        {/* Date Section */}
        <section className="mb-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-violet-800 mb-1">
              {currentDate.toDateString() === new Date().toDateString() ? "Today's Horoscope" : "Horoscope"}
            </h2>
            <p className="text-sm text-violet-600">{formatDate(currentDate)}</p>
          </div>
        </section>

        {/* Horoscope Content */}
        <section className="mb-8">
          <div className="bg-white/80 glass-effect rounded-3xl p-6 shadow-violet border border-violet-100">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-full p-4 shadow-lg">
                <div className="text-white text-2xl">{zodiacEmojis[userZodiacSign as keyof typeof zodiacEmojis] || '🔥'}</div>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-violet-800 mb-2">{zodiacDisplayName} {zodiacEmojis[userZodiacSign as keyof typeof zodiacEmojis]}</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mx-auto"></div>
            </div>
            
            {aiLoading ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center text-violet-600">
                  <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                  <span>Consulting the stars...</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <blockquote className={`text-gray-700 leading-relaxed text-center ${
                  effectiveStyle === "Poetic" ? "italic" : "font-medium"
                }`}>
                  "{aiContent?.quote || "The stars are preparing your personalized message..."}"
                </blockquote>
                
                <div className="bg-violet-50 rounded-2xl p-4 border border-violet-200">
                  <p className="text-sm text-violet-700 leading-relaxed">
                    {aiContent?.description || "Your cosmic guidance is being channeled..."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Style Switcher - Only show if user hasn't set a preference */}
        {!userStylePreference && (
          <section className="mb-8">
            <div className="text-center mb-4">
              <p className="text-sm text-violet-600 font-medium">Choose your vibe</p>
            </div>
            
            <div className="bg-white/60 glass-effect rounded-2xl p-2 shadow-lg border border-violet-100">
              <div className="flex space-x-1">
                {["Poetic", "Classic", "Daily Tip"].map((style) => (
                  <button
                    key={style}
                    onClick={() => handleStyleSwitch(style)}
                    className={`flex-1 font-medium py-3 px-4 rounded-xl text-sm transition-all duration-300 ${
                      activeStyle === style
                        ? "bg-violet-600 text-white"
                        : "text-violet-600 hover:bg-violet-100"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Show current style if user has set a preference */}
        {userStylePreference && (
          <section className="mb-8">
            <div className="text-center">
              <div className="bg-violet-100 rounded-2xl p-3 inline-block">
                <p className="text-sm text-violet-700 font-medium">Your preferred style: {effectiveStyle}</p>
                <p className="text-xs text-violet-600 mt-1">Change this in Settings</p>
              </div>
            </div>
          </section>
        )}

        {/* Cosmic Tip */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-5 shadow-violet">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-white mr-2" />
                <h4 className="text-white font-semibold">Cosmic Tip</h4>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCosmicTipPrevious}
                  className="p-1 text-white/80 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCosmicTipNext}
                  disabled={isCosmicTipNextDisabled()}
                  className={`p-1 transition-colors ${
                    isCosmicTipNextDisabled() 
                      ? "text-white/40 cursor-not-allowed" 
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-2">
              {getCosmicTip(cosmicTipDate)}
            </p>
            <p className="text-white/70 text-xs">
              {formatDate(cosmicTipDate)}
            </p>
          </div>
        </section>

        {/* Navigation Controls */}
        <section className="mb-8">
          <div className="flex items-center justify-between">
            <button 
              onClick={handlePreviousDay}
              className="flex items-center space-x-2 text-violet-600 font-medium py-3 px-4 rounded-xl bg-white/60 glass-effect border border-violet-200 shadow-sm transition-all duration-300 hover:bg-white/80"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Yesterday</span>
            </button>
            
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-violet-300 rounded-full"></div>
              <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
              <div className="w-2 h-2 bg-violet-300 rounded-full"></div>
            </div>
            
            <button 
              onClick={handleNextDay}
              disabled={isNextDayDisabled()}
              className={`flex items-center space-x-2 font-medium py-3 px-4 rounded-xl shadow-sm transition-all duration-300 ${
                isNextDayDisabled()
                  ? "text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed opacity-50"
                  : "text-violet-600 bg-white/60 glass-effect border border-violet-200 hover:bg-white/80"
              }`}
            >
              <span className="text-sm">Tomorrow</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Generate New Horoscope Button */}
        <section className="mb-8">
          <button
            onClick={handleGenerateNewHoroscope}
            disabled={aiLoading}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-violet transition-all duration-300 hover:from-violet-600 hover:to-purple-700 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {aiLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate New Reading</span>
              </>
            )}
          </button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 glass-effect border-t border-violet-200 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center space-y-1 text-violet-600">
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-violet-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-medium">Settings</span>
          </button>
          
          <button 
            onClick={() => navigate('/about')}
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-violet-600 transition-colors"
          >
            <Info className="w-5 h-5" />
            <span className="text-xs font-medium">About</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Home;
