const playerContainer = document.getElementById('player-main');
const playerGameboardEl = document.getElementById('player-gameboard');
const computerContainer = document.getElementById('computer-main');
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
	currBoard.board.board.forEach((row, rowIndex) => {
		row.forEach((cell, colIndex) => {
			let newDivElement = document.createElement('div');
			newDivElement.classList.add('unit-cell');
			newDivElement.dataset.row = rowIndex;
			newDivElement.dataset.col = colIndex;

			if (currBoard.board.name == 'player') {
				playerGameboardEl.appendChild(newDivElement);
				newDivElement.classList.add('player');
				if (cell) {
					newDivElement.classList.add('ship');
					colorShips(newDivElement);
				}
			} else {
				newDivElement.classList.add('enemy');
				computerGameboardEl.appendChild(newDivElement);
			}
		});
	});
}
