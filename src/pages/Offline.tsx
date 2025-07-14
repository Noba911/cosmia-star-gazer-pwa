
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wifi, WifiOff, Bookmark, RefreshCw, Loader2 } from "lucide-react";

const Offline = () => {
  const navigate = useNavigate();
  const [isRetrying, setIsRetrying] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState("Checking connection status...");
  const [messageColor, setMessageColor] = useState("text-violet-600");

  const handleRetryConnection = async () => {
    setIsRetrying(true);
    setConnectionMessage("Checking...");
    setMessageColor("text-violet-600");
    
    // Simulate connection check
    setTimeout(() => {
      if (navigator.onLine) {
        window.location.reload();
      } else {
        setIsRetrying(false);
        setConnectionMessage("Still offline. Please check your connection.");
        setMessageColor("text-red-500 font-medium");
        
        // Reset message after 3 seconds
        setTimeout(() => {
          setConnectionMessage("Checking connection status...");
          setMessageColor("text-violet-600");
        }, 3000);
      }
    }, 2000);
  };

  useEffect(() => {
    const handleOnline = () => {
      window.location.reload();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  return (
    <div className="cosmic-gradient min-h-screen">
      <div className="h-12"></div>

      <header className="px-6 py-4 text-center">
        <div className="flex flex-col items-center space-y-2">
          <h1 className="text-xl font-bold text-violet-800 tracking-wide">Offline Mode</h1>
        </div>
      </header>

      <main className="px-6 flex flex-col items-center justify-center h-[600px]">
        
        <div className="relative mb-6 mt-12">
          <div className="w-32 h-32 mx-auto bg-white/70 glass-effect rounded-full flex items-center justify-center shadow-violet border border-violet-100">
            <WifiOff className="w-16 h-16 text-violet-400" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <Wifi className="w-4 h-4 text-white" />
          </div>
        </div>

        <section className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-violet-800 mb-4">You're offline</h2>
          <p className="text-lg text-violet-600 font-medium leading-relaxed px-4">
            Don't worry — we'll update your stars when you're reconnected.
          </p>
        </section>

        <section className="w-full mb-8">
          <div className="bg-white/70 glass-effect rounded-2xl p-6 shadow-violet border border-violet-100">
            <div className="flex items-center mb-4">
              <Bookmark className="w-4 h-4 text-violet-500 mr-3" />
              <span className="text-sm font-semibold text-violet-700">Last horoscope you viewed</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center mb-3">
                <span className="text-xl mr-3">♈</span>
                <span className="font-semibold text-violet-800">Aries - Today</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Today brings new opportunities for growth. Trust your instincts and embrace change with confidence. 
                The stars align to support your creative endeavors and personal relationships.
              </p>
              
              <div className="flex items-center justify-between pt-3 border-t border-violet-100">
                <span className="text-xs text-violet-500 font-medium">Cached • 2 hours ago</span>
                <span className="text-violet-400">⭐</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <section className="px-6 mb-8">
        <Button
          onClick={handleRetryConnection}
          disabled={isRetrying}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-violet transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
        >
          {isRetrying ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          <span>{isRetrying ? "Checking..." : "Try Again"}</span>
        </Button>
        
        <div className="mt-4 text-center">
          <p className={`text-sm ${messageColor}`}>{connectionMessage}</p>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center">
        <div className="space-y-4">
          <div className="flex flex-col space-y-3">
            <span className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors cursor-pointer">Terms of Use</span>
            <span className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors cursor-pointer">Contact</span>
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

export default Offline;
