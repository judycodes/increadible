import React, { Component } from 'react';

class Landing extends Component {

  constructor(){
    super();
    this.state = {
        signup: false,
        signup_form_error: false,
        signin: false,
        signin_form_error: false
    }
  }

  handleSignUpClick = () => {
    this.setState({
      signup: !this.state.signup
    })
  }

  render(){

    return (
        <div id= "landing_container">
          <div id="landing_nav">
            <button id="sign_in_btn">Sign In</button>
          </div>
          <div id="landing_content">


            <h1 id="landing_title">INCREADIBLE</h1>
            <button id="get_started_btn" onClick={this.handleSignUpClick}>Get Started</button>


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
