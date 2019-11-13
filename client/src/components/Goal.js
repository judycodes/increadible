import React, { Component } from 'react';

class Goal extends Component{
  constructor(props){
    super(props);

    this.state = {
      currentGoal: '',
      updateGoalStatus: false,

      goalInput: '',
      goalFetchSuccess: false,
      goalFetchError: false
    }
  }

  getGoal() {
    fetch('http://localhost:8081/goal', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('user'),
        'Content-Type' : 'application/json'
      }
      })

    .then(res => {
      return res.json();
    })

    .then(res => {
      console.log(res, "res from get user goal");

      // if(res.goal !== null) {
      //
      //   this.setState({
      //     currentGoal: res.goal
      //   })
      //
      // } else {
      //
      //   this.setState({
      //     currentGoal: ''
      //   })
      //
      // }
    })
  }


  handleGoal = (e) => {
    e.preventDefault();

    if(this.state.goalInput !== '') {
      this.props.handleGoal(this.state.goalInput);

      console.log(this.state.goalInput, "goal input");
    }

    this.setState({
      updateGoalStatus: !this.state.updateGoalStatus
    })
  }

  handleInputChange= (e) => {

    e.preventDefault();

    if(e.target.value.trim() !== ''){
      this.setState({
        goalInput: e.target.value.trim()
      })
    } else {
      alert('Identify what you want accomplish and take your first step in realizing it!');
    }


  }


  updateGoalActive = () => {
    this.setState({
      updateGoalStatus: !this.state.updateGoalStatus
    })
  }

  render(){

    let goal;

    if(this.state.currentGoal === '') {
      goal = (
        <form id="goal_form" onSubmit={this.handleGoal}>
          <input
            defaultValue={this.state.currentGoal}
            name="currentGoal"
            type="text"
            onChange={this.handleInputChange}
            placeholder='Set a SMART goal' />
            <div className="btns_sidebyside">
              <button className="submit_btn" type="submit">Save</button>
              <button className="back_btn" onClick={this.updateGoalActive}>Cancel</button>
            </div>
        </form>
      )
    } else {
      goal = (
        <h3 id="user_goal">GOAL: {this.state.currentGoal}</h3>
      )
    }

    return goal;

  }
}

export default Goal;
