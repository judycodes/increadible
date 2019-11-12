import React, { Component } from 'react';

//custom components
import Navbar from './Navbar';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      randomFactFetchSuccess: false,
      randomFactFetchError: false,
      randomFact: ''

    }
  }

  componentDidMount(){

    try{

     fetch('https://uselessfacts.jsph.pl/random.json?language=en')

      .then( res => {
        return res.json();
      })

      .then(res => {
        console.log(res.text, "random fact");

        if(res.text !== ''){
          this.setState({
            randomFactFetchSuccess: !this.state.randomFactFetchSuccess,
            randomFact: res.text
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
      {this.state.randomFact ? <p>{this.state.randomFact}</p> : 'Random Fact Loading...'}


      </div>
    )
  }
}

export default Home;
