import React, { Component } from "react";
import {connect} from 'react-redux'
import { Form, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import logic from "../../logic/index";
import {notification} from 'antd'
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./filter.scss"

const Option = Select.Option;
class Filter extends Component {
  state = {
    genre: null,
    minPrice: 0,
    maxPrice: 0,
    maxSlider: 0
  };

  openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 1.5,
    })
  }

  async componentDidMount() {
    try {
      const priceRange = await logic.retrievePriceRange();
      const { minimumPrice, maximumPrice } = priceRange;
      this.setState({
        minPrice: minimumPrice,
        maxPrice: maximumPrice,
        maxSlider: maximumPrice
      });
  } catch(err) {
    this.openNotification("error", err.message)
  }
  }

  componentDidUpdate = async prevProps => {
    try {
    if (prevProps.books !== this.props.books || this.props.edit !== prevProps.edit) {
      if (this.props.books.length > 0) {
        const priceRange = await logic.retrievePriceRange();
        const { maximumPrice } = priceRange;
        this.setState({
          maxSlider: maximumPrice
        });
      }
    }
  } catch(err) {
    this.openNotification("error", err.message)
  }
  };

  onHandleGenreChange = value => {
    const { minPrice, maxPrice } = this.state;
    const genre = value;
    this.setState({ genre }, () => {
      this.props.filter(this.state.genre, minPrice, maxPrice);
    });
  };

  handleOnChangeMinPrice = value => {
    this.setState({
      minPrice: value
    });
  };

  handleOnChangeMaxPrice = value => {
    this.setState({
      maxPrice: value
    });
  };

  handleOnChangeComplete = () => {
    const { genre, minPrice, maxPrice } = this.state;
    this.props.filter(genre, minPrice, maxPrice);
  };
  
  render() {
    const {minPrice, maxPrice, maxSlider } = this.state;
    return (
      <section className="filters">
        <Form
          onSubmit={this.onHandleSubmit}
          layout="vertical"
          className="create-book-form"
        >
          <FormItem label="Filter by Genre">
            <Select
              defaultValue="search all"
              style={{ width: 200 }}
              onChange={this.onHandleGenreChange}
            >
              <Option defaultValue value="search all">
                Search All
              </Option>
              {this.props.genres &&
                this.props.genres.map((item, index) => (
                  <Option key={index} value={item.name}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </FormItem>
          <div className="min-price">
            <p>Minimum Price</p>
            <Slider
              className="min-price__slider"
              value={minPrice}
              max={maxSlider}
              orientation="horizontal"
              onChange={this.handleOnChangeMinPrice}
              onChangeComplete={this.handleOnChangeComplete}
            />
          </div>
          <div className="max-price">
            <p>Maximum Price</p>
            <Slider
              className="max-price__slider"
              min={0}
              max={maxSlider}
              value={maxPrice}
              orientation="horizontal"
              onChange={this.handleOnChangeMaxPrice}
              onChangeComplete={this.handleOnChangeComplete}
            />
          </div>
        </Form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genresReducer.genres,
    books: state.booksReducer.books,
    totalBooks: state.booksReducer.totalBooks
  }
}




export default connect(mapStateToProps)(Filter);
