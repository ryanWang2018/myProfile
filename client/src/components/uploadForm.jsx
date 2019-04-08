import React, { Component } from "react";
import "./uploadForm.css";
import ErrorMessage from "./errorMessage.jsx";
import axios from "axios";
import api from "./api.js";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/ryanprofile/upload";
const CLOUDINARY_URL_ORESET = "lfgumija";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: "",
      price: "",
      description: "",
      error: "",
      fileData: null,
      photo_url: "",
      mealType: ""
    };
  }

  handleAddImage = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });

    let file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_URL_ORESET);
    this.setState({
      fileData: formData
    });
  };

  handleOnChanges = event => {
    event.preventDefault();
    //
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handlerMealType = e => {
    this.setState({ mealType: e.target.value });
  };

  submitPicture = even => {
    even.preventDefault();
    if (this.state.file == null) {
      this.handleOnError(
        "must add an image before submit",
        "alert alert-primary"
      );
    } else {
      this.handleOnError("", "");
      let pic_url;
      console.log(this.state);
      //save the image to the cloudinary and get the result picute URL
      axios({
        url: CLOUDINARY_URL,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: this.state.fileData
      })
        .then(res => {
          this.setState({ photo_url: res.data.secure_url });
        })
        .catch(err => {
          console.log(err);
        });

      // save the url and picture info to mongodb
      api
        .post("/upload/", {
          url: this.state.photo_url,
          meal: this.state.mealType,
          name: this.state.name,
          price: this.state.price,
          description: this.state.description
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleOnError = (err, shown) => {
    let error = { ...this.state.error };
    error.content = err;
    error.shown = shown;
    this.setState({ error });
  };

  render() {
    return (
      <div>
        <ErrorMessage onChange={this.handleOnError} error={this.state.error} />
        <div className="upload_form_container">
          <div className="image_content">
            <img className="img_box" src={this.state.file} alt="food image" />
          </div>

          <input
            type="file"
            onChange={this.handleAddImage}
            className="addImage"
          />
          <form onSubmit={this.submitPicture}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Cuisine Name *"
                    value={this.state.name}
                    onChange={this.handleOnChanges}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="Price"
                    onChange={this.handleOnChanges}
                    value={this.state.price}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="description"
                    className="description_box"
                    placeholder="Description *"
                    onChange={this.handleOnChanges}
                    style={{ width: "100%", height: "150px" }}
                    required
                  />
                </div>

                <div className="col">
                  <div
                    onChange={this.handlerMealType}
                    className="btn-group btn-group-justified"
                    data-toggle="buttons"
                  >
                    <label className="btn btn-success active">
                      Breakfast
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        value="Breakfast"
                        autoComplete="off"
                      />
                    </label>
                    <label className="btn btn-success">
                      Meal
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        autoComplete="off"
                        value="Meal"
                      />
                    </label>
                    <label classclass="btn btn-success">
                      Drink
                      <input
                        type="radio"
                        name="options"
                        id="option3"
                        autoComplete="off"
                        value="Drink"
                      />
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      name="btnSubmit"
                      className="btnContact"
                      value="Send Message"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Upload;
