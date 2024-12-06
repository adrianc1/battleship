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

	// set ship on board
	setShip(row, col, ship, isHorizontal = true) {
		// check if ship is valid
		if (this.hasOwnProperty(ship)) {
			let count = 0;
			let shipValues = this[ship];
			let lastColSquare = col + shipValues.len - 1;
			let lastRowSquare = row + shipValues.len - 1;

			// check if the boat will be off the board
			if (
				lastColSquare > 9 ||
				lastColSquare < 0 ||
				lastRowSquare > 9 ||
				lastRowSquare < 0
			) {
				return 'Not a valid placement';
			}

			this.board[row][col] = ship;
			count++;

			// iterate over grid
			while (count < shipValues.len) {
				for (let i = 1; i < shipValues.len; i++) {
					// check if ship can be placed horizontal
					if (isHorizontal) {
						let nextCol = col + 1;
						if (nextCol > 9 || nextCol < 0) {
							return 'Not a valid placement';
						}

						this.board[row][nextCol] = ship;
						col = nextCol;
						count++;
					} else {
						let nextRow = row + 1;
						if (nextRow > 9 || nextRow < 0) {
							return 'Not a valid placement';
						}
						count++;
						this.board[nextRow][col] = ship;
						row = nextRow;
					}
				}
			}
			return ship;
		}
		return 'Not a valid ship';
	}

	getBoard() {
		return this.board;
	}

	isHit(x, y) {
		const shipString = this.board[x][y];
		this.board[x][y] = 'x!';
		this[shipString].hit();

		console.log(this[shipString]);
		return;
	}

	receiveAttack(x, y) {
		if (arguments.length === 0) return 'Please Enter Coordinates';

		if (this.board[x][y] != null) {
			this.isHit(x, y);
			return 'Hit!';
		}
		this.board[x][y] = 'x';
		return 'Miss!';
	}
}

const gb = new Gameboard();
gb.setShip(0, 0, 'aircraftCarrier');
gb.setShip(1, 4, 'cruiser', false);
gb.setShip(6, 6, 'destroyer');
gb.setShip(9, 9, 'submarine');
gb.setShip(2, 3, 'battleship', false);
gb.receiveAttack(9, 9);

gb.receiveAttack(2, 0);
gb.receiveAttack(2, 9);
console.log(gb);
module.exports = Gameboard;
