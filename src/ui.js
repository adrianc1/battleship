import { realPlayer, enemyPlayer } from './interactions.js';
import { playerTurn } from './gameLogic.js';

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

export function updateCellUI(element, hom) {
	let isSelected = element.classList.contains('active');
	let isEnemy = element.classList.contains('enemy');
	if (isSelected) {
		return;
	} else if (hom == 'Hit!') {
		element.classList.add('active');
		element.textContent = hom;
		element.classList.remove('ship-color');
	} else {
		element.classList.add('active');
	}
}

function colorShips(cell) {
	if (cell.textContent) {
		cell.classList.add('ship-color');
	}
}

function renderGameboard(currBoard) {
	let l = 1;

	currBoard.board.board.forEach((row, rowIndex) => {
		row.forEach((col, colIndex) => {
			let newDivElement = document.createElement('div');
			newDivElement.classList.add('unit-cell');
			newDivElement.dataset.row = rowIndex;
			newDivElement.dataset.col = colIndex;
			newDivElement.textContent = col;
			newDivElement.addEventListener('click', () => {
				const hitOrMiss = currBoard.board.receiveAttack(rowIndex, colIndex);
				updateCellUI(newDivElement, hitOrMiss);
				playerTurn(false);
			});
			colorShips(newDivElement);

			// render player board
			if (currBoard.board.name == 'player') {
				newDivElement.classList.add('player');
				newDivElement.id = `player-cell-${l}`;
				playerGameboardEl.appendChild(newDivElement);
				l++;
				return;
			} else {
				newDivElement.id = `enemy-cell-${l}`;

				computerGameboardEl.appendChild(newDivElement);
				l++;
			}
		});
	});
}

renderGameboard(realPlayer);
renderGameboard(enemyPlayer);
navDisplay(realPlayer, enemyPlayer);

// console.log(filtered);
