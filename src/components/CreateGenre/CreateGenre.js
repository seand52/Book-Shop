import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import FormItem from "antd/lib/form/FormItem";
import logic from "../../logic/index";

class CreateGenre extends Component {
  state = {
    name: ""
  };

  onHandleNameChange = event => {
    const name = event.target.value;

    this.setState({ name });
  };

  onHandleSubmit = event => {
    event.preventDefault();
    logic.addGenre(this.state.name);
  };
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onHandleSubmit}
        className="create-book-form"
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
    );
  }
}

export default CreateGenre;
