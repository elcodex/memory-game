import React from 'react';

/* если карточка открыта (рубашкой вниз), то data-tid="Card",
   если карточка закрыта, то data-tid="Card-flipped" и добавляется событие на клик
*/
export default function Card(props) {
    const cardsFolder = 'cards/';
    const cardExt = '.png';
    let dataTid = 'Card-removed';
    let onClick = undefined;
    if (props.card !== 'cover' && props.card !== '') {
        dataTid = 'Card';
    }
    if (props.card === 'cover') {
        dataTid = 'Card-flipped';
        onClick = props.onClick;
    }
    let card = (props.card === '') ? '' : cardsFolder + props.card + cardExt; 

    return (
      <div key={props.index} data-tid={dataTid} className="card" id={props.index}>
        <img
          alt=''
          src={card}
          onClick={onClick} />
      </div>
    );
}
