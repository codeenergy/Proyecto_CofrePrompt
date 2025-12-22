import { useState, useEffect } from 'react';

interface SupportButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  delay?: number;
}

export default function SupportButton({
  position = 'bottom-left',
  delay = 2000
}: SupportButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6',
    'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
    'top-right': 'top-20 right-4 sm:right-6',
    'top-left': 'top-20 left-4 sm:left-6',
  };

  const handleClick = () => {
    window.open('https://otieu.com/4/10325708', '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className={`
        fixed ${positionClasses[position]} z-50
        px-4 py-3 sm:px-5 sm:py-3.5
        bg-gradient-to-r from-green-500 to-emerald-600
        hover:from-green-600 hover:to-emerald-700
        text-white font-semibold text-sm sm:text-base
        rounded-full shadow-lg hover:shadow-xl
        transform hover:scale-105 transition-all duration-300
        flex items-center gap-2
        animate-bounce hover:animate-none
      `}
      aria-label="Botón de soporte"
    >
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <span className="hidden sm:inline">Soporte</span>
    </button>
  );
}
