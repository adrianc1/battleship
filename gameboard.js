const Ship = require('./ship.js');

class Gameboard {
	constructor() {
		this.board = Array.from({ length: 10 }, () => new Array(10).fill(null));
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
console.log(gb.board);
module.exports = Gameboard;
