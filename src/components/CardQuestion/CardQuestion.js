import React from 'react';
import './CardQuestion.css';


const CardQuestion = ({card={card_question: ''}, showAnswer}) => {
    if(showAnswer){return <div></div>}

    return <div>
                <div className={`row`}>
                    <div  id="cardQuestionFrame" className={`col-md-4 col-md-offset-4`} >
                        <span id="cardText" className={`h2`}>{card.card_question}</span>
                    </div>
                </div>
            </div>
}
export default CardQuestion;