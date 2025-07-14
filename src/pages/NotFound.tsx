import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ContactModal";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTryAgain = () => {
    window.location.reload();
  };

  const handleOpenContact = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-violet-50 to-indigo-100 min-h-screen">
      <div className="h-12"></div>

      <header className="px-6 py-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-filter backdrop-blur-20 border border-violet-200 shadow-lg hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 text-violet-600" />
          </Button>
          <h1 className="text-lg font-semibold text-violet-800">Page Not Found</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="px-6 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        
        <section className="text-center mb-8">
          <div className="relative">
            <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center shadow-[0_10px_25px_rgba(102,126,234,0.15)]">
              <img 
                className="w-32 h-32 object-cover rounded-full" 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/fc091a7444-8005f32b40fb7eaaec50.png" 
                alt="broken telescope floating in space, cosmic purple and blue gradient, stars scattered around, lost planet illustration, mystical ethereal style"
              />
            </div>
            <div className="absolute -top-4 -right-4">
              <span className="text-4xl animate-bounce">🔭</span>
            </div>
            <div className="absolute -bottom-2 -left-2">
              <span className="text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>❓</span>
            </div>
            <div className="absolute top-8 -left-8">
              <span className="text-2xl animate-bounce" style={{ animationDelay: '1s' }}>✨</span>
            </div>
          </div>
        </section>

        <section className="text-center mb-12 space-y-4">
          <h2 className="text-2xl font-bold text-violet-800 leading-tight px-4">
            Oops! This page doesn't exist.
          </h2>
          <p className="text-lg text-violet-600 px-6 leading-relaxed">
            It may have been moved or deleted.
          </p>
          <div className="pt-4">
            <div className="w-16 h-1 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full mx-auto"></div>
          </div>
        </section>

        <section className="w-full max-w-sm">
          <Button
            onClick={handleGoHome}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-[0_10px_25px_rgba(102,126,234,0.15)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
            size="lg"
          >
            <Home className="w-4 h-4" />
            <span>Go Back Home</span>
          </Button>
        </section>

        <section className="w-full max-w-sm mt-4 space-y-3">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full bg-white/80 backdrop-filter backdrop-blur-20 border border-violet-200 text-violet-700 font-medium py-3 px-6 rounded-xl shadow-lg hover:bg-white flex items-center justify-center space-x-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </Button>
          
          <Button
            onClick={handleTryAgain}
            variant="outline"
            className="w-full bg-white/80 backdrop-filter backdrop-blur-20 border border-violet-200 text-violet-700 font-medium py-3 px-6 rounded-xl shadow-lg hover:bg-white flex items-center justify-center space-x-3"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        </section>

      </main>

      <footer className="px-6 py-6 text-center">
        <div className="space-y-3">
          <div className="flex justify-center space-x-6">
            <button 
              onClick={handleOpenContact}
              className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors cursor-pointer"
            >
              Help
            </button>
            <button 
              onClick={handleOpenContact}
              className="text-violet-600 font-medium text-sm hover:text-violet-700 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
          
          <div className="pt-2">
            <p className="text-xs text-violet-500">Cosmia - Your daily AI-powered horoscope</p>
          </div>
        </div>
      </footer>

      <div className="h-8"></div>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={handleCloseContact} 
      />
    </div>
  );
};

export default NotFound;
