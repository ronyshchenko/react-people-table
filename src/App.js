import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import sportsman from './api/sportsman.json';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import PeopleTable from './components/people-table';

export default class App extends Component {
  
  state = {
    peoples: [...sportsman],
    term: '',
  }

getSortedPeoples = (peoples, sortField) => {
  console.log(sortField)
    const callback = function(peopleA, peopleB) {
      console.log(peopleA, peopleB)
      var nameA = peopleA[sortField]; 
      var nameB = peopleB[sortField]; 
      if (nameA === null) {
        return -1;
      }

      if (nameB === null) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }

      return peoples.sort(callback);
  }
  sortBy = (sortField) => {
    this.setState({
      peoples:  this.getSortedPeoples(this.state.peoples, sortField),
      sortField: sortField
  });
  console.log(this.state.peoples)
}
  
  search (movies, term) {
    if (term.length === 0) {
      return movies;
    }
    return movies.filter((movie) => {
      
      return (movie.name.toLowerCase().indexOf(term.toLowerCase()) > -1) 
    });
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
  }

  onLabelChange = (e) => {
    this.setState({
      term: e.target.value
    });
  };

  
  render() {
    const visibleItems = this.search(this.state.peoples, this.state.term);
    const Home = () => <h6>Home page. Go to page: Sportsman table...</h6>;
    const NotFound = () => <h6>Page not found</h6>;
    return (
    <BrowserRouter>
      <div className="App">
    <nav>
    <ul>
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>  
      </li>
      <li>
        <NavLink to="/peopletable">
        Sportsman table
        </NavLink>
      </li>
    </ul>
    </nav>
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/peopletable" render={() => (
        <>
        <h5>Sportsman table</h5>
        <form className="control"
                    onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  id="search-query"
                  className="input"
                  placeholder="Type search word"
                  onChange={this.onLabelChange}
                  //value={e.target.value }
                />
              </form>
    <PeopleTable peoples = { visibleItems } 
      onSelected={this.onSelected}
      sortBy = {this.sortBy}
      />
      </>
      )
      
      }/>
      <Route path="*" component={NotFound} />  
    </Switch>
    </div>
    </BrowserRouter>
  
    )
  }

}
