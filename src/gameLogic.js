import { Player } from './gameboard.js';
import { updateCellUI, renderGameboard, updateNavDisplay } from './ui.js';

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
				cpuTurn(realPlayer, enemyPlayer);
			}
			return cell;
		}
	});

	updateCellUI(filtered[0], attackStatus);
	updateNavDisplay(realPlayer, enemyPlayer);

	if (repeatSuccessfulAttack(attackStatus, realPlayer)) {
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

	let debounceTimeout;
	enemyBoardEl.addEventListener('click', (e) => {
		if (e.target.classList.contains('active')) {
			return;
		}
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			let r = Number(e.target.dataset.row);
			let c = Number(e.target.dataset.col);
			const attackStatus = enemyPlayer.board.receiveAttack(r, c);
			updateCellUI(e.target, attackStatus);
			updateNavDisplay(realPlayer, enemyPlayer);

			if (repeatSuccessfulAttack(attackStatus, enemyPlayer)) {
				return;
			}
			cpuTurn(realPlayer, enemyPlayer);
		}, 250);
	});
}

function randomNumber() {
	return Math.floor(Math.random() * 10);
}

function randomOrientation() {
	return Math.random() < 0.5;
}

function repeatSuccessfulAttack(status, currBoard) {
	if (status == 'Hit!') {
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
	realPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'Carrier',
		randomOrientation()
	);
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
