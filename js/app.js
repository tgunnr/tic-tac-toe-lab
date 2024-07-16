/*---------------- Constants ---------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  /*--------- Variables (state) ----------*/
  let board, turn, winner, tie
  
  
  /*------- Cached Element References ------*/
  const squareElements = document.querySelectorAll('.sqr')
  const messageElement = document.getElementById('message')
  const resetButton = document.getElementById('reset')
  
  
  /*-------- Functions -----------------*/
  init()
  
  function init() {
    board = ['', '', '', '', '', '', '', '', '']
    turn = 'X'
    winner = false
    tie = false
    render()
  }
  
  function render() {
    updateBoard()
    updateMessage()
  }
  
  function updateBoard() {
    board.forEach((cell, idx) => {
      if (cell === 'X') {
        squareElements[idx].textContent = 'X'
      } else if (cell === 'O') {
        squareElements[idx].textContent = 'O'
      } else {
        squareElements[idx].textContent = ''
      }
    })
  }
  
  function updateMessage() {
    if (!winner && !tie) {
      messageElement.textContent = `It is ${turn}'s turn`
    } else if (!winner && tie) {
      messageElement.textContent = "It's a tie!"
    } else {
      messageElement.textContent = `${turn} wins the game!`
    }
  }
  
  function handleClick(evt) {
    const squareIndex = parseInt(evt.target.id)
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner) {
      return
    }
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    changeTurn()
    render()
  }
  
  function placePiece(index) {
    board[index] = turn
  }
  
  function checkForWinner() {
    if (
      (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) ||
      (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) ||
      (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) ||
      (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) ||
      (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) ||
      (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) ||
      (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) ||
      (board[2] !== '' && board[2] === board[4] && board[2] === board[6])
    ) {
      winner = true
    }
  }
  
  function checkForTie() {
    if (winner) {
      return
    }
    if (!board.includes('')) {
      tie = true
    }
  }
  
  function changeTurn() {
    if (winner) {
      return
    }
    if (turn === 'X') {
      turn = 'O'
    } else {
      turn = 'X'
    }
  }
  
  /*----------- Event Listeners ----------*/
  squareElements.forEach((squareElement) => {
    squareElement.addEventListener('click', handleClick)
  })
  
  resetButton.addEventListener('click', init)