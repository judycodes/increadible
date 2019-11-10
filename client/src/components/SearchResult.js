import React from 'react';

const SearchResult = (props) => {
  return (
    <div id={props.resultId}>

    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer">

    <h3>{props.title}</h3>
    <p dangerouslySetInnerHTML={{__html: props.snippet}}></p>


    <button>read more</button>
    </a>

    </div>
  )
}

export default SearchResult;
