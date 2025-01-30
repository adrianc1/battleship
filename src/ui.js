const playerGameboardEl = document.getElementById('player-gameboard');
const computerGameboardEl = document.getElementById('computer-gameboard');

// display nav and scoring
export function updateNavDisplay(player, evil) {
	const PLAYER_HITS = document.getElementById('player-hits');
	const ENEMY_HITS = document.getElementById('enemy-hits');
	const PLAYER_MISSES = document.getElementById('player-misses');
	const ENEMY_MISSES = document.getElementById('enemy-misses');
	const PLAYER_SHIPS_REMAINING = document.getElementById(
		'player-ships-remaining'
	);
	const ENEMY_SHIPS_REMAINING = document.getElementById(
		'enemy-ships-remaining'
	);

	PLAYER_HITS.textContent = `Player Received Hits: ${player.board.totalHits}`;
	PLAYER_MISSES.textContent = `Misses: ${player.board.misses}`;
	PLAYER_SHIPS_REMAINING.textContent = `Player Ships Remaining: ${player.board.shipsRemaining()}`;

	ENEMY_HITS.textContent = `Hits: ${evil.board.totalHits}`;
	ENEMY_MISSES.textContent = `Misses: ${evil.board.misses}`;
	ENEMY_SHIPS_REMAINING.textContent = `Enemy Ships Remaining: ${evil.board.shipsRemaining()} `;
}

export function updateCellUI(element, isHitSuccessful) {
	if (!element) return;
	let isActive = element.classList.contains('active');
	if (isActive) {
		return;
	} else if (isHitSuccessful) {
		element.classList.add('active');
		element.classList.add('ship');

		element.textContent = '';
		element.classList.remove('ship-color');
	} else if (!isHitSuccessful) {
		element.classList.add('active');
		element.classList.add('miss');
	}
}

function colorShips(cell) {
	if (cell.classList.contains('ship')) {
		cell.classList.add('ship-color');
	}
	return;
}

export function clearBoard(currBoard) {
	if (currBoard.name == 'player') {
		playerGameboardEl.textContent = '';
		return;
	}
	computerGameboardEl.textContent = '';
	return;
}

export function renderGameboard(currBoard) {
	clearBoard(currBoard);
	let ships = ['Carrier', 'Destroyer', 'Submarine', 'Cruiser', 'Battleship'];
	currBoard.board.board.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			let newDivElement = document.createElement('div');
			newDivElement.classList.add('unit-cell');
			newDivElement.dataset.row = rowIndex;
			newDivElement.dataset.col = colIndex;

			if (currBoard.name == 'player') {
				playerGameboardEl.appendChild(newDivElement);
				newDivElement.classList.add('player-cell');
				for (let s of ships) {
					if (cell == s) {
						newDivElement.classList.add('ship');
						colorShips(newDivElement);
					} else if (cell == 'x') {
						updateCellUI(newDivElement, false);
					} else if (cell == 'x!') {
						newDivElement.classList.add('ship');
						newDivElement.classList.add('active');
						updateCellUI(newDivElement, true);
					}
				}
			} else {
				computerGameboardEl.appendChild(newDivElement);
				newDivElement.classList.add('enemy');

				for (let s of ships) {
					if (cell == s) {
						newDivElement.classList.add('ship');
						colorShips(newDivElement);
					} else if (cell == 'x') {
						updateCellUI(newDivElement, false);
					} else if (cell == 'x!') {
						newDivElement.classList.add('active');
						updateCellUI(newDivElement, true);
					}
				}
			}
		});
	});
}

export function displayAttackInformation(currBoard, status) {
	const pb = document.getElementById('attack-status-pb');
	const eb = document.getElementById('attack-status-eb');

	if (currBoard.board.name == 'player') {
		if (status) {
			pb.textContent = `Hit!`;
		} else {
			pb.textContent = 'Miss!';
		}
	} else {
		if (status) {
			eb.textContent = `Hit!`;
		} else {
			eb.textContent = 'Miss!';
		}
	}
}

export function resetBoard(player, enemy) {
	const modal = document.getElementById('main-modal-container');

	player.board.board.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			player.board.board[rowIndex][colIndex] = null;
		});
	});

	player.board.totalHits = 0;
	player.board.misses = 0;

	enemy.board.board.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			enemy.board.board[rowIndex][colIndex] = null;
		});
	});
	enemy.board.totalHits = 0;
	enemy.board.misses = 0;
	enemy.board.shipsRemaining();

	updateNavDisplay(player, enemy);

	modal.style.display = 'none';
}
