import { Player } from './gameboard.js';
import { attackCoordinate, navDisplay } from './ui.js';

// init players
export const realPlayer = new Player('player');
export const enemyPlayer = new Player();
const playerGameboardEl = document.getElementById('player-gameboard');
const computerGameboardEl = document.getElementById('computer-gameboard');

// manually set ships
realPlayer.board.setShip(0, 0, 'aircraftCarrier');
realPlayer.board.setShip(1, 4, 'cruiser', false);
realPlayer.board.setShip(6, 6, 'destroyer');
realPlayer.board.setShip(9, 9, 'submarine');
realPlayer.board.setShip(2, 3, 'battleship', false);

// manually set computer ships on gameboard
enemyPlayer.board.setShip(0, 0, 'aircraftCarrier', false);
enemyPlayer.board.setShip(2, 2, 'cruiser', false);
enemyPlayer.board.setShip(6, 6, 'destroyer');
enemyPlayer.board.setShip(9, 9, 'submarine');
enemyPlayer.board.setShip(2, 3, 'battleship', false);

// break down board into cells
export function renderGameboard(currBoard) {
	let l = 1;
	let rowIndex = 0;
	let colIndex = 0;

	currBoard.board.board.forEach((row) => {
		row.forEach((col) => {
			let newDivElement = document.createElement('div');
			newDivElement.classList.add('unit-cell');
			newDivElement.dataset.row = rowIndex;
			newDivElement.dataset.col = colIndex;
			newDivElement.textContent = col;
			newDivElement.addEventListener('click', attackCoordinate);

			// render player board
			if (currBoard.board.name == 'player') {
				newDivElement.id = `player-cell-${l}`;
				playerGameboardEl.appendChild(newDivElement);
				l++;
				colIndex++;
				return;
			} else {
				newDivElement.id = `enemy-cell-${l}`;
				newDivElement.classList.add('enemy');
				computerGameboardEl.appendChild(newDivElement);
				l++;
				colIndex++;
			}
		});
		colIndex = 0;
		rowIndex++;
	});
}

const pb = renderGameboard(realPlayer);
const eb = renderGameboard(enemyPlayer);
// navDisplay(realPlayer, enemyPlayer);
