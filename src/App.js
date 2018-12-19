import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import CreateBook from "./components/CreateBook/CreateBook";
import CreateGenre from "./components/CreateGenre/CreateGenre";
import ListBooks from "./components/ListBooks/ListBooks";
import Navbar from "./components/Navbar/Navbar";
class App extends Component {
  state = {
    edit: false
  };
  handleEditToggle = res => {
    this.setState({ edit: res });
  };
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/books" render={() => <CreateBook />} />
          <Route exact path="/genre" render={() => <CreateGenre />} />
        </Switch>
        <ListBooks editToggle={this.state.edit} />
      </div>
    );
  }
}

export default App;
