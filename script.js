(function () {
  let isSystemMode = true;
  let isSystemTurn = false;
  const newGameButton = document.querySelector('.reset');
  const systemModeCheck = document.getElementById('systemMode');
  systemModeCheck.checked = true;
  systemModeCheck.addEventListener('change', function() {
    isSystemMode = this.checked;
    resetGame();
  } )
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
        if (!isSystemTurn) {
          if (!isGameOver && !this.innerHTML) {
            e.classList.add(currentPlayer);
            cells[Array.from(cellElems).indexOf(e)] = currentPlayer;
            this.innerHTML = currentPlayer;
            count++;
            checkIsGameOver();
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            if (isSystemMode && !isGameOver) {
              isSystemTurn = true;
              setTimeout(playSystemMove, 200);
            }
          }
        }
      });
    });
  }

  function playSystemMove() {
    let index;
    if (count === 1) {
      index = getRandomIndex();
    } else {
      index = getSystemPlayIndex();
    }
    cells[index] = 'o';
    cellElems.item(index).innerHTML = 'o';
    cellElems.item(index).classList.add('o');
    count++;
    checkIsGameOver();
    setTimeout(() => {
      currentPlayer = 'x';
      isSystemTurn = false;
    }, 100);
  }

  function getSystemPlayIndex() {
    let index;
    for (let i = 0; i < winningConditionSet.length; i++) {
      const winset = winningConditionSet[i];
      let cellValues = [];
      let emptyCells = [];
      winset.forEach((setIndex) => {
        const cellValue = cells[setIndex];
        if (cellValue) {
          cellValues.push(cellValue);
        } else {
          emptyCells.push(setIndex);
        }
      });
      if (emptyCells.length === 1 && cellValues[0] === cellValues[1]) {
        index = emptyCells[0];
        break;
      }
    }
    if ((!index && index !== 0) || cells[index]) {
      index = getRandomIndex();
    }
    return index;
  }

  function getRandomIndex() {
    let index = Math.floor(Math.random() * 9);
    if (!cells[index]) {
      return index;
    }
    return getRandomIndex();
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
      winnerText.innerHTML = 'Winner: <span>' + currentPlayer.toUpperCase();
      +'<span>';
      winnerText.classList.add(currentPlayer);
    } else if (checkTieCondition()) {
      isGameOver = true;
      winnerText.innerHTML = 'Game Tie';
    }
    if (isGameOver) {
      grid.classList.add('game-over');
      winnerText.classList.add('show');
      restart.classList.add('show');
    }
  }

  function checkTieCondition() {
    const nontEmptyCells = cells.filter((c) => c);
    return nontEmptyCells.length === 9;
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
        console.log(matchedConditions)
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
    isSystemTurn = false;
    matchedConditions = [];
    isGameOver = false;
    count = 0;
    currentPlayer = 'x';
    cells = [];
    Array.from(cellElems).map((e) => {
      e.innerHTML = '';
      // e.classList.remove('x');
      // e.classList.remove('o');
      // e.classList.remove('hide-cell');
      e.classList.remove('x', 'o', 'hide-cell', 'won');
    });

    grid.classList.remove('game-over');
  }

  const helpBtn = document.querySelector('.help');
  const overlay = document.querySelector('.overlay');
  const closeBtn = document.querySelector('.close-btn');
  helpBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
  });
  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
})();
