import React, { Component, Fragment } from "react";
import "./subNav.css";

class SubNav extends Component {
  state = {};
  render() {
    return (
      <div className="subNavContainer">
        <ul class="nav nav-tabs menu_tab" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link"
              id="breakfast-tab"
              data-toggle="tab"
              href="#breakfast"
              role="tab"
              aria-selected="false"
            >
              Breakfast
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="lunch-tab"
              data-toggle="tab"
              href="#lunch"
              role="tab"
              aria-selected="false"
            >
              Lunch
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link active show"
              id="dinner-tab"
              data-toggle="tab"
              href="#dinner"
              role="tab"
              aria-selected="true"
            >
              Dinner
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SubNav;
