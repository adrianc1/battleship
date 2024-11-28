module.exports = class Ship {
	constructor(len, hits, sunk = false) {
		(this.len = len), (this.hits = hits), (this.sunk = sunk);
	}
	hit() {
		this.hits += 1;
		this.sunk = this.isSunk();
		return this.hits;
	}
	isSunk() {
		if (this.hits >= this.len) {
			return (this.sunk = true);
		}
		return false;
	}
};
