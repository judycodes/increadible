import React, { Component } from 'react';

//custom components
import Form from './Form';

class Landing extends Component {

  constructor(){
    super();
    this.state = {
        signupFormActive: false,
        signupSuccess: false,
        signupError: false,

        loginFormActive: false,
        loginSuccess: false,
        loginError: false,

        userActiveSuccess: false,
        userActiveError: false,

        userInfo: {
          username: '',
          password: '',
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


  signup = (user) => {
try{

      this.setState({
        userInfo: {
          username: user.username,
          password: user.password
        }
      })

      fetch('http://localhost:8081/signup', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    })

    .then((res) => {
      return res.json();
    })

    .then((res) => {

        this.setState({
          userInfo: { ...this.state.userInfo, res},
          signupSuccess: !this.state.signupSuccess
          })

        this.handleActiveUser();

    })
} catch(error) {

      console.log(`Error in signup: ${error}`);

      this.setState({
        signupError: !this.state.signupError
      })


  }
}

  //log in existing user methods
    handleLoginClick = () => {

        this.setState({
        loginFormActive: !this.state.loginFormActive
        })

    }

  login = (user) => {
    try{

          this.setState({
            userInfo: {
              username: user.username,
              password: user.password
            }
          })

          fetch('http://localhost:8081/login', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password
          })
        })

        .then((res) => {
          return res.json();
        })

        .then((res) => {

            this.setState({
              userInfo: { ...this.state.userInfo, res},
              loginSuccess: !this.state.loginSuccess
              })
              console.log(this.state.loginSuccess, "log in success");
            this.handleActiveUser();

        })
    } catch(error) {

          console.log(`Error in login: ${error}`);

          this.setState({
            loginError: !this.state.loginError
          })


      }
  }

 handleActiveUser = () => {

   if((this.state.userInfo.res.token === null ||this.state.userInfo.res.token) && this.state.userInfo.res.error !== "IM Used") {
     console.log(this.state.userInfo, "user info after fetch call");

     console.log(this.state.userInfo.res.token, "token");

     this.setState({
       userActiveSuccess : !this.state.userActiveSuccess
     })
   } else {
     this.setState({
       userActiveError : !this.state.userActiveError
     })
     console.log("handle active user error");
   }


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
                <p className="cancel_btn" onClick={this.handleLoginClick}>Back</p> :
                'Sign In'}
            </button>
          </div>

          <div id="landing_content">


            <h1 id="landing_title">INCREADIBLE</h1>
            <h3 id="landing-tagline">the place to remember those useful tidbits and discover some of your own</h3>

            <button
              id="get_started_btn"
              onClick={this.handleSignupClick}
              style={{ display: this.state.loginFormActive ? 'none' : 'block'}}>
              {this.state.signupFormActive ?
                <p className="cancel_btn" onClick={this.handleSignupClick}>Back</p> :
                'Get Started'}
            </button>

            {this.state.signupFormActive ?
              <Form
                formType= 'signup'
                submitType= {this.signup}
                formGreeting= 'Create An Account'
                /> : ''}

            {this.state.loginFormActive ?
              <Form
                formType= 'login'
                submitType= {this.login}
                formGreeting= 'Welcome Back'
                /> : ''}

          </div>
        </div>
    )
  }

}


export default Landing;

// <h2 id="landing-tagline">A Digital Reflection Journal & Learning Tool For A Growth Mindset</h2>
//Move to about
// <blockquote>
// <h1 className="quotation">we do not learn from experience ... we learn from reflecting on experience.
// </h1>
// <p id="quote-author">John Dewey</p>
// </blockquote>
