import { Player } from '../src/gameboard';
describe('prevent from overlapping ships', () => {
	const player = new Player();
	player.board.setShip(0, 0, 'submarine');

	let validPlacementVar = player.board.validPlacement(1, 0);

	let invalidPlacement = player.board.validPlacement(0, 0);

	it('should alert and not allow to place a ship where a ship already is - return false', () => {
		expect(invalidPlacement).toEqual(false);
	});

	it('ALLOW to place a ship, return true', () => {
		expect(validPlacementVar).toEqual(true);
	});
});
