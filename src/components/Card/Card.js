import React from 'react';
import './Card.css';
import { QUESTION_CARD, ANSWER_CARD } from '../../constants/CardTypes'


const Card = ({card, cardType, editing=false, saveEditing, handleEditing}) => {
    let cardText = '';
    let cardBackground = {background: '#EBE8E1'};
    if(cardType===QUESTION_CARD) {
        cardText = card.card_question;
        cardBackground = {background: '#EBE8E1'}
    } else if(cardType===ANSWER_CARD) {
        cardText = card.card_answer;
        cardBackground = {background: '#E8F1FF'}
    }

    let element;
    if(!editing) {
        element = (<span id="cardText" className={`h2`}>{cardText}</span>);
    } else {
        element = (
            <div>
                <input id="cardText" onChange={handleEditing(cardType)} className={`form-control input-lg`} defaultValue={cardText} autoFocus={true}/>
                <button onClick={saveEditing} className={`btn btn-sm btn-success pull-right`}>Save Changes <i className={`glyphicon glyphicon-ok-circle`}></i></button>
            </div>);
    }
    return <div>
                <div className={`row`}>
                    <div  style={cardBackground} className={`col-md-4 col-md-offset-4 card-frame`} >
                        {element}
                    </div>
                </div>
            </div>
}
export default Card;