import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Printer, Copy, Check, X, Sparkles, Smartphone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface PrintableGiftQRProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper to draw QR + optional center "K" crest
const renderQRWithCenterMark = async (
  canvas: HTMLCanvasElement,
  text: string,
  size: number,
  qrConfig: typeof siteConfig.qr
) => {
  canvas.width = size;
  canvas.height = size;

  await QRCode.toCanvas(canvas, text, {
    width: size,
    margin: qrConfig.margin,
    color: {
      dark: qrConfig.darkColor,
      light: qrConfig.lightColor,
    },
    errorCorrectionLevel: qrConfig.errorCorrectionLevel,
  });

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Draw central circular emblem with "K"
  // Keep it <= 20% of the QR width to preserve Error Correction 'H' (30%) readability
  const centerRadius = size * 0.1;
  const centerX = size / 2;
  const centerY = size / 2;

  // Clean background circle with slight margin
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, centerRadius + size * 0.015, 0, Math.PI * 2);
  ctx.fillStyle = qrConfig.lightColor;
  ctx.fill();
  ctx.lineWidth = size * 0.008;
  ctx.strokeStyle = qrConfig.darkColor;
  ctx.stroke();

  // Inner subtle ring
  ctx.beginPath();
  ctx.arc(centerX, centerY, centerRadius * 0.9, 0, Math.PI * 2);
  ctx.fillStyle = qrConfig.mintAccent;
  ctx.fill();

  // "K" Monogram
  ctx.font = `600 ${Math.round(centerRadius * 1.15)}px 'Cormorant Garamond', Georgia, serif`;
  ctx.fillStyle = qrConfig.darkColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(qrConfig.centerLetter, centerX, centerY + size * 0.004);

  ctx.restore();
};

