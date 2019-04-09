import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Credits from "./components/credits";
import Food from "./components/food.jsx";
import UploadForm from "./components/uploadForm.jsx";
import ReactSVG from "react-svg";
import "./index.css";
import svg from "./components/svgText.svg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 1
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ countDown: this.state.countDown - 1 });
    }, 3000);
  }

  render() {
    if (this.state.countDown === 1) {
      return (
        <div className="wrapper">
          <ReactSVG src={svg} svgClassName="./index.css" />
        </div>
      );
    } else {
      return (
        // <Food
        //   img="http://infinityflamesoft.com/html/restarunt-preview/assets/img/menu/menu-2.jpg"
        //   name="Chicken Fried Salad"
        //   price="$45"
        //   info="Aperiam tempore sit, perferendis numquam repudiandae porro voluptate dicta seape facilis."
        // />
        <div>
          <UploadForm />
        </div>
      );
    }
  }
}

export default App;
