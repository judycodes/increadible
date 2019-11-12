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
      randomFact: 'Perhaps the most famous comic cat is the Cheshire Cat in Lewis Carroll’s Alice in Wonderland. With the ability to disappear, this mysterious character embodies the magic and sorcery historically associated with cats.'

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

  render(){
    return(

      <div id="home_container">

      <Navbar />
      {this.state.randomFact ? <RandomFact fact={this.state.randomFact} generateRandomFact={this.generateRandomFact}/> : 'Random Fact Loading...'}


      </div>
    )
  }
}

export default Home;
