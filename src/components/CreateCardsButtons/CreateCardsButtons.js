import React from 'react';

const CreateCardsButtons = ({resetCurrentCard,creating}) => {
    if(!creating){return <div></div>}

    return <div>
    <button onClick={resetCurrentCard} className={`btn btn-lg btn-warning`} aria-label="Cancel Changes"><i className={`icon-flipped glyphicon glyphicon-repeat`}></i></button>
    <button className={`btn btn-lg btn-success`}><i className={`glyphicon glyphicon-plus`}></i> Create</button>
  </div>
}
export default CreateCardsButtons;