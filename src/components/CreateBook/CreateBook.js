import React, { Component } from "react";
import { Form, Input, Button, InputNumber, Select, notification } from "antd";
import logic from "../../logic/index";
import FormItem from "antd/lib/form/FormItem";
import { withRouter } from "react-router-dom";
import "./createbook.scss"
const Option = Select.Option;

class CreateBook extends Component {
  state = {
    title: "",
    price: "",
    genre: "",
    genres: null
  };

  async componentDidMount() {
    const genres = await logic.retrieveGenres();
    this.setState({ genres });
  }

  openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 1.5
    });
  };

  onHandleTitleChange = event => {
    const title = event.target.value;
    this.setState({ title });
  };

  onHandlePriceChange = value => {
    const price = value;
    this.setState({ price });
  };

  onHandleGenreChange = value => {
    const genre = value;
    this.setState({ genre });
  };

  onHandleSubmit = async event => {
    event.preventDefault();
    const { title, price, genre } = this.state;
    try {
      if (this.props.action !== "save") {
        await logic.addBook(title, price, genre);
        this.openNotification("success", "Book added");
        this.props.history.push("/");
      }
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  render() {
    const { genres } = this.state;
    return (
      <section className="create-book-form-container">
        <Form
          onSubmit={this.onHandleSubmit}
          layout="inline"
          className="create-book-form"
        >
          <FormItem className="test" label="Title">
            <Input
              style={{ width: 200 }}
              className="create-book-form__title"
              placeholder="Insert a title..."
              onChange={this.onHandleTitleChange}
              ref="test"
            />
          </FormItem>
          <FormItem label="Price">
            <InputNumber
              style={{ width: 200 }}
              className="create-book-form__price"
              min={0}
              onChange={this.onHandlePriceChange}
            />
          </FormItem>
          <FormItem label="Genre">
            <Select
              style={{ width: 200 }}
              onChange={this.onHandleGenreChange}
            >
              {genres &&
                genres.map((item, index) => (
                  <Option key={index} value={item.name}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </FormItem>
          <FormItem>
            <Button
              className="create-book-form__submit-button"
              type="primary"
              htmlType="submit"
            >
              Create Book
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

export default withRouter(CreateBook);
