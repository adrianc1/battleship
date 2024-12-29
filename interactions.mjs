import { Player } from './gameboard.js';

// init players
export const realPlayer = new Player('adrian');
export const enemyPlayer = new Player();

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

// select a spot
const cell = document.querySelectorAll('.unit-cell');
cell.forEach((unit) => {
	unit.addEventListener('click', () => {
		console.log(unit);
		let isSelected = unit.classList.contains('active');
		if (isSelected) {
			unit.classList.remove('active');
			return;
		}
		unit.classList.add('active');
		console.log(unit);
	});
});
console.log('ayyyoo');
