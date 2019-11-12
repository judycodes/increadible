import React from 'react';

const RandomFact = (props) => {
  return (
    <div id="random_fact_container">
      <h3 id="random_fact_content">{props.fact}</h3>
      <button onClick={props.generateRandomFact} id="random_fact_btn">Learn Another Tidbit</button>
    </div>
  )
}

export default RandomFact;
