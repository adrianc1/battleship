const Ship = require('./ship.js');

class Gameboard {
	constructor() {
		this.board = Array.from({ length: 10 }, () => new Array(10).fill(null));
		this.ships = {
			aircraftCarrier: new Ship(5, 0),
			battleship: new Ship(4, 0),
			cruiser: new Ship(3, 0),
			destroyer: new Ship(2, 0),
			submarine: new Ship(1, 0),
		};
		this.aircraftCarrier = new Ship(5, 0);
		this.battleship = new Ship(4, 0);
		this.cruiser = new Ship(3, 0);
		this.destroyer = new Ship(2, 0);
		this.submarine = new Ship(1, 0);
		this.misses = 0;
		this.totalHits = 0;
		this.totalShots = this.misses + this.totalHits;
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

		this.totalHits += 1;
		return;
	}

	receiveAttack(x, y) {
		if (arguments.length === 0) return 'Please Enter Coordinates';

		if (this.board[x][y] != null || this.board[x][y] != undefined) {
			this.isHit(x, y);
			return 'Hit!';
		}
		this.board[x][y] = 'x';
		this.misses += 1;
		return 'Miss!';
	}

	shipsRemaining() {
		return 'All ships sunk!';
	}
}

// class Player {
// 	constructor() {
// 		this.playerGameboard = new Gameboard();
// 	}
// }

const gb = new Gameboard();

console.log(Object.keys(gb.ships).length);

module.exports = Gameboard;
