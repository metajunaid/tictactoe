(function () {
  newGameButton = document.querySelector('.reset');
  const grid = document.querySelector('.grid');
  const restart = document.querySelector('.restart');
  const winnerText = document.querySelector('.winner-label');
  newGameButton.addEventListener('click', () => {
    resetGame();
  });
  restart.addEventListener('click', () => {
    resetGame();
  });
  let currentPlayer = 'x';
  let cells = [];
  let matchedConditions = [];
  let cellStr = '';
  let count = 0;
  let isGameOver = false;

  const winningConditionSet = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < 9; i++) {
    cells.push('');
    cellStr += '<div class="cell cell-' + (i + 1) + '"></div>';
  }
  grid.innerHTML = cellStr;

  const cellElems = document.querySelectorAll('.cell');
  if (cellElems.length) {
    cellElems.forEach((e) => {
      e.addEventListener('click', function () {
        cells[Array.from(cellElems).indexOf(e)] = currentPlayer;
        console.log(cells);
        if (!isGameOver && !this.innerHTML) {
          e.classList.add(currentPlayer);
          this.innerHTML = currentPlayer;
          count++;
          checkIsGameOver();
          currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        }
      });
    });
  }

  function checkIsGameOver() {
    if (count < 5) return;
    if (checkWinnigCondition()) {
      isGameOver = true;
      matchedConditions.forEach((conditionIndex) => {
        document
          .querySelector('.cell-' + (conditionIndex + 1))
          .classList.add('won');
      });
      grid.classList.add('game-over');
      winnerText.innerHTML = 'Winner: <span>' + currentPlayer.toUpperCase();
      +'<span>';
      winnerText.classList.add(currentPlayer);
      winnerText.classList.add('show');
      restart.classList.add('show');
      console.log('Winnder =>', currentPlayer);
    }
  }

  function checkWinnigCondition() {
    let winningCondition = false;
    for (let set = 0; set < winningConditionSet.length; set++) {
      const conditions = winningConditionSet[set];
      if (
        cells[conditions[0]] &&
        cells[conditions[1]] &&
        cells[conditions[2]] &&
        cells[conditions[0]] === cells[conditions[1]] &&
        cells[conditions[0]] === cells[conditions[2]]
      ) {
        matchedConditions = [...conditions];
        winningCondition = true;
      }
      if (winningCondition) {
        break;
      }
    }
    return winningCondition;
  }

  function resetGame() {
    winnerText.classList.remove('show');
    restart.classList.remove('show');
    cellElems.forEach((e) => e.classList.add('hide-cell'));

    setTimeout(initGame, 500);
  }

  function initGame() {
    // console.log(cellElems)
    matchedConditions = [];
    isGameOver = false;
    count = 0;
    currentPlayer = 'x';
    cells = [];
    Array.from(cellElems).map((e) => {
      console.log(cellElems);
      e.innerHTML = '';
      // e.classList.remove('x');
      // e.classList.remove('o');
      // e.classList.remove('hide-cell');
      e.classList.remove('x', 'o', 'hide-cell', 'won');
    });

    grid.classList.remove('game-over');
  }
})();
