import React, {Component} from 'react';

class Search extends Component{
  constructor(props){
    super(props);

    this.state = {
      searchInput : '',
      searchResponses : []
    }
  }

//onClick of search submit that triggers api call
handleSearchSubmit = (e) => {
  e.preventDefault();

  this.setState({
    //resets previously rendered individual search result content to be empty before displaying new content
    searchResponses : []
  })

  let wikiUrl = 'https://en.wikipedia.org/w/api.php';

  let params = {
    action: 'query',
    list: 'search',
    srsearch: this.state.searchInput,
    format: 'json'
  }

  wikiUrl += '?origin=*';
  Object.keys(params).forEach((key) => {
    wikiUrl += "&" + key + "=" + params[key];
  });

  console.log(wikiUrl, 'wikiUrl before fetch');

  fetch(wikiUrl)
      .then(res => {
          return res.json();
        })
      .then(res => {
        console.log(res, "res from wiki api call");
      })

}


//captures user search input for later api call for search results related to input
handleSearchInput = (e) => {
  e.preventDefault();

  //matches all whitespaces in input from onchange and replaces them with '%20'
 let noWhiteSpaceInput = e.target.value.replace(/\s/g,'%20');

  this.setState({
    searchInput : noWhiteSpaceInput
  })

  console.log(this.state.searchInput, 'searchInput state after onChange and setState');


}

  render(){

    //stores search results - api response
    let searchResultsContent = [];

    return(
      <div>

        <h1 id="search-title">The Unending Search For Knowledge</h1>

      <form>

        <input
          id="search-input"
          type="text"
          onChange={this.handleSearchInput}
          placeholder='Curious about ...' />

        <button
          type='submit'
          onClick={this.handleSearchSubmit}>Enlighten Me</button>

        <a
          href="https://en.wikipedia.org/wiki/Special:Random"
          id="random-search"
          target="_blank"
          rel="noopener noreferrer">random</a>

      </form>

      {searchResultsContent}

      </div>
    )
  }
}

export default Search;
