// import './ui.js';
import { game } from './gameLogic.js';
import { Player } from './gameboard.js';
import { renderGameboard, clearBoard } from './ui.js';

import './styling/style.css';

const REAL_PLAYER = new Player('player');
// const ENEMY_PLAYER = new Player();

renderGameboard(REAL_PLAYER);

const CELLS = document.querySelectorAll('.player-cell');

let shipArray = [];
for (let ship in REAL_PLAYER.board.ships) {
	shipArray.push(ship);
}

function dQ(arr) {
	const dequeueShip = arr.shift();
	return dequeueShip;
}
let ship = dQ(shipArray);

function updateBoard() {
	clearBoard(REAL_PLAYER);
	renderGameboard(REAL_PLAYER);

	// Re-select cells and reattach listeners after rendering
	const CELLS = document.querySelectorAll('.player-cell');
	CELLS.forEach((cell) => {
		cell.addEventListener('click', (e) => {
			if (!ship) {
				game(REAL_PLAYER);
				return;
			}

			if (
				!REAL_PLAYER.board.setShip(
					Number(e.target.dataset.row),
					Number(e.target.dataset.col),
					ship,
					true
				)
			) {
				return;
			}

			// Update ship and log the result
			ship = dQ(shipArray);
			console.log('Next ship to place:', ship);
			console.log('Remaining ships:', shipArray);

			if (!ship) {
				console.log('All ships placed successfully!');
			}
			updateBoard();
		});
	});
}
updateBoard(); // Initial call
