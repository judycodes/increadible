import React, { Component } from 'react';

//custom components
import Navbar from './Navbar';
import RandomFact from './RandomFact';
import Reflection from './Reflection';

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
      reflectionsFetchError: false
    }
  }

generateRandomFact = () => {
  try{
   fetch('https://catfact.ninja/fact?max_length=140')
   .then(res => {
     return res.json();
   })
   .then(res => {
     console.log(res, "entire fact res");
     console.log(res.fact);

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

handleInputChange = (e) => {

    this.setState({
      [e.target.name] : e.target.value
    })

}

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
          console.log(res, "create reflection res");

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

handleReflectionsListFetch = (e) => {
  e.preventDefault();

  try{
    fetch('http://localhost:8081/reflection/listAllReflections', {
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

      console.log(this.state.reflectionsDisplay, "reflectionsDisplay");

    })
  } catch(error) {
    console.log(`Rendering All User Reflections Error: ${error}`);

    this.setState({
      reflectionsFetchError: !this.state.reflectionsFetchError
    })
  }

}

renderAllReflections() {
  return this.state.reflectionsDisplay.map((reflection, index) => {
    return <Reflection subject={reflection.subject} tidbit={reflection.tidbit} id={reflection.reflection_id} key={index} />
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
                rows="5" cols="30"
                type="text"
                name="newReflectionTidbit"
                value= {this.state.newReflectionTidbit || ''}
                placeholder=""
                onChange={this.handleInputChange}
                 />
          </label>

          <div id="list_and_submit_btns">
            <button onClick={this.handleReflectionsListFetch}>saved reflections</button>
            <button type="submit" onClick={this.handleNewReflectionSubmit} >submit</button>
          </div>

        </form>


        <div id="reflections_container">
        <h2>Your Growth</h2>
        <div id="reflections_content">
          {this.state.reflectionsFetchSuccess ? this.renderAllReflections() : <p>No reflections yet? Start writing one now!</p>}
        </div>
        </div>



        </div>

        </div>


      </div>
    )
  }
}

export default Home;
