import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound
}) => {
  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur-md border-b border-slatebrand-100 px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand & Subtitle */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-slatebrand-600 to-slatebrand-800 flex items-center justify-center shadow-soft-sm overflow-hidden p-1 border border-white/20 shrink-0">
            <img src="/icon.png" alt="WordCraft" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slatebrand-900 tracking-tight leading-none">
              WordCraft
            </h1>
            <p className="text-xs text-slatebrand-500 font-medium tracking-normal mt-1">
              小学生写作交互式练习
            </p>
          </div>
        </div>

        {/* Right: Sound Toggle */}
        <button
          onClick={onToggleSound}
          aria-label="切换音效"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-slatebrand-200/80 bg-paper hover:bg-slatebrand-50 text-slatebrand-600 flex items-center justify-center transition-all touch-manipulation shadow-soft-xs active:scale-95 shrink-0"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-slatebrand-600" /> : <VolumeX className="w-5 h-5 text-slatebrand-400" />}
        </button>
      </div>
    </header>
  );
};
