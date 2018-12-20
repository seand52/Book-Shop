import React, { Component } from "react";
import { Form, Input, Button, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";
import logic from "../../logic/index";
import { withRouter } from "react-router-dom";
import "./creategenre.css";
import GenresCard from "../GenresCard/GenresCard";

class CreateGenre extends Component {
  state = {
    name: "",
    genres: null
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
    const genres = await logic.retrieveGenres();
    this.setState({ genres });
  }

  onHandleSubmit = async event => {
    event.preventDefault();
    try {
      await logic.addGenre(this.state.name);
      const genres = await logic.retrieveGenres();
      this.openNotification("success", "genre created");
      this.setState({ genres });
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  handleDeleteGenre = async (id, name) => {
    try {
      await logic.deleteGenre(id, name);
      const genres = await logic.retrieveGenres();
      this.setState({ genres });
      this.openNotification("success", "genre deleted");
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  handleEdit = async () => {
    try {
      const genres = await logic.retrieveGenres();
      this.setState({ genres });
      this.openNotification("success", "genre updated");
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  render() {
    const { genres } = this.state;
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

export default withRouter(CreateGenre);
