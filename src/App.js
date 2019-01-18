import React, { Component } from 'react';
import './App.css';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import CardOptions from './components/CardOptions/CardOptions';
import CardQuestion from './components/Card/CardQuestion/CardQuestion';
import CardAnswer from './components/Card/CardAnswer/CardAnswer';
import ShowAnswerButton from './components/ShowAnswerButton/ShowAnswerButton';
import Navigation from './components/Navigation/Navigation';
import { QUESTION_CARD, ANSWER_CARD } from './constants/CardTypes'


const initialState = {
  sessionKey:'boop',
  allCards: [],
  card: {
    card_id: 0,
    card_question: '',
    card_answer: ''
  },
  currentCardIndex: 0,
  showAnswer: false,
  route: 'signin',
  isSignedIn: false,
  user: {
    user_id: 4,
    username: 'biri@biri.me',
    joined: ''
  },
  editing: false
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  };

  loadUser = (data) => {
    this.setState({user: {
      id: data.user_id,
      username: data.username,
      joined: data.created_at
    }})
}

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState(initialState)
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  } else {
    this.setState({route: route});
  }
  
}


componentDidMount() {
  // Go ahead and load all of the cards for this user, if the user is logged in...
  if(this.state.user) {
    this.getCards();
  }
}

getCards = () => {
  console.log("Start");
  fetch('http://localhost:3000/getcards', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: this.state.user.user_id,
      sessionKey: this.state.sessionKey
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log("data",data);
      this.setState({allCards: data});
      if(data.length>0){
        this.setState({card: data[0]});
        this.setState({currentCardIndex: 0});
      }
      
      return data;
    })
    .catch(err => console.log(err))
}

prevCard = () => {
  
  let currentIndex = this.state.currentCardIndex;
  if((currentIndex-1)<= 0) {
    currentIndex = (this.state.allCards.length-1);  
    this.setState({currentCardIndex: currentIndex});
  } else {
    currentIndex--;
  }
  
  this.setState({card: this.state.allCards[currentIndex]});
  this.setState({currentCardIndex: (currentIndex)});
  this.setState({showAnswer: false});
  console.log(this.state.card);
  console.log("Current Index Now1:",this.state.currentCardIndex);
}

nextCard = () => {

  let currentIndex = this.state.currentCardIndex;
  
  if((currentIndex+1)>=this.state.allCards.length) {
      this.setState({currentCardIndex: 0});
      currentIndex = 0;
  } else {
    currentIndex++;
  }
  
  this.setState({card: this.state.allCards[currentIndex]});
  this.setState({currentCardIndex: (currentIndex)});
  this.setState({showAnswer: false});

  console.log(this.state.card);
  console.log("Current Index Now2:",this.state.currentCardIndex);
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
  fetch('http://localhost:3000/editcard', {
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


handleEditing = (type) => (event) => {
  if(type===QUESTION_CARD) {
    const newCard = Object.assign({},this.state.card,{card_question: event.target.value});
    this.setState({card: newCard});
  } else if(type===ANSWER_CARD) {
    const newCard = Object.assign({},this.state.card,{card_answer: event.target.value});
    this.setState({card: newCard});
  }
  
}

//<ShowAnswerButton showAnswerCard={this.showAnswerCard} showAnswer={showAnswer} />
  render() {
    console.log("Current Index Now3:",this.state.currentCardIndex);
    const { isSignedIn, card, route,showAnswer,editing } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />   
        { route !== 'home'
          ? (
            this.state.allCards.length > 0
            ? 
            <div >
              <CardOptions prevCard={this.prevCard} nextCard={this.nextCard} enableEditing={this.enableEditing} />
              <CardQuestion card={card} showAnswer={showAnswer} editing={editing} saveEditing={this.saveEditing} handleEditing={this.handleEditing} />
              <CardAnswer card={card} showAnswer={showAnswer} editing={editing} saveEditing={this.saveEditing} handleEditing={this.handleEditing}/>
              <ShowAnswerButton showAnswerCard={this.showAnswerCard} showAnswer={showAnswer} nextCard={this.nextCard} />
            </div>
            :<div>No Cards Loaded Yet</div>            
            )
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
          }     
        
      </div>
    );
  }
}

export default App;
