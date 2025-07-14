
import { ReactNode } from "react";

interface SocialLoginButtonProps {
  icon: ReactNode;
  text: string;
  variant?: 'google' | 'apple';
  onClick?: () => void;
}

const SocialLoginButton = ({ icon, text, variant = 'google', onClick }: SocialLoginButtonProps) => {
  const baseClasses = "w-full font-medium py-3 px-6 rounded-xl shadow-sm flex items-center justify-center space-x-3 transition-all duration-300";
  
  const variantClasses = {
    google: "bg-white border border-gray-200 text-gray-700 hover:shadow-md",
    apple: "bg-black text-white hover:bg-gray-900"
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default SocialLoginButton;
