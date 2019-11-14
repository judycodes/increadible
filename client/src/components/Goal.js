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
    }

    this.setState({
      updateGoalStatus: !this.state.updateGoalStatus
    })

  }

  handleInputChange= (e) => {
    e.preventDefault();

    if(e.target.value !== ''){
      this.setState({
        goalInput: e.target.value.trim()
      })
    } else {
      alert('Identify what you want accomplish and begin accomplishing it!');
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
          <input
            defaultValue={this.props.goal}
            name="currentGoal"
            type="text"
            onChange={this.handleInputChange}
            placeholder='Set a SMART goal' />
            <div className="btns_sidebyside">
              <button className="save_btn" type="submit" onClick={this.handleGoal}><i className="far fa-save"></i></button>
              <button className="cancel_btn" onClick={this.updateGoalActive}><i className="far fa-window-close"></i></button>
            </div>
        </form>
      )
    } else {

      goal = (
        <div>
        <h3 id="user_goal">{`GOAL: ${this.props.goal}`}</h3>

        <button className="submit_btn" onClick={this.updateGoalActive} type="submit">Update</button>

        </div>
      )
    }

    return goal;

  }
}

export default Goal;
