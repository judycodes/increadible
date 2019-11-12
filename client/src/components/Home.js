import React, { Component } from 'react';

//custom components
import Navbar from './Navbar';
import RandomFact from './RandomFact';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {

      randomFactFetchSuccess: false,
      randomFactFetchError: false,
      randomFact: 'Perhaps the most famous comic cat is the Cheshire Cat in Lewis Carroll’s Alice in Wonderland. With the ability to disappear, this mysterious character embodies the magic and sorcery historically associated with cats.',

      reflectionSubject: '',
      reflectionTidbit: '',
      reflectionSubmitSuccess: false,
      reflectionSubmitError: false

    }
  }

generateRandomFact = () => {
  try{
   fetch('https://catfact.ninja/fact?max_length=140')
   .then(res => {
     return res.json();
   })
   .then(res => {
     console.log(res.fact);

     if(res.fact !== ''){
       this.setState({
         randomFactFetchSuccess: !this.state.randomFactFetchSuccess,
         randomFact: res.fact
       })
     }
   })

  } catch(error) {
  console.log(`Random fact fetch error: ${error}`);

  this.setState({
    randomFactFetchError: !this.state.randomFactFetchError
  })
}
}

handleInputChange = (e) => {

    this.setState({
      [e.target.name] : e.target.value.trim()
    })

}

handleReflectionSubmit = (e) => {
  e.preventDefault();

  if(this.state.reflectionSubject !== '' && this.state.reflectionTidbit !== '') {

    try{

        fetch('http://localhost:8081/reflection/create', {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('user'),
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          subject: this.state.reflectionSubject,
          tidbit: this.state.reflectionTidbit
        })
      })

        .then(res => {
          return res.json();
        })

        .then( res => {
          console.log(res, "create reflection res");

          this.setState({
            reflectionSubmitSuccess: !this.state.reflectionSubmitSuccess
          })
        })

    } catch(error) {
      console.log(`Reflection Submission Error: ${error}`);

      this.setState({
        reflectionSubmitError: !this.state.reflectionSubmitError
      })
    }

  } else {
    alert("Have something to reflect on? Write it down, before you forget!");
  }



}

  render(){
    return(

      <div id="home_container">

      <Navbar />

      {this.state.randomFact ?
        <RandomFact fact={this.state.randomFact} generateRandomFact={this.generateRandomFact}/> :
        'Random Fact Loading...Why don\'t you reflect in the meantime?'}

      <form onSubmit={this.handleReflectionSubmit} id="reflection_form">

        <label htmlFor='reflectionSubject'>

          <input
            id="reflection_subject"
            type="text"
            name="reflectionSubject"
            placeholder="Today I Learned..."
            onChange={this.handleInputChange}
                 />

        </label>

        <label htmlFor='reflectionTidbit'>
          <textarea
              id="reflection_tidbit"
              rows="5" cols="30"
              type="text"
              name="reflectionTidbit"
              placeholder=""
              onChange={this.handleInputChange}
               />
        </label>

        <button type="submit">submit</button>

      </form>

      </div>
    )
  }
}

export default Home;
