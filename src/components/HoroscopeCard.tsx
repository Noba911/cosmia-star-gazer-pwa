
import { Star, Sparkles } from "lucide-react";

interface HoroscopeCardProps {
  sign: string;
  icon: string;
  preview: string;
}

const HoroscopeCard = ({ sign, icon, preview }: HoroscopeCardProps) => {
  return (
    <div className="flex-shrink-0 w-72 bg-white/70 glass-effect rounded-2xl p-5 shadow-lg border border-violet-100 backdrop-blur-md transition-all duration-300 hover:shadow-violet hover:scale-105">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center mr-3">
          <Sparkles className="w-4 h-4 text-violet-500" />
        </div>
        <span className="font-semibold text-violet-800">{sign}</span>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{preview}</p>
    </div>
  );
};

export default HoroscopeCard;
