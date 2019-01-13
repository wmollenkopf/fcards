import React, { Component } from 'react';
import './App.css';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Card from './components/Card/Card';
import Translation from './components/Translation/Translation';
import Navigation from './components/Navigation/Navigation';


const initialState = {
  sessionKey:'',
  allCards: [],
  card: {
    cardId: 0,
    cardText: ''
  },
  currentCardIndex: 0,
  translation: {},
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
  
  console.log(this.state.card);
}

//<button onClick={this.onFetchCards}>Go</button>


  render() {
    const { isSignedIn, card, route, translation } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />   
        { route !== 'home'
          ? (
            this.state.allCards.length > 0
            ? 
            <div >
              <Card card={this.state.card} nextCard={this.nextCard} />
              <div className={`row`}>
                <div className={`col-md-12 text-center`}>
                  <div className={`h2`}><span className={`glyphicon glyphicon-arrow-down`}></span></div>
                </div>
              </div>
              <Translation translation={translation} />   
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
