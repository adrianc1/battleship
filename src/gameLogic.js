import {
	updateCellUI,
	renderGameboard,
	updateNavDisplay,
	displayAttackInformation,
} from './ui.js';

export function cpuTurn(realPlayer, enemyPlayer) {
	renderGameboard(realPlayer);
	renderGameboard(enemyPlayer);
	let row = Math.floor(Math.random() * 10);
	let col = Math.floor(Math.random() * 10);
	let attackStatus = realPlayer.board.receiveAttack(row, col);
	let Cells = document.querySelectorAll('.unit-cell');

	let filtered = Array.from(Cells).filter((cell) => {
		if (
			cell.dataset.col == col &&
			cell.dataset.row == row &&
			cell.classList.contains('player-cell')
		) {
			if (cell.classList.contains('active')) {
				setTimeout(() => {
					cpuTurn(realPlayer, enemyPlayer);
				}, 700);
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

export function game(realPlayer, enemyPlayer) {
	let enemyBoardEl = document.getElementById('computer-gameboard');
	randomizeShipCoordinates(enemyPlayer);
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

		setTimeout(() => {
			cpuTurn(realPlayer, enemyPlayer);
		}, 700);
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
		const modalWindow = document.getElementById('main-modal-container');
		if (check == 'All ships sunk!') {
			if (currBoard.board.name == 'player') {
				modalWindow.style.display = block;
				return;
			}
			modalWindow.style.display = 'block';
		}
		return true;
	}
}

function randomizeShipCoordinates(enemyPlayer) {
	console.log(enemyPlayer, 'ENENENENENENE');
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
