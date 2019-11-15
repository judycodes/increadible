import React, { Component } from 'react';

//custom components
import Navbar from './Navbar';
import Reflection from './Reflection';

import Goal from './Goal';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {

      newReflectionSubject: '',
      newReflectionTidbit: '',
      newReflectionSubmitSuccess: false,
      newReflectionSubmitError: false,
      updatedReflectionsDisplay: false,

      reflectionsDisplay: [],
      reflectionsFetchSuccess: false,
      reflectionsFetchError: false,

      editedReflectionSubmitSuccess: false,
      editedReflectionSubmitError: false,

      deleteReflectionSuccess: false,
      deleteReflectionError: false,

      userGoal: '',
      goalFetchSuccess: false,
      goalFetchError: false,

      showReflections: false

    }
  }

componentDidMount(){
  this.reflectionsFetch();
  //GET REQUEST FOR USER GOAL STORED IN STATE
  try{

      fetch('http://54.90.117.44:8081/goal', {
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
            userGoal: res.goal,
            goalFetchSuccess: !this.state.goalFetchSuccess
          })

        } else {

          this.setState({
            userGoal: ''
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

  //PUT REQUEST TO CREATE/UPDATE USER GOAL
  handleGoal = goalInput => {

    fetch('http://54.90.117.44:8081/goal', {
        method: 'PUT',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('user'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          goal: goalInput
        })
      })

    .then(res => {
      return res.json();
    })

    .then(res => {
      this.setState({
        userGoal: res.goal
      })

    })

  }

//REFLECTION METHODS
  //INPUT ONCHANGE FROM CREATE REFLECTION FORM
  handleInputChange = (e) => {

      this.setState({
        [e.target.name] : e.target.value
      })

  }

  //POST NEW REFLECTION API REQUEST
  handleNewReflectionSubmit = (e) => {

    e.preventDefault();

    if(this.state.newReflectionSubject.trim() !== '' && this.state.newReflectionTidbit.trim() !== '') {

      try{

        fetch('http://54.90.117.44:8081/reflection/create', {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('user'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          subject: this.state.newReflectionSubject,
          tidbit: this.state.newReflectionTidbit
        })
        })

        .then(res => {
          return res.json();
        })

        .then(res => {

          let updatedReflectionsDisplayList = [...this.state.reflectionsDisplay];

          updatedReflectionsDisplayList.push(res);

          this.setState({
            reflectionsDisplay: updatedReflectionsDisplayList,
            newReflectionSubmitSuccess: !this.state.newReflectionSubmitSuccess,
            updatedReflectionsDisplay: true,
            newReflectionSubject: '',
            newReflectionTidbit: ''
        })

        })

        .then(res => {

          this.renderAllReflections();
          this.setState({
            showReflections: true
          })
        })

      } catch(error) {

        console.log(`Create Reflection Submission Error: ${error}`);

        this.setState({
          newReflectionSubmitError: !this.state.newReflectionSubmitError
        })
      }

    } else {

      alert("Have something to reflect on? Write it down, before you forget!");

    }
  }

  //GET ALL USER REFLECTIONS API REQUEST TO STORE IN STATE
  handleReflectionsListFetch = (e) => {
    e.preventDefault();

    this.reflectionsFetch();

  }

  reflectionsFetch = () => {
    try{
      fetch('http://54.90.117.44:8081/reflection/listUserReflections', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('user'),
        'Content-Type' : 'application/json'
      }
    })

      .then(res => {
        return res.json();
      })

      .then(res => {

        this.setState({
          reflectionsDisplay: res,
          reflectionsFetchSuccess: true
        })

      })

    } catch(error) {
      console.log(`Rendering All User Reflections Error: ${error}`);

      this.setState({
        reflectionsFetchError: !this.state.reflectionsFetchError
      })
    }

  }

  //PUT REQUEST TO UPDATE REFLECTION
  handleEdit = (reflection, reflection_id) => {

  fetch(`http://54.90.117.44:8081/reflection/update-${reflection_id}`, {
      method: 'PUT',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('user'),
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        subject: reflection.subject,
        tidbit: reflection.tidbit,
        id: reflection_id
      })
    })

    .then(res => {
      return res.json();
    })

    .then(res => {

      const updatedReflectionsDisplayList = this.state.reflectionsDisplay;

      updatedReflectionsDisplayList.map((reflection) => {

        let index;

        if(reflection.id === reflection_id) {

          index = this.state.reflectionsDisplay.indexOf(reflection);

          updatedReflectionsDisplayList[index].subject = res.subject;
          updatedReflectionsDisplayList[index].tidbit = res.tidbit;

          return this.state.reflectionsDisplay[index];

        } else {
          return reflection;
         }

       })

      this.setState({

        editedReflectionSubmitSuccess: !this.state.editedReflectionSubmitSuccess,
        reflectionsDisplay: updatedReflectionsDisplayList

      })
     })

    .catch(error => {
      console.log('Error In Edited Reflection Submission:', error);

      this.setState({
        editedReflectionSubmitError: !this.state.editedReflectionSubmitError
      })
    })
}

  //DELETE REQUEST FOR SPECIFIED REFLECTION
  handleDelete = (reflection, index) => {
    try{

      fetch(`http://54.90.117.44:8081/reflection/delete-${reflection.id}`, {
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('user'),
            'Content-Type' : 'application/json'
          }
        })

      .then(res => {

        const updatedReflectionsDisplayList = this.state.reflectionsDisplay;

        updatedReflectionsDisplayList.splice(index, 1);

        this.setState({
              reflectionsDisplay: updatedReflectionsDisplayList,
              deleteReflectionSuccess: !this.state.deleteReflectionSuccess
            })

      })

    } catch(error) {
      console.log(`Error In Deleting Reflection: ${error}`);

      this.setState({
        deleteReflectionError: !this.state.deleteReflectionError
      })
    }
  }

  //DISPLAY ALL USER REFLECTIONS
  renderAllReflections() {
    return this.state.reflectionsDisplay.map((reflection, index) => {
      return <Reflection
        subject={reflection.subject}
        tidbit={reflection.tidbit}
        edit={this.handleEdit}
        delete={() => this.handleDelete(reflection, index)}
        id={reflection.id}
        key={index} />
    })
  }

  toggleReflectionsDisplay = () => {
    this.setState({
      showReflections: !this.state.showReflections
    })
  }

  render(){

    return(

      <div id="home_container">

      <Navbar />

        <div id="reflections_display">

        <form id="new_reflection_form" onSubmit={this.handleReflectionsListFetch}>

          <label htmlFor='newReflectionSubject'>

            <input
              id="new_reflection_subject"
              maxLength="30"
              type="text"
              name="newReflectionSubject"
              value= {this.state.newReflectionSubject || ''}
              placeholder="Today I Learned..."
              onChange={this.handleInputChange}
                   />

          </label>

          <label htmlFor='newReflectionTidbit'>
            <textarea
                maxLength="250"
                id="new_reflection_tidbit"
                rows="12" cols="30"
                type="text"
                name="newReflectionTidbit"
                value= {this.state.newReflectionTidbit || ''}
                placeholder=""
                onChange={this.handleInputChange}
                 />
          </label>

          <div className="btns_sidebyside">
            <button className="blue_btn" type="button" onClick={this.toggleReflectionsDisplay}>{this.state.showReflections ? 'hide reflections' : 'show progress'}</button>
            <button className="white_btn" type="submit" onClick={this.handleNewReflectionSubmit}>submit</button>
          </div>

        </form>

        <div id="reflections_container" style={{ display: this.state.showReflections ? 'block' : 'none'}}>
        <h2 id="growth_title">Growth in Progress</h2>
        <div id="reflections_content">

          {this.state.reflectionsDisplay.length !== 0 ? this.renderAllReflections() : <p id="no_reflections_msg">No reflections yet. Begin tracking your growth.</p>}

        </div>

        </div>
        <Goal
          handleGoal={this.handleGoal}
          goal={this.state.userGoal}/>
        </div>



      </div>
    )
  }
}

export default Home;
