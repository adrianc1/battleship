import { realPlayer, enemyPlayer } from './interactions.js';

const playerContainer = document.getElementById('player-main');
const playerGameboardEl = document.getElementById('player-gameboard');
const computerContainer = document.getElementById('computer-main');
const computerGameboardEl = document.getElementById('computer-gameboard');
const generalBoardEl = document.querySelectorAll('.gb');

// add each players board to the screen

// display nav and scoring
export function navDisplay(player, evil) {
	const navBar = document.getElementById('nav-bar');
	const playerHits = document.getElementById('player-hits');
	const enemyHits = document.getElementById('enemy-hits');
	const playerMisses = document.getElementById('player-misses');
	const enemyMisses = document.getElementById('enemy-misses');
	const playerShipsRemaining = document.getElementById(
		'player-ships-remaining'
	);
	const enemyShipsRemaining = document.getElementById('enemy-ships-remaining');

	playerHits.textContent = 'Player Received Hits: ';
	enemyHits.textContent = 'Enemy Hits: ';
	playerMisses.textContent = 'Player Misses: ';
	enemyMisses.textContent = 'Enemy Misses: ';
	playerShipsRemaining.textContent = 'Player Ships Remaining: ';
	enemyShipsRemaining.textContent = 'Enemy Ships Remaining: ';

	playerHits.textContent += realPlayer.board.totalHits;
	enemyHits.textContent += enemyPlayer.board.totalHits;

	playerMisses.textContent += realPlayer.board.misses;
	enemyMisses.textContent += enemyPlayer.board.misses;

	playerShipsRemaining.textContent += realPlayer.board.shipsRemaining();
	enemyShipsRemaining.textContent += enemyPlayer.board.shipsRemaining();
}

// const cell = document.querySelectorAll('.unit-cell');

export function attackCoordinate() {
	let isSelected = this.classList.contains('active');
	let isShip = this.classList.contains('ship-color');
	let isEnemy = this.classList.contains('enemy');
	if (isSelected) {
		return;
	} else {
		this.classList.add('active');
		if (isEnemy) {
			enemyPlayer.board.receiveAttack(this.dataset.row, this.dataset.col);
		} else {
			realPlayer.board.receiveAttack(this.dataset.row, this.dataset.col);
		}
		navDisplay(realPlayer, enemyPlayer);
	}
}

function colorShips(cell) {
	if (cell.textContent) {
		cell.classList.add('ship-color');
	}
}

// navDisplay(realPlayer, enemyPlayer);
