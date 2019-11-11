import React, { Component } from 'react';

class Form extends Component {
  constructor(props){
    super(props);

    this.state = {
      formType: this.props.formType, //signup or login
      submitType: this.props.submitType, //create account or log in method triggered
      formGreeting: this.props.formGreeting, //welcome back for log in & registration for sign in
      username: '',
      password: '',
      handleUsernameInput: this.props.handleUsernameInput,
      handlePasswordInput: this.props.handlePasswordInput
    }
  }

  render(){
    return (
      <form
        id={this.state.formType}
        method="post"
        onSubmit={(e) =>
          {e.preventDefault();
          this.state.submitType();
          console.log(`${this.state.submitType} submitted`)}}>

            <h1>{this.state.formGreeting}</h1>

            <label htmlFor={this.state.formType + '-username'}>
              <i className="fa fa-user"></i>
              <input type="text"
                     name="username"
                     placeholder="username"
                     onChange={this.state.handleUsernameInput}
                     />
            </label>

            <label htmlFor={this.state.formType + '-password'}>
               <i className="fa fa-key"></i>
               <input type="password"
                      name="password"
                      placeholder="password"
                      onChange={this.state.handlePasswordInput}
                      />
            </label>

             <button type="submit" >submit</button>

        </form>
    )
  }

}
export default Form;
