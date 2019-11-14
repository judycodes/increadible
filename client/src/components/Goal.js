import React, { Component } from 'react';

class Goal extends Component{
  constructor(props){
    super(props);

    this.state = {
      updateGoalStatus: false,
      goalInput: ''
    }
  }

  handleGoal = (e) => {
    e.preventDefault();

    if(this.state.goalInput !== '') {
      this.props.handleGoal(this.state.goalInput);


      this.setState({
        updateGoalStatus: !this.state.updateGoalStatus
      })
    } else {
      alert('Create a Specific, Measurable, Achievable, Realistic, and Timely goal.')
    }

  }

  handleInputChange= (e) => {
    e.preventDefault();

    if(e.target.value !== ''){
      this.setState({
        goalInput: e.target.value.trim()
      })
    } else {
      alert('Take the first step in reaching your goal!');
    }

  }

  updateGoalActive = () => {
    this.setState({
      updateGoalStatus: !this.state.updateGoalStatus
    })
  }

  render(){

    let goal;

    if(this.props.goal === '' || this.state.updateGoalStatus) {

      goal = (
        <form id="goal_form" onSubmit={this.handleGoal}>
          <h3 id="goal_form_title">What do you want to accomplish?</h3>
          <input
            maxLength="250"
            id="goal_input"
            defaultValue={this.props.goal}
            name="currentGoal"
            type="text"
            onChange={this.handleInputChange}
            placeholder='Set a SMART goal' />
            <div className="btns_sidebyside">
              <button className="blue_btn" onClick={this.updateGoalActive}>cancel</button>
              <button className="white_btn" type="submit">save</button>

            </div>
        </form>
      )
    } else {

      goal = (
        <div id="goal_display">
        <h3 id="user_goal">{`GOAL: ${this.props.goal}`}</h3>

        <button className="edit_btn" onClick={this.updateGoalActive} type="submit"><i className="far fa-edit"></i></button>

        </div>
      )
    }

    return goal;

  }
}

export default Goal;
