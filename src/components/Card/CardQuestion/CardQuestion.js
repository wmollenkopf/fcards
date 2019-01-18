import React from 'react';
import Card from '../Card';
import { QUESTION_CARD} from '../../../constants/CardTypes'

const CardQuestion = ({card, showAnswer, editing=false, saveEditing, handleEditing}) => {
    if(showAnswer){return <div></div>}

    return <Card card={card} cardType={QUESTION_CARD} editing={editing} saveEditing={saveEditing} handleEditing={handleEditing} />
}
export default CardQuestion;