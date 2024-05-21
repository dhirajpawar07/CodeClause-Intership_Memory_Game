document.addEventListener('DOMContentLoaded', function () {
    const themes = {
      emojis: ['😀', '😎', '😍', '🚀', '🎉', '🌟', '🐱', '🐶'],
      animals: ['🐱', '🐶', '🐰', '🐼', '🦁', '🐯', '🐵', '🐔'],
      fruits: ['🍎', '🍊', '🍋', '🍉', '🍓', '🍒', '🍑', '🍇']
    };
    const gameBoard = document.getElementById('game-board');
    const timerDisplay = document.getElementById('timer');
    const scoreDisplay = document.getElementById('score');
    const resetButton = document.getElementById('reset-btn');
    const startButton = document.getElementById('start-btn');
    const difficultySelect = document.getElementById('difficulty');
    const themeSelect = document.getElementById('theme');
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let moves = 0;
    let score = 0;
    let timer = 0;
    let timerInterval;
  
    // Shuffle an array
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    // Initialize game
    function initGame() {
      clearInterval(timerInterval);
      timer = 0;
      timerDisplay.textContent = timer;
      score = 0;
      scoreDisplay.textContent = score;
      moves = 0;
      flippedCards = [];
      matchedCards = [];
      gameBoard.innerHTML = '';
      cards = [];
  
      const selectedTheme = themes[themeSelect.value];
  
      // Create card elements
      const allSymbols = selectedTheme.slice(0, difficultySelect.value === 'easy' ? 4 : 8);
      const shuffledSymbols = shuffle([...allSymbols, ...allSymbols]);
  
      shuffledSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = index;
        card.innerHTML = `<span class="symbol">${symbol}</span>`;
        card.addEventListener('click', handleCardClick);
        cards.push(card);
      });
  
      // Append cards to the game board
      cards.forEach(card => gameBoard.appendChild(card));
    }
  
    // Handle card click
    function handleCardClick() {
      const card = this;
      if (!card.classList.contains('flipped') && !card.classList.contains('matched')) {
        card.classList.add('flipped');
        flippedCards.push(card);
  
        if (flippedCards.length === 2) {
          moves++;
          if (flippedCards[0].querySelector('.symbol').textContent === flippedCards[1].querySelector('.symbol').textContent) {
            // Match found
            flippedCards.forEach(card => card.classList.add('matched'));
            matchedCards.push(...flippedCards);
            score += 10;
            scoreDisplay.textContent = score;
  
            // Check if game is over
            if (matchedCards.length === cards.length) {
              clearInterval(timerInterval);
              setTimeout(() => {
                alert(`Congratulations! You completed the game in ${timer} seconds with a score of ${score}.`);
              }, 500);
            }
          } else {
            // No match
            setTimeout(() => {
              flippedCards.forEach(card => {
                card.classList.remove('flipped');
              });
              flippedCards = [];
            }, 1000);
            score -= 5; // Reduce score if no match is found
            scoreDisplay.textContent = score;
          }
        }
      }
    }
  
    // Start timer
    function startTimer() {
      timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
      }, 1000);
    }
  
    // Event listeners
    startButton.addEventListener('click', function() {
      initGame();
      startTimer();
    });
  
    resetButton.addEventListener('click', initGame);
  
    // Initialize game on page load
    initGame();
  });
  