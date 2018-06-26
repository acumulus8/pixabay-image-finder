import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
//import axios from "axios";
import ImageResults from "../image-results/ImageResults";

class Search extends Component {
  state = {
    searchText: "",
    amount: 10,
    apiUrl: "https://pixabay.com/api",
    apiKey: "9386938-a179ed6cde37b2f86fde7dcc5",
    images: [],
    errorMessage: ""
  };

  /* onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [], errorMessage: "No images to show" });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  }; */

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [], errorMessage: "No images to show" });
      } else {
        return fetch(
          `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
            this.state.searchText
          }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
        )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not OK!");
          })
          .then(jsonResponse => {
            this.setState({ images: jsonResponse.hits });
          })
          .catch(error =>
            console.log(
              "There has been a problem with your fetch operation: ",
              error.message
            )
          );
      }
    });
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    const padding = { "paddingLeft": "30px" };
    const noResults = (
      <span style={padding}>
        <strong>0</strong> results found
      </span>
    );
    console.log(this.state.images);

    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Images"
          fullWidth={true}
          style={padding}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
          style={padding}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : (
          <span style={padding}>{this.state.errorMessage}</span>
        )}
      </div>
    );
  }
}

export default Search;
