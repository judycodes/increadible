import React, { Component } from 'react';

//custom components
import Form from './Form';

class Landing extends Component {

  constructor(){
    super();
    this.state = {
        signupFormActive: false,

        loginFormActive: false,

        userActive: false,
        userInfo: {
          username: '',
          goal: ''
        },
        reflectionsFetchSuccess: false,
        reflectionsFetchError: false
    }
  }

//create account methods
  handleSignupClick = () => {

      this.setState({
      signupFormActive: !this.state.signupFormActive
      })

  }


  signup = () => {

  }

  //log in existing user methods
    handleLoginClick = () => {

        this.setState({
        loginFormActive: !this.state.loginFormActive
        })

    }

  login = () => {

  }

  render(){

    return (
        <div id= "landing_container">
          <div id="landing_nav">
            <button
              id="sign_in_btn"
              onClick={this.handleLoginClick}
              style={{ display: this.state.signupFormActive ? 'none' : 'block'}}>
              {this.state.loginFormActive ?
                <p className="cancel_btn" onClick={this.handleLoginClick}>Cancel</p> :
                'Sign In'}
            </button>
          </div>
          <div id="landing_content">


            <h1 id="landing_title">INCREADIBLE</h1>
            <button
              id="get_started_btn"
              onClick={this.handleSignupClick}
              style={{ display: this.state.loginFormActive ? 'none' : 'block'}}>
              >
              {this.state.signupFormActive ?
                <p className="cancel_btn" onClick={this.handleSignupClick}>Cancel</p> :
                'Get Started'}
            </button>

            {this.state.signupFormActive ?
              <Form
                formType= 'signup'
                submitType= {this.signup}
                formGreeting= 'Create An Account'
                handleUsernameInput= {this.handleUsernameInput}
                handlePasswordInput= {this.handlePasswordInput}
                /> : ''}

            {this.state.loginFormActive ?
              <Form
                formType= 'login'
                submitType= {this.login}
                formGreeting= 'Welcome Back'
                handleUsernameInput= {this.handleUsernameInput}
                handlePasswordInput= {this.handlePasswordInput}
                /> : ''}

          </div>
        </div>
    )
  }

}


export default Landing;

//Move to about
// <blockquote>
// <h1 className="quotation">we do not learn from experience ... we learn from reflecting on experience.
// </h1>
// <p id="quote-author">John Dewey</p>
// </blockquote>
