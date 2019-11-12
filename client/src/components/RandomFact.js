import React from 'react';

const RandomFact = (props) => {
  return (
    <div>
      <h3>{props.fact}</h3>
      <button onClick={props.generateRandomFact}>Next New Fact</button>
    </div>
  )
}

export default RandomFact;
