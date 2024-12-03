const Gameboard = require('./gameboard.js');

describe('Gameboard testing', () => {
	const playergb = new Gameboard();
	playergb.board[2][2] = 'x';
	it('should receive attack coordinates and display hit or miss', () => {
		expect(playergb.receiveAttack()).toEqual('Please Enter Coordinates');
		expect(playergb.receiveAttack(3, 3)).toEqual('Miss!');
		expect(playergb.receiveAttack(2, 2)).toEqual('Hit!');
	});

	it('should place a ships at coordinates', () => {
		playergb.setShip(5, 6, 'submarine');
		playergb.setShip(0, 0, 'destroyer');

		expect(playergb.board[5][6]).toEqual('submarine');
		expect(playergb.board[0][0]).toEqual('destroyer');
		expect(playergb.setShip(0, 0, 'fakeShip')).toEqual('Not a valid ship');
	});
});

describe('ship should span appropriate length', () => {
	const playergb = new Gameboard();
	playergb.setShip(0, 0, 'destroyer');
	expect(playergb.board[1][0]).toEqual('destroyer');
});
