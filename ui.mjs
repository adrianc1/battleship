import { realPlayer, enemyPlayer } from './interactions.js';

const playerContainer = document.getElementById('player-main');
const playerGameboardEl = document.getElementById('player-gameboard');
const computerContainer = document.getElementById('computer-main');
const computerGameboardEl = document.getElementById('computer-gameboard');
const generalBoardEl = document.querySelectorAll('.gb');
let playerboard = realPlayer;
let cpuBoard = enemyPlayer;

// add each players board to the screen
function renderStartingBoard(currBoard) {
	generalBoardEl.forEach((e) => {
		console.log(e, currBoard);
		if (currBoard.board.name == 'adrian') {
			currBoard.board.board.forEach((row) => {
				row.forEach((cell) => {
					let newEl = document.createElement('div');
					newEl.classList.add('unit-cell');
					newEl.textContent = cell;
					e.appendChild(newEl);
				});
			});
			currBoard.board.name = null;
			currBoard = cpuBoard;

			return;
		} else {
			currBoard.board.board.forEach((row) => {
				row.forEach((cell) => {
					let newEl = document.createElement('div');
					newEl.classList.add('unit-cell');
					newEl.textContent = cell;
					e.appendChild(newEl);
				});
			});
			return (currBoard.board.name = 'adrian');
		}
	});
	return;
}

// display nav and scoring
(function navDisplay(player, evil) {
	const navBar = document.getElementById('nav-bar');
	const playerHits = document.getElementById('player-hits');
	const enemyHits = document.getElementById('enemy-hits');
	const playerMisses = document.getElementById('player-misses');
	const enemyMisses = document.getElementById('enemy-misses');
	const playerShipsRemaining = document.getElementById(
		'player-ships-remaining'
	);
	const enemyShipsRemaining = document.getElementById('enemy-ships-remaining');

	playerHits.textContent += realPlayer.board.totalHits;
	enemyHits.textContent += enemyPlayer.board.totalHits;

	playerMisses.textContent += realPlayer.board.misses;
	enemyMisses.textContent += enemyPlayer.board.misses;

	playerShipsRemaining.textContent += realPlayer.board.shipsRemaining();
	enemyShipsRemaining.textContent += enemyPlayer.board.shipsRemaining();
})();

renderStartingBoard(playerboard);

// function displayShipBoard() {
// 	if ()
// 	.bar:nth-of-type(2)
// }
