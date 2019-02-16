import React, { Component } from 'react';
import './Signin.css';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    const url=`${this.props.fcardServerURL}/signin`;
    fetch(url, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(token => {
        if (token) {
          this.props.loadUser(token);
          // if(this.props.allCards && !(this.props.allCards.length>0)) {
          //   this.props.enableCreating();
          // }
        }
      })
  }

  onSubmitRegister = () => {
    const url = `${this.props.fcardServerURL}/register`;
    console.log(`Accessing: ${url}`);
    console.log(`signInEmail: ${this.state.signInEmail}`);
    console.log(`signInPassword: ${this.state.signInPassword}`);
    console.log('Creating user...');
    fetch(url, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(token => {
        console.log('token',token);
        if (token) {
          this.props.loadUser(token);
          if(this.props.allCards && !(this.props.allCards.length>0)) {
            this.props.enableCreating();
          }
        }
        
      })
  }

  render() {
    return (
        <div >
        <div className={`row`}>
            <div className={`col-md-4 col-md-offset-4 form-box boxShadow`}>
                <fieldset id="sign_up">
                    <h1 className={`boxshadow`}>Register or Log In</h1>
                    <div className={`input-group-lg`}>
                        <div className={`input-group input-group-lg`}>
                            <span className={`input-group-addon`}>
                                <span className={`glyphicon glyphicon-envelope`}></span>
                            </span>
                            <input 
                                autoFocus
                                type="email" 
                                id="email-address" 
                                name="email-address" 
                                placeholder="Username (E-Mail)" 
                                required="required"
                                autoComplete="off" 
                                className={`form-control`}
                                onChange={this.onEmailChange}
                            />
                        </div>
                        &nbsp;
                        <div className={`input-group input-group-lg`}>
                            <span className={`input-group-addon`}>
                                <span className={`glyphicon glyphicon-lock`}></span>
                            </span>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Password" 
                                required="required" 
                                autoComplete="off" 
                                className={`form-control`} 
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        &nbsp;<br/>
                        <input
                            className={`btn btn-lg btn-default`}
                            onClick={this.onSubmitRegister}
                            type="submit"
                            value="Register"
                        />
                        &nbsp;
                        <input
                            className={`btn btn-lg btn-primary`}
                            onClick={this.onSubmitSignIn}
                            type="submit"
                            value="Log In"
                        />
                        <hr/>
                        <input
                                className={`btn btn-lg btn-default`}
                                //onClick={this.onSubmitSignIn}
                                disabled={true}
                                type="submit"
                                value="Forgot Password"
                            />
                        &nbsp;<br/>
                    </div>
                </fieldset>
            </div>    
        </div>            
    </div>
    );
  }
}

export default Signin;