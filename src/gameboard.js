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
			if (this.validPlacement(row, col, ship, isHorizontal)) {
				this.placeShipAt(row, col, ship, isHorizontal);
				return true;
			} else {
				console.log('invalid spot!');
				return false;
			}
		}
	}

	placeShipAt(row, col, ship, isHorizontal) {
		let shipValues = this.ships[ship];
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

	isHit(x, y) {
		const shipString = this.board[x][y];
		this.board[x][y] = 'x!';
		this.ships[shipString].hit();
		this.totalHits += 1;
		return true;
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

		if (this.board[x][y] == 'x' || this.board[x][y] == 'x!') return false;

		if (this.board[x][y] != null || this.board[x][y] != undefined) {
			return this.isHit(x, y);
		}
		this.board[x][y] = 'x';
		this.misses += 1;
		return false;
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

	validPlacement(row, col, ship, isHorizontal) {
		let shipValues = this.ships[ship];

		for (let i = 0; i < shipValues.len; i++) {
			let currentRow = isHorizontal ? row : row + i;
			let currentCol = isHorizontal ? col + i : col;

			// Check if the cell itself is occupied or out of bounds
			if (
				currentRow < 0 ||
				currentRow > 9 ||
				currentCol < 0 ||
				currentCol > 9 ||
				(this.board[currentRow] && this.board[currentRow][currentCol] != null)
			) {
				return false;
			}

			// Check the surrounding cells (bounding box around the ship segment)
			const neighbors = [
				[currentRow - 1, currentCol - 1],
				[currentRow - 1, currentCol],
				[currentRow - 1, currentCol + 1], // Above
				[currentRow, currentCol - 1],
				[currentRow, currentCol + 1], // Left/Right
				[currentRow + 1, currentCol - 1],
				[currentRow + 1, currentCol],
				[currentRow + 1, currentCol + 1], // Below
			];

			for (const [nRow, nCol] of neighbors) {
				if (
					nRow >= 0 &&
					nRow <= 9 && // Ensure neighbor is within bounds
					nCol >= 0 &&
					nCol <= 9 &&
					this.board[nRow] &&
					this.board[nRow][nCol] != null
				) {
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
