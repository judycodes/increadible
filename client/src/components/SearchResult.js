import React from 'react';

const SearchResult = (props) => {
  return (
    <div id={props.resultId} className="search_result_card">

    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer">

    <h2>{props.title}</h2>
    <p className="ellipses" dangerouslySetInnerHTML={{__html: props.snippet}}></p>


    <button className="read_more_btn">read more</button>
    </a>

    </div>
  )
}

export default SearchResult;
