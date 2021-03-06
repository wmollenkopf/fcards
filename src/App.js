import React, { Component } from 'react';
import './App.css';
import Signin from './components/Signin/Signin';
import CardOptions from './components/CardOptions/CardOptions';
import CardQuestion from './components/Card/CardQuestion/CardQuestion';
import CardAnswer from './components/Card/CardAnswer/CardAnswer';
import CreateCardsButtons from './components/CreateCardsButtons/CreateCardsButtons';
import Navigation from './components/Navigation/Navigation';
import { QUESTION_CARD, ANSWER_CARD } from './constants/CardTypes'


const initialCard = {
  card_id: 0,
  card_question: '',
  card_answer: ''
};

const initialState = {
  sessionKey:'',
  allCards: [],
  card: initialCard,
  currentCardIndex: 0,
  showAnswer: false,
  route: 'signin',
  isSignedIn: false,
  editing: false,
  creating: false,
  fcardServerURL: `https://fcards-server.biri.me`,
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  };

  loadUser = (data) => {
    if(data && data.token && data.token.length > 0) {
      this.setState({sessionKey: data.token});
      this.setState({isSignedIn: true});
      localStorage.setItem('sessionKey', data.token);
      this.getCards(data.token);
      
    } else {
      this.performSignOut();
    }
}

performSignOut = () => {
    this.setState(initialState);
    localStorage.removeItem(`sessionKey`);
}


componentDidMount() {
  // Go ahead and load all of the cards for this user, if the user is logged in...
  const localStorageToken = localStorage.getItem('sessionKey');
  if(localStorageToken) {
    try {
      this.loadUser({token: localStorageToken});
      
    }
    catch (ex) {
      console.log('ERROR:',ex);
      //this.performSignOut();
    }
  } else {
    this.performSignOut();
  }
}

getCards = (tokenValue=this.state.sessionKey) => {
  console.log("Start",tokenValue);
  fetch(`${this.state.fcardServerURL}/getcards`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      sessionKey: tokenValue
    })
  })
    .then(response => response.json())
    .then(data => {
      this.setState({allCards: data});
      if(data.length>0){
        this.setState({card: data[0]});
        this.setState({currentCardIndex: 0});
      }
      
      
      return data;
    }).then((data)=>{
      if(!(data.length>0)){
        this.enableCreating();
      }
    })
    .catch(err => console.log(err))
}

prevCard = () => {
  if(this.state.allCards && !(this.state.allCards.length>0)) {
    console.log(`No cards found. Create a new card first.`);
    this.setState({card: this.initialCard});
    this.setState({editing: false});
    this.enableCreating();
    return;
  }

  let currentIndex = this.state.currentCardIndex;
  if((currentIndex-1)< 0) {
    currentIndex = (this.state.allCards.length-1);  
    this.setState({currentCardIndex: currentIndex});
  } else {
    currentIndex--;
  }
  const newCard = Object.assign({},this.state.allCards[currentIndex]);
  this.setState({card: newCard});
  this.setState({currentCardIndex: (currentIndex)});
  this.setState({showAnswer: false});
  console.log(this.state.card);

}

nextCard = () => {
  if(this.state.allCards && !(this.state.allCards.length>0)) {
    console.log(`No cards found. Create a new card first.`);
    this.setState({card: this.initialCard});
    this.setState({editing: false});
    this.enableCreating();
    return;
  }
  let currentIndex = this.state.currentCardIndex;
  
  if((currentIndex+1)>=this.state.allCards.length) {
      this.setState({currentCardIndex: 0});
      currentIndex = 0;
  } else {
    currentIndex++;
  }
  
  const newCard = Object.assign({},this.state.allCards[currentIndex]);
  this.setState({card: newCard});
  this.setState({currentCardIndex: (currentIndex)});
  this.setState({showAnswer: false});

  console.log(this.state.card);
}

showAnswerCard = () => {
  console.log("Showing answer...");
  this.setState({showAnswer: true});
}

showQuestionCard = () => {
  console.log("Showing question...");
  this.setState({showAnswer: false});
}

enableEditing = () => {
  console.log("Enabling Editing...");
  this.setState({editing: true});
}

saveEditing = () => {
  console.log(`Saving...`);
  console.log(this.state.card);
  
  // TODO
  this.setState({editing: false});
  fetch(`${this.state.fcardServerURL}/editcard`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        sessionKey: this.state.sessionKey,
        "cardId": this.state.card.card_id,
        "cardQuestion": this.state.card.card_question,
        "cardAnswer":this.state.card.card_answer
      }
      )
  })
    .then(response => response.json())
    .then(data => {
      console.log("new data",data);
      //return data;
    })
    //.then(this.getCards()) // might not need this for editing actually OR adding cards actually, maybe deleting?
    .then(() => {
        const theDeck = this.state.allCards;
        theDeck[this.state.currentCardIndex] = this.state.card;
        return theDeck;
    })
      .then((theDeck)=>{
        this.setState({allCards: theDeck});
      })
      .then(console.log('statedeck:',this.state.allCards))
    .catch(err => console.log(err))
}

createNewCard = () => {
  
  console.log(`Creating...`);
  const newCard = Object.assign({},this.state.card);
  this.setState({creating: false});
  if(!this.state.card.card_question || !this.state.card.card_question) {
    console.log(`Not enough data to create...`);
    this.resetCurrentCard()
    return;
  }

  fetch(`${this.state.fcardServerURL}/addcard`, {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        sessionKey: this.state.sessionKey,
        "cardQuestion": newCard.card_question,
        "cardAnswer":newCard.card_answer
      }
      )
  })
    .then(response => response.json())
    .then(data => {
      console.log("new data",data);
      newCard.card_id = data;
      return newCard;
    })
    //.then(this.getCards()) // might not need this for editing actually OR adding cards actually, maybe deleting?
    .then((newCard) => {
        const theDeck = this.state.allCards;
        theDeck.push(newCard);
        const currentIndex = (this.state.allCards.length-1);  
        this.setState({currentCardIndex: currentIndex});
        //theDeck[this.state.currentCardIndex] = this.state.card;
        return theDeck;
    })
    .then((theDeck)=>{
      this.setState({allCards: theDeck});
      this.setState({card: newCard});
    })
    .then(console.log('created new deck:',this.state.allCards))
    .catch(err => console.log(err))
}

handleEditing = (type) => (event) => {
  if(type===QUESTION_CARD) {
    const newCard = Object.assign({},this.state.card,{card_question: event.target.value});
    this.setState({card: newCard});
  } else if(type===ANSWER_CARD) {
    const newCard = Object.assign({},this.state.card,{card_answer: event.target.value});
    this.setState({card: newCard});
  }
  
}

resetCurrentCard = () => {
  if(this.state.allCards.length > 0) {
    const newCard = this.state.allCards[this.state.currentCardIndex];
    console.log(newCard);
    this.setState({card: newCard});
    this.setState({editing: false});
    this.setState({creating: false});
  } else {
    console.log(`No cards found. Create a new card first.`);
    this.setState({card: this.initialCard});
    this.setState({editing: false});
    this.enableCreating();
  }
  

}

enableCreating = () => {
  console.log("Enabling Creating...");
  const newCard = Object.assign({},this.state.card,{card_id: '', card_answer: '',card_question: ''});
  this.setState({card: newCard});
  this.setState({creating: true});
}

deleteCard = () => {
  // Prompt the User if they're sure...
  // Delete the card from database
  // Remove the card from local dataset (do not refresh cards)
  // Run either prevcard or nextcard if index -1 > 0
  // Otherwise, activate create card click

  // TODO: Prompt the user...

  console.log(`Deleting from Database...`);
  console.log(this.state.card);
  
  this.setState({creating: false});
  this.setState({editing: false});
  console.log(`session`,this.state.sessionKey);
  console.log(`cardId`,this.state.card.card_id);
  fetch(`${this.state.fcardServerURL}/delcard`, {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({sessionKey: this.state.sessionKey, cardId: this.state.card.card_id})
  })
    .then(response => response.json())
    .then(data => {
      console.log("new data",data);
      //return data;
    })
    //.then(this.getCards()) // might not need this for editing actually OR adding cards actually, maybe deleting?
    .then(() => {
        const theDeck = this.state.allCards;
        const currentIndex=this.state.currentCardIndex
        theDeck.splice(currentIndex,1);
        return theDeck;
    })
    .then((theDeck)=>{
      this.setState({allCards: theDeck});
    })
    .then(this.prevCard)
    .then(console.log('created new deck:',this.state.allCards))
    .catch(err => console.log(err))
}


  render() {
    
    const { isSignedIn, card, showAnswer,editing,creating, allCards } = this.state;

    return (
      <div className="App">
        <Navigation 
          isSignedIn={isSignedIn} 
          performSignOut={this.performSignOut} 
        />
        { isSignedIn
          ? 
          (
            <div >
              {creating?(<h2>Create Card</h2>):(editing?(<h2>Edit Card</h2>):(<div></div>))}
              <CardOptions 
                visible={!(editing || creating)}
                prevCard={this.prevCard}
                nextCard={this.nextCard}
                enableEditing={this.enableEditing}
                enableCreating={this.enableCreating}
                deleteCard={this.deleteCard}
                cardIndex={this.state.currentCardIndex}
                cardTotal={this.state.allCards.length}
               />
              <CardQuestion 
                card={card} 
                resetCurrentCard={this.resetCurrentCard}
                showAnswer={showAnswer}
                editing={editing}
                saveEditing={this.saveEditing}
                handleEditing={this.handleEditing}
                creating={creating}
              />
              <CardAnswer 
                card={card}
                resetCurrentCard={this.resetCurrentCard}
                showAnswer={showAnswer}
                editing={editing}
                saveEditing={this.saveEditing}
                handleEditing={this.handleEditing}
                creating={creating}
                showAnswerCard={this.showAnswerCard}
              />
              <CreateCardsButtons 
                resetCurrentCard={this.resetCurrentCard}
                creating={creating}
                createNewCard={this.createNewCard}
              />
            </div>          
            )
          : (
             <Signin 
              fcardServerURL={this.state.fcardServerURL}
              loadUser={this.loadUser}
              enableCreating={this.enableCreating}
              allCards={allCards}
             />
            )
          }     
        
      </div>
    );
  }
}

export default App;
