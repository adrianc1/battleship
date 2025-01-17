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
			Carrier: new Ship(5, 0),
			Battleship: new Ship(4, 0),
			Cruiser: new Ship(3, 0),
			Destroyer: new Ship(2, 0),
			Submarine: new Ship(2, 0),
		};
		this.misses = 0;
		this.totalHits = 0;
		this.totalShots = this.misses + this.totalHits;
	}

	// set ship on board
	setShip(row, col, ship, isHorizontal) {
		// check if ship is valid
		if (this.ships.hasOwnProperty(ship)) {
			let shipValues = this.ships[ship];
			let ranRow = Math.floor(Math.random() * 10);
			let ranCol = Math.floor(Math.random() * 10);

			if (this.validPlacement(row, col, shipValues, isHorizontal) == false) {
				return this.setShip(ranRow, ranCol, ship, isHorizontal);
			}

			// iterate over grid to place ships
			for (let i = 1; i < shipValues.len; i++) {
				this.board[row][col] = ship;
				if (isHorizontal) {
					let nextCol = col + 1;
					this.board[row][nextCol] = ship;
					col = nextCol;
				} else {
					let nextRow = row + 1;
					this.board[nextRow][col] = ship;
					row = nextRow;
				}
			}
		}
		return 'Not a valid ship';
	}

	getBoard() {
		return this.board;
	}

	isHit(x, y) {
		const shipString = this.board[x][y];
		const pb = document.getElementById('attack-status-pb');
		const eb = document.getElementById('attack-status-eb');
		this.board[x][y] = 'x!';
		this.ships[shipString].hit();
		this.totalHits += 1;

		if (this.ships[shipString].isSunk()) {
			return (eb.textContent = `${shipString} has been sunk!!`);
		}
		eb.textContent = `${shipString} has been hit!`;
		return;
	}

	receiveAttack(x, y) {
		// ensure coordinates are passed
		if (arguments.length === 0) return 'Please Enter Coordinates';

		// ensure a number is passed
		if (
			typeof x !== 'number' ||
			typeof y !== 'number' ||
			this.board == undefined
		) {
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

	validPlacement(row, col, v, isHorizontal) {
		let shipValues = v;

		for (let i = 0; i < shipValues.len; i++) {
			// check if ship can be placed horizontal
			if (isHorizontal) {
				if (col + i > 9 || this.board[row][col + i] != null) {
					return false;
				}
			} else {
				if (row + i > 9 || this.board[row + i][col] != null) {
					return false;
				}
			}
		}
		return true;
	}
}
export class Player {
	constructor(name) {
		this.board = new Gameboard(name);
	}
}

export function randomPlacement() {}
