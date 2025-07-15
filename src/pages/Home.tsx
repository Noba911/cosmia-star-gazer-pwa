
import { useState } from "react";
import { Home as HomeIcon, Settings, Info, ChevronLeft, ChevronRight, Sparkles, Menu, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [activeStyle, setActiveStyle] = useState("Poetic");

  const handleStyleSwitch = (style: string) => {
    setActiveStyle(style);
  };

  const handlePreviousDay = () => {
    console.log("Previous day clicked");
    // Add logic to show previous day's horoscope
  };

  const handleNextDay = () => {
    console.log("Next day clicked - disabled for future dates");
    // Tomorrow button is disabled in UI
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
          <span className="text-xs text-violet-600 font-medium">Mon, July 14</span>
          <button className="p-2 text-violet-600 hover:text-violet-700 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="px-6 pb-24">
        {/* Date Section */}
        <section className="mb-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-violet-800 mb-1">Today's Horoscope</h2>
            <p className="text-sm text-violet-600">Monday, July 14, 2025</p>
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
              <blockquote className="text-gray-700 leading-relaxed text-center italic">
                "The stars align to illuminate your path today, dear Leo. Your natural charisma shines brighter than ever, drawing opportunities and meaningful connections your way. Trust in your inner fire and let your creativity flow freely."
              </blockquote>
              
              <div className="bg-violet-50 rounded-2xl p-4 border border-violet-200">
                <p className="text-sm text-violet-700 leading-relaxed">
                  Today brings a surge of creative energy that will help you tackle challenges with confidence. Focus on personal relationships and don't hesitate to express your feelings openly.
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
            <div className="flex items-center mb-3">
              <Sparkles className="w-5 h-5 text-white mr-2" />
              <h4 className="text-white font-semibold">Cosmic Tip of the Day</h4>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              Mercury's alignment suggests this is the perfect time to have that important conversation you've been putting off.
            </p>
          </div>
        </section>

        {/* Navigation Controls */}
        <section className="mb-8">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-violet-600 font-medium py-3 px-4 rounded-xl bg-white/60 glass-effect border border-violet-200 shadow-sm transition-all duration-300 hover:bg-white/80">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Yesterday</span>
            </button>
            
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-violet-300 rounded-full"></div>
              <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
              <div className="w-2 h-2 bg-violet-300 rounded-full"></div>
            </div>
            
            <button className="flex items-center space-x-2 text-gray-400 font-medium py-3 px-4 rounded-xl bg-gray-100 border border-gray-200 shadow-sm cursor-not-allowed opacity-50">
              <span className="text-sm">Tomorrow</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
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
