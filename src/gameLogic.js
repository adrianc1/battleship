import { Player } from './gameboard.js';
import { attackCoordinate } from './ui.js';

// init players
const realPlayer = new Player('player');
const enemyPlayer = new Player();

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

function playerTurn(boo) {
	let currentPlayerTurn = boo;

	if (currentPlayerTurn) {
		// player makes selection
		currentPlayerTurn = false;
	} else {
		// computer makes selection
		cpuTurn();
		currentPlayerTurn = true;
		return;
	}
}

function cpuTurn() {
	let row = Math.floor(Math.random() * 10);
	let col = Math.floor(Math.random() * 10);
	realPlayer.board.receiveAttack(row, col);
	attackCoordinate();
}

export { realPlayer, enemyPlayer, playerTurn };
