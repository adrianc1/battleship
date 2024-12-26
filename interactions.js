import { Gameboard, Player, Ship } from './gameboard.js';

// init players
export const realPlayer = new Player();
export const computer = new Player();

// manually set ships
realPlayer.board.setShip(0, 0, 'aircraftCarrier');
realPlayer.board.setShip(1, 4, 'cruiser', false);
realPlayer.board.setShip(6, 6, 'destroyer');
realPlayer.board.setShip(9, 9, 'submarine');
realPlayer.board.setShip(2, 3, 'battleship', false);
// manually set computer ships on gameboard
computer.board.setShip(0, 0, 'aircraftCarrier', false);
computer.board.setShip(2, 2, 'cruiser', false);
computer.board.setShip(6, 6, 'destroyer');
computer.board.setShip(9, 9, 'submarine');
computer.board.setShip(2, 3, 'battleship', false);

console.log(realPlayer.board.getBoard());
console.log(computer.board.getBoard());
