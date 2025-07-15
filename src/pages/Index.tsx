import { useState } from "react";
import { Star, Sparkles, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HoroscopeCard from "../components/HoroscopeCard";
import SocialLoginButton from "../components/SocialLoginButton";
import ContactModal from "../components/ContactModal";

const horoscopeData = [
  {
    sign: "Aries",
    icon: "♈",
    preview: "Today brings new opportunities for growth. Trust your instincts and embrace change..."
  },
  {
    sign: "Taurus", 
    icon: "♉",
    preview: "Stability and patience will guide you today. Focus on building lasting foundations..."
  },
  {
    sign: "Gemini",
    icon: "♊", 
    preview: "Communication flows effortlessly today. Share your ideas and connect with others..."
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleSignUp = () => {
    console.log("Sign up clicked");
    navigate("/register");
  };

  const handleLogin = () => {
    console.log("Login clicked");
    navigate("/login");
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Add Google OAuth logic here
    navigate("/home");
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
    // Add Apple OAuth logic here
    navigate("/home");
  };

  const handlePrivacyPolicy = () => {
    console.log("Privacy Policy clicked");
    // Navigate to privacy policy page or open modal
    // For now, we'll just log it - you can create a privacy page later
  };

  const handleTermsOfUse = () => {
    console.log("Terms of Use clicked");
    // Navigate to terms page or open modal
    // For now, we'll just log it - you can create a terms page later
  };

  const handleContact = () => {
    console.log("Contact clicked");
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen cosmic-gradient">
      {/* Status bar buffer */}
      <div className="h-12"></div>

      {/* Header */}
      <header className="px-6 py-4 text-center">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-2xl font-bold text-violet-800 tracking-wide">Cosmia</h1>
          <p className="text-sm text-violet-600 font-medium">Your daily AI-powered horoscope</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6">
        {/* Hero Section */}
        <section className="relative mb-8">
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-violet">
            <div className="w-full h-full bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 relative">
              {/* Decorative stars */}
              <div className="absolute inset-0 overflow-hidden">
                <Star className="absolute top-8 left-8 w-4 h-4 text-white/30 animate-pulse" />
                <Sparkles className="absolute top-16 right-12 w-3 h-3 text-white/40 animate-pulse" />
                <Star className="absolute bottom-20 left-16 w-3 h-3 text-white/25 animate-pulse" />
                <Sparkles className="absolute bottom-12 right-8 w-4 h-4 text-white/35 animate-pulse" />
              </div>
              
              <div className="absolute inset-0 gradient-bg opacity-70"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                <h2 className="text-3xl font-bold text-white mb-3 leading-tight">Discover your stars, daily</h2>
                <p className="text-lg text-white/90 font-medium">Personalized horoscopes from your sign</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8 space-y-4">
          <button 
            onClick={handleSignUp}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-violet transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <Star className="w-5 h-5" />
            <span>Sign Up & Start Your Journey</span>
          </button>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-white/80 glass-effect border border-violet-200 text-violet-700 font-semibold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 hover:bg-white flex items-center justify-center space-x-2"
          >
            <ChevronRight className="w-5 h-5" />
            <span>Log In</span>
          </button>
        </section>

        {/* Social Login */}
        <section className="mb-8">
          <div className="flex items-center mb-4">
            <div className="flex-1 h-px bg-violet-200"></div>
            <span className="px-4 text-sm text-violet-600 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-violet-200"></div>
          </div>
          
          <div className="space-y-3">
            <SocialLoginButton
              icon={<div className="w-5 h-5 rounded bg-red-500 flex items-center justify-center text-white text-xs font-bold">G</div>}
              text="Continue with Google"
              variant="google"
              onClick={handleGoogleLogin}
            />
            
            <SocialLoginButton
              icon={<div className="w-5 h-5 rounded bg-black flex items-center justify-center text-white text-xs font-bold">🍎</div>}
              text="Continue with Apple"
              variant="apple"
              onClick={handleAppleLogin}
            />
          </div>
        </section>

        {/* Preview Section */}
        <section className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-violet-800 mb-2">See what Cosmia reveals today</h3>
            <Star className="w-6 h-6 text-violet-400 mx-auto" />
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {horoscopeData.map((horoscope, index) => (
              <HoroscopeCard
                key={index}
                sign={horoscope.sign}
                icon={horoscope.icon}
                preview={horoscope.preview}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 text-center">
        <div className="space-y-4">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={handlePrivacyPolicy}
              className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={handleTermsOfUse}
              className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors cursor-pointer"
            >
              Terms of Use
            </button>
            <button 
              onClick={handleContact}
              className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors cursor-pointer"
            >
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

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />

      {/* Bottom buffer */}
      <div className="h-8"></div>
    </div>
  );
};

export default Index;
