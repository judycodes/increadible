import React, {Component} from 'react';

class Search extends Component{
  constructor(props){
    super(props);

    this.state = {
      searchInput : ' ',
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

  if(!this.state.searchInput) alert("Please provide valid input.");

  let params = {
    action: 'query',
    list: 'search',
    srsearch: this.state.searchInput, //must not be null
    format: 'json'
  }

  wikiUrl += '?origin=*';
  Object.keys(params).forEach((key) => {
    wikiUrl += "&" + key + "=" + params[key];
  });

  fetch(wikiUrl)
      .then( res => {
          return res.json();
        })
      //the following when uncommented causes uncaught promise for below
      // .then(res => {
      //   console.log(res, "res from wiki api call");
      //   console.log(res.query.search, "res.query.search");
      // })

      //grabs specific pieces of res data for each result
      .then( res => {

        res.query.search.map( foundResult => {
          return this.state.searchResponses.push({
            pageUrl: 'no-link',
            pageId: foundResult.pageid,
            pageTitle: foundResult.title,
            pageSnippet: foundResult.snippet
          })
        })

        console.log(this.state.searchResponses, "searchResponses");
        this.handleUrlFetch();
      })

      //TODO - clear search input
      // this.setState({
      //   searchInput: ""
      // })

}

handleUrlFetch = () => {

  this.state.searchResponses.map( specificPage => {

    let pathToRetrieveFullUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${specificPage.pageId}&inprop=url&format=json`;

    fetch(pathToRetrieveFullUrl)

    .then(res => {
      return res.json();
    })

    .then( res => {

        return specificPage.pageUrl = res.query.pages[specificPage.pageId].fullurl;

    })

  })

  console.log(this.state.searchResponses, "searchResponses with url");

}

//captures user search input for later api call for search results related to input
handleSearchInput = (e) => {
  e.preventDefault();

  //trims leading and/or trailing whitespaces and then matches all whitespaces between words in input and replaces them with '%20'
 let noWhiteSpaceInput = e.target.value.trim().replace(/\s/g,'%20');


  this.setState({
    searchInput : noWhiteSpaceInput
  })

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
