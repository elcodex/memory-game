const game = require('../../src/logic/memory-game.js');
const newDesk = game.newDesk;
const {getAllCardNames} = require('../../src/logic/generate-cards.js');
const allCardNames = getAllCardNames();

const {describe, it} = require('mocha');
const {assert} = require('chai');

function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * (maxNumber));
}

describe('Testing the desk 9x2', () => {
    const diffCards = 9;
    const repeat = 2;
    const length = diffCards * repeat;

    describe('setup:', () => {
        let desk = newDesk(allCardNames, diffCards, repeat);

        it('is Object', ()=> { assert.isObject(desk); });
        it('has properties', () => {
            assert.hasAllKeys(desk, ['getDesk', 'closeAll', 'openCard', 'deleteCard', 'closeCard', 'getCardName', 'getRemainCards']);
        });
        it('property getDesk is function', () => { assert.isFunction(desk.getDesk); });
        it('property closeAll is function', () => { assert.isFunction(desk.closeAll); });
        it('property openCard is function', () => { assert.isFunction(desk.openCard); });
        it('property deleteCard is function', () => { assert.isFunction(desk.deleteCard); });
        it('property closeCard is function', () => { assert.isFunction(desk.closeCard); });
        it('property getCardName is function', () => { assert.isFunction(desk.getCardName); });
        it('property getRemainCards is function', () => { assert.isFunction(desk.getRemainCards); });
    });

    describe('initial state of the desk', () => {
        let desk = newDesk(allCardNames, diffCards, repeat);
        let initialDesk = desk.getDesk();

        it('length is 18', () => { assert.equal(initialDesk.length, length); });
        it("all cards is opened (not empty or not equal 'cover')", () => {
            assert.isTrue(initialDesk.every(card => (card !== '' && card !== 'cover')));
        });
        it('different cards is 9', () => {
            let cards = [];
            initialDesk.forEach((card) => {
                if (!cards.includes(card)) { cards.push(card); }
            });
            assert.equal(cards.length, diffCards);
        });
        it('every card is repeated 2 times', () => {
            let sortedDesk = Object.assign([], initialDesk);
            sortedDesk.sort();
            assert.isTrue(sortedDesk.every((card, index) => {
                if (index % repeat === 0) { return card === sortedDesk[index+1]; }
                return (index == sortedDesk.length-1) || (card !== sortedDesk[index+1]);
            }));

        });
    });

    describe("property 'closeAll'", () => {
        let desk = newDesk(allCardNames, diffCards, repeat);
        desk.closeAll();
        let currentDesk = desk.getDesk();

        it('length is 18', () => assert.equal(currentDesk.length, 18));

        it('every card is closed (card == cover)', () => {
            assert.isTrue(currentDesk.every(card => card == 'cover'));
        });
    });

    describe("property 'openCard'", () => {
        let desk = newDesk(allCardNames, diffCards, repeat);
        let initialDesk = desk.getDesk();
        desk.closeAll();

        it('position is less than 0', () => {
            let beforeDesk = desk.getDesk();
            desk.openCard(-1);
            let afterDesk = desk.getDesk();
            assert.deepEqual(beforeDesk, afterDesk);
        });

        it('position is greater than length of the desk', () => {
            let beforeDesk = desk.getDesk();
            desk.openCard(length);
            let afterDesk = desk.getDesk();
            assert.deepEqual(beforeDesk, afterDesk);
        });

        it('open random card (position is valid and random)', () => {
            let pos = getRandomNumber(length);
            desk.openCard(pos);
            let currentDesk = desk.getDesk();
            assert.equal(currentDesk[pos], initialDesk[pos]);
        });
        it('open first card', () => {
            desk.openCard(0);
            let currentDesk = desk.getDesk();
            assert.strictEqual(currentDesk[0], initialDesk[0]);
        });
                it('open last card', () => {
            desk.openCard(length - 1);
            let currentDesk = desk.getDesk();
            assert.strictEqual(currentDesk[length-1], initialDesk[length-1]);
        });
    });

    describe("property 'closeCard'", () => {
        let desk = newDesk(allCardNames, diffCards, repeat);

        it('position is less than 0', () => {
            let beforeDesk = desk.getDesk();
            desk.closeCard(-1);
            let afterDesk = desk.getDesk();
            assert.deepEqual(beforeDesk, afterDesk);
        });

        it('position is greater than length of the desk', () => {
            let beforeDesk = desk.getDesk();
            desk.closeCard(length);
            let afterDesk = desk.getDesk();
            assert.deepEqual(beforeDesk, afterDesk);
        });

        it('close random card (position is valid and random)', () => {
            let pos = getRandomNumber(length);
            desk.closeCard(pos);
            let currentDesk = desk.getDesk();
            assert.equal(currentDesk[pos], 'cover');
        });
        it('close first card', () => {
            desk.closeCard(0);
            let currentDesk = desk.getDesk();
            assert.strictEqual(currentDesk[0], 'cover');
        });
                it('close last card', () => {
            desk.closeCard(length - 1);
            let currentDesk = desk.getDesk();
            assert.strictEqual(currentDesk[length-1], 'cover');
        });
    });

    describe("property 'deleteCard'", () => {
        let desk = newDesk(allCardNames, diffCards, repeat);

        it('position is less than 0', () => {
            let beforeDesk = desk.getDesk();
            desk.deleteCard(-1);
            let afterDesk = desk.getDesk();
            assert.deepEqual(beforeDesk, afterDesk);
        });

        it('position is greater than length of the desk', () => {
            let beforeDesk = desk.getDesk();
            desk.deleteCard(length);
            let afterDesk = desk.getDesk();
            assert.deepEqual(beforeDesk, afterDesk);
        });

        it('position is valid and random', () => {
            let pos = getRandomNumber(length);
            desk.deleteCard(pos);
            let currentDesk = desk.getDesk();
            assert.strictEqual(currentDesk[pos], '');
        });
        it('delete first card', () => {
            desk.deleteCard(0);
            let currentDesk = desk.getDesk();
            assert.strictEqual(currentDesk[0], '');
        });
                it('delete last card', () => {
            desk.deleteCard(length - 1);
            let currentDesk = desk.getDesk();
            assert.strictEqual(currentDesk[length-1], '');
        });

    });


    describe("property 'getCardName'", () => {
        let desk = newDesk(allCardNames, diffCards, repeat);
        let initialDesk = desk.getDesk();

        it('position is less than 0', () => {
            let cardName = desk.getCardName(-1);
            assert.isUndefined(cardName);
        });

        it('position is greater than length of the desk', () => {
            let cardName = desk.getCardName(length);
            assert.isUndefined(cardName);
        });

        it('position is valid and random', () => {
            let pos = getRandomNumber(length);
            let cardName = desk.getCardName(pos);
            assert.equal(cardName, initialDesk[pos]);
        });
        it('get the name of the first card', () => {
            let cardName = desk.getCardName(0);
            assert.equal(cardName, initialDesk[0]);
        });
        it('get the name of the last card', () => {
            let cardName = desk.getCardName(length-1);
            assert.equal(cardName, initialDesk[length-1]);
        });
    });

    describe("property 'getRemainCards'", () => {
        it('at the start remain cards are equal to 18', () => {
            let desk = newDesk(allCardNames, diffCards, repeat);
            let remainCards = desk.getRemainCards();
            assert.equal(remainCards, length);
        });

        it('after delete one card remain cards are equal to 17', () => {
            let desk = newDesk(allCardNames, diffCards, repeat);
            desk.deleteCard(getRandomNumber(length));
            assert.equal(desk.getRemainCards(), (length - 1));
        });

        it('after open one card remain cards are equal to 18', () => {
            let desk = newDesk(allCardNames, diffCards, repeat);
            desk.openCard(getRandomNumber(length));
            assert.equal(desk.getRemainCards(), length);
        });

        it('after close one card remain cards are equal to 18', () => {
            let desk = newDesk(allCardNames, diffCards, repeat);
            desk.closeCard(getRandomNumber(length));
            assert.equal(desk.getRemainCards(), length);
        });

        it('after delete random numbers of cards remain cards are equal to (18 - this random number)', () => {
            let desk = newDesk(allCardNames, diffCards, repeat);
            let count = getRandomNumber(length);
            for (let i = 0; i < count; i++) { desk.deleteCard(i) }
            assert.strictEqual(desk.getRemainCards(), length - count);
        });
        it('after delete all cards remain cards are equal to 0', () => {
            let desk = newDesk(allCardNames, diffCards, repeat);
            for (let i = 0; i < length; i++) { desk.deleteCard(i) }
            assert.strictEqual(desk.getRemainCards(), 0);
        });
    });
});
