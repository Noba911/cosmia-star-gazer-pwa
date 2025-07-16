import { useState, useEffect } from "react";
import { Home as HomeIcon, Settings, Info, ChevronLeft, ChevronRight, Sparkles, Menu, Star, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/useUserProfile";

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

  // Use user's zodiac sign or default to Leo - this is the key fix
  const userZodiacSign = profile?.zodiac_sign || 'leo';
  const zodiacDisplayName = userZodiacSign.charAt(0).toUpperCase() + userZodiacSign.slice(1);
  
  console.log('Current user zodiac sign:', userZodiacSign);
  console.log('Profile data in Home:', profile);
  
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

  // Horoscope content based on style and date
  const getHoroscopeContent = (style: string, date: Date, zodiacSign: string) => {
    const dayIndex = (date.getDate() + zodiacSign.length) % 7; // Use date and zodiac to vary content
    
    const poeticContent = {
      leo: [
        {
          quote: "The stars align to illuminate your path today, dear Leo. Your natural charisma shines brighter than ever, drawing opportunities and meaningful connections your way. Trust in your inner fire and let your creativity flow freely.",
          description: "Today brings a surge of creative energy that will help you tackle challenges with confidence. Focus on personal relationships and don't hesitate to express your feelings openly."
        },
        {
          quote: "Mercury dances through your sector of dreams, Leo, awakening dormant passions within your heart. The universe whispers secrets of transformation as you stand at the threshold of new beginnings.",
          description: "A powerful shift in perspective awaits you today. Listen to your intuition and embrace the changes coming your way. Your courage will be your greatest asset."
        },
        {
          quote: "Venus graces your house of abundance, dear fire sign, blessing you with magnetic charm and irresistible appeal. Your golden energy attracts prosperity in all its forms.",
          description: "Focus on collaboration and partnership today. Your natural leadership qualities will inspire others to join your vision. Romance and creativity are especially favored."
        },
        {
          quote: "The cosmic winds carry messages of wisdom to your eager spirit, Leo. Jupiter's benevolent gaze upon you opens doors that seemed forever closed.",
          description: "Expansion and growth are the themes of your day. Take calculated risks and trust in your ability to manifest your dreams into reality."
        },
        {
          quote: "Mars ignites your inner warrior, brave Leo, filling you with determination to conquer any mountain before you. Your strength knows no bounds today.",
          description: "Channel your fiery energy into productive pursuits. Physical activity and bold action will bring excellent results. Stand tall in your power."
        },
        {
          quote: "The Moon reflects your inner royalty, magnificent Leo, reminding you of the crown you were born to wear. Your time to shine has arrived.",
          description: "Recognition and appreciation come your way today. Don't shy away from the spotlight - you were meant to inspire others with your radiant presence."
        },
        {
          quote: "Saturn's wisdom guides your noble heart, teaching patience as your greatest virtue. Like a lion surveying its kingdom, you see the bigger picture clearly.",
          description: "Take time for reflection and planning today. Your natural wisdom and maturity will help you make important decisions that benefit your long-term goals."
        }
      ],
      virgo: [
        {
          quote: "Mercury, your ruling planet, bestows upon you clarity of thought and precision of action today, dear Virgo. Your analytical mind cuts through confusion like a sharp blade through silk.",
          description: "Your attention to detail serves you well today. Focus on organizing your thoughts and environment. Small improvements will lead to significant results."
        },
        {
          quote: "The earth element grounds your energy today, practical Virgo, while celestial wisdom flows through your methodical approach to life's challenges.",
          description: "Trust in your systematic approach to problem-solving. Your natural tendency to perfect and refine will bring remarkable outcomes."
        },
        {
          quote: "Venus whispers secrets of harmony to your perfectionist soul, reminding you that true beauty lies in the balance between effort and acceptance.",
          description: "Focus on health and wellness today. Your body and mind crave order and nourishment. Listen to their needs with compassion."
        },
        {
          quote: "The cosmic energies favor your meticulous nature, dear Virgo. Every detail you attend to today weaves into tomorrow's masterpiece.",
          description: "Professional matters receive favorable cosmic support. Your reliability and expertise will be recognized and appreciated."
        },
        {
          quote: "Saturn's influence strengthens your resolve and rewards your patience. Like a gardener tending to precious seeds, your careful nurturing bears fruit.",
          description: "Long-term goals come into focus. Your practical wisdom guides you toward sustainable success and meaningful achievements."
        },
        {
          quote: "The Moon reflects your inner wisdom, wise Virgo, illuminating the path between perfection and progress with gentle understanding.",
          description: "Emotional balance is key today. Don't let perfectionism overshadow your accomplishments. Celebrate your progress and growth."
        },
        {
          quote: "Jupiter expands your capacity for service and healing, generous Virgo. Your helping hand becomes a beacon of hope for others.",
          description: "Opportunities to help others present themselves. Your practical skills and caring nature make you a valuable ally and trusted friend."
        }
      ],
      cancer: [
        {
          quote: "The moon's gentle embrace surrounds you today, dear Cancer. Your intuitive powers are heightened, and emotional healing flows through your compassionate heart like a healing river.",
          description: "Trust your instincts today as they guide you toward meaningful connections. Your nurturing nature will create positive changes in both your life and the lives of others."
        },
        {
          quote: "Neptune's mystical waters wash over your soul, Cancer, cleansing away old wounds and making space for new love to bloom in your tender heart.",
          description: "A day of emotional renewal awaits. Pay attention to your dreams and inner voice - they hold important messages about your future path."
        }
      ],
      // Add content for other zodiac signs...
    };

    const classicContent = {
      leo: [
        {
          quote: "Today is a favorable day for Leo natives. Your leadership qualities will be recognized and appreciated. Financial gains are possible through creative ventures or partnerships.",
          description: "Career prospects look promising with potential for advancement. Health remains stable. Lucky numbers: 3, 7, 21. Lucky color: Golden yellow."
        },
        {
          quote: "Leo individuals will experience positive developments in personal relationships. Communication with family members brings harmony to your domestic sphere.",
          description: "Business negotiations favor you today. Avoid major investments but small purchases bring satisfaction. Lucky numbers: 1, 8, 15. Lucky color: Orange."
        },
        {
          quote: "Your natural magnetism attracts new opportunities in both professional and personal areas. Creative projects receive favorable cosmic support.",
          description: "Travel plans made today will prove beneficial. Health requires attention to diet and exercise. Lucky numbers: 5, 12, 28. Lucky color: Red."
        },
        {
          quote: "Leadership roles and positions of authority are highlighted for Leo today. Your confidence inspires trust and cooperation from others.",
          description: "Financial planning brings positive results. Romantic relationships experience growth and understanding. Lucky numbers: 2, 9, 17. Lucky color: Gold."
        },
        {
          quote: "Educational pursuits and skill development receive cosmic blessing. Leo natives will find learning comes easily and naturally today.",
          description: "Property matters and home improvements are favored. Avoid arguments and maintain diplomatic approach. Lucky numbers: 4, 11, 23. Lucky color: Yellow."
        },
        {
          quote: "Artistic and creative endeavors bring recognition and possible monetary rewards. Your talents are noticed by influential people.",
          description: "Health shows improvement if you've been dealing with minor issues. Social gatherings bring joy. Lucky numbers: 6, 14, 26. Lucky color: Amber."
        },
        {
          quote: "Professional partnerships and collaborations prove highly beneficial. Your expertise and experience are valued by colleagues and superiors.",
          description: "Legal matters resolve in your favor. Long-distance relationships receive positive cosmic energy. Lucky numbers: 10, 19, 30. Lucky color: Copper."
        }
      ],
      virgo: [
        {
          quote: "Virgo individuals experience excellent prospects in professional endeavors today. Your analytical skills and attention to detail bring recognition from superiors.",
          description: "Health matters require careful attention. Avoid stress and maintain regular routines. Lucky numbers: 6, 14, 23. Lucky color: Navy blue."
        },
        {
          quote: "Financial planning and investments favor Virgo natives. Your practical approach to money management yields positive results.",
          description: "Educational pursuits and skill development are highlighted. Communication with colleagues brings productive outcomes. Lucky numbers: 2, 11, 18. Lucky color: Green."
        },
        {
          quote: "Domestic harmony and family relationships bring satisfaction to Virgo individuals. Your organized approach resolves household matters efficiently.",
          description: "Property dealings and home improvements receive cosmic blessing. Avoid hasty decisions in personal matters. Lucky numbers: 4, 15, 27. Lucky color: Brown."
        },
        {
          quote: "Health and wellness are strongly favored for Virgo today. Your disciplined lifestyle and careful diet choices show positive results.",
          description: "Service-oriented activities bring fulfillment. Your helpful nature attracts gratitude and good karma. Lucky numbers: 7, 16, 25. Lucky color: White."
        },
        {
          quote: "Professional partnerships and collaborations prove highly beneficial for Virgo natives. Your reliability makes you a sought-after team member.",
          description: "Technical skills and expertise are in demand. Focus on precision and quality in all work-related tasks. Lucky numbers: 9, 19, 28. Lucky color: Gray."
        },
        {
          quote: "Virgo individuals find success in detailed analysis and research work. Your methodical approach uncovers important insights.",
          description: "Travel for work purposes brings positive outcomes. Maintain diplomatic relations with business associates. Lucky numbers: 1, 13, 22. Lucky color: Silver."
        },
        {
          quote: "Administrative tasks and organizational responsibilities favor Virgo today. Your efficient management style impresses decision-makers.",
          description: "Legal matters and documentation work proceed smoothly. Your careful attention prevents errors and delays. Lucky numbers: 5, 17, 29. Lucky color: Beige."
        }
      ],
      cancer: [
        {
          quote: "Cancer individuals will experience harmony in family relationships today. Your caring nature brings comfort to those around you.",
          description: "Domestic matters receive positive cosmic support. Financial stability improves. Lucky numbers: 2, 6, 16. Lucky color: Silver."
        }
      ],
      // Add content for other zodiac signs...
    };

    const dailyTipContent = {
      leo: [
        {
          quote: "Quick Leo tip for today: Start your morning with a 5-minute meditation to channel your fiery energy positively throughout the day.",
          description: "Focus action: Have that important conversation you've been postponing. Your natural confidence will help you express yourself clearly and persuasively."
        },
        {
          quote: "Leo energy boost: Wear something that makes you feel powerful today. Your outer confidence will reflect your inner strength.",
          description: "Focus action: Take the lead on a project or initiative. Your leadership skills are particularly strong right now and others will follow your guidance."
        },
        {
          quote: "Creative Leo tip: Spend 10 minutes doing something artistic - sketch, write, or create music. Your creative energy needs an outlet today.",
          description: "Focus action: Compliment someone genuinely. Your generous spirit will create positive ripples that benefit everyone around you."
        },
        {
          quote: "Leo wellness tip: Take a walk in nature or spend time in sunlight. Your fire element needs natural energy to stay balanced.",
          description: "Focus action: Organize one area of your living space. Creating order in your environment will help clarify your thoughts and goals."
        },
        {
          quote: "Social Leo tip: Reach out to a friend you haven't spoken to in a while. Your warm energy will rekindle meaningful connections.",
          description: "Focus action: Practice gratitude by writing down three things you're thankful for. This will amplify your natural optimism and attract more positivity."
        },
        {
          quote: "Confident Leo tip: Stand tall and make eye contact in all your interactions today. Your presence commands respect and attention.",
          description: "Focus action: Try something slightly outside your comfort zone. Your courage and adaptability will help you grow and learn something new."
        },
        {
          quote: "Generous Leo tip: Perform one act of kindness without expecting anything in return. Your giving nature will create beautiful karma.",
          description: "Focus action: Set a small, achievable goal for tomorrow. Your natural determination will help you follow through and build momentum."
        }
      ],
      virgo: [
        {
          quote: "Virgo productivity tip: Create a detailed to-do list this morning and prioritize tasks by importance. Your organized approach will maximize efficiency.",
          description: "Focus action: Declutter one area of your workspace or home. A clean, organized environment will boost your mental clarity and productivity."
        },
        {
          quote: "Virgo wellness tip: Pay attention to your body's signals today. Take breaks when needed and nourish yourself with healthy, wholesome foods.",
          description: "Focus action: Review and update your health routines. Small adjustments to your diet or exercise habits will yield significant long-term benefits."
        },
        {
          quote: "Virgo mindfulness tip: Practice patience with yourself and others today. Perfection is a journey, not a destination.",
          description: "Focus action: Help someone with a task or project. Your practical skills and caring nature will make a meaningful difference in their day."
        },
        {
          quote: "Virgo learning tip: Dedicate 15 minutes to learning something new or improving an existing skill. Your analytical mind absorbs information efficiently.",
          description: "Focus action: Write down three things you accomplished today, no matter how small. Acknowledging your progress builds confidence and momentum."
        },
        {
          quote: "Virgo relationship tip: Express appreciation for someone who supports you. Your thoughtful words will strengthen your connection.",
          description: "Focus action: Plan or prepare for an upcoming goal or project. Your careful preparation will ensure smooth execution when the time comes."
        },
        {
          quote: "Virgo financial tip: Review your budget or expenses for areas of improvement. Your attention to detail can identify money-saving opportunities.",
          description: "Focus action: Practice deep breathing for 5 minutes to center yourself. Your calm, grounded energy will influence your entire day positively."
        },
        {
          quote: "Virgo service tip: Volunteer or offer assistance to someone in need. Your helpful nature creates positive ripples in the community.",
          description: "Focus action: Set boundaries around your time and energy. Saying no to non-essential commitments preserves your resources for what matters most."
        }
      ],
      cancer: [
        {
          quote: "Cancer wellness tip: Take time for self-care today. A warm bath or peaceful meditation will restore your emotional balance.",
          description: "Focus action: Reach out to a family member or close friend. Your intuitive nature will know exactly what they need to hear."
        }
      ],
      // Add content for other zodiac signs...
    };

    let selectedContent;
    const signContent = {
      "Poetic": poeticContent[zodiacSign as keyof typeof poeticContent] || poeticContent.leo,
      "Classic": classicContent[zodiacSign as keyof typeof classicContent] || classicContent.leo,
      "Daily Tip": dailyTipContent[zodiacSign as keyof typeof dailyTipContent] || dailyTipContent.leo
    };

    selectedContent = signContent[style as keyof typeof signContent]?.[dayIndex] || signContent["Poetic"][0];
    return selectedContent;
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
    navigate('/ai-generation');
  };

  const currentContent = getHoroscopeContent(effectiveStyle, currentDate, userZodiacSign);
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
            
            <div className="space-y-4">
              <blockquote className={`text-gray-700 leading-relaxed text-center ${
                effectiveStyle === "Poetic" ? "italic" : "font-medium"
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
