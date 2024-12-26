import { realPlayer } from './interactions.js';

const playerContainer = document.getElementById('player-main');
const playerGameboardEl = document.getElementById('player-gameboard');
const computerContainer = document.getElementById('computer-main');
const computerGameboardEl = document.getElementById('computer-gameboard');
const generalBoardEl = document.getElementsByClassName('gameboard');

generalBoardEl.innerHTML = realPlayer.board.board;
