import { game } from './gameLogic.js';
import { Player } from './gameboard.js';
import { renderGameboard, clearBoard, resetBoard } from './ui.js';
import './styling/style.css';

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

	shipOrientation(state);

	// Re-select cells and reattach listeners after rendering
	addShipsToBoard(player, shipArray, ship, state);
}

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
function shipOrientation(state) {
	const HORIZONTAL_BTN = document.getElementById('hor-btn');
	HORIZONTAL_BTN.addEventListener('click', () => {
		state.isHorizontal = !state.isHorizontal;
		HORIZONTAL_BTN.textContent = state.isHorizontal ? 'Horizontal' : 'Vertical';
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

(function init() {
	let players = initPlayers();
	let shipArray = queueShips().shipArray;

	updateBoard(state, shipArray, players.REAL_PLAYER);
	gameControllers(shipArray, players);
})();
