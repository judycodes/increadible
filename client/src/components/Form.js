import React, { Component } from 'react';

class Form extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }


    handleInputChange = (e) => {

        this.setState({
          [e.target.name] : e.target.value.trim()
        })

    }

    handleSubmit = (e) => {
      e.preventDefault();

      if(this.state.username === '' || this.state.password === '') {
        alert("Please provide valid inputs.");
        console.log(this.state.username, "username input");
        console.log(this.state.password, "password input");

      } else {

        this.props.submitType(this.state);
        console.log(this.state, "state object passed");
      }

    }

  render(){
    return (
      <form
        id={this.props.formType}
        method="post"
        onSubmit={this.handleSubmit}>

            <h1>{this.props.formGreeting}</h1>

            <label htmlFor={this.props.formType + '-username'}>
              <i className="fa fa-user"></i>
              <input type="text"
                     name="username"
                     placeholder="username"
                     onChange={this.handleInputChange}
                     />
            </label>

            <label htmlFor={this.props.formType + '-password'}>
               <i className="fa fa-key"></i>
               <input type="password"
                      name="password"
                      placeholder="password"
                      onChange={this.handleInputChange}
                      />
            </label>

             <button type="submit">submit</button>

        </form>
    )
  }

}
export default Form;
