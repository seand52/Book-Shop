import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "./navbar.scss"
import { withRouter } from "react-router-dom";
const { Header } = Layout;

class Navbar extends Component {
  state = {
    current: '0'
  };

  onCreateBookClick = e => {
    this.setState({ current: e.key }, () => this.props.history.push("/books"));
  };

  onCreateGenreClick = e => {
    this.setState({ current: e.key }, () => this.props.history.push("/genre"));
  };

  onlogoClick = () => {
    this.setState({ current: '0' }, () => this.props.history.push("/"));
  };

  render() {
    return (
      <Header className="nav-menu">
        <div onClick={this.onlogoClick} className="logo">
          Bookshop
        </div>
        <Menu
          className="menu"
          theme="dark"
          mode="horizontal"
          selectedKeys={[this.state.current]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item
            className="create-book-link"
            onClick={this.onCreateBookClick}
            key="1"
          >
            Create Book
          </Menu.Item>
          <Menu.Item onClick={this.onCreateGenreClick} key="2">
            Create Genre
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default withRouter(Navbar);
