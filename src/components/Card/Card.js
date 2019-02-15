import React from 'react';
import './Card.css';
import { QUESTION_CARD, ANSWER_CARD } from '../../constants/CardTypes'


const Card = ({card, cardType, editing=false, creating=false, saveEditing, handleEditing, resetCurrentCard,showAnswer=false,showAnswerCard}) => {
    if(!card){return <div></div>}
    let cardText = '';
    let cardBackground = {background: '#EBE8E1'};
    let cardTypeText = (<div></div>);
    var hideTheShowAnswerBtn = false;
    const answerButton = (<button className={`btn btn-info btn-lg`} onClick={showAnswerCard}>Show Answer</button>);
    if(cardType===QUESTION_CARD) {
        cardText = card.card_question;
        cardBackground = {background: '#EBE8E1'}
        cardTypeText = (<strong className={`pull-left`}>1</strong>)
    } else if(cardType===ANSWER_CARD) {
        cardText = card.card_answer;
        cardBackground = {background: '#E8F1FF'}
        cardTypeText = (<strong className={`pull-left`}>2</strong>)
        hideTheShowAnswerBtn = showAnswer || (creating) || (editing);
    }

    
    
    let element;
    if(!editing && !creating) {
        element = (<span id="cardText" className={`h2`}>{cardText}</span>);
    } else if(editing && !creating){
        element = (
            <div>
                <input id="cardText" onChange={handleEditing(cardType)} className={`form-control input-lg`} defaultValue={cardText} autoFocus={true}/>
                <div className={`saveChangesDiv`}>
                    <button onClick={resetCurrentCard} className={`btn btn-warning`} aria-label="Cancel Changes"><i className={`icon-flipped glyphicon glyphicon-repeat`}></i></button>
                    <button onClick={saveEditing} className={`btn btn-success`} aria-label="Save Changes"><i className={`glyphicon glyphicon-floppy-disk`}></i></button>
                </div>
            </div>);
    } else if(!editing && creating){
    element = (
        <div>
            <input onChange={handleEditing(cardType)} className={`form-control input-lg`} defaultValue={cardText} autoFocus={true}/>
        </div>);
}
    return <div>
                <div className={`row`}>
                    <div  style={cardBackground} className={`col-md-4 col-md-offset-4 card-frame`} >
                        {cardTypeText}
                        {(cardType===ANSWER_CARD)?((hideTheShowAnswerBtn)?element:answerButton):element}
                    </div>
                </div>
            </div>
}
export default Card;