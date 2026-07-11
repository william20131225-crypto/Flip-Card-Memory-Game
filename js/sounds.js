const clickSound = {
  ctx: null,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playSoftClick() {
    try {
      this.init();
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, t);
      osc.frequency.exponentialRampToValueAtTime(520, t + 0.06);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);

      osc.start(t);
      osc.stop(t + 0.1);
    } catch (_) {}
  },
};

function attachHoverEffects(element, iconSelector) {
  const icon = iconSelector ? element.querySelector(iconSelector) : element;

  element.addEventListener('mouseenter', () => {
    clickSound.playSoftClick();
    if (icon) icon.classList.add('hover-grow');
  });

  element.addEventListener('mouseleave', () => {
    if (icon) icon.classList.remove('hover-grow');
  });
}

document.addEventListener('click', () => clickSound.init(), { once: true });
document.addEventListener('touchstart', () => clickSound.init(), { once: true });
