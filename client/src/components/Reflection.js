import React from 'react';

const Reflection = (props) => {

  return (
    <div className="reflection_content">
      <h3>{props.subject}</h3>
      <p>{props.tidbit}</p>
      <div className="reflection_btns"></div>
    </div>
  )

}

export default Reflection;