export const PrintableGiftQR: React.FC<PrintableGiftQRProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const printCanvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [dataUrl, setDataUrl] = useState<string>('');

  const isLocalOrDev =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.startsWith('192.168.') ||
      window.location.hostname.startsWith('10.') ||
      import.meta.env.DEV);

  // Defaults to true so local changes immediately reflect in the QR code for testing
  const [useCurrentLiveUrl, setUseCurrentLiveUrl] = useState<boolean>(true);

  const activeTargetUrl =
    isLocalOrDev && useCurrentLiveUrl && typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}${window.location.search || ''}`
      : siteConfig.productionUrl;

  useEffect(() => {
    if (!isOpen) return;

    const generateQRs = async () => {
      try {
        const { qr } = siteConfig;

        // Render preview canvas (360px) pointing to the exact active target URL
        if (canvasRef.current) {
          await renderQRWithCenterMark(canvasRef.current, activeTargetUrl, 360, qr);
        }

        // Render high-res printable canvas (1200px)
        if (printCanvasRef.current) {
          await renderQRWithCenterMark(printCanvasRef.current, activeTargetUrl, qr.printableWidth, qr);
          setDataUrl(printCanvasRef.current.toDataURL('image/png'));
        }
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };

    generateQRs();
  }, [isOpen, activeTargetUrl]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(activeTargetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `Kalai-Birthday-Gift-QR-${siteConfig.birthdayDate}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#06404E]/85 overflow-y-auto print:p-0 print:bg-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#FFFDF8] rounded-3xl border border-[#0B6075]/20 shadow-[0_25px_60px_rgba(6,64,78,0.4)] p-6 sm:p-8 overflow-hidden print:shadow-none print:border-none print:max-w-none"
          >
            {/* Close button (Hidden during print) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full text-[#147C8A] hover:text-[#0B6075] hover:bg-[#DDF3E9]/60 transition-colors print:hidden"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 print:mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF3E9] text-[#0B6075] text-xs tracking-widest uppercase font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Physical Gift Card & NFC</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#0B6075] font-normal tracking-wide">
                Digital Access for Kalai
              </h2>
              <p className="text-sm text-[#147C8A]/80 font-sans mt-1">
                Print for the physical gift card or store on an NFC tag.
              </p>
            </div>

            {/* Printable Physical Card Preview Frame */}
            <div className="relative mx-auto w-fit bg-[#FAF6ED] p-6 rounded-2xl border border-[#0B6075]/15 shadow-inner flex flex-col items-center">
              <div className="text-center mb-3">
                <p className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#147C8A] font-semibold">
                  FOR KALAIVANI
                </p>
                <p className="font-serif italic text-sm text-[#123E45]">
                  A Little World Made For You
                </p>
              </div>

              {/* QR Canvas */}
              <div className="relative p-3 bg-[#FFFDF8] rounded-xl shadow-sm border border-[#0B6075]/10">
                <canvas
                  ref={canvasRef}
                  className="w-52 h-52 sm:w-60 sm:h-60 block rounded-lg"
                  aria-label="Birthday Website QR Code"
                />
              </div>

              <p className="text-xs font-handwriting text-xl text-[#0B6075] mt-3">
                10.10.2026 • Scan to Open
              </p>
            </div>

            {/* Hidden 1200px canvas for 300DPI high-res export */}
            <canvas ref={printCanvasRef} className="hidden" aria-hidden="true" />

            {/* Production / Demo URL & Copy (Hidden on print) */}
            <div className="mt-6 bg-[#EAF7F0] border border-[#B8E7E5] rounded-xl p-3.5 flex flex-col gap-2.5 text-xs print:hidden">
              {isLocalOrDev && (
                <div className="flex items-center justify-between pb-2 border-b border-[#B8E7E5]/60">
                  <span className="text-[10.5px] font-semibold text-[#0B6075] uppercase tracking-wider">
                    QR Destination:
                  </span>
                  <div className="flex items-center gap-1 bg-[#FFFDF8] p-0.5 rounded-lg border border-[#0B6075]/20">
                    <button
                      type="button"
                      onClick={() => setUseCurrentLiveUrl(true)}
                      className={`px-2 py-0.5 rounded text-[10.5px] font-medium transition-all ${
                        useCurrentLiveUrl
                          ? 'bg-[#0B6075] text-white shadow-xs'
                          : 'text-[#147C8A] hover:text-[#0B6075]'
                      }`}
                    >
                      Active Demo (Live Changes)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseCurrentLiveUrl(false)}
                      className={`px-2 py-0.5 rounded text-[10.5px] font-medium transition-all ${
                        !useCurrentLiveUrl
                          ? 'bg-[#0B6075] text-white shadow-xs'
                          : 'text-[#147C8A] hover:text-[#0B6075]'
                      }`}
                    >
                      Production URL
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                <div className="truncate text-[#123E45]">
                  <span className="font-semibold text-[#0B6075] block text-[10px] uppercase tracking-wider">
                    {useCurrentLiveUrl && isLocalOrDev ? 'Current Demo URL (Synced):' : 'Production URL:'}
                  </span>
                  <span className="font-mono text-[11px] select-all">
                    {activeTargetUrl}
                  </span>
                </div>
                <button
                  onClick={handleCopyUrl}
                  className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B6075] text-[#FFFDF8] hover:bg-[#147C8A] transition-colors font-medium text-xs cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* NFC Tip Box (Hidden on print) */}
            <div className="mt-3 bg-[#FFFDF8] border border-[#0B6075]/10 rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#147C8A] print:hidden">
              <Smartphone className="w-4 h-4 mt-0.5 text-[#0B6075] shrink-0" />
              <p className="leading-relaxed text-[11.5px]">
                <strong className="text-[#0B6075]">NFC Ready:</strong> Write this exact URL to any NTAG213/215 tag. When Kalai taps her phone to the card, the experience launches immediately without an app!
              </p>
            </div>

            {/* Action Buttons (Hidden on print) */}
            <div className="mt-6 grid grid-cols-2 gap-3 print:hidden">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0B6075] text-[#FFFDF8] hover:bg-[#147C8A] active:scale-[0.98] transition-all font-medium text-sm shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Save High-Res PNG</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#DDF3E9] text-[#0B6075] hover:bg-[#B8E7E5] active:scale-[0.98] transition-all font-medium text-sm border border-[#0B6075]/20"
              >
                <Printer className="w-4 h-4" />
                <span>Print Card</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
