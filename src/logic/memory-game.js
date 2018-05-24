
const {getNRandomElements, randomizeArray, isUniqElements} = require('./utils/arrayFunctions.js');

let newDesk = (allCards, countTwins, repeat) => {

    let desk = createDesk();
    let remainCards = countTwins * repeat;   // количество оставшихся карточек на столе

    function createDesk() {
        let names = getNRandomElements(allCards, countTwins);
        let _desk = randomizeArray(names.concat(names)).map((cardName) => {
            return newCard(cardName);
        });
        return _desk;
    }

    // переворачиваем все карточки рубашкой вверх
    function closeAllCards() {
        desk.forEach((card) => {
           card.closeCard();
        });
    }

    function closeCard(pos) {
        if (pos >= 0 && pos < desk.length) { desk[pos].closeCard(); }
    }

    function openCard(pos) {
        if (pos >= 0 && pos < desk.length) { desk[pos].openCard(); }
    }

    function deleteCard(pos) {
        if (pos >= 0 && pos < desk.length) {
            desk[pos].deleteCard();
            remainCards--;
        }
    }

    function getRemainCards() {
        return remainCards;
    }

    function getCardName(pos) {
        if (pos >= 0 && pos < desk.length) {
            return desk[pos].getName();
        }
        return undefined;
    }

    // получаем состояние стола (все карты в их состояниях):
    // если карточка открыта, то передаём название изображения
    // если закрыта, то передаётся 'cover'
    // есди карточка удалена со стола, то - пустой элемент
    function getDesk() {
        return desk.map((card) => {
            let img = '';
            let state = card.getState();
            if (state === cardStates.closed) {
                img = 'cover';
            }
            else if (state === cardStates.opened) {
                img = card.getName();
            }
            return img;
        });
    }

    return {
        getDesk:      getDesk,
        closeAll:     closeAllCards,
        openCard:     openCard,     // params: position
        deleteCard:   deleteCard,   // params: position
        closeCard:    closeCard,    // params: position
        getCardName:  getCardName,  // params: position
        getRemainCards: getRemainCards,
    }

}

/*
'o' - карточка открыта (рубашкой вниз)
'c' - карточка закрыта (рубашкой вверх)
'd' - карточка удалена со стола
*/
const cardStates = {opened: 'o', closed: 'c', deleted: 'd'};

let newCard = (name, cardState = cardStates.opened) => {
    let _name = name;
    let _cardState = cardState;
    return {
        getName: () => { return _name; },
        getState: () => { return _cardState; },
        openCard: () => {
            _cardState = cardStates.opened;
        },
        closeCard: () => {
            _cardState = cardStates.closed;
        },
        deleteCard: () => {
            _cardState = cardStates.deleted;
        }
    }
}

let newScore = (twins, initialScore) => {
    let _score = initialScore;
    let closedTwins = twins;
    let openedTwins = 0;
    const multiplier = 42;

    return {
        gain: function() {
            openedTwins += 1;
            closedTwins -= 1;
            _score += closedTwins * multiplier;
        },
        lose: function() {
            _score -= openedTwins * multiplier;
        },
        current: function() {
            return _score;
        }
    }
}

let newGame = (allCards, twins = 9, repeat = 2) => {

    if (allCards.length < twins) { twins = allCards.length; }

    let desk = newDesk(allCards, twins, repeat);
    let score = newScore(twins, 0);

    function turn(cardPositions) {
        let validTurn = (cardPositions.length == repeat) && isUniqElements(cardPositions);

        if (validTurn) {

            let isMatched = cardPositions.every((pos) => {
                return desk.getCardName(pos) === desk.getCardName(cardPositions[0]);
            });

            if (isMatched) {
                score.gain();
                cardPositions.forEach((pos) => {
                    desk.deleteCard(pos);
                });
            }
            else {
                score.lose();
                cardPositions.forEach((pos) => {
                    desk.closeCard(pos);
                });
            }
        }
        let isGameOver = (desk.getRemainCards() === 0);

        return {isGameOver: isGameOver, score: score.current()};
    }

    function openCard(cardPosition) {
        desk.openCard(cardPosition);
    }

    function deskState() {
        return desk.getDesk();
    }

    function closeAll() {
        desk.closeAll();
    }

    return {
        turn:         turn,      //params: positions of opened cards
        closeAll:     closeAll,
        open:         openCard,
        currentState: deskState,
    }

}

module.exports = {
    newDesk: newDesk,
    newScore: newScore,
    newCard: newCard,
    newGame: newGame
};
