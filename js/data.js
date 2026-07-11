const DIFFICULTIES = {
  easy: { label: 'Easy', pairs: 3, cols: 3, rows: 2 },
  medium: { label: 'Medium', pairs: 6, cols: 4, rows: 3 },
  hard: { label: 'Hard', pairs: 12, cols: 6, rows: 4 },
  impossible: { label: 'Impossible', pairs: 25, cols: 10, rows: 5 },
};

const TOPICS = {
  animals: {
    title: '🐾 Animals',
    cards: [
      '🐶', '🐱', '🐼', '🐸', '🦁', '🐵', '🐰', '🦊', '🐻', '🐨',
      '🐯', '🐷', '🐮', '🐔', '🐧', '🦋', '🐢', '🐍', '🦒', '🐘',
      '🐙', '🦄', '🐝', '🦉', '🐬',
    ],
  },
  food: {
    title: '🍕 Food',
    cards: [
      '🍕', '🍔', '🌮', '🍣', '🍩', '🧁', '🍪', '🥪', '🍜', '🍦',
      '🥗', '🍿', '🧇', '🥞', '🌭', '🍱', '🥟', '🍛', '🧀', '🥐',
      '🍟', '🍫', '🥨', '🍝', '🍲',
    ],
  },
  space: {
    title: '🚀 Space',
    cards: [
      '🚀', '🌙', '⭐', '🪐', '👽', '☀️', '🌎', '🛸', '🌟', '💫',
      '🌌', '🔭', '🛰️', '🌠', '🌑', '🌕', '☄️', '👾', '🧑‍🚀', '🤖',
      '🪨', '🔥', '⚡', '🌈', '💥',
    ],
  },
};
