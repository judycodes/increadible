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

  // const wikiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${this.state.searchInput}&format=json&origin=\\*`;
  // console.log(wikiUrl, "wikiurl for fetch");

  const wikiUrl = 'https://en.wikipedia.org/w/api.php';

}


//captures user search input for later api call for search results related to input
handleSearchInput = (e) => {
  e.preventDefault();

  this.setState({
    searchInput : e.target.value
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
          value={this.state.searchInput || ''}
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
