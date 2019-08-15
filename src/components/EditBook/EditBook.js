import React, { Component } from "react";
import {connect} from 'react-redux'
import { Form, Input, Button, InputNumber, Select, notification } from "antd";
import * as actions from '../../store/actions/index'
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
    console.log('did mount')
    const { book, genres } = this.props;
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
      await this.props.onEditBook(this.props.book.id, title, price, genre)
      this.openNotification("success", "Book updated");
      this.props.editToggle();
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  render() {
    const { genres } = this.props;
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

const mapStateToProps = state => {
  return {
    genres: state.genresReducer.genres
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEditBook: (id, title, price, genre) => dispatch(actions.editBook(id, title, price, genre))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditBook));
