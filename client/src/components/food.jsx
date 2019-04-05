import "./food.css";

import React, { Component } from "react";

class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let img = this.props.img;
    let name = this.props.name;
    let price = this.props.price;
    let info = this.props.info;

    return (
      <div className="menu_container">
        <div className="single_menu_list">
          <img src={img} alt="" />
          <div className="menu_content">
            <h4>
              {name} <span>{price}</span>
            </h4>
            <p>{info}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Food;
