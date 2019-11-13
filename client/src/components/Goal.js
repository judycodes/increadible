import React, { Component } from 'react';

class Goal extends Component{
  constructor(props){
    super(props);

    this.state = {
      currentGoal: this.props.goal,
      updateGoalStatus: false,

      goalInput: '',
      goalFetchSuccess: false,
      goalFetchError: false
    }
  }

  componentDidMount(){
    this.getUserGoal();
  }

  componentDidUpdate(prevState) {
    if(prevState.currentGoal !== this.state.currentGoal){
      this.getUserGoal();
    }
  }


  getUserGoal() {

    try{

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

        if(res.goal !== null) {

          this.setState({
            currentGoal: res.goal,
            goalFetchSuccess: !this.state.goalFetchSuccess
          })

        } else {

          this.setState({
            currentGoal: this.props.goal
          })

        }
      })

    } catch(error) {
        console.log(`Error In User Goal Fetch: ${error}`);

        this.setState({
          goalFetchError: !this.state.goalFetchError
        })
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

    if(this.state.currentGoal === '' || this.state.updateGoalStatus) {

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
        <div>
        <h3 id="user_goal">{`GOAL: ${this.state.currentGoal}`}</h3>

        <button className="submit_btn" onClick={this.updateGoalActive} type="submit">Update</button>

        </div>
      )
    }

    return goal;

  }
}

export default Goal;
