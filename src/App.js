import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import CreateBook from "./components/CreateBook/CreateBook";
import CreateGenre from "./components/CreateGenre/CreateGenre";
import ListBooks from "./components/ListBooks/ListBooks";
import Navbar from "./components/Navbar/Navbar";
class App extends Component {
  state = {
    edit: false,
  };
  handleEditToggle = () => {
    debugger
    this.setState({ edit: !this.state.edit });
  };


  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/books" render={() => <CreateBook />} />
          <Route exact path="/genre" render={() => <CreateGenre />} />
        </Switch>
        <Route exact path={['/books', '/']} render={() => <ListBooks edit={this.state.edit} editToggle={this.handleEditToggle} />}  />
      </div>
    );
  }
}

export default App;
