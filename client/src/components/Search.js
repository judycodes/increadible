import React, {Component} from 'react';

//import custom Component
import Navbar from './Navbar';
import SearchResult from './SearchResult';

class Search extends Component{
  constructor(props){
    super(props);

    this.state = {
      searchInput : '',
      searchResponses : [],

      //error handling
      searchResFetchSuccess: false,
      searchResFetchError: false
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

  //search params needed by api
  let params = {
    action: 'query',
    list: 'search',
    srsearch: this.state.searchInput, //must not be null
    format: 'json'
  }

  //formats the wikiUrl for api call with input given
  wikiUrl += '?origin=*';
  Object.keys(params).forEach((key) => {
    wikiUrl += "&" + key + "=" + params[key];
  });

try {

  if(!this.state.searchInput || this.state.searchInput.length === null) {alert("Please provide valid input.");}
  else {
  fetch(wikiUrl)

      .then( res => {
          return res.json();
        })

      //grabs specific pieces of res data for each result
      .then( res => {

        if(res.query.search) { //if api call yields results, save results contentt in state
          res.query.search.map( foundResult => {
            return this.state.searchResponses.push({
              pageUrl: 'no link',
              pageId: foundResult.pageid,
              pageTitle: foundResult.title,
              pageSnippet: foundResult.snippet
            })
          })
          this.handleUrlFetch();



          this.setState({
            searchResFetchSuccess: true
          })

        } else {
          //todo: change to paragraph display
          return alert("No results found. Try another search.");

        }
      })
    }
} catch(error) {
  console.log(`Error from search responses fetch: ${error}`);

    this.setState({
      searchResFetchError: true
    })
  }

}

//finds and sets full url path for each result in the result object of the searchResponses array
handleUrlFetch = () => {

  this.state.searchResponses.map( specificPage => {

    let pathToRetrieveFullUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${specificPage.pageId}&inprop=url&format=json`;

    return fetch(pathToRetrieveFullUrl)

    .then(res => {
      return res.json();
    })

    .then( res => {

      specificPage.pageUrl = res.query.pages[specificPage.pageId].fullurl;

      //saves the url to the result object in state
      this.setState({
        searchResponses: this.state.searchResponses
      })
    })

  })

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
    let searchResultsContent = this.state.searchResponses.map( (specificResult, index) => {

      return <SearchResult
              key={index}
              url={specificResult.pageUrl}
              resultId={specificResult.pageId}
              title={specificResult.pageTitle}
              snippet={specificResult.pageSnippet}
              />;

    });

    return(

      <div id="search-container">
      <Navbar />
      <div id="search-content">

        <h1 id="search-title">Search For Knowledge</h1>

      <form>

        <input
          id="search-input"
          type="text"
          onChange={this.handleSearchInput}
          placeholder='Curious about ...' />

        <button
          id="search_btn"
          type='submit'
          onClick={this.handleSearchSubmit}>enlighten me</button>

        <a
          href="https://en.wikipedia.org/wiki/Special:Random"
          id="random-search"
          target="_blank"
          rel="noopener noreferrer">random</a>

      </form>

      {searchResultsContent}

      </div>
      </div>
    )
  }
}

export default Search;
