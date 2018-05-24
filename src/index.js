
import React from 'react';
import ReactDOM from 'react-dom';

import Card from './components/card.js';
import Score from './components/score.js';
import Timer from './components/timer.js';

import {newGame} from './logic/memory-game.js';
import {getAllCardNames} from './logic/generate-cards.js';

const startGameTimeout = 5 * 1000;
const closeCardTimeout = 1000;

class MemoryGame extends React.Component {
    constructor() {
        super();
        this.game = newGame(getAllCardNames());
        this.openedIndex = [];
        this.canOpen = false;
        this.state = {
            score: 0,
            gameState: this.game.currentState()
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        if (this.canOpen) {
            if (this.openedIndex.length === 0 ||
               (this.openedIndex.length === 1 && this.openedIndex[0] !== index)) {
                this.game.open(index);
                this.openedIndex.push(index);
                this.setState({gameState: this.game.currentState()});
            }
            if (this.openedIndex.length === 2) {
                this.canOpen = false;
                let res = this.game.turn(this.openedIndex);
                this.turn(res.score, res.isGameOver);
            }
        }
    }

    turn(currentScore, isGameOver) {
        if (isGameOver) {
            window.location.href = 'finish.html?score=' + String(currentScore);
        }
        else {
            window.setTimeout(() => {
                this.openedIndex = [];
                this.setState({
                    gameState: this.game.currentState(),
                    score: currentScore,
                });
                this.canOpen = true;
            }, closeCardTimeout);
        }
    }

    componentDidMount() {
        window.setTimeout(() => {
            this.game.closeAll();
            this.setState({gameState: this.game.currentState()});
            this.canOpen = true;
        }, startGameTimeout);
    }

    render() {
        let cards = [];
        this.state.gameState.forEach((card, index) => {
            cards.push(
              <Card
                key={index}
                index={index}
                card={card}
                onClick={() => {this.handleClick(index)}} />);
            });
        return (
          <React.Fragment>
            <div id="menu">
              <div id="menu-newGame">
                <a data-tid="Menu-newGame" href="index.html">Начать заново</a>
              </div>
              <Timer />
              <Score score={this.state.score} />
            </div>
            <div data-tid="Desk" id="desk">{cards}</div>
          </React.Fragment>
        );
    }
}

const app = document.getElementById('container');
ReactDOM.render(<MemoryGame />, app);
