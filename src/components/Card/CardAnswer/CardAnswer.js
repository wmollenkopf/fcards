import React from 'react';
import Card from '../Card';
import { ANSWER_CARD} from '../../../constants/CardTypes'


const CardAnswer = ({card, showAnswer, editing=false,saveEditing,handleEditing}) => {
    if(!showAnswer){return <div></div>}
    
    return <Card card={card} cardType={ANSWER_CARD} editing={editing} saveEditing={saveEditing} handleEditing={handleEditing}/>

    // return  <div>
    //             <div className={`row`}>
    //                 <div id="cardAnswerFrame"className={`col-md-4 col-md-offset-4`} >
    //                     <span id="cardAnswerText" className={`h2`}>{cardAnswer}</span>
    //                 </div>
    //             </div>
    //         </div>
}

export default CardAnswer;