import React, { Component } from 'react';

class Form extends Component {
  constructor(props){
    super(props);

    this.state = {
      formType: '', //signup or login
      submitType: '', //create account or log in method triggered
      formGreeting: '', //welcome back for log in & registration for sign in
      username: '',
      password: '',
      handleUsernameInput: '',
      handlePasswordInput: ''
    }
  }

  render(){
    return (
      <form id={this.state.formType} method="post" onSubmit={this.state.submitType}>

            <h1>{this.state.formGreeting}</h1>

            <label for={this.state.formType + '-username'}>
              <i class="fa fa-user"></i>
              <input type="text"
                     name="username"
                     placeholder="username"
                     value={this.state.username || ''}
                     onChange={this.state.handleUsernameInput}
                     />
            </label>

            <label for="logIn-pw">
               <i class="fa fa-key"></i>
               <input type="password"
                      name="password"
                      placeholder="password"
                      value={this.state.password || ''}
                      onChange={this.state.handlePasswordInput}
                      />
            </label>

             <button type="submit">submit</button>
        </form>
    )
  }

}
export default Form;
