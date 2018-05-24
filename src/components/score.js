import React from 'react';

export default function Score(props) {
    return (
      <div id="menu-score">
        Счёт: <span data-tid="Menu-scores" id="score">{props.score}</span>
      </div>
    );
}
