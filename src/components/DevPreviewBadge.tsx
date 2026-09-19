import React, { useState } from 'react';
import { Sparkles, Eye, Clock, Key, Gift, Compass, ChevronDown, ChevronUp } from 'lucide-react';

interface DevPreviewBadgeProps {
  currentMode: 'birthday' | 'countdown' | 'real';
  appState: 'intro' | 'key' | 'opening' | 'experience';
  isUnlocked: boolean;
  onSelectState: (state: 'intro' | 'key' | 'opening' | 'experience') => void;
}

export const DevPreviewBadge: React.FC<DevPreviewBadgeProps> = ({
  currentMode,
  appState,
  isUnlocked,
  onSelectState,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Rendered in development or when preview query is provided
  const isAllowed =
    import.meta.env.DEV ||
    (typeof window !== 'undefined' &&
      (new URLSearchParams(window.location.search).has('preview') ||
        new URLSearchParams(window.location.search).has('dev')));

  if (!isAllowed) {
    return null;
  }

  const navigateTo = (previewParam: 'birthday' | 'countdown' | null) => {
    const url = new URL(window.location.href);
    if (previewParam) {
      url.searchParams.set('preview', previewParam);
    } else {
      url.searchParams.delete('preview');
    }
    window.location.href = url.toString();
  };

  return (
    <aside
      aria-label="Development preview toolbar"
      className="fixed bottom-3 left-3 z-50 font-sans print:hidden select-none"
    >
      <div className="bg-[#073F4D]/95 backdrop-blur-md border border-[#8ED4D6]/30 text-[#FFFDF8] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-200 max-w-xs sm:max-w-sm">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[#0B6075]/60 border-b border-[#8ED4D6]/20">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                currentMode === 'birthday'
                  ? 'bg-emerald-400 animate-pulse'
                  : currentMode === 'countdown'
                  ? 'bg-amber-400'
                  : 'bg-cyan-400'
              }`}
            />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#EAF7F0]">
              {currentMode === 'birthday'
                ? 'BIRTHDAY PREVIEW'
                : currentMode === 'countdown'
                ? 'COUNTDOWN PREVIEW'
                : 'DEV: REAL DATE GATE'}
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#8ED4D6] hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            title={isExpanded ? 'Collapse' : 'Expand preview options'}
            aria-label={isExpanded ? 'Collapse preview options' : 'Expand preview options'}
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Expanded Controls */}
        {isExpanded && (
          <div className="p-3 flex flex-col gap-2.5 text-xs">
            {/* Mode Switchers */}
            <div>
              <p className="text-[10px] text-[#8ED4D6] uppercase tracking-wider font-medium mb-1.5">
                Preview Mode
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => navigateTo('birthday')}
                  className={`px-2 py-1.5 rounded-lg border text-[10px] font-medium flex items-center justify-center gap-1 transition-all ${
                    currentMode === 'birthday'
                      ? 'bg-emerald-600/40 border-emerald-400 text-emerald-100 font-semibold'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  Birthday
                </button>

                <button
                  onClick={() => navigateTo('countdown')}
                  className={`px-2 py-1.5 rounded-lg border text-[10px] font-medium flex items-center justify-center gap-1 transition-all ${
                    currentMode === 'countdown'
                      ? 'bg-amber-600/40 border-amber-400 text-amber-100 font-semibold'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  Countdown
                </button>

                <button
                  onClick={() => navigateTo(null)}
                  className={`px-2 py-1.5 rounded-lg border text-[10px] font-medium flex items-center justify-center gap-1 transition-all ${
                    currentMode === 'real'
                      ? 'bg-cyan-600/40 border-cyan-400 text-cyan-100 font-semibold'
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Compass className="w-3 h-3" />
                  Real Date
                </button>
              </div>
            </div>

            {/* Scene Jumpers (only active when in birthday world) */}
            {isUnlocked && (
              <div>
                <p className="text-[10px] text-[#8ED4D6] uppercase tracking-wider font-medium mb-1.5">
                  Scene Jumper
                </p>
                <div className="grid grid-cols-4 gap-1">
                  <button
                    onClick={() => onSelectState('intro')}
                    className={`px-1.5 py-1 rounded text-[10px] transition-all flex items-center justify-center gap-1 ${
                      appState === 'intro'
                        ? 'bg-[#147C8A] text-white font-bold'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    Intro
                  </button>
                  <button
                    onClick={() => onSelectState('key')}
                    className={`px-1.5 py-1 rounded text-[10px] transition-all flex items-center justify-center gap-1 ${
                      appState === 'key'
                        ? 'bg-[#147C8A] text-white font-bold'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <Key className="w-2.5 h-2.5" />
                    Key
                  </button>
                  <button
                    onClick={() => onSelectState('opening')}
                    className={`px-1.5 py-1 rounded text-[10px] transition-all flex items-center justify-center gap-1 ${
                      appState === 'opening'
                        ? 'bg-[#147C8A] text-white font-bold'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <Gift className="w-2.5 h-2.5" />
                    Open
                  </button>
                  <button
                    onClick={() => onSelectState('experience')}
                    className={`px-1.5 py-1 rounded text-[10px] transition-all flex items-center justify-center gap-1 ${
                      appState === 'experience'
                        ? 'bg-[#147C8A] text-white font-bold'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    All 14
                  </button>
                </div>
              </div>
            )}

            <div className="pt-1 border-t border-white/10 text-[9px] text-white/50 text-center">
              Dev-only tool. Stripped in production build.
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
