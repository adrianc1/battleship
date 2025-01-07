import { Player } from './gameboard.js';
import { updateCellUI, renderGameboard } from './ui.js';

function playerTurn(turn) {
	let currentPlayerTurn = turn;
	if (currentPlayerTurn) {
		// player makes selection
		currentPlayerTurn = false;
	} else {
		// computer makes selection
		cpuTurn();
		currentPlayerTurn = true;
	}
}

export function cpuTurn(realPlayer, enemyPlayer) {
	let rowI = Math.floor(Math.random() * 10);
	let colI = Math.floor(Math.random() * 10);
	let hmo = realPlayer.board.receiveAttack(rowI, colI);

	if (realPlayer.board.shipsRemaining() == 'All ships sunk!') {
		alert('game over! ENEMY WINS!');
	}

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
	checkGameStatus(realPlayer, enemyPlayer);
}

function game() {
	// init players
	const realPlayer = new Player('player');
	const enemyPlayer = new Player();
	let Cells = document.querySelectorAll('.gb');
	let isGameOver = false;

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
	console.log('shit');
	renderGameboard(realPlayer);
	renderGameboard(enemyPlayer);

	Cells.forEach((cell) => {
		cell.addEventListener('click', () => {
			if (enemyPlayer.board.shipsRemaining() == 'All ships sunk!') {
				alert('game over!');
			}
			cpuTurn(realPlayer, enemyPlayer);
		});
	});

	console.log(realPlayer.board.shipsRemaining());
}

function checkGameStatus(pb, eb) {
	if (
		pb.board.shipsRemaining() == 'All ships sunk!' ||
		eb.board.shipsRemaining() == 'All ships sunk!'
	) {
		return true;
	}
	return false;
}

game();
export { playerTurn };
