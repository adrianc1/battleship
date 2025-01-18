import { Player } from './gameboard.js';
import {
	updateCellUI,
	renderGameboard,
	updateNavDisplay,
	displayAttackInformation,
} from './ui.js';

export function cpuTurn(realPlayer, enemyPlayer) {
	let row = Math.floor(Math.random() * 10);
	let col = Math.floor(Math.random() * 10);
	let attackStatus = realPlayer.board.receiveAttack(row, col);
	let Cells = document.querySelectorAll('.unit-cell');

	let filtered = Array.from(Cells).filter((cell) => {
		if (
			cell.dataset.col == col &&
			cell.dataset.row == row &&
			cell.classList.contains('player')
		) {
			if (cell.classList.contains('active')) {
				setTimeout(() => {
					cpuTurn(realPlayer, enemyPlayer);
				}, 800);
			}
			return cell;
		}
	});

	updateCellUI(filtered[0], attackStatus);
	updateNavDisplay(realPlayer, enemyPlayer);

	if (checkHit(attackStatus, realPlayer)) {
		cpuTurn(realPlayer, enemyPlayer);
	}
}

export function game() {
	// init players
	const realPlayer = new Player('player');
	const enemyPlayer = new Player();
	let enemyBoardEl = document.getElementById('computer-gameboard');
	randomizeShipCoordinates(realPlayer, enemyPlayer);
	renderGameboard(realPlayer);
	renderGameboard(enemyPlayer);
	updateNavDisplay(realPlayer, enemyPlayer);

	enemyBoardEl.addEventListener('click', (e) => {
		if (e.target.classList.contains('active')) {
			return;
		}
		let r = Number(e.target.dataset.row);
		let c = Number(e.target.dataset.col);
		const attackStatus = enemyPlayer.board.receiveAttack(r, c);

		updateCellUI(e.target, attackStatus);
		updateNavDisplay(realPlayer, enemyPlayer);

		if (checkHit(attackStatus, enemyPlayer)) {
			return;
		}

		cpuTurn(realPlayer, enemyPlayer);
	});
}

function randomNumber() {
	return Math.floor(Math.random() * 9);
}

function randomOrientation() {
	return Math.random() < 0.5;
}

function checkHit(status, currBoard) {
	displayAttackInformation(currBoard, status);
	if (status) {
		const check = currBoard.board.shipsRemaining();
		if (check == 'All ships sunk!') {
			if (currBoard.board.name == 'player') {
				alert('GAME OVER, YOU LOSE!!!');
				return;
			}
			alert('game over!!, YOU WIN!!!');
		}
		return true;
	}
}

function randomizeShipCoordinates(realPlayer, enemyPlayer) {
	realPlayer.board.setShip(0, 0, 'Carrier', randomOrientation());
	realPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'Cruiser',
		randomOrientation()
	);
	realPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'Destroyer',
		randomOrientation()
	);
	realPlayer.board.setShip(randomNumber(), randomNumber(), 'Submarine');

	realPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'Battleship',
		randomOrientation()
	);

	// randomly set computer ships on gameboard
	enemyPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'Carrier',
		randomOrientation()
	);
	enemyPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'Cruiser',
		randomOrientation()
	);
	enemyPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'Destroyer',
		randomOrientation()
	);
	enemyPlayer.board.setShip(randomNumber(), randomNumber(), 'Submarine');
	enemyPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'Battleship',
		randomOrientation()
	);
}

game();
