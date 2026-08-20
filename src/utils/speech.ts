// Web Speech API Voice Synthesis helper
class SpeechSynthesizer {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking: boolean = false;
  private listeners: ((speaking: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }

  public subscribe(fn: (speaking: boolean) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  private notify(speaking: boolean) {
    this.isSpeaking = speaking;
    this.listeners.forEach(fn => fn(speaking));
  }

  public speak(text: string, rate: number = 0.88, onEnd?: () => void) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.synth.cancel(); // Stop any ongoing speech

    if (!text || text.trim().length === 0) {
      this.notify(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = rate; // Slightly relaxed pace tailored for ASD processing
    utterance.pitch = 1.0;

    // Pick Chinese voice if available
    const voices = this.synth.getVoices();
    const zhVoice = voices.find(v => v.lang.includes('zh') || v.lang.includes('cmn'));
    if (zhVoice) {
      utterance.voice = zhVoice;
    }

    utterance.onstart = () => {
      this.notify(true);
    };

    utterance.onend = () => {
      this.notify(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.notify(false);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false);
    }
  }
}

export const speechSynth = new SpeechSynthesizer();
