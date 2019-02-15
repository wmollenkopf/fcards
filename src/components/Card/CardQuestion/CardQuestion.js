import React from 'react';
import Card from '../Card';
import { QUESTION_CARD} from '../../../constants/CardTypes'

const CardQuestion = ({card, showAnswer, editing=false, saveEditing, handleEditing,resetCurrentCard,creating}) => {
    //if(showAnswer){return <div></div>}

    return <Card card={card} cardType={QUESTION_CARD}  resetCurrentCard={resetCurrentCard} editing={editing} saveEditing={saveEditing} handleEditing={handleEditing}  creating={creating} />
}
export default CardQuestion;