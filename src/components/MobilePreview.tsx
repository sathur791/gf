import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  Smartphone,
  Sparkles,
  Clock,
  Key,
  Volume2,
  Copy,
  Check,
  ExternalLink,
  Music,
  Flower2,
  ArrowLeft,
} from 'lucide-react';

type DeviceType = 'iphone16' | 'iphonese' | 'galaxy24';
type SceneMode = 'countdown' | 'birthday' | 'key' | 'intro';

interface DeviceSpec {
  name: string;
  width: number;
  height: number;
  borderRadius: string;
  bezelRadius: string;
  hasDynamicIsland: boolean;
}

const DEVICE_SPECS: Record<DeviceType, DeviceSpec> = {
  iphone16: {
    name: 'iPhone 16 Pro',
    width: 393,
    height: 852,
    borderRadius: 'rounded-[46px]',
    bezelRadius: 'rounded-[54px]',
    hasDynamicIsland: true,
  },
  iphonese: {
    name: 'iPhone SE',
    width: 375,
    height: 667,
    borderRadius: 'rounded-[28px]',
    bezelRadius: 'rounded-[36px]',
    hasDynamicIsland: false,
  },
  galaxy24: {
    name: 'Galaxy S24',
    width: 360,
    height: 780,
    borderRadius: 'rounded-[38px]',
    bezelRadius: 'rounded-[46px]',
    hasDynamicIsland: false,
  },
};

export const MobilePreview: React.FC = () => {
  const [device, setDevice] = useState<DeviceType>('iphone16');
  const [scene, setScene] = useState<SceneMode>('countdown');
  const [scale, setScale] = useState<number>(0.9);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRealMobile, setIsRealMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  const currentSpec = DEVICE_SPECS[device];

  // Base live URL for phone testing (defaults to production URL if running locally)
  const liveUrl =
    typeof window !== 'undefined' && window.location.hostname !== 'localhost'
      ? window.location.origin
      : 'https://kalaikahbirthday.vercel.app';

  const [qrDataUrl, setQrDataUrl] = useState<string>('/images/kalai_phone_qr.png');

  // Build target URL for the embedded iframe
  const getIframeUrl = (targetScene: SceneMode) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams();
    params.set('embedded', '1');

    if (targetScene === 'countdown') {
      params.set('preview', 'countdown');
    } else if (targetScene === 'birthday') {
      params.set('preview', 'birthday');
      params.set('step', 'experience');
    } else if (targetScene === 'key') {
      params.set('preview', 'birthday');
      params.set('step', 'key');
    } else if (targetScene === 'intro') {
      params.set('preview', 'birthday');
      params.set('step', 'intro');
    }
    return `${origin}/?${params.toString()}`;
  };

  // Detect real phone viewport changes
  useEffect(() => {
    const handleResize = () => {
      setIsRealMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate crisp QR code data URL
  useEffect(() => {
    QRCode.toDataURL(liveUrl, {
      width: 260,
      margin: 1.5,
      color: {
        dark: '#031C23',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => {
        console.warn('QR code generation fallback to static asset:', err);
        setQrDataUrl('/images/kalai_phone_qr.png');
      });
  }, [liveUrl]);

  // Copy link helper
  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(liveUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  // Exit preview mode back to main page
  const handleExitPreview = () => {
    window.location.href = '/';
  };

  // =========================================================================
  // 1. IF ACCESSED ON AN ACTUAL MOBILE DEVICE (No nested frame)
  // =========================================================================
  if (isRealMobile) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-[#073642] text-[#FFFDF8]">
        {/* Floating Quick Switcher Banner for Mobile Testers */}
        <div className="sticky top-0 z-50 flex items-center justify-between px-3 py-2 bg-[#0B6075]/95 backdrop-blur-md border-b border-[#8ED4D6]/30 shadow-md">
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-[#8ED4D6]" />
            <span className="text-xs font-semibold tracking-wide text-[#EAF7F0]">
              Mobile Preview
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setScene('countdown')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                scene === 'countdown'
                  ? 'bg-[#8ED4D6] text-[#073F4D] font-bold shadow'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Countdown
            </button>
            <button
              onClick={() => setScene('birthday')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                scene === 'birthday'
                  ? 'bg-[#8ED4D6] text-[#073F4D] font-bold shadow'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Birthday
            </button>
            <button
              onClick={handleExitPreview}
              className="p-1 rounded-full text-[#8ED4D6] hover:bg-white/10"
              title="Exit Preview Mode"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded Fullscreen Mobile View */}
        <iframe
          src={getIframeUrl(scene)}
          title="Mobile Preview Experience"
          className="w-full flex-1 border-0"
          style={{ minHeight: 'calc(100vh - 45px)' }}
          allow="autoplay; clipboard-write"
        />
      </div>
    );
  }

  // =========================================================================
  // 2. DESKTOP SIMULATOR (Sleek Smartphone Bezel + Interactive Live Frame)
  // =========================================================================
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#021319] via-[#073642] to-[#0A4755] text-[#FFFDF8] flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Header Bar */}
      <header className="w-full border-b border-[#8ED4D6]/20 bg-[#031C23]/80 backdrop-blur-md px-6 py-3.5 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={handleExitPreview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#8ED4D6] hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Site</span>
          </button>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <h1 className="text-sm font-semibold tracking-wide text-white">
              Kalai's Birthday • Mobile Preview Simulator
            </h1>
          </div>
        </div>

        {/* Device & Zoom Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
            {(['iphone16', 'iphonese', 'galaxy24'] as DeviceType[]).map((devKey) => (
              <button
                key={devKey}
                onClick={() => setDevice(devKey)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  device === devKey
                    ? 'bg-[#8ED4D6] text-[#073F4D] font-bold shadow'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {DEVICE_SPECS[devKey].name}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-black/40 px-2 py-1 rounded-xl border border-white/10 text-xs gap-1.5">
            <span className="text-white/50 text-[11px]">Zoom:</span>
            {[0.8, 0.9, 1.0].map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                  scale === s
                    ? 'bg-white/20 text-[#8ED4D6] font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {Math.round(s * 100)}%
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Preview Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* ============================================================ */}
        {/* LEFT: INTERACTIVE SMARTPHONE MOCKUP                          */}
        {/* ============================================================ */}
        <div
          className="flex flex-col items-center justify-center transition-all duration-300"
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
        >
          {/* Phone Shell with Titanium Bezel, Buttons & Highlights */}
          <div
            className={`relative p-[11px] bg-gradient-to-b from-[#2A3439] via-[#1A2226] to-[#0E1316] ${currentSpec.bezelRadius} shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_2px_rgba(255,255,255,0.3)] transition-all duration-300`}
            style={{
              width: currentSpec.width + 22,
              height: currentSpec.height + 22,
            }}
          >
            {/* Side Volume Buttons Protrusion */}
            <div className="absolute -left-[3px] top-28 w-[3px] h-12 bg-[#2A3439] rounded-l-sm opacity-80" />
            <div className="absolute -left-[3px] top-44 w-[3px] h-12 bg-[#2A3439] rounded-l-sm opacity-80" />
            {/* Side Power Button Protrusion */}
            <div className="absolute -right-[3px] top-32 w-[3px] h-16 bg-[#2A3439] rounded-r-sm opacity-80" />

            {/* Inner Phone Screen */}
            <div
              className={`relative w-full h-full bg-black overflow-hidden ${currentSpec.borderRadius} flex flex-col shadow-inner`}
            >
              {/* Status Bar / Dynamic Island Header */}
              <div className="absolute top-0 inset-x-0 h-11 z-30 flex items-center justify-between px-6 pointer-events-none select-none text-white text-[11px] font-semibold">
                {/* Status Time */}
                <span className="tracking-tight">12:00</span>

                {/* Dynamic Island (iPhone 16 Pro) */}
                {currentSpec.hasDynamicIsland ? (
                  <div className="w-[114px] h-[28px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10" />
                    <span className="text-[9px] text-emerald-400 font-mono tracking-tight flex items-center gap-1">
                      <Music className="w-2.5 h-2.5 text-[#8ED4D6] animate-pulse" />
                      10.10
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#07242B]" />
                  </div>
                ) : (
                  <div className="w-16 h-4 bg-black/60 rounded-full mx-auto" />
                )}

                {/* Battery & Signal Icons */}
                <div className="flex items-center gap-1.5 opacity-90 text-[10px]">
                  <span>5G</span>
                  <div className="w-4 h-2 rounded-xs border border-white/80 p-[1px] flex items-center">
                    <div className="w-full h-full bg-white rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Live Web Content inside Frame */}
              <iframe
                key={`${scene}-${device}`}
                src={getIframeUrl(scene)}
                title="Mobile Application Frame"
                className="w-full h-full border-0 bg-[#073642]"
                allow="autoplay; clipboard-write"
              />

              {/* Home Bar Indicator */}
              <div className="absolute bottom-1 inset-x-0 h-4 flex items-center justify-center pointer-events-none z-30">
                <div className="w-32 h-1 bg-white/40 rounded-full backdrop-blur-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT: CONTROL PANEL, SCENE SWITCHER & QR CODE               */}
        {/* ============================================================ */}
        <div className="w-full lg:w-96 flex flex-col gap-5">
          {/* Card 1: Interactive Scene Switcher */}
          <div className="bg-[#031C23]/80 backdrop-blur-md border border-[#8ED4D6]/25 rounded-2xl p-5 shadow-xl">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-[#8ED4D6] flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#8ED4D6]" />
              Experience Stage Switcher
            </h2>
            <p className="text-xs text-white/70 mb-4 leading-relaxed">
              Test how each stage of the experience looks, functions, and sounds on a mobile phone:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setScene('countdown')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  scene === 'countdown'
                    ? 'bg-[#147C8A]/40 border-[#8ED4D6] text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Clock className="w-4 h-4 text-[#8ED4D6]" />
                  {scene === 'countdown' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
                <span className="text-xs font-semibold">Countdown Gate</span>
                <span className="text-[10px] text-white/50 leading-tight">
                  Tamil lyrics + alternating songs
                </span>
              </button>

              <button
                onClick={() => setScene('birthday')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  scene === 'birthday'
                    ? 'bg-[#147C8A]/40 border-[#8ED4D6] text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Sparkles className="w-4 h-4 text-[#8ED4D6]" />
                  {scene === 'birthday' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
                <span className="text-xs font-semibold">Birthday World</span>
                <span className="text-[10px] text-white/50 leading-tight">
                  Full 14 curated love sections
                </span>
              </button>

              <button
                onClick={() => setScene('key')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  scene === 'key'
                    ? 'bg-[#147C8A]/40 border-[#8ED4D6] text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Key className="w-4 h-4 text-[#8ED4D6]" />
                  {scene === 'key' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
                <span className="text-xs font-semibold">Secret Key Gate</span>
                <span className="text-[10px] text-white/50 leading-tight">
                  Passcode unlock (2210)
                </span>
              </button>

              <button
                onClick={() => setScene('intro')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  scene === 'intro'
                    ? 'bg-[#147C8A]/40 border-[#8ED4D6] text-white shadow-md'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Flower2 className="w-4 h-4 text-[#8ED4D6]" />
                  {scene === 'intro' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
                <span className="text-xs font-semibold">Illuminated Intro</span>
                <span className="text-[10px] text-white/50 leading-tight">
                  Opening film invitation
                </span>
              </button>
            </div>
          </div>

          {/* Card 2: Phone Audio Playback Guide */}
          <div className="bg-[#031C23]/80 backdrop-blur-md border border-[#8ED4D6]/25 rounded-2xl p-5 shadow-xl">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-[#8ED4D6] flex items-center gap-2 mb-2">
              <Volume2 className="w-3.5 h-3.5 text-[#8ED4D6]" />
              Phone Audio Guidance
            </h2>
            <div className="text-xs text-white/75 space-y-2 leading-relaxed">
              <p>
                Mobile browsers (Safari & Chrome) enforce an autoplay policy requiring one user touch before sound can play.
              </p>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-[11px] text-white/80">
                <span className="text-emerald-400 font-bold">✓ Audio Unlocking: </span>
                A floating <span className="text-[#8ED4D6] font-medium">"♪ Tap to play music"</span> pill and global touch listeners automatically unmute Rathinamo & Main Tera as soon as she touches the screen.
              </div>
            </div>
          </div>

          {/* Card 3: QR Code & Real Device Testing */}
          <div className="bg-[#031C23]/80 backdrop-blur-md border border-[#8ED4D6]/25 rounded-2xl p-5 shadow-xl flex flex-col items-center text-center">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-[#8ED4D6] flex items-center gap-2 mb-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#8ED4D6]" />
              Test on Your Real Phone
            </h2>
            <p className="text-[11px] text-white/70 mb-3">
              Point your phone's camera at this QR code to open the site directly:
            </p>

            {/* QR Code Image */}
            <div className="p-3 bg-white rounded-2xl shadow-lg border-2 border-[#8ED4D6]/40 mb-3 flex items-center justify-center">
              <img
                src={qrDataUrl}
                alt="QR Code for phone"
                className="w-[180px] h-[180px] object-contain rounded-lg"
              />
            </div>

            <p className="text-[10px] font-mono text-[#8ED4D6] truncate max-w-xs mb-3">
              {liveUrl}
            </p>

            <div className="w-full flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2 px-3 rounded-xl bg-[#0B6075] hover:bg-[#147C8A] border border-[#8ED4D6]/40 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all shadow"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
                title="Open Direct in New Tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MobilePreview;
