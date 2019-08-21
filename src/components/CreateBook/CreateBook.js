import React, { Component } from "react";
import { Form, Input, Button, InputNumber, Select, notification } from "antd";
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
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
    const {id} = this.props.genres.find(item => item.name === genre)
    this.setState({ genre: id });
  };

  onHandleSubmit = async event => {
    event.preventDefault();
    const { title, price, genre } = this.state;
    try {
        await this.props.onAddBook(title, price, genre)
        this.openNotification("success", "Book added");
        this.props.history.push("/");
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  render() {
    const { genres } = this.props;
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

const mapStateToProps = state => {
  return {
    genres: state.genresReducer.genres
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddBook: (title, price, genre) => dispatch(actions.addBook(title, price, genre))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateBook));
