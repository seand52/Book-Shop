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
    if (genre === 'search all') {
      this.setState({ genre: 'search all' }, () => {
        this.props.filter(null, minimumPrice, maximumPrice);
      });  
      return
    }
    const {id} = this.props.genres.find(item => item.name === genre)
    this.setState({ genre: id }, () => {
      this.props.filter(id, minimumPrice, maximumPrice);
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
    if (genre === 'search all') {
      this.props.filter(null, minimumPrice, maximumPrice);  
      return
    }
    this.props.filter(genre, minimumPrice, maximumPrice);
  };

  render() {
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
              max={this.props.totalMaximumPrice}
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
              max={this.props.totalMaximumPrice}
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
    minimumPrice: state.booksReducer.minimumPrice,
    maximumPrice: state.booksReducer.maximumPrice,
    totalMaximumPrice: state.booksReducer.totalMaximumPrice
  };
};

export default connect(mapStateToProps)(Filter);
