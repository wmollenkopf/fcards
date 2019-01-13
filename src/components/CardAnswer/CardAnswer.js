import React from 'react';
import './CardAnswer.css';

const CardAnswer = ({cardAnswer,showAnswer=false}) => {
    if(!showAnswer){return <div></div>}
    
    return  <div>
                <div className={`row`}>
                    <div id="cardAnswerFrame"className={`col-md-4 col-md-offset-4`} >
                        <span id="cardAnswerText" className={`h2`}>{cardAnswer}</span>
                    </div>
                </div>
            </div>
}

export default CardAnswer;