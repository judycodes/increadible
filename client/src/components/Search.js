import React, {Component} from 'react';

class Search extends Component{
  constructor(){
    super();

    this.state = {
      searchInput : ''
    }
  }

//onClick of search submit that triggers api call
handleSearch = () => {

}


//captures user search input for later api call for search results related to input
changeSearchInput = (e) => {
  e.preventDefault();

  this.setState({
    searchInput : e.target.value
  })

}

  render(){

    //stores search results - api response
    let searchResults = [];

    return(
      <div>
        <h1 id="search-title">The Unending Search For Knowledge</h1>
      <form>
        <input
          id="search-input"
          type="text"
          value={this.state.searchInput || ''}
          onChange={this.changeSearchInput}
          placeholder='Curious about ...' />
        <button
          type='submit'
          onClick={this.handleSearch}>Enlighten Me</button>
      </form>
      {searchResults}
      </div>
    )
  }
}

export default Search;
