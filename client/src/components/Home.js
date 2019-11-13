import React, { Component } from 'react';

//custom components
import Navbar from './Navbar';
import RandomFact from './RandomFact';
import Reflection from './Reflection';

import Goal from './Goal';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {

      randomFactFetchSuccess: false,
      randomFactFetchError: false,
      randomFact: 'Perhaps the most famous comic cat is the Cheshire Cat in Lewis Carroll’s Alice in Wonderland. With the ability to disappear, this mysterious character embodies the magic and sorcery historically associated with cats.',

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
      goalFetchError: false

    }
  }

componentDidMount(){
  //GET REQUEST FOR USER GOAL STORED IN STATE
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

    fetch('http://localhost:8081/goal', {
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

//Cat Fact Generator/GET FACT API REQUEST
  generateRandomFact = () => {

    try{

     fetch('https://catfact.ninja/fact?max_length=140')

     .then(res => {
       return res.json();
     })

     .then(res => {
       if(res.fact !== ''){
         this.setState({
           randomFactFetchSuccess: !this.state.randomFactFetchSuccess,
           randomFact: res.fact
         })
       }
     })

    } catch(error) {

      console.log(`Random Fact Fetch error: ${error}`);

      this.setState({
        randomFactFetchError: !this.state.randomFactFetchError
      })
  }
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

        fetch('http://localhost:8081/reflection/create', {
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
            updatedReflectionsDisplay: true
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

    try{
      fetch('http://localhost:8081/reflection/listUserReflections', {
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
          reflectionsFetchSuccess: !this.state.reflectionsFetchSuccess
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

  fetch(`http://localhost:8081/reflection/update-${reflection_id}`, {
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

      fetch(`http://localhost:8081/reflection/delete-${reflection.id}`, {
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

  render(){

    return(

      <div id="home_container">

      <Navbar />

      <div id="home_content">

        <div id="random_fact_section">
          {this.state.randomFact ?
            <RandomFact fact={this.state.randomFact} generateRandomFact={this.generateRandomFact}/> :
            'Random Fact Loading...Why don\'t you reflect in the meantime?'}
        </div>

        <div id="reflections_display">

        <form id="new_reflection_form">

          <label htmlFor='newReflectionSubject'>

            <input
              id="new_reflection_subject"
              type="text"
              name="newReflectionSubject"
              value= {this.state.newReflectionSubject || ''}
              placeholder="Today I Learned..."
              onChange={this.handleInputChange}
                   />

          </label>

          <label htmlFor='newReflectionTidbit'>
            <textarea
                id="new_reflection_tidbit"
                rows="10" cols="23"
                type="text"
                name="newReflectionTidbit"
                value= {this.state.newReflectionTidbit || ''}
                placeholder=""
                onChange={this.handleInputChange}
                 />
          </label>

          <div className="btns_sidebyside">
            <button className="create_btn" onClick={this.handleReflectionsListFetch}>{this.state.reflectionsFetchSuccess ? 'hide reflections' : 'show progress'}</button>
            <button className="submit_btn" type="submit" onClick={this.handleNewReflectionSubmit} >submit</button>
          </div>

        </form>


        <div id="reflections_container" style={{ display: this.state.reflectionsFetchSuccess ? 'block' : 'none'}}>
        <h2 id="growth_title">Your Growth</h2>
        <div id="reflections_content" className="scrollbar">
          {this.state.reflectionsFetchSuccess ? this.renderAllReflections() : <p>No reflections yet? Start writing one now!</p>}
        </div>
        </div>

        </div>

        </div>

        <Goal
          handleGoal={this.handleGoal}
          goal={this.state.userGoal}/>

      </div>
    )
  }
}

export default Home;
