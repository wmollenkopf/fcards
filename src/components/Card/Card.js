import React from 'react';
import './Card.css';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        allCards: [],
        card: {
            cardId: 0,
            cardText: ''
        },
        currentCardIndex: 0,
        }
    }

    cardsLoaded = () => {return (this.state.allCards && this.state.allCards.length > 0);}

    getCards = () => {
        console.log("Start");
        fetch('http://localhost:3000/getcards', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userId: this.props.userId,
            sessionKey: this.props.sessionKey
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log("data",data);
            this.setState({allCards: data});
            this.nextCard();
            return data;
          })
          .catch(err => console.log(err))
      }

    nextCard = () => {

        let currentIndex = this.state.currentCardIndex;
        
        if((currentIndex+1)>=this.state.allCards.length) {
            this.setState({currentCardIndex: 1});
            this.getCards();//.then(this.nextCard);
            currentIndex = this.state.currentCardIndex;
            // if(this.state.allCards && this.state.allCards.length>0){
            //     this.setState({card: this.state.allCards[currentIndex]});    
            //     this.setState({currentCardIndex: (currentIndex+1)});
            // }
        }
        else {
            this.setState({card: this.state.allCards[currentIndex]});
            this.setState({currentCardIndex: (currentIndex+1)});
        }
        
        console.log(this.state.card);
    }

    
    

    render() {
    return (<div>
                <div className={`row`}>
                    <div id="cardOptions"className={`col-md-4 col-md-offset-4`}>
                        <button id="addCard"onClick={() => {}} className={`btn btn-success`}><i className={`glyphicon glyphicon-plus`}></i></button>
                        <button id="editCard"onClick={() => {}} className={`btn btn-info`}><i className={`glyphicon glyphicon-edit`} aria-label="Edit"></i></button>
                        <button id="deleteCard" onClick={() => {}} className={`btn btn-danger`} aria-label="Delete Card"><i className={`glyphicon glyphicon-trash`}></i></button>
                        
                    </div>
                </div>
                <div className={`row`}>
                    <div  id="cardFrame" className={`col-md-4 col-md-offset-4`}>
                        <span id="cardText" className={`h2`}>{this.state.card.cardText}Siapa nama kamu?</span>
                        <button id="nextCard" className={`pull-right btn btn-primary`} onClick={this.nextCard}><i className={`glyphicon glyphicon-refresh`}></i></button>
                    </div>
                </div>
        
        
    </div>)
    }
}

export default Card;