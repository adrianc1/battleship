const Ship = require('./ship.js');

describe('Ship Object and Methods working', () => {
	const ship = new Ship(5, 0);

	test('Ship object created', () => {
		expect(ship).toEqual({ len: 5, hits: 0 });
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
