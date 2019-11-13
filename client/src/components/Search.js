import React, {Component} from 'react';
import wiki from '../assets/Wikipedia.png';

//import custom Component
import Navbar from './Navbar';
import SearchResult from './SearchResult';
import RandomFact from './RandomFact';

class Search extends Component{
  constructor(props){
    super(props);

    this.state = {
      searchInput : '',
      searchResponses : [],

      //error handling
      searchResFetchSuccess: false,
      searchResFetchError: false,

      randomFactFetchSuccess: false,
      randomFactFetchError: false,
      randomFact: 'A cat\'s brain is more similar to a man\'s brain than that of a dog.',
      showFactStatus: false


    }
  }


  //Cat Fact Generator/GET FACT API REQUEST
    generateRandomFact = () => {

      try{

       fetch('https://catfact.ninja/fact?max_length=80')

       .then(res => {
         return res.json();
       })

       .then(res => {
         if(res.fact !== ''){
           this.setState({
             randomFactFetchSuccess: !this.state.randomFactFetchSuccess,
             randomFact: res.fact
           })
         }
       })

      } catch(error) {

        console.log(`Random Fact Fetch error: ${error}`);

        this.setState({
          randomFactFetchError: !this.state.randomFactFetchError
        })
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

  if(!this.state.searchInput || this.state.searchInput.length === null) {
    alert("Please provide valid input.");
  } else {
  fetch(wikiUrl)

      .then( res => {
          return res.json();
        })

      //grabs specific pieces of res data for each result
      .then( res => {
        // console.log(res.query.search, "res.query.search");

        if(res.query.search.length === 0) { //error handling for no results found
          return alert("No results found. Try another search.");
        } else { //as long as api call yields results, save results contentt in state

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

showFact = () => {

    this.setState({
      showFactStatus: !this.state.showFactStatus
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

      <div id="search_container">
      <Navbar />
      <div id="search_content">
        <img id="wiki_logo" src={wiki} alt="wikipedia logo"/>
        <h1 id="search_title">Search For Knowledge</h1>

      <div id="search_random">
        <form id="search_form">

          <input
            id="search_input"
            type="text"
            onChange={this.handleSearchInput}
            placeholder='Curious about ...' />

          <button
            id="search_btn"
            type='submit'
            onClick={this.handleSearchSubmit}>enlighten me</button>

      </form>

      <a
        href="https://en.wikipedia.org/wiki/Special:Random"
        id="random_search"
        target="_blank"
        rel="noopener noreferrer"><i className="fas fa-random"></i></a>

      <i id="fact_display_toggle" className={this.state.showFactStatus ? "far fa-window-close" : "fab fa-readme"} onClick={this.showFact}></i>

    </div>

      <div id="searchResults_container">
      <div id="fact_card" style={{display: this.state.showFactStatus ? 'block' : 'none'}}>
        <h2>Random Fact:</h2>
        {this.state.randomFact ?
          <RandomFact fact={this.state.randomFact} generateRandomFact={this.generateRandomFact}/> :
          'Random Fact Loading...Why don\'t you reflect in the meantime?'}
      </div>


        {searchResultsContent}
      </div>

      </div>
      </div>
    )
  }
}

export default Search;
