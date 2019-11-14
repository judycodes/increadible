import React, { Component } from 'react';

//custom components
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

        <ContentCard />

      </div>
    )
  }
}

export default About;
