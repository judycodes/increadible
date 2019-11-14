import React, { Component } from 'react';

//custom components
import Navbar from './Navbar';
import ContentCard from './ContentCard';

class About extends Component{
  constructor(props){
    super(props);

    this.state={
      benefits:{
        title: "",
        content: ""
      },
      developer: {
        title: "",
        content: ""
      },
      quote: {
        person: "",
        content: ""
      }
    }
  }


  render(){
    return(
      <div id="about_container">
        <Navbar />
        <ContentCard />

      </div>
    )
  }
}

export default About;
