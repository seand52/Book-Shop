import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import logic from "../../logic/index";
import { notification } from "antd";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./filter.scss";

const Option = Select.Option;
class Filter extends Component {
  state = {
    genre: null,
    minimumPrice: this.props.minimumPrice,
    maximumPrice: this.props.maximumPrice,
    maxSlider: this.props.maximumPrice
  };
  
  openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 1.5
    });
  };

  componentDidUpdate = async prevProps => {
    try {
      if (
        prevProps.books !== this.props.books ||
        this.props.edit !== prevProps.edit
      ) {
        if (this.props.books.length > 0) {
          const priceRange = await logic.retrievePriceRange(this.props.books);
          const { maximumPrice } = priceRange;
          this.setState({
            maxSlider: maximumPrice
          });
        }
      }
    } catch (err) {
      this.openNotification("error", err.message);
    }
  };

  onHandleGenreChange = value => {
    const { minimumPrice, maximumPrice } = this.props;
    const genre = value;
    this.setState({ genre }, () => {
      this.props.filter(this.state.genre, minimumPrice, maximumPrice);
    });
  };

  handleOnChangeMinPrice = value => {
    this.props.onChangeMinPrice(value)
  };

  handleOnChangeMaxPrice = value => {
    this.props.onChangeMaxPrice(value)
  };

  handleOnChangeComplete = () => {
    const { genre } = this.state;
    const { minimumPrice, maximumPrice } = this.props;
    this.props.filter(genre, minimumPrice, maximumPrice);
  };

  render() {
    console.log(this.props)
    const {  maxSlider } = this.state;
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
              value={this.props.minimumPrice}
              max={this.props.maxSlider}
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
              value={this.props.maximumPrice}
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
  };
};

export default connect(mapStateToProps)(Filter);
