import {
	gameControllers,
	updateBoard,
	initPlayers,
	queueShips,
	state,
} from './gameLogic.js';
import './styling/style.css';

function init() {
	let players = initPlayers();
	let shipArray = queueShips().shipArray;
	updateBoard(state, shipArray, players.REAL_PLAYER);
	gameControllers(shipArray, players);
}

init();
