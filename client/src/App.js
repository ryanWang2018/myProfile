import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Credits from "./components/credits";
import Food from "./components/food.jsx";
import UploadForm from "./components/uploadForm.jsx";
import ReactSVG from "react-svg";
import "./index.css";
import svg from "./components/svgText.svg";
import FoodPage from "./components/foodPage.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 1,
      navOurFood: true,
      navAdmin: false
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
        <BrowserRouter>
          <Switch>
            <Route exact path="/Foods/" component={FoodPage} />

            <Route exact path="/UploadForm/" component={UploadForm} />
          </Switch>
        </BrowserRouter>
      );
    }
  }
}

export default App;
