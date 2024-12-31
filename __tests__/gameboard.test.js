import { Gameboard, Player, Ship } from '../src/gameboard.js';

describe('Gameboard testing', () => {
	const playergb = new Gameboard();

	playergb.setShip(2, 2, 'submarine');
	it('should receive attack coordinates and display hit or miss', () => {
		expect(playergb.receiveAttack()).toEqual('Please Enter Coordinates');
		expect(playergb.receiveAttack(3, 3)).toEqual('Miss!');
		expect(playergb.receiveAttack(2, 2)).toEqual('Hit!');
	});

	it('should place a ships at valid coordinates', () => {
		playergb.setShip(5, 6, 'submarine');
		playergb.setShip(0, 0, 'destroyer');

		expect(playergb.board[5][6]).toEqual('submarine');
		expect(playergb.board[0][0]).toEqual('destroyer');
		expect(playergb.setShip(0, 0, 'fakeShip')).toEqual('Not a valid ship');
		expect(() => playergb.setShip(9, 9, 'cruiser')).toThrow();
		expect(() => playergb.setShip(9, 9, 'cruiser', false)).toThrow();
	});
});

test('should throw an error for invalid ship placement', () => {
	const gameboard = new Gameboard();
	expect(() => gameboard.setShip(0, 8, 'aircraftCarrier')).toThrow();
});

describe('ship should span appropriate length', () => {
	const playergb = new Gameboard();
	playergb.setShip(0, 0, 'cruiser');
	playergb.setShip(1, 4, 'cruiser', false);
	it('should place ship horizontally', () => {
		expect(playergb.board[0][0]).toEqual('cruiser');
		expect(playergb.board[0][1]).toEqual('cruiser');
		expect(playergb.board[0][2]).toEqual('cruiser');
	});
	it('should place ship vertically', () => {
		expect(playergb.board[1][4]).toEqual('cruiser');
		expect(playergb.board[2][4]).toEqual('cruiser');
		expect(playergb.board[3][4]).toEqual('cruiser');
	});
});

describe('receiving hits', () => {
	const gb = new Gameboard();
	gb.setShip(0, 0, 'aircraftCarrier');
	gb.setShip(1, 4, 'cruiser', false);
	gb.setShip(6, 6, 'destroyer');
	gb.setShip(9, 9, 'submarine');
	gb.setShip(2, 3, 'battleship', false);
	gb.receiveAttack(9, 9);
	gb.receiveAttack(0, 6);
	gb.receiveAttack(0, 7);
	gb.receiveAttack(4, 7);
	gb.receiveAttack(0, 0);

	it('should display hit marker and sink ship', () => {
		expect(gb.ships.submarine.sunk).toEqual(true);
	});

	it('should display hit marker and not sink ship', () => {
		expect(gb.ships.aircraftCarrier.sunk).toEqual(false);
		expect(gb.board[0][0]).toEqual('x!');
	});

	it('should display missed marker and keep track of misses', () => {
		expect(gb.board[0][6]).toEqual('x');
		expect(gb.misses).toEqual(3);
		expect(gb.totalHits).toEqual(2);
	});
});

describe('report starting number of ships', () => {
	const gb = new Gameboard();
	gb.setShip(0, 0, 'aircraftCarrier');
	gb.setShip(1, 4, 'cruiser', false);
	gb.setShip(6, 6, 'destroyer');
	gb.setShip(9, 9, 'submarine');
	gb.setShip(2, 3, 'battleship', false);

	it('should report the starting number of ships', () => {
		expect(gb.shipsRemaining()).toEqual(5);
	});
});

describe('report remaining ships after they one is sunk', () => {
	const gb = new Gameboard();
	gb.setShip(0, 0, 'aircraftCarrier');
	gb.setShip(1, 4, 'cruiser', false);
	gb.setShip(6, 6, 'destroyer');
	gb.setShip(9, 9, 'submarine');
	gb.setShip(2, 3, 'battleship', false);

	gb.receiveAttack(9, 9);

	it('should report the remaining number of ships', () => {
		expect(gb.shipsRemaining()).toEqual(4);
	});
});

describe('report gameover, all ships sunk', () => {
	const gb = new Gameboard();
	gb.setShip(0, 0, 'aircraftCarrier');
	gb.setShip(1, 4, 'cruiser', false);
	gb.setShip(6, 6, 'destroyer');
	gb.setShip(9, 9, 'submarine');
	gb.setShip(2, 3, 'battleship', false);
	gb.receiveAttack(9, 9);
	gb.receiveAttack(0, 0);
	gb.receiveAttack(0, 1);
	gb.receiveAttack(0, 2);
	gb.receiveAttack(0, 3);
	gb.receiveAttack(0, 4);
	gb.receiveAttack(6, 6);
	gb.receiveAttack(6, 7);
	gb.receiveAttack(2, 3);
	gb.receiveAttack(3, 3);
	gb.receiveAttack(4, 3);
	gb.receiveAttack(5, 3);
	gb.receiveAttack(1, 4);
	gb.receiveAttack(2, 4);
	gb.receiveAttack(3, 4);

	it('should report that all ships have been sunk', () => {
		expect(gb.shipsRemaining()).toEqual('All ships sunk!');
	});
});

describe('player class', () => {
	const playergb = new Player();
	it('should have a ships property', () => {
		expect(playergb.board).toHaveProperty('ships');
	});
});
