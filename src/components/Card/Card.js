import React from 'react';
import './Card.css';


const Card = ({card={card_text: ''}, nextCard}) => {
    return <div>
                <div className={`row`}>
                    <div id="cardOptions"className={`col-md-4 col-md-offset-4`}>
                        <button id="addCard"onClick={() => {}} className={`btn btn-success`}><i className={`glyphicon glyphicon-plus`}></i></button>
                        <button id="editCard"onClick={() => {}} className={`btn btn-info`}><i className={`glyphicon glyphicon-edit`} aria-label="Edit"></i></button>
                        <button id="deleteCard" onClick={() => {}} className={`btn btn-danger`} aria-label="Delete Card"><i className={`glyphicon glyphicon-trash`}></i></button>
                        
                    </div>
                </div>
                <div className={`row`}>
                    <div  id="cardFrame" className={`col-md-4 col-md-offset-4`}>
                        <span id="cardText" className={`h2`}>{card.card_text}</span>
                        <button id="nextCard" className={`pull-right btn btn-primary`} onClick={nextCard}><i className={`glyphicon glyphicon-arrow-right`}></i></button>
                    </div>
                </div>
            </div>
}
//<button id="nextCard" className={`pull-right btn btn-primary`} onClick={getCards}><i className={`glyphicon glyphicon-refresh`}></i></button>
export default Card;