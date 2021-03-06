import React, { Component } from 'react';

class Form extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  //INPUT ONCHANGE FROM SIGNUP/LOGIN FORM
  handleInputChange = (e) => {
      this.setState({
        [e.target.name] : e.target.value.trim()
      })
  }

  //FORM SUBMISSION
  handleSubmit = (e) => {
    e.preventDefault();

    if(this.state.username === '' || this.state.password === '') {
      alert("Please provide valid inputs.");
    } else {
      this.props.submitType(this.state);
    }
  }

  render(){
    return (
      <form
        className="landing_form"
        id={this.props.formType}
        method="post"
        onSubmit={this.handleSubmit}>

            <h1 className="form_greeting">{this.props.formGreeting}</h1>

            <label htmlFor={this.props.formType + '-username'}>
              <i className="fa fa-user"></i>
              <input type="text"
                     maxLength="250"
                     name="username"
                     placeholder="username"
                     onChange={this.handleInputChange}
                     />
            </label>

            <label htmlFor={this.props.formType + '-password'}>
               <i className="fa fa-key"></i>
               <input type="password"
                      name="password"
                      maxLength="250"
                      placeholder="password"
                      onChange={this.handleInputChange}
                      />
            </label>

             <button className="white_btn" type="submit">submit</button>

        </form>
    )
  }

}

export default Form;
