import React, {Component} from "react";
import { Layout, Menu } from 'antd';
import './navbar.css'
import {withRouter, Link} from 'react-router-dom'

const { Header } = Layout;

class Navbar extends Component {

  onCreateBookClick = () => {
    this.props.history.push('/books')
  }

  onCreateGenreClick = () => {
    this.props.history.push('/genre')
  }

  onlogoClick = () => {
    this.props.history.push('/')
  }
  
  render() {
  return (
    <Header className="nav-menu">
      <div onClick={this.onlogoClick} className="logo">
      LOGO
      </div>
      <Menu
        className="menu"
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item className="create-book-link" onClick={this.onCreateBookClick} key="1">Create Book</Menu.Item>
        <Menu.Item onClick={this.onCreateGenreClick} key="2">Create Genre</Menu.Item>
      </Menu>
    </Header>
  );
  }
};

export default withRouter(Navbar);
