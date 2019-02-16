import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

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

const app = shallow(<App/>);
describe('App',()=>{

    it('renders correctly', ()=>{
        expect(app).toMatchSnapshot();
    });
    
    describe('When state is first initialized',()=>{});
    it('initializes the `state` `fcardServerURL` with a URL',()=>{
        expect(app.state().fcardServerURL);
    });
 

    

})


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


