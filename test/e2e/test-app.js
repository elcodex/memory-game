const {describe, it, before, after} = require('mocha');
const {assert} = require('chai');
const retry = require('promise-retry');
const path = require('path');

const express = require('express');

const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

let startDriver = async () => {
    return await new webdriver.Builder()
        .forBrowser('firefox')    // 'firefox' || 'chrome'
        .build();
}
let quitDriver = async (driver) => {
    if (driver) { driver.quit(); }
}

describe('testing application', () => {
    let server;
    let driver;

    before((done) => {
        const app = express();
        app.use('/', express.static(path.resolve(__dirname, '../../public')));
        server = app.listen(8080, done);
    });

    after(() => { server.close(); });

    before(async () => { driver = await startDriver(); });

    after(() => quitDriver(driver));

    // start page (index.html)
    it('index.html: title of the page', async () => {
        await driver.get('http://localhost:8080/index.html');

        await retry(async () => {
            const title = await driver.getTitle();
            assert.equal(title, 'Memory Game: start game');
        });
    });
    it("index.html: has element with property 'data-tid=App'", async () => {
        await retry(async () => {
            let containerElement;
            try {
                containerElement = await driver.findElement(By.css('[data-tid=App]'));
            } catch (e) {}
            assert.isDefined(containerElement);
        });
    });
    it("index.html: has element with property 'data-tid=NewGame-startGame'", async () => {
        await retry(async () => {
            let buttonElement, text;
            try {
                buttonElement = await driver.findElement(By.css('[data-tid=NewGame-startGame]'));
                text = await buttonElement.getText();
            } catch(e) {}
            assert.isTrue(buttonElement !== undefined && text == 'Начать игру');
        });
    });

    // go to the game (game.html)
    it('index.html: start game', async () => {
        await retry(async () => {
            let buttonElement;
            try {
                buttonElement = await driver.findElement(By.css('[data-tid=NewGame-startGame]'));
            } catch(e) {}
            await buttonElement.click();
            const title = await driver.getTitle();
            assert.equal(title, 'Memory Game: in game');
        });
    });
    it("game.html: has element with property 'data-tid=Desk'", async () => {
        await retry(async () => {
            let deskElement;
            try {
                deskElement = await driver.findElement(By.css('[data-tid=Desk]'));
            } catch (e) {}
            assert.isDefined(deskElement);
        });
    });
    it("game.html: has element with property 'data-tid=Menu-newGame'", async () => {
        await retry(async () => {
            let newGameElement;
            try {
                newGameElement = await driver.findElement(By.css('[data-tid=Menu-newGame]'));
            } catch (e) {}
            assert.isDefined(newGameElement);
        });
    });
    it("game.html: has element with property 'data-tid=Menu-scores'", async () => {
        await retry(async () => {
            let scoresElement, currentScores;
            try {
                scoresElement = await driver.findElement(By.css('[data-tid=Menu-scores]'));
                currentScores = await scoresElement.getText();
            } catch (e) {}
            assert(scoresElement != undefined && currentScores == '0');
        });
    });
    let cards = [];
    it('game.html: all cards are opened at the start of the game', async () => {
        await retry(async () => {
            let cardsElements = [];
            try { cardsElements = await driver.findElements(By.css('[data-tid=Card]')); } catch (e) {}
            assert.equal(cardsElements.length, 18);
        });
    });
    it('game.html: all cards are closed after 5 seconds', async () => {
        await retry(async () => {
            await driver.manage().setTimeouts({implicit: 5000});
            let cardsElements = [];
            try { cardsElements = await driver.findElements(By.css('[data-tid=Card-flipped]')); } catch (e) {}
            assert.equal(cardsElements.length, 18);
        });
    });
    it('game.html: link to the new game', async () => {
        await retry(async () => {
            let newGameElement;
            try {
                newGameElement = await driver.findElement(By.css('[data-tid=Menu-newGame]'));
                await newGameElement.click();
            } catch (e) {}
            let title = await driver.getTitle();
            assert.equal(title, 'Memory Game: start game');
        });
    });
    //go to the end of the game (finish.html)
    it('finish.html: go to page', async () => {
        await retry(async () => {
            await driver.get('http://localhost:8080/finish.html?score=100');
            let title = await driver.getTitle();
            assert.equal(title, 'Memory Game: game over');
        });
    });
    it("finish.html: has element with property 'data-tid=EndGame-retryGame'", async () => {
        await retry(async () => {
            let buttonElement, text;
            try {
                buttonElement = await driver.findElement(By.css('[data-tid=EndGame-retryGame]'));
                text = await buttonElement.getText();
            } catch(e) {}
            assert.isTrue(buttonElement !== undefined && text == 'Ещё раз');
        });
    });
    it('finish.html: score is valid', async () => {
        await retry(async () => {
            let scoreElement;
            try { scoreElement = await driver.findElement(By.id('score')); } catch (e) {}
            let score = await scoreElement.getText();
            assert.strictEqual(score, '100');
        });
    });

});
