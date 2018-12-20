import React, {Component} from "react";
import './genrescard.css'
import EditGenre from "../EditGenre/EditGenre";
class GenresCard extends Component{
  state ={
    edit: false,
  }

  editToggle = () => {
    this.setState({edit: !this.state.edit})
  }
  
  render() {
    const {state: {edit}, props: {genre} } = this
  return (
    <div className="genres-card" style={{background: 'aliceblue'}}>
      <div className="genres-card__name">
        {!edit ? <p>{genre.name}</p> : <EditGenre id={genre.id} name={genre.name} edit={this.props.editGenre} editToggle={this.editToggle}/>}
      </div>
      <div className="genres-card__actions">
        <i onClick={this.editToggle} className="fas fa-edit" />
        <i onClick={() => this.props.delete(genre.id, genre.name)} className="fas fa-trash-alt" />
      </div>
    </div>
  );
  }
};

export default GenresCard;
