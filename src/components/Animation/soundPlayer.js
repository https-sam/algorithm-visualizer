// Original JavaScript code by Chirp Internet: chirpinternet.eu
// Please acknowledge use of this code by including this header.

// Original JavaScript code by Chirp Internet: chirpinternet.eu
// Please acknowledge use of this code by including this header.
export class SoundPlayer {
  constructor(audioContext, filterNode) {
    this.audioCtx = audioContext;
    this.gainNode = this.audioCtx.createGain();
    if (filterNode) {
      // run output through extra filter (already connected to audioContext)
      this.gainNode.connect(filterNode);
    } else {
      this.gainNode.connect(this.audioCtx.destination);
    }
    this.oscillator = null;
  }
  setFrequency(val, when) {
    if (this.oscillator !== null) {
      if (when) {
        this.oscillator.frequency.setValueAtTime(
          val,
          this.audioCtx.currentTime + when
        );
      } else {
        this.oscillator.frequency.setValueAtTime(
          val,
          this.audioCtx.currentTime
        );
      }
    }
    return this;
  }
  setVolume(val, when) {
    if (when) {
      this.gainNode.gain.exponentialRampToValueAtTime(
        val,
        this.audioCtx.currentTime + when
      );
    } else {
      this.gainNode.gain.setValueAtTime(val, this.audioCtx.currentTime);
    }
    return this;
  }
  setWaveType(waveType) {
    this.oscillator.type = waveType;
    return this;
  }
  play(freq, vol, wave, when) {
    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.connect(this.gainNode);
    this.setFrequency(freq);
    if (wave) {
      this.setWaveType(wave);
    }
    this.setVolume(1 / 1000);
    if (when) {
      this.setVolume(1 / 1000, when - 0.02);
      this.oscillator.start(when - 0.02);
      this.setVolume(vol, when);
    } else {
      this.oscillator.start();
      this.setVolume(vol, 0.02);
    }
    return this;
  }
  stop(when) {
    this.gainNode.gain.setTargetAtTime(
      1 / 10000,
      this.audioCtx.currentTime + when - 0.05,
      0.001
    );
    this.oscillator.stop(this.audioCtx.currentTime + when);
    return this;
  }
}
