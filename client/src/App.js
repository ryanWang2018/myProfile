import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Credits from "./components/credits";
import Food from "./components/food.jsx";
import UploadForm from "./components/uploadForm.jsx";

class App extends Component {
  render() {
    return (
      // <Food
      //   img="http://infinityflamesoft.com/html/restarunt-preview/assets/img/menu/menu-2.jpg"
      //   name="Chicken Fried Salad"
      //   price="$45"
      //   info="Aperiam tempore sit, perferendis numquam repudiandae porro voluptate dicta seape facilis."
      // />
      <UploadForm />
    );
  }
}

export default App;
