import React from 'react';
import './CardOptions.css';


const CardOptions = ({prevCard, nextCard, enableEditing}) => {

    return  <div className={`row`}>
                <div id="cardOptions"className={`col-md-4 col-md-offset-4`}>
                    <div className={'pull-left'}>
                        <button id="addCard"onClick={() => {}} className={`btn btn-success`}><i className={`glyphicon glyphicon-plus`}></i></button>
                        <button id="editCard"onClick={enableEditing} className={`btn btn-info`}><i className={`glyphicon glyphicon-edit`} aria-label="Edit"></i></button>
                        <button id="deleteCard" onClick={() => {}} className={`btn btn-danger`} aria-label="Delete Card"><i className={`glyphicon glyphicon-trash`}></i></button>
                    </div>    
                    <div className={'pull-right'}>
                        <button id="prevCard" className={`btn btn-primary`} onClick={prevCard}><i className={`glyphicon glyphicon-arrow-left`}></i></button>
                        <button id="nextCard" className={`btn btn-primary`} onClick={nextCard}><i className={`glyphicon glyphicon-arrow-right`}></i></button>    
                    </div>
                </div>
            </div>
}
export default CardOptions;