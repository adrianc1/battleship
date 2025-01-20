import { game } from './gameLogic.js';
import { Player } from './gameboard.js';
import { renderGameboard, clearBoard } from './ui.js';
import './styling/style.css';

const REAL_PLAYER = new Player('player');
const ENEMY_PLAYER = new Player('enemy');
renderGameboard(REAL_PLAYER);
renderGameboard(ENEMY_PLAYER);
let shipArray = [];

for (let ship in REAL_PLAYER.board.ships) {
	shipArray.push(ship);
}

function dQ(arr) {
	const dequeueShip = arr.shift();
	return dequeueShip;
}

function updateBoard(isHorizontal = true) {
	const horBtn = document.getElementById('hor-btn');
	horBtn.textContent = 'Horizontal';

	clearBoard(REAL_PLAYER);
	renderGameboard(REAL_PLAYER);

	horBtn.addEventListener('click', () => {
		if (isHorizontal == true) {
			horBtn.textContent = ' Vertical';
			isHorizontal = false;
		} else {
			console.log('it aint ');
			horBtn.textContent = 'Horizontal';
			isHorizontal = true;
		}
	});

	// Re-select cells and reattach listeners after rendering
	const CELLS = document.querySelectorAll('.player-cell');
	CELLS.forEach((cell) => {
		cell.addEventListener('click', (e) => {
			if (
				!REAL_PLAYER.board.setShip(
					Number(e.target.dataset.row),
					Number(e.target.dataset.col),
					ship,
					isHorizontal
				)
			) {
				return;
			}

			// Update ship and log the result

			ship = dQ(shipArray);
			updateBoard();
		});
	});
}

const startGameBtn = document.getElementById('start-game-btn');
const resetGameBtn = document.getElementById('restart-btn');
startGameBtn.addEventListener('click', () => {
	if (shipArray.length > 0) {
		return;
	}
	game(REAL_PLAYER, ENEMY_PLAYER);
});
resetGameBtn.addEventListener('click', () => {
	clearBoard(REAL_PLAYER);
	clearBoard(ENEMY_PLAYER);
	renderGameboard(REAL_PLAYER);
	renderGameboard(ENEMY_PLAYER);
	updateBoard();
});

let ship = dQ(shipArray);
updateBoard(); // Initial call
