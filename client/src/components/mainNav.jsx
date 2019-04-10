import React, { Component, Fragment } from "react";
import "./mainNav.css";

class MainNav extends Component {
  state = {};
  render() {
    return (
      <div className="mainNavContainer">
        <div className="NavMenu">Menu</div>
        <div className="NavAdmin">Admin</div>
        <div className="NavCalorie">Calorie</div>
      </div>
    );
  }
}

export default MainNav;
