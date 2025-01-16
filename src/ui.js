const playerContainer = document.getElementById('player-main');
const playerGameboardEl = document.getElementById('player-gameboard');
const computerContainer = document.getElementById('computer-main');
const computerGameboardEl = document.getElementById('computer-gameboard');
const generalBoardEl = document.querySelectorAll('.gb');

// display nav and scoring
export function navDisplay(player, evil) {
	const playerHits = document.getElementById('player-hits');
	const enemyHits = document.getElementById('enemy-hits');
	const playerMisses = document.getElementById('player-misses');
	const enemyMisses = document.getElementById('enemy-misses');
	const playerShipsRemaining = document.getElementById(
		'player-ships-remaining'
	);
	const enemyShipsRemaining = document.getElementById('enemy-ships-remaining');

	playerHits.textContent = 'Player Received Hits: ';
	enemyHits.textContent = 'Hits: ';
	playerMisses.textContent = 'Misses: ';
	enemyMisses.textContent = 'Misses: ';
	playerShipsRemaining.textContent = 'Player Ships Remaining: ';
	enemyShipsRemaining.textContent = 'Enemy Ships Remaining: ';

	playerHits.textContent += player.board.totalHits;
	enemyHits.textContent += evil.board.totalHits;

	playerMisses.textContent += player.board.misses;
	enemyMisses.textContent += evil.board.misses;

	playerShipsRemaining.textContent += player.board.shipsRemaining();
	enemyShipsRemaining.textContent += evil.board.shipsRemaining();
}

export function updateCellUI(element, hom) {
	let isSelected = element.classList.contains('active');
	if (isSelected) {
		return;
	} else if (hom == 'Hit!') {
		element.classList.add('active');
		element.textContent = hom;
		element.classList.remove('ship-color');
	} else if (hom == 'Miss!') {
		element.classList.add('active');
		element.classList.add('miss');
	}
}

function colorShips(cell) {
	if (cell.classList.contains('ship')) {
		cell.classList.add('ship-color');
	}
}

export function renderGameboard(currBoard) {
	let l = 1;

	currBoard.board.board.forEach((row, rowIndex) => {
		row.forEach((col, colIndex) => {
			let newDivElement = document.createElement('div');
			newDivElement.classList.add('unit-cell');
			newDivElement.dataset.row = rowIndex;
			newDivElement.dataset.col = colIndex;

			// render player board
			if (currBoard.board.name == 'player') {
				playerGameboardEl.appendChild(newDivElement);
				// newDivElement.textContent = col;
				newDivElement.classList.add('player');
				newDivElement.id = `player-cell-${l}`;
				l++;
				if (col) {
					newDivElement.classList.add('ship');

					colorShips(newDivElement);
				}

				return;
			} else {
				newDivElement.id = `enemy-cell-${l}`;
				newDivElement.classList.add('enemy');
				computerGameboardEl.appendChild(newDivElement);
				l++;
			}
		});
	});
}
