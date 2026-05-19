export class TTSService {
  private synth: SpeechSynthesis;

  constructor() {
    this.synth = window.speechSynthesis;
  }

  // 🔥 IMPORTANT: wait for voices to load
  private async waitForVoices(): Promise<SpeechSynthesisVoice[]> {
    const voices = this.synth.getVoices();

    if (voices.length) return voices;

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const v = this.synth.getVoices();
        if (v.length) {
          clearInterval(interval);
          resolve(v);
        }
      }, 100);
    });
  }

  async speak(text: string): Promise <void> {
    
    if (!this.synth) return;

    await this.waitForVoices();
    return new Promise ((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        resolve()
      }

      utterance.onerror = () => {
        reject()
      }

      this.synth.cancel();
      this.synth.speak(utterance);
    });
    
  }

  async speakWithVoice(text: string, voiceName: string): Promise <void> {
    const voices = await this.waitForVoices();

    return new Promise ((resolve, reject) => {
      const selected = voices.find(v => v.name === voiceName);

      const utterance = new SpeechSynthesisUtterance(text);

      if (selected) {
        utterance.voice = selected;
      }

      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        resolve()
      }

      utterance.onerror = () => {
        reject();
      }

      this.synth.cancel();
      this.synth.speak(utterance);
    });
  }

  async getVoices(): Promise<SpeechSynthesisVoice[]> {
    return this.waitForVoices();
  }
}