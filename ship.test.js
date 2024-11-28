const Ship = require('./ship.js');
const Gameboard = require('./gameboard.js');

describe('Ship Object and Methods working', () => {
	const ship = new Ship(5, 0);

	test('Ship object created', () => {
		expect(ship).toEqual({ len: 5, hits: 0, sunk: false });
	});
	test('hit method exists', () => {
		expect(typeof ship.hit).toBe('function');
	});
	test('isSunk method exists', () => {
		expect(typeof ship.isSunk).toBe('function');
	});
});

describe('testing hit and is sunk methods', () => {
	const ship = new Ship(5, 2);
	const smallShip = new Ship(1, 0);
	ship.hit();
	smallShip.hit();
	test('successful hit', () => {
		expect(ship.hits).toBe(3);
	});
	test('Ship has not sunk!', () => {
		expect(ship.sunk).toBeFalsy();
	});
	test('Small small has sunk!', () => {
		expect(smallShip.sunk).toBeTruthy();
	});
});

describe('Gameboard testing', () => {
	const playergb = new Gameboard();
	playergb.board[1][2] = 'x';
	test('receiveAttack coordinates', () => {
		expect(playergb.receiveAttack()).toEqual('Please Enter Coordinates');
		expect(playergb.receiveAttack(3, 3)).toEqual('Miss!');
		expect(playergb.receiveAttack(1, 2)).toEqual('Hit!');
	});
});
