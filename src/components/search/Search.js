import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import ImageResult from '../image-result/ImageResult';

class Search extends Component {

    state = {
        searchtext : '',
        amount: 15,
        apiUrl: 'https://pixabay.com',
        apiKey: '11559918-3fa9d8bef5cee80bbc8669b1e',
        images: []
    };

    onTextChange = e => {
        const val = e.target.value;
        this.setState({ [e.target.name]: val }, () => {
          if (val === '') {
            this.setState({ images: [] });
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
      };

    onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    return (
      <div>
        <TextField 
            name="searchtext"
            value= {this.state.searchtext}
            onChange={this.onTextChange}
            floatingLabelText="Search for Images"
            fullWidth={true}
        />
        <br />
        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={20} primaryText="20" />
          <MenuItem value={25} primaryText="25" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResult images={this.state.images} />
        ) : null}
      </div>
    )
  }
}

export default Search;
