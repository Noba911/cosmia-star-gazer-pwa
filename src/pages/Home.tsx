
import { useState } from "react";
import { Home as HomeIcon, Settings, Info, ChevronLeft, ChevronRight, Sparkles, Menu, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [activeStyle, setActiveStyle] = useState("Poetic");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cosmicTipDate, setCosmicTipDate] = useState(new Date());

  // Horoscope content based on style
  const getHoroscopeContent = (style: string) => {
    const contents = {
      "Poetic": {
        quote: "The stars align to illuminate your path today, dear Leo. Your natural charisma shines brighter than ever, drawing opportunities and meaningful connections your way. Trust in your inner fire and let your creativity flow freely.",
        description: "Today brings a surge of creative energy that will help you tackle challenges with confidence. Focus on personal relationships and don't hesitate to express your feelings openly."
      },
      "Classic": {
        quote: "Today is a favorable day for Leo natives. Your leadership qualities will be recognized and appreciated. Financial gains are possible through creative ventures or partnerships.",
        description: "Career prospects look promising with potential for advancement. Health remains stable. Lucky numbers: 3, 7, 21. Lucky color: Golden yellow."
      },
      "Daily Tip": {
        quote: "Quick Leo tip for today: Start your morning with a 5-minute meditation to channel your fiery energy positively throughout the day.",
        description: "Focus action: Have that important conversation you've been postponing. Your natural confidence will help you express yourself clearly and persuasively."
      }
    };
    return contents[style] || contents["Poetic"];
  };

  // Cosmic tip content based on date
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
    console.log("Menu clicked");
    // Could open a dropdown menu or navigation drawer
  };

  const handleGenerateNewHoroscope = () => {
    console.log("Generating new horoscope...");
    navigate('/ai-generation');
  };

  const currentContent = getHoroscopeContent(activeStyle);
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
                <div className="text-white text-2xl">🔥</div>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-violet-800 mb-2">Leo ♌</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full mx-auto"></div>
            </div>
            
            <div className="space-y-4">
              <blockquote className={`text-gray-700 leading-relaxed text-center ${
                activeStyle === "Poetic" ? "italic" : "font-medium"
              }`}>
                "{currentContent.quote}"
              </blockquote>
              
              <div className="bg-violet-50 rounded-2xl p-4 border border-violet-200">
                <p className="text-sm text-violet-700 leading-relaxed">
                  {currentContent.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Style Switcher */}
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
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-violet transition-all duration-300 hover:from-violet-600 hover:to-purple-700 flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate New Reading</span>
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
