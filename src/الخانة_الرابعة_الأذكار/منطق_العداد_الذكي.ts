export const منطق_العداد_الذكي = {
  audioContext: null as AudioContext | null,
  
  initAudio: function() {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    }
  },

  تشغيل_صوت_تكة: function() {
    try {
      this.initAudio();
      if (!this.audioContext) return;
      
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      // A soft, short "tick" sound
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.05);
    } catch (e) {
      console.error("Audio play failed", e);
    }
  },

  اهتزاز_الانتهاء: function() {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      // Short vibration pattern: vibrate 100ms, pause 50ms, vibrate 100ms
      navigator.vibrate([100, 50, 100]);
    }
  }
};
