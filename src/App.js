import React, { Component } from 'react';
import './App.css';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import CardQuestion from './components/CardQuestion/CardQuestion';
import CardAnswer from './components/CardAnswer/CardAnswer';
import Navigation from './components/Navigation/Navigation';


const initialState = {
  sessionKey:'',
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
    id: 4,
    username: 'biri@biri.me',
    joined: ''
  }
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
      userId: this.props.userId,
      sessionKey: this.props.sessionKey
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
}

showAnswerCard = () => {
  console.log("Showing answer...");
  this.setState({showAnswer: true});
}

  render() {
    const { isSignedIn, card, route,showAnswer } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />   
        { route !== 'home'
          ? (
            this.state.allCards.length > 0
            ? 
            <div >
              <CardQuestion card={card} prevCard={this.prevCard} nextCard={this.nextCard} />
              <div className={`row`}>
                <div className={`col-md-12 text-center`}>
                  <button className={`btn btn-info btn-lg`} onClick={this.showAnswerCard}><span className={`glyphicon glyphicon-arrow-down`}></span> Show Answer <span className={`glyphicon glyphicon-arrow-down`}></span></button>
                </div>
              </div>
              <CardAnswer cardAnswer={card.card_answer} showAnswer={showAnswer}/>   
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
