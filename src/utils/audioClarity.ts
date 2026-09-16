/**
 * Web Audio Clarity Enhancement Pipeline
 *
 * Provides:
 * 1. High-pass filter (32 Hz) - removes sub-bass DC rumble and speaker muddiness
 * 2. Peaking EQ filter (3.4 kHz, +2.6 dB, Q: 0.85) - enhances vocal clarity, lyrics presence, and melodic articulation
 * 3. High-shelf filter (10 kHz, +2.0 dB) - adds airy brilliance and crisp high-end definition
 * 4. Mastering Dynamic Compressor - evens out quiet sections, prevents clipping, makes playback crystal clear on all devices
 * 5. Clean Master Gain Node
 */

export interface EnhancedAudioNodeGraph {
  audioContext: AudioContext;
  sourceNode: MediaElementAudioSourceNode;
  gainNode: GainNode;
  setVolume: (vol: number) => void;
  destroy: () => void;
}

// Track elements that have already been connected to MediaElementAudioSourceNode
// (an HTMLMediaElement can only be connected to createMediaElementSource once)
const connectedElements = new WeakMap<HTMLAudioElement, EnhancedAudioNodeGraph>();

export function setupAudioClarity(
  audio: HTMLAudioElement,
  initialVolume = 1.0
): EnhancedAudioNodeGraph | null {
  if (connectedElements.has(audio)) {
    const existing = connectedElements.get(audio)!;
    existing.setVolume(initialVolume);
    return existing;
  }

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return null;

    const ctx = new AudioContextClass();

    // Resume AudioContext on user interaction if browser suspended it
    const resumeContext = () => {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    };
    window.addEventListener('click', resumeContext, { once: true });
    window.addEventListener('touchstart', resumeContext, { once: true });
    window.addEventListener('keydown', resumeContext, { once: true });

    const source = ctx.createMediaElementSource(audio);

    // 1. High-Pass Filter (Anti-Rumble / Mud Clearer)
    const highPass = ctx.createBiquadFilter();
    highPass.type = 'highpass';
    highPass.frequency.setValueAtTime(32, ctx.currentTime);
    highPass.Q.setValueAtTime(0.7, ctx.currentTime);

    // 2. Vocal & Instrument Presence (Clarity Boost)
    const vocalPresence = ctx.createBiquadFilter();
    vocalPresence.type = 'peaking';
    vocalPresence.frequency.setValueAtTime(3400, ctx.currentTime);
    vocalPresence.Q.setValueAtTime(0.85, ctx.currentTime);
    vocalPresence.gain.setValueAtTime(2.6, ctx.currentTime);

    // 3. Air & Sparkle High-Shelf
    const airShelf = ctx.createBiquadFilter();
    airShelf.type = 'highshelf';
    airShelf.frequency.setValueAtTime(10000, ctx.currentTime);
    airShelf.gain.setValueAtTime(2.0, ctx.currentTime);

    // 4. Subtle Dynamic Range Compressor
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-18, ctx.currentTime);
    compressor.knee.setValueAtTime(8, ctx.currentTime);
    compressor.ratio.setValueAtTime(2.5, ctx.currentTime);
    compressor.attack.setValueAtTime(0.003, ctx.currentTime);
    compressor.release.setValueAtTime(0.25, ctx.currentTime);

    // 5. Clean Master Gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(initialVolume, ctx.currentTime);

    // Connect node chain:
    // source -> highPass -> vocalPresence -> airShelf -> compressor -> masterGain -> destination
    source.connect(highPass);
    highPass.connect(vocalPresence);
    vocalPresence.connect(airShelf);
    airShelf.connect(compressor);
    compressor.connect(masterGain);
    masterGain.connect(ctx.destination);

    const graph: EnhancedAudioNodeGraph = {
      audioContext: ctx,
      sourceNode: source,
      gainNode: masterGain,
      setVolume: (vol: number) => {
        const clamped = Math.max(0, Math.min(1, vol));
        masterGain.gain.cancelScheduledValues(ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(clamped, ctx.currentTime + 0.08);
      },
      destroy: () => {
        try {
          if (ctx.state !== 'closed') {
            ctx.close().catch(() => {});
          }
        } catch {
          // Ignore
        }
      },
    };

    connectedElements.set(audio, graph);
    return graph;
  } catch (err) {
    console.warn('Audio clarity enhancement fallback:', err);
    return null;
  }
}
