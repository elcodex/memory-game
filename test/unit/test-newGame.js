
const {newGame} = require('../../src/logic/memory-game.js');
const {getAllCardNames} = require('../../src/logic/generate-cards.js');

const {describe, it} = require('mocha');
const {assert} = require('chai');

describe('Testing Game', () => {
    describe('setup: ', () => {
        let game = newGame(getAllCardNames(), 9, 2);

        it('is object', () => assert.isObject(game));
        it('has properties', () => assert.hasAllKeys(game, ['turn', 'open', 'closeAll', 'currentState']));
        it("property 'turn' is function", () => assert.isFunction(game.turn));
        it("property 'open' is function", () => assert.isFunction(game.open));
        it("property 'closeAll' is function", () => assert.isFunction(game.closeAll));
        it("property 'currentState' is function", () => assert.isFunction(game.currentState));
    });

    describe('play the game (turn)', () => {
        it('open matched cards', () => {
            let game = newGame(['2D', 'KD'], 2, 2);
            const initialState = game.currentState();
            const firstIndex = initialState.indexOf('2D');
            const secondIndex = initialState.lastIndexOf('2D');
            const {isGameOver, score} = game.turn([firstIndex, secondIndex]);
            let currentState = game.currentState();

            assert.isTrue(
                (currentState[firstIndex] === '') &&
                (currentState[secondIndex] === '') &&
                (score > 0) &&
                (!isGameOver));
        });
        it('open not matched cards', () => {
            let game = newGame(['2D', 'KD'], 2, 2);
            const initialState = game.currentState();
            const firstIndex = initialState.indexOf('2D');
            const secondIndex = initialState.lastIndexOf('KD');
            const {isGameOver, score} = game.turn([firstIndex, secondIndex]);
            let currentState = game.currentState();
            assert.isTrue(
                (currentState[firstIndex] == 'cover') &&
                (currentState[secondIndex] == 'cover') &&
                (score === 0) &&
                (!isGameOver)
            );
        });
        it('all cards are deleted from desk: game is over', () => {
            let game = newGame(['2D', 'KD'], 2, 2);
            const initialState = game.currentState();
            game.turn([initialState.indexOf('2D'), initialState.lastIndexOf('2D')]);
            const {isGameOver, score} = game.turn([initialState.indexOf('KD'), initialState.lastIndexOf('KD')]);
            assert.isTrue(isGameOver && (score == 42));
        });
        it('two turns: win than lose', () => {
            let game = newGame(['2D', 'KD', 'AD'], 3, 2);
            const initialState = game.currentState();
            game.turn([initialState.indexOf('2D'), initialState.lastIndexOf('2D')]);
            const {isGameOver, score} = game.turn([initialState.indexOf('AD'), initialState.lastIndexOf('KD')]);
            assert.isTrue(!isGameOver && (score === 42*2 - 42));
        });

    });
});
