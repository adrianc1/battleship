import { Player } from './gameboard.js';
import { updateCellUI, renderGameboard, navDisplay } from './ui.js';

export function cpuTurn(realPlayer, enemyPlayer) {
	let rowI = Math.floor(Math.random() * 10);
	let colI = Math.floor(Math.random() * 10);
	let hmo = realPlayer.board.receiveAttack(rowI, colI);

	let Cells = document.querySelectorAll('.unit-cell');

	let filtered = Array.from(Cells).filter((cell) => {
		if (
			cell.dataset.col == colI &&
			cell.dataset.row == rowI &&
			cell.classList.contains('player')
		) {
			if (cell.classList.contains('active')) {
				cpuTurn(realPlayer, enemyPlayer);
			}
			return cell;
		}
	});

	updateCellUI(filtered[0], hmo);

	if (hmo == 'Hit!') {
		if (realPlayer.board.shipsRemaining() == 'All ships sunk!') {
			setTimeout(() => {
				alert('game over! ENEMY WINS!');
			}, 0);
			return;
		}
		setTimeout(() => {
			cpuTurn(realPlayer, enemyPlayer);
		}, 500);
	}
	navDisplay(realPlayer, enemyPlayer);
}

export function game() {
	// init players
	const realPlayer = new Player('player');
	const enemyPlayer = new Player();
	let enemyBoard = document.getElementById('computer-gameboard');

	// manually set ships
	realPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'aircraftCarrier',
		randomOrientation()
	);
	realPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'cruiser',
		randomOrientation()
	);
	realPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'destroyer',
		randomOrientation()
	);
	realPlayer.board.setShip(randomNumber(), randomNumber(), 'submarine');
	realPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'battleship',
		randomOrientation()
	);

	// manually set computer ships on gameboard
	enemyPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'aircraftCarrier',
		randomOrientation()
	);
	enemyPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'cruiser',
		randomOrientation()
	);
	enemyPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'destroyer',
		randomOrientation()
	);
	enemyPlayer.board.setShip(randomNumber(), randomNumber(), 'submarine');
	enemyPlayer.board.setShip(
		randomNumber(),
		randomNumber(),
		'battleship',
		randomOrientation()
	);
	renderGameboard(realPlayer);
	renderGameboard(enemyPlayer);
	navDisplay(realPlayer, enemyPlayer);

	// console.log(realPlayer.board.board);

	enemyBoard.addEventListener('click', (e) => {
		// check if cell is already selected
		if (e.target.classList.contains('active')) {
			return;
		}
		// get coordinates, attack cell, and update UI
		let r = Number(e.target.dataset.row);
		let c = Number(e.target.dataset.col);
		const attackStatus = enemyPlayer.board.receiveAttack(r, c);
		updateCellUI(e.target, attackStatus);

		// if a ship is hit, players turn again
		if (attackStatus == 'Hit!') {
			const check = enemyPlayer.board.shipsRemaining();
			navDisplay(realPlayer, enemyPlayer);
			updateCellUI(e.target, attackStatus);
			if (check == 'All ships sunk!') {
				// check if all ships have bee sunk
				setTimeout(() => {
					alert('game over!!, YOU WIN!!');
				}, 0);
				return;
			}
			return;
		}

		// computer's turn
		setTimeout(() => {
			cpuTurn(realPlayer, enemyPlayer);
		}, 800);

		// display score and game information
		navDisplay(realPlayer, enemyPlayer);
	});
}

function randomNumber() {
	return Math.floor(Math.random() * 10);
}

function randomOrientation() {
	return Math.random() < 0.5;
}

game();
