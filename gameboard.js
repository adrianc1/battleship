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

	setShip(x, y, ship) {
		const Xmoves = [1, -1, 0, 0];
		const Ymoves = [0, 0, 1, -1];
		let count = 0;
		let isHorizontal = false;

		if (this.hasOwnProperty(ship)) {
			this.board[x][y] = ship;
			let shipValues = this[ship];
			count++;

			while (count < shipValues.len) {
				for (let i = 1; i < shipValues.len; i++) {
					if (isHorizontal) {
						let nx = x + 1;
						if (x + 1 > 10) {
							isHorizontal = false;
							break;
						}
						count++;
						this.board[nx][y] = ship;
						x = nx;
					} else {
						let ny = y + 1;
						if (y + 1 > 10) {
							isHorizontal = true;
							break;
						}
						count++;
						this.board[x][y + 1] = ship;
						y = ny;
					}
				}
			}
		}

		if (this.hasOwnProperty(ship)) {
			// while (count < shipValues.len) {
			// 	for (let i = 0; i < Xmoves.length; i++) {
			// 		let nx = x + Xmoves[i];
			// 		let ny = y + Ymoves[i];

			// 		if (nx < 0 || ny < 0) continue;
			// 		if (nx > 10 || ny > 10) continue;

			// 		this.board[nx][ny] = ship;
			// 		x = nx;
			// 		y = ny;
			// 		count++;
			// 		break;
			// 	}
			// }
			return this[ship];
		}
		return 'Not a valid ship';
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

gb.setShip(0, 0, 'cruiser');

console.log(gb);
module.exports = Gameboard;
