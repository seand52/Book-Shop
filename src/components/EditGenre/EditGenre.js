import React, {Component} from 'react'
import {connect} from "react-redux"
import * as actions from "../../store/actions/index"
import logic from '../../logic/index'
import {Button} from 'antd'
import "./editgenre.scss"
class EditGenre extends Component {
  state = {
    name: this.props.name ? this.props.name : ''
  }


  handleNameChange = (event) => {
    const name = event.target.value
    this.setState({name})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const name = this.state.name
    const id = this.props.id
    this.props.onEditGenre(id, name)
    this.props.edit()
    this.props.editToggle()
  }

  render() {
    return <form className="edit-genre" onSubmit={this.handleSubmit}>
    <input className="edit-genre__input" onChange={this.handleNameChange} defaultValue={this.state.name}></input>
    <Button className="edit-genre__button" type="primary" htmlType="submit">Save</Button>
    </form>
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onEditGenre: (id, name) => dispatch(actions.editGenre(id, name)),
  };
};

export default connect(null, mapDispatchToProps)(EditGenre)