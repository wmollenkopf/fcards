import React from 'react';

const ShowAnswerButton = ({showAnswerCard,showAnswer,nextCard}) => {
    // Don't show the "Show Answer" button if the answer is already being shown
    if(showAnswer){
      return <div className={`row`}>
                <div className={`col-md-12 text-center`}>
                  <button className={`btn btn-primary btn-lg`} onClick={nextCard}>Next Card <i className={`glyphicon glyphicon-arrow-right`}></i></button>
                </div>
            </div>
    }

    return <div className={`row`}>
    <div className={`col-md-12 text-center`}>
      <button className={`btn btn-info btn-lg`} onClick={showAnswerCard}>Show Answer</button>
    </div>
  </div>
}
export default ShowAnswerButton;