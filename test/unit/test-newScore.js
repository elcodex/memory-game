
const {newScore} = require('../../src/logic/memory-game.js');

const {describe, it} = require('mocha');
const {assert} = require('chai');

describe('Testing Score', () => {
    describe('setup:', () => {
        let score = newScore(9, 0);
        it('is object', () => assert.isObject(score));
        it('has properties', () => assert.hasAllKeys(score, ['gain', 'lose', 'current']));
        it("property 'gain' is a function", () => assert.isFunction(score.gain));
        it("property 'lose' is a function", () => assert.isFunction(score.lose));
        it("property 'current' is a function", () => assert.isFunction(score.current));
    });

    describe('get current score', () => {
        let score1 = newScore(9, 0);
        it('initial score is 0', () => assert.strictEqual(score1.current(), 0));

        let score2 = newScore(9, 624);
        it('another initial score is 624', () => assert.equal(score2.current(), 624));
    });

    describe('calculate the score', () => {
        it('win one time, score is right', () => {
            let score = newScore(9, 0);
            score.gain();
            const notOpenedTwins = 9 - 1;
            const manualScore = notOpenedTwins * 42;
            assert.strictEqual(score.current(), manualScore);
        });
        it('lose one time, score is right', () => {
            let score = newScore(9, 0);
            score.lose();
            const openedTwins = 0;
            const manualScore = openedTwins * 42;
            assert.strictEqual(score.current(), manualScore);
        });
        it('win random times, score is right', () => {
            let score = newScore(9, 0);
            let notOpenedTwins = 9;
            let manualScore = 0;
            const count = Math.floor(Math.random() * 9);
            for (let i = 0; i < count; i++) {
                score.gain();
                notOpenedTwins -= 1;
                manualScore += notOpenedTwins * 42;
            }
            assert.strictEqual(score.current(), manualScore);
        });
        it('lose random times after one win, score is right', () => {
            let score = newScore(9, 0);
            score.gain();
            let openedTwins = 1;
            let manualScore = (9 - openedTwins) * 42;
            const count = Math.floor(Math.random() * 20);
            for (let i = 0; i < count; i++) {
                score.lose();
                manualScore -= openedTwins * 42;
            }
            assert.strictEqual(score.current(), manualScore);
        });
        it('random loses and wins, score is right', () => {
            let score = newScore(9, 0);
            let notOpenedTwins = 9;
            let openedTwins = 0;
            let manualScore = 0;
            for (let i = 0; i < 9; i++) {
                if (Math.random() > 0.5) {
                    score.gain();
                    openedTwins += 1; notOpenedTwins -= 1;
                    manualScore += notOpenedTwins * 42;
                } else {
                    score.lose();
                    manualScore -= openedTwins * 42;
                }
            }
            assert.strictEqual(score.current(), manualScore);
        });
    });
});
