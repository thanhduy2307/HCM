/**
 * Hệ thống âm thanh tương tác sử dụng Web Audio API
 * Hoàn toàn tự tạo bằng thuật toán âm thanh (không phụ thuộc file ngoài, không lo lỗi mạng)
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.bgmPlaying = false;
    this.bgmTimer = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (!this.soundEnabled && this.bgmPlaying) {
      this.stopBGM();
    }
    return this.soundEnabled;
  }

  // Âm thanh bước chân (Footstep sound)
  playFootstep() {
    if (!this.soundEnabled) return;
    this.initContext();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Tần số trầm mô phỏng tiếng bước chân trên mặt đất
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // Tiếng bấm nút (Click sound)
  playClick() {
    if (!this.soundEnabled) return;
    this.initContext();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.05);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  // Tiếng trả lời đúng (Triumphant chord)
  playCorrect() {
    if (!this.soundEnabled) return;
    this.initContext();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // Đô - Mi - Sol - Đô cao (C5, E5, G5, C6)
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.5);
    });
  }

  // Tiếng trả lời chưa chính xác (Gentle retry cue)
  playWrong() {
    if (!this.soundEnabled) return;
    this.initContext();

    const now = this.ctx.currentTime;
    const notes = [280, 220]; // Trầm dần nhẹ nhàng

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.12, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.22);
    });
  }

  // Âm thanh mở khóa chặng mới (Unlock fanfare)
  playUnlock() {
    if (!this.soundEnabled) return;
    this.initContext();

    const now = this.ctx.currentTime;
    const melody = [440, 554.37, 659.25, 880, 1108.73];

    melody.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);

      gain.gain.setValueAtTime(0.001, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.65);
    });
  }

  // Âm thanh toàn thắng (Grand Finale fanfare)
  playVictory() {
    if (!this.soundEnabled) return;
    this.initContext();

    const now = this.ctx.currentTime;
    // Giai điệu hào hùng: Sol - Đô - Mi - Sol - Đô - Sol cao
    const victoryNotes = [
      { f: 392, d: 0.2, t: 0 },
      { f: 523.25, d: 0.25, t: 0.2 },
      { f: 659.25, d: 0.25, t: 0.45 },
      { f: 783.99, d: 0.35, t: 0.7 },
      { f: 1046.5, d: 0.6, t: 1.05 },
      { f: 1174.66, d: 0.3, t: 1.65 },
      { f: 1318.51, d: 0.9, t: 1.95 }
    ];

    victoryNotes.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.f, now + item.t);

      gain.gain.setValueAtTime(0.001, now + item.t);
      gain.gain.exponentialRampToValueAtTime(0.25, now + item.t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + item.t);
      osc.stop(now + item.t + item.d + 0.05);
    });
  }
}

window.soundSystem = new SoundSystem();
