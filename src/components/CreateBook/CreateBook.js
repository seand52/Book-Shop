import React, { Component } from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";
import logic from "../../logic/index";
import FormItem from "antd/lib/form/FormItem";
import { withRouter } from "react-router-dom";
import "./createbook.css";
const Option = Select.Option;
class CreateBook extends Component {
  state = {
    title: "",
    price: "",
    genre: "",
    genres: null
  };

  componentDidMount() {
    const genres = logic.retrieveGenres();
    this.setState({ genres });
    const {action, book} = this.props
    if(action === 'save') {

      this.setState({title: book.title, price: book.price, genre: book.genre})
    }
  }



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

  onHandleSubmit = event => {
    event.preventDefault();
    const { title, price, genre } = this.state;
    if(this.props.action!=='save') {
    logic.addBook(title, price, genre);
    this.props.history.push("/");
    } else {
      logic.updateBook(this.props.book.id, title, price, genre)  
      this.props.history.push("/");
    }
  }

  render() {
    const { genres } = this.state;
    return (

      <Form
        onSubmit={this.onHandleSubmit}
        layout= {(this.props.action==='save') ? 'vertical' : 'inline'}
        className="create-book-form"
      >
        <FormItem label="Title">
          <Input
            style={{ width: 200 }}
            className="create-book-form__title"
            placeholder="Insert a title..."
            defaultValue = {(this.props.action==='save') ? this.props.book.title : ''}
            onChange={this.onHandleTitleChange}
            ref="test"
          />
        </FormItem>
        <FormItem label="Price">
          <InputNumber
          style = {{width: 200}}
            className="create-book-form__price"
            min={0}
            defaultValue={(this.props.action==='save') ? this.props.book.price : 1}
            onChange={this.onHandlePriceChange}
          />
        </FormItem>
        <FormItem label="Genre">
          <Select
            defaultValue = {(this.props.action==='save') ? this.props.book.genre : ''}
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
            {(this.props.action==='save') ? 'Save Changes' : 'Create Book'}
          </Button>
        </FormItem>
      </Form>

 
    );
  }
}

export default withRouter(CreateBook);
