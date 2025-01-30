import {
	gameControllers,
	updateBoard,
	initPlayers,
	queueShips,
	state,
} from './game.js';
import './styling/style.css';
import { renderGameboard } from './ui.js';

(function init() {
	let players = initPlayers();
	let shipArray = queueShips().shipArray;
	console.log(players.REAL_PLAYER);
	renderGameboard(players.REAL_PLAYER);
	updateBoard(state, shipArray, players.REAL_PLAYER);
	gameControllers(shipArray, players);
})();
