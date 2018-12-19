import React, { Component } from "react";
import { Form, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import logic from "..//../logic/index";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./filter.css";
const Option = Select.Option;
class Filter extends Component {
  state = {
    genres: null,
    genre: null,
    minPrice: null,
    maxPrice: null,
    maxSlider: 100
  };

  componentDidMount() {
    const genres = logic.retrieveGenres();
    const priceRange = logic.retrievePriceRange();
    const { minimumPrice, maximumPrice } = priceRange;
    this.setState({
      genres,
      minPrice: minimumPrice,
      maxPrice: maximumPrice,
      maxSlider: maximumPrice
    });
  }

  componentDidUpdate = prevProps => {
    if (prevProps.genres && this.props.genres) {
      if (prevProps.genres.length !== this.props.genres.length) {
        const genres = logic.retrieveGenres();
        if (this.props.books > 0) {
          const priceRange = logic.retrievePriceRange();
          const { minimumPrice, maximumPrice } = priceRange;
          this.setState({
            genres,
            minPrice: minimumPrice,
            maxPrice: maximumPrice,
            maxSlider: maximumPrice
          });
        }
      }
    }
    if (prevProps.books !== this.props.books) {
      if (this.props.books > 0) {
        const priceRange = logic.retrievePriceRange();
        const { minimumPrice, maximumPrice } = priceRange;
        this.setState({
          minPrice: minimumPrice,
          maxPrice: maximumPrice,
          maxSlider: maximumPrice
        });
      }
    }
  };

  onHandleGenreChange = value => {
    const { minPrice, maxPrice } = this.state;
    const genre = value;
    this.setState({ genre }, () => {
      this.props.filter(this.state.genre, minPrice, maxPrice);
    });
  };

  onHandleSubmit = event => {
    event.preventDefault();
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
    const { genres, minPrice, maxPrice, maxSlider } = this.state;
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
              {genres &&
                genres.map((item, index) => (
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

export default Filter;
