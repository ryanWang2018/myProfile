import "./foodPageNav.css";
import React, { Component } from "react";
class FoodPageNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlerOnClick(name) {
    return name;
  }

  render() {
    return (
      <div id="container">
        <ul>
          <li
            onClick={() => this.props.onChange("Breakfast")}
            className={this.props.style.Breakfast}
          >
            Breakfast
          </li>
          <li
            onClick={() => this.props.onChange("Meal")}
            className={this.props.style.Meal}
          >
            Meal
          </li>
          <li
            onClick={() => this.props.onChange("Drink")}
            className={this.props.style.Drink}
          >
            Drink
          </li>
        </ul>
      </div>
    );
  }
}

export default FoodPageNav;
