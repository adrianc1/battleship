import {
	updateCellUI,
	renderGameboard,
	updateNavDisplay,
	displayAttackInformation,
} from './ui.js';

import { Player } from './gameboard.js';

function initPlayers() {
	const REAL_PLAYER = new Player('player');
	const ENEMY_PLAYER = new Player('enemy');
	renderGameboard(REAL_PLAYER);
	renderGameboard(ENEMY_PLAYER);

	return {
		REAL_PLAYER,
		ENEMY_PLAYER,
	};
}

function queueShips() {
	let shipArray = [];
	for (let ship in new Player().board.ships) {
		shipArray.push(ship);
	}
	return {
		shipArray,
	};
}

function dequeueShips(arr) {
	const dequeueShip = arr.shift();
	return dequeueShip;
}

const state = {
	isHorizontal: true,
};

function updateBoard(state, shipArray, player) {
	renderGameboard(player);
	let ship = dequeueShips(shipArray);
	const HORIZONTAL_BTN = document.getElementById('hor-btn');
	console.log('before CLICKING', state.isHorizontal);

	if (!HORIZONTAL_BTN.dataset.listenerAttached) {
		HORIZONTAL_BTN.addEventListener('click', toggleOrientation);
		HORIZONTAL_BTN.dataset.listenerAttached = true;
	}

	addShipsToBoard(player, shipArray, ship, state);
}

const toggleOrientation = (e) => {
	const HORIZONTAL_BTN = document.getElementById('hor-btn');
	console.log('before switch', state.isHorizontal);
	state.isHorizontal = !state.isHorizontal;
	console.log('after switch', state.isHorizontal);
	e.target.textContent = state.isHorizontal ? 'Horizontal' : 'Vertical';
};

function addShipsToBoard(player, shipArray, ship, state) {
	const CELLS = document.querySelectorAll('.player-cell');
	CELLS.forEach((cell) => {
		cell.addEventListener('click', (e) => {
			if (
				!player.board.setShip(
					Number(e.target.dataset.row),
					Number(e.target.dataset.col),
					ship,
					state.isHorizontal
				)
			) {
				return;
			}
			updateBoard(state, shipArray, player);
		});
	});
}

const gameControllers = (shipArray, players) => {
	const HORIZONTAL_BTN = document.getElementById('hor-btn');
	const START_GAME_BTN = document.getElementById('start-game-btn');
	const RESET_GAME_BTN = document.getElementById('restart-btn');

	START_GAME_BTN.addEventListener('click', () => {
		if (shipArray.length > 0) {
			return;
		}
		START_GAME_BTN.textContent = 'Attack In Progress';
		HORIZONTAL_BTN.style.display = 'none';
		game(players.REAL_PLAYER, players.ENEMY_PLAYER);
		return;
	});

	RESET_GAME_BTN.addEventListener('click', () => {
		location.reload();
	});
};

const cpuTurn = (realPlayer, enemyPlayer) => {
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
};

function game(realPlayer, enemyPlayer) {
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

export { gameControllers, updateBoard, initPlayers, queueShips, state };
