class MemoryGame {
  constructor(gridEl, onWin) {
    this.gridEl = gridEl;
    this.onWin = onWin;
    this.cards = [];
    this.flipped = [];
    this.matched = 0;
    this.moves = 0;
    this.locked = false;
    this.totalPairs = 0;
  }

  init(topicKey, difficultyKey) {
    const topic = TOPICS[topicKey];
    const difficulty = DIFFICULTIES[difficultyKey];
    const selected = topic.cards.slice(0, difficulty.pairs);
    const pairs = [...selected, ...selected];

    this.cards = this.shuffle(pairs);
    this.flipped = [];
    this.matched = 0;
    this.moves = 0;
    this.locked = false;
    this.totalPairs = difficulty.pairs;

    this.gridEl.className = `card-grid grid-${difficultyKey}`;
    this.render();
    this.updateStats();
  }

  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  render() {
    this.gridEl.innerHTML = '';
    this.cards.forEach((emoji, index) => {
      const btn = document.createElement('button');
      btn.className = 'memory-card';
      btn.dataset.index = index;
      btn.innerHTML = `
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back">${emoji}</div>
        </div>
      `;
      btn.addEventListener('click', () => this.flip(index));
      attachHoverEffects(btn, '.card-inner');
      this.gridEl.appendChild(btn);
    });
  }

  flip(index) {
    if (this.locked) return;

    const cardEl = this.gridEl.children[index];
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
    if (this.flipped.length >= 2) return;

    cardEl.classList.add('flipped');
    this.flipped.push({ index, emoji: this.cards[index], el: cardEl });

    if (this.flipped.length === 2) {
      this.moves++;
      this.updateStats();
      this.checkMatch();
    }
  }

  checkMatch() {
    const [first, second] = this.flipped;

    if (first.emoji === second.emoji) {
      first.el.classList.add('matched');
      second.el.classList.add('matched');
      first.el.disabled = true;
      second.el.disabled = true;
      this.matched++;
      this.flipped = [];
      this.updateStats();

      setTimeout(() => {
        [first.el, second.el].forEach((el) => {
          el.classList.add('vanishing');
          el.addEventListener('animationend', () => {
            el.style.display = 'none';
          }, { once: true });
        });
      }, 450);

      if (this.matched === this.totalPairs) {
        setTimeout(() => this.onWin(this.moves), 1100);
      }
    } else {
      this.locked = true;
      setTimeout(() => {
        first.el.classList.remove('flipped');
        second.el.classList.remove('flipped');
        this.flipped = [];
        this.locked = false;
      }, 900);
    }
  }

  updateStats() {
    document.getElementById('moves').textContent = this.moves;
    document.getElementById('pairs').textContent = this.matched;
    document.getElementById('total-pairs').textContent = this.totalPairs;
  }
}
