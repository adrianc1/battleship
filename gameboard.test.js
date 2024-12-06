const Gameboard = require('./gameboard.js');

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
		expect(playergb.setShip(9, 9, 'cruiser')).toEqual('Not a valid placement');
		expect(playergb.setShip(0, 8, 'aircraftCarrier')).toEqual(
			'Not a valid placement'
		);
	});
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

	it('should display hit marker and sink ship', () => {
		gb.receiveAttack(9, 9);
		expect(gb.submarine.sunk).toEqual(true);
	});
});
