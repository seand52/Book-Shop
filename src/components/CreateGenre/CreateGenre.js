import React, { Component } from "react";
import { Form, Input, Button, notification } from "antd";
import { connect } from "react-redux";
import FormItem from "antd/lib/form/FormItem";
import logic from "../../logic/index";
import { withRouter } from "react-router-dom";
import * as actions from "../../store/actions/index";
import "./creategenre.scss";
import GenresCard from "../GenresCard/GenresCard";

class CreateGenre extends Component {
  state = {
    name: ""
  };

  onHandleNameChange = event => {
    const name = event.target.value;

    this.setState({ name });
  };

  openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 1.5
    });
  };

  async componentDidMount() {
    this.props.onGenreFetch();
  }

  onHandleSubmit = async event => {
    event.preventDefault();
    try {
      const name = this.state.name;
      await this.props.onSubmitGenre(name);
      this.openNotification("success", "genre created");
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  handleDeleteGenre = async (id, name) => {
    try {
      await this.props.onDeleteGenre(id, name)
      this.openNotification("success", "genre deleted");
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  handleEdit = async () => {
    try {
      await this.props.onGenreFetch();
      this.openNotification("success", "genre updated");
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  render() {
    const { genres } = this.props;
    return (
      <div className="genres-wrapper">
        <section className="create-genre-container">
          <Form
            layout="inline"
            onSubmit={this.onHandleSubmit}
            className="create-genre-form"
          >
            <FormItem>
              <Input
                style={{ width: 200 }}
                className="create-genre-form__name"
                placeholder="Insert a name..."
                onChange={this.onHandleNameChange}
              />
            </FormItem>
            <FormItem>
              <Button
                className="create-genre-form__submit-button"
                type="primary"
                htmlType="submit"
              >
                Create Genre
              </Button>
            </FormItem>
          </Form>
        </section>
        <section className="manage-genres-container">
          {genres &&
            genres.map((item, index) => (
              <GenresCard
                editGenre={this.handleEdit}
                delete={this.handleDeleteGenre}
                genre={item}
                key={index}
              />
            ))}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genresReducer.genres
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGenreFetch: () => dispatch(actions.fetchGenres()),
    onSubmitGenre: name => dispatch(actions.submitGenre(name)),
    onDeleteGenre: (id,name) => dispatch(actions.deleteGenre(id, name))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateGenre));
