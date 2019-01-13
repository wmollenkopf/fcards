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
  translation: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    username: '',
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


//<button onClick={this.onFetchCards}>Go</button>


  render() {
    const { isSignedIn, card, route, translation } = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />   
        { route !== 'home'
          ? <div>
              <Card userId={this.state.userId} sessionKey={this.state.sessionKey} />
              <div className={`row`}>
                <div className={`col-md-12 text-center`}>
                  <div className={`h2`}><span className={`glyphicon glyphicon-arrow-down`}></span></div>
                </div>
              </div>
              <Translation translation={translation} />   
            </div>
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
