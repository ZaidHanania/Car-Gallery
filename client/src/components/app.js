import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import FontAwesome from "react-fontawesome";

import { fetchCars, setPending } from "../actions";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0
});

class App extends Component {
  constructor(props) {
    super(props);

    // Set up initial state
    this.state = {
      make: "all",
      currentIndex: null,
      interval: null
    };
  }

  componentDidMount() {
    // Fetch data from server when app loads
    this.props.setPending(true);
    this.props.fetchCars();
  }

  startInterval() {
    this.stopInterval();
    this.setState({
      interval: setInterval(() => {
        this.onClickNext();
      }, 3000)
    });
  }

  stopInterval() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: null });
    }
  }

  onItemClick(index) {
    this.setState({ currentIndex: index });

    this.startInterval();
  }

  renderCar(car, index) {
    return (
      <div
        key={car.carid}
        className="imageContainer"
        onClick={() => this.onItemClick(index)}
      >
        <img className="image" src={car.photos[0].sizes.base.url} />
        <p className="make">
          {car.make} {car.model}
        </p>
        <p className="make">
          {car.year} • {Math.round(car.mileage / 1000)}K Miles
        </p>
        <p className="price">{formatter.format(car.price)}</p>
      </div>
    );
  }

  getCars() {
    let filteredCars = [];
    if (this.state.make !== "all") {
      filteredCars = _.filter(this.props.cars, { make: this.state.make });
    } else {
      filteredCars = this.props.cars;
    }

    if (this.state.price) {
      return _.filter(filteredCars, c => c.price == this.state.price);
    } else {
      return filteredCars;
    }
  }

  onClickBack() {
    if (this.state.currentIndex + 1 > this.getCars().length) {
      this.setState({ currentIndex: 0 });
    } else {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }
  }

  onClickNext() {
    if (this.state.currentIndex + -1 < 0) {
      this.setState({ currentIndex: this.getCars().length - 1 });
    } else {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
  }

  onClickBack() {
    this.stopInterval()
    this.setState({ currentIndex: null })
  }

  renderCarousel() {
    if (this.getCars().length > 0) {
      const car = this.getCars()[this.state.currentIndex];
      return (
        <div className="overlay">
          <h1
            className="back"
            onClick={() => this.onClickBack()}
          >
            Back to Main Page
          </h1>
          <div className="carousel">
            <div
              className="arrow"
              onMouseEnter={() => this.stopInterval()}
              onMouseLeave={() => this.startInterval()}
            >
              <FontAwesome
                name="angle-left"
                size="5x"
                onClick={() => this.onClickBack()}
              />
            </div>
            <img
              onMouseEnter={() => this.stopInterval()}
              onMouseLeave={() => this.startInterval()}
              className="image"
              src={car.photos[0].sizes.base.url}
            />
            <div
              className="arrow"
              onMouseEnter={() => this.stopInterval()}
              onMouseLeave={() => this.startInterval()}
            >
              <FontAwesome
                name="angle-right"
                size="5x"
                onClick={() => this.onClickNext()}
              />
            </div>
          </div>
          <p className="make">
            {car.make} {car.model} - {car.year} •{" "}
            {Math.round(car.mileage / 1000)}km
          </p>
        </div>
      );
    }

    return <div />;
  }

  render() {
    if (this.props.pending) {
      return null;
    }

    return this.state.currentIndex != null ? (
      this.renderCarousel()
    ) : (
      <div>
        <div className="header" />
        <div className="sidenav">
          <input
            type="number"
            placeholder="Price"
            onChange={e => this.setState({ price: e.target.value })}
          />
          <h4>Make</h4>
          <select onChange={e => this.setState({ make: e.target.value })}>
            <option value="all">All</option>
            <option value="Honda">Honda</option>
            <option value="Jeep">Jeep</option>
          </select>
        </div>

        <div className="main">
          <div className="flex-container">
            {_.map(this.getCars(), (car, i) => this.renderCar(car, i))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.cars
  };
};

export default connect(
  mapStateToProps,
  { fetchCars, setPending }
)(App);
