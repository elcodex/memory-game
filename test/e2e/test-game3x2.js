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
        .forBrowser('chrome')                   // 'chrome' || 'firefox'
        .build();
}
let quitDriver = async (driver) => {
    if (driver) { driver.quit(); }
}

describe('testing game 3x2', () => {
    let server;
    let driver;

    before((done) => {
        const app = express();
        app.use('/', express.static(path.resolve(__dirname, '../../testGame3x2')));
        server = app.listen(8080, done);
    });

    after(() => { server.close(); });

    before(async () => { driver = await startDriver(); });

    after(() => quitDriver(driver));

    it('playing the game', async () => {
         await driver.get('http://localhost:8080/game.html');
         await driver.manage().setTimeouts({implicit: 5000});

         let title = await driver.getTitle();
         let card, currentScore, isElementFound = true;
         do {
            try {
                card = await driver.findElement(By.id(String(Math.floor(Math.random() * 6))));
                card.click();
                currentScore = await driver.findElement(By.css('[data-tid=Menu-scores]')).getText();
                await driver.manage().setTimeouts({implicit: 1000});
            } catch (e) { isElementFound = false; }
         } while (isElementFound);

         let finalScore = await driver.findElement(By.id('score')).getText();
         assert.equal(currentScore, finalScore);
    });
});
