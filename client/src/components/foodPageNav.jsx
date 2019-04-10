import "./foodPageNav.css";
import React, { Component } from "react";
class FoodPageNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlerOnClick = name => {
    this.props.onChange(name);
  };

  render() {
    return (
      <div className="subNavContainer">
        <div
          id="bf"
          onClick={() => this.handlerOnClick("Breakfast")}
          className={"subNav " + this.props.style.Breakfast}
        >
          Breakfast
        </div>
        <div
          id="ml"
          onClick={() => this.handlerOnClick("Meal")}
          className={"subNav " + this.props.style.Meal}
        >
          Meal
        </div>
        <div
          id="dk"
          onClick={() => this.handlerOnClick("Drink")}
          className={"subNav " + this.props.style.Drink}
        >
          Drink
        </div>
      </div>
    );
  }
}

export default FoodPageNav;
