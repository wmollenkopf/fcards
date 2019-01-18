import React from 'react';

const CreateCardsButtons = ({resetCurrentCard,creating,createNewCard}) => {
    if(!creating){return <div></div>}

    return <div>
    <button onClick={resetCurrentCard} className={`btn btn-lg btn-warning`} aria-label="Cancel Changes"><i className={`icon-flipped glyphicon glyphicon-repeat`}></i></button>
    <button onClick={createNewCard} className={`btn btn-lg btn-success`}><i className={`glyphicon glyphicon-plus`}></i> Create</button>
  </div>
}
export default CreateCardsButtons;