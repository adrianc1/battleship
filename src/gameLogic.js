import { Player } from './gameboard.js';
import { updateCellUI } from './ui.js';
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
	}
}

export function cpuTurn() {
	let rowI = Math.floor(Math.random() * 10);
	let colI = Math.floor(Math.random() * 10);
	let hmo = realPlayer.board.receiveAttack(rowI, colI);

	let Cells = document.querySelectorAll('.unit-cell');
	let player = document.querySelectorAll('.player');

	let filtered = Array.from(Cells).filter((cell) => {
		if (
			cell.dataset.col == colI &&
			cell.dataset.row == rowI &&
			cell.classList.contains('player')
		) {
			return cell;
		}
	});

	updateCellUI(filtered[0], hmo);
}

export { realPlayer, enemyPlayer, playerTurn };
