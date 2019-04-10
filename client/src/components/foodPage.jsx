import React from "react";
import "./food.css";
import { Component } from "react";
import FoodPageNav from "./foodPageNav.jsx";
import Food from "./food.jsx";
import api from "./api";
import "./foodPage.css";
class FoodPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Breakfast: "focused",
      Meal: "",
      Drink: "",
      foodCollection: [
        {
          Name: "sushi",
          Price: "20",
          MealType: "none",
          Description: "best sushi",
          URL:
            "https://res.cloudinary.com/ryanprofile/image/upload/v1554743323/x7mobekiwyyztcxgmoet.jpg",
          _id: "5cab8018245a5c611be8ea93",
          MealTyep: "Meal",
          __v: 0
        },
        {
          Name: "taiFood",
          Price: "20",
          MealType: "none",
          Description: "best Tai Food",
          URL:
            "https://res.cloudinary.com/ryanprofile/image/upload/v1554743323/x7mobekiwyyztcxgmoet.jpg",
          _id: "5cab802b245a5c611be8ea94",
          MealTyep: "Meal",
          __v: 0
        },
        {
          Name: "xia",
          Price: "20",
          MealType: "none",
          Description: "best xia food",
          URL:
            "https://res.cloudinary.com/ryanprofile/image/upload/v1554743339/jftua9uydek1dwvwiiw2.jpg",
          _id: "5cab8057245a5c611be8ea95",
          MealTyep: "Meal",
          __v: 0
        },
        {
          Name: "wrap",
          Price: "20",
          MealType: "none",
          Description: "best wrap",
          URL:
            "https://res.cloudinary.com/ryanprofile/image/upload/v1554743384/dcoguhyc73hyvbbvfeyk.jpg",
          _id: "5cab80b2245a5c611be8ea96",
          MealTyep: "Breakfast",
          __v: 0
        },
        {
          Name: "egg",
          Price: "20",
          MealType: "none",
          Description: "best egg",
          URL:
            "https://res.cloudinary.com/ryanprofile/image/upload/v1554743474/rb2sztluwzpdve48thpd.jpg",
          _id: "5cab80d2245a5c611be8ea97",
          MealTyep: "Breakfast",
          __v: 0
        },
        {
          Name: "xo",
          Price: "20",
          MealType: "none",
          Description: "best xo",
          URL:
            "https://res.cloudinary.com/ryanprofile/image/upload/v1554743506/b9grsbfjbfdqzmc9nvke.jpg",
          _id: "5cab8137245a5c611be8ea98",
          MealTyep: "Drink",
          __v: 0
        },
        {
          Name: "tea",
          Price: "20",
          MealType: "none",
          Description: "best tea",
          URL:
            "https://res.cloudinary.com/ryanprofile/image/upload/v1554743607/rq1hykj47mx8yx52exku.jpg",
          _id: "5cab814f245a5c611be8ea99",
          MealTyep: "Drink",
          __v: 0
        }
      ]
    };
    //this.navHandler = this.navHandler.bind(this);
  }

  navHandler = name => {
    if (name == "Breakfast") {
      this.setState({
        Breakfast: "selectNav",
        Meal: "",
        Drink: ""
      });
    } else if (name == "Meal") {
      this.setState({
        Breakfast: "",
        Meal: "selectNav",
        Drink: ""
      });
    } else {
      this.setState({
        Breakfast: "",
        Meal: "",
        Drink: "selectNav"
      });
    }
    console.log(name);
  };

  componentDidMount() {
    // cash the backend array
    // api
    //   .get("/Foods/", null)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  render() {
    return (
      <div className="foodPageLayout">
        <div className="foodPageNav">
          <FoodPageNav onChange={this.navHandler} style={this.state} />
        </div>

        <div className="pageList">
          {this.state.foodCollection.map(food => (
            <Food
              key={food._id}
              img={food.URL}
              name={food.Name}
              price={food.Price}
              info={food.Description}
              className="d-flex flex-row"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default FoodPage;
