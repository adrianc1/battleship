const Ship = require('./ship.js');

class Gameboard {
	constructor() {
		this.board = Array.from({ length: 10 }, () => new Array(10).fill(null));
		this.aircraftCarrier = new Ship(5, 0);
		this.battleship = new Ship(4, 0);
		this.cruiser = new Ship(3, 0);
		this.destroyer = new Ship(2, 0);
		this.submarine = new Ship(1, 0);
	}

	getBoard() {
		return this.board;
	}

	isHit(x, y) {}

	receiveAttack(x, y) {
		if (arguments.length === 0) return 'Please Enter Coordinates';

		if (this.board[x][y] != null) {
			return 'Hit!';
		}
		return 'Miss!';
	}
}

const gb = new Gameboard();
console.log(gb);
module.exports = Gameboard;
