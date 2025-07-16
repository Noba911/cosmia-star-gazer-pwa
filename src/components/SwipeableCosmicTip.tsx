
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface SwipeableCosmicTipProps {
  cosmicTipDate: Date;
  onPrevious: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
  getCosmicTip: (date: Date) => string;
  formatDate: (date: Date) => string;
}

const SwipeableCosmicTip: React.FC<SwipeableCosmicTipProps> = ({
  cosmicTipDate,
  onPrevious,
  onNext,
  isNextDisabled,
  getCosmicTip,
  formatDate
}) => {
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setCurrentX(touch.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || startX === null) return;
    
    const touch = e.touches[0];
    setCurrentX(touch.clientX);
    e.preventDefault(); // Prevent scrolling while swiping
  };

  const handleTouchEnd = () => {
    if (!isDragging || startX === null || currentX === null) {
      setIsDragging(false);
      setStartX(null);
      setCurrentX(null);
      return;
    }

    const deltaX = currentX - startX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Swiped right - go to previous day
        onPrevious();
      } else {
        // Swiped left - go to next day
        if (!isNextDisabled) {
          onNext();
        }
      }
    }

    setIsDragging(false);
    setStartX(null);
    setCurrentX(null);
  };

  const getTransformStyle = () => {
    if (!isDragging || startX === null || currentX === null) {
      return 'translateX(0px)';
    }
    
    const deltaX = currentX - startX;
    const maxTransform = 30; // Maximum transform distance
    const clampedDelta = Math.max(-maxTransform, Math.min(maxTransform, deltaX * 0.3));
    
    return `translateX(${clampedDelta}px)`;
  };

  return (
    <section className="mb-8">
      <div 
        ref={containerRef}
        className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-5 shadow-violet select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: getTransformStyle(),
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Sparkles className="w-5 h-5 text-white mr-2" />
            <h4 className="text-white font-semibold">Cosmic Tip</h4>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onPrevious}
              className="p-1 text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              disabled={isNextDisabled}
              className={`p-1 transition-colors ${
                isNextDisabled 
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
        
        {/* Swipe indicator */}
        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/20 rounded-full p-2">
              <div className="text-white text-xs font-medium">
                {startX !== null && currentX !== null && currentX - startX > 0 ? '← Previous' : 'Next →'}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SwipeableCosmicTip;
