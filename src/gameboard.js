export class Ship {
	constructor(len, hits, sunk = false) {
		(this.len = len), (this.hits = hits), (this.sunk = sunk);
	}
	hit() {
		this.hits += 1;
		this.sunk = this.isSunk();
		return this.hits;
	}
	isSunk() {
		if (this.hits >= this.len) {
			return (this.sunk = true);
		}
		return false;
	}
}

export class Gameboard {
	constructor(name = null) {
		this.name = name;
		this.board = Array.from({ length: 10 }, () => new Array(10).fill(null));
		this.ships = {
			aircraftCarrier: new Ship(5, 0),
			battleship: new Ship(4, 0),
			cruiser: new Ship(3, 0),
			destroyer: new Ship(2, 0),
			submarine: new Ship(1, 0),
		};
		this.misses = 0;
		this.totalHits = 0;
		this.totalShots = this.misses + this.totalHits;
	}

	// set ship on board
	setShip(row, col, ship, isHorizontal = true) {
		// check if ship is valid
		if (this.ships.hasOwnProperty(ship)) {
			let count = 0;
			let shipValues = this.ships[ship];
			let lastColSquare = col + shipValues.len - 1;
			let lastRowSquare = row + shipValues.len - 1;

			// check if the boat will be off the board
			if (
				lastColSquare > 9 ||
				lastColSquare < 0 ||
				lastRowSquare > 9 ||
				lastRowSquare < 0
			) {
				throw new Error();
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
							throw new Error();
						}

						this.board[row][nextCol] = ship;
						col = nextCol;
						count++;
					} else {
						let nextRow = row + 1;
						if (nextRow > 9 || nextRow < 0) {
							throw new Error();
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
		this.ships[shipString].hit();

		this.totalHits += 1;
		return;
	}

	receiveAttack(x, y) {
		if (arguments.length === 0) return 'Please Enter Coordinates';

		if (typeof x !== 'number' || typeof y !== 'number') {
			return 'enter a number!';
		}

		if (this.board[x][y] == 'x' || this.board[x][y] == 'x!') return;
		if (this.board[x][y] != null || this.board[x][y] != undefined) {
			this.isHit(x, y);
			return 'Hit!';
		}
		this.board[x][y] = 'x';
		this.misses += 1;
		return 'Miss!';
	}

	shipsRemaining() {
		let startingShips = Object.keys(this.ships).length;
		let sunkedShips = 0;

		Object.entries(this.ships).forEach((e) => {
			if (e[1].sunk) {
				sunkedShips++;
			}
		});
		if (sunkedShips >= startingShips) {
			return 'All ships sunk!';
		}

		return startingShips - sunkedShips;
	}
}
export class Player {
	constructor(name) {
		this.board = new Gameboard(name);
	}
}
