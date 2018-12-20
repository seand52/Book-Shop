import React, { Component } from "react";
import { Form, Input, Button, InputNumber, Select, notification } from "antd";
import logic from "../../logic/index";
import FormItem from "antd/lib/form/FormItem";
import { withRouter } from "react-router-dom";
const Option = Select.Option;

class EditBook extends Component {
  state = {
    title: "",
    price: "",
    genre: "",
    genres: null
  };

  async componentDidMount() {
    const { book } = this.props;
    const genres = await logic.retrieveGenres();
    this.setState({
      title: book.title,
      price: book.price,
      genre: book.genre,
      genres
    });
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
      await logic.updateBook(this.props.book.id, title, price, genre);
      this.openNotification("success", "Book updated");
      this.props.editToggle();
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  render() {
    const { genres } = this.state;
    return (
      <section>
        <Form
          onSubmit={this.onHandleSubmit}
          layout="vertical"
          className="create-book-form"
        >
          <FormItem className="test" label="Title">
            <Input
              style={{ width: 200 }}
              className="create-book-form__title"
              placeholder="Insert a title..."
              defaultValue={this.props.book.title}
              onChange={this.onHandleTitleChange}
              ref="test"
            />
          </FormItem>
          <FormItem label="Price">
            <InputNumber
              style={{ width: 200 }}
              className="create-book-form__price"
              min={0}
              defaultValue={this.props.book.price}
              onChange={this.onHandlePriceChange}
            />
          </FormItem>
          <FormItem label="Genre">
            <Select
              defaultValue={this.props.book.genre}
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
              Save Changes
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

export default withRouter(EditBook);
