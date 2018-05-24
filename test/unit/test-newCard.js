
const {newCard} = require('../../src/logic/memory-game.js');

const {describe, it} = require('mocha');
const {assert} = require('chai');

describe('Testing Card', () => {
    const defaultName = 'AH', defaultState = 'o';

    describe('setup:', () => {
        let card = newCard(defaultName, defaultState);

        it('is Object', () => {
            assert.isObject(card);
        });
        it('has properties', () => {
            assert.hasAllKeys(card, ['getName', 'getState', 'openCard', 'closeCard', 'deleteCard']);
        });
        it("property 'getName' is a function", () => { assert.isFunction(card.getName); });
        it("property 'getState' is a function", () => { assert.isFunction(card.getState); });
        it("property 'openCard' is a function", () => { assert.isFunction(card.openCard); });
        it("property 'closeCard' is a function", () => { assert.isFunction(card.closeCard); });
        it("property 'deleteCard' is a function", () => { assert.isFunction(card.deleteCard); });
    });

    describe('get the name of the card', () => {
        const cardName = '2D';
        let card = newCard(cardName, defaultState);

        it('the name is right', () => { assert.equal(card.getName(), cardName); });
    });

    describe('get the state of the card', () => {
        const cardState = 'c';
        let card = newCard(defaultName, cardState);

        it('to get state', () => { assert.equal(card.getState(), cardState); });
    });

    describe('actions with the card', () => {
        let card = newCard(defaultName, defaultState);

        it('close the card', () => {
            card.closeCard();
            assert.isTrue(card.getState() == 'c' && card.getName() == defaultName);
        });
        it('open the card', () => {
            card.openCard();
            assert.isTrue(card.getState() == 'o' && card.getName() == defaultName);
        });
        it('delete the card', () => {
            card.deleteCard();
            assert.isTrue(card.getState() == 'd' && card.getName() == defaultName);
        });
    });
});
