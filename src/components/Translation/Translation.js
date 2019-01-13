import React from 'react';
import './Translation.css';

const Translation = ({translation=''}) => {
    if(!translation){return <div></div>}
    
    return  <div>
                <div className={`row`}>
                    <div id="translationFrame"className={`col-md-4 col-md-offset-4`}>
                        <span id="cardText" className={`h2`}>{translation}</span>
                    </div>
                </div>
            </div>
}

export default Translation;