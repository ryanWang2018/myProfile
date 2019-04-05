import React, { Component } from "react";
import "./uploadForm.css";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: "",
      price: "",
      description: ""
    };
  }

  handleAddImage = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
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

  submitPicture = even => {
    even.preventDefault();
    console.log("state", this.state);
  };

  render() {
    return (
      <div className="container contact-form">
        <div className="contact-image">
          <img src={this.state.file} alt="rocket_contact" />
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
                  className="form-control"
                  placeholder="Description *"
                  onChange={this.handleOnChanges}
                  style={{ width: "100%", height: "150px" }}
                  required
                />
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
        </form>
      </div>
    );
  }
}

export default Upload;
