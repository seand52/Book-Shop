import React, { Component } from "react";
import { Form, Input, Button, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";
import logic from "../../logic/index";
import { withRouter } from "react-router-dom";
import './creategenre.css'
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
      duration: 1.5,
    })
  }

  onHandleSubmit = event => {
    event.preventDefault();
    try {
    logic.addGenre(this.state.name);
    this.openNotification('success', 'genre created')
    this.props.history.push('/')
    }
    catch(err) {
      this.openNotification('error', err.message)
    }
  };
  render() {
    return (
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
    );
  }
}

export default withRouter(CreateGenre);
