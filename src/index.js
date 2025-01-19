// import './ui.js';
import { game } from './gameLogic.js';
import { Player } from './gameboard.js';
import { renderGameboard } from './ui.js';

import './styling/style.css';

const REAL_PLAYER = new Player('player');
renderGameboard(REAL_PLAYER);
const CELLS = document.querySelectorAll('.player-cell');

for (let ship in REAL_PLAYER.board.ships) {
	CELLS.forEach((cell) =>
		cell.addEventListener('click', (e) => {
			let r = e.target.dataset.row;
			let c = e.target.dataset.col;
			REAL_PLAYER.board.setShip(r, c, ship, true);
			console.log(REAL_PLAYER);
		})
	);
}
