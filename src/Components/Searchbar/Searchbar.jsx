import { Component } from 'react';
import toast from 'react-hot-toast';

import {
  SearchbarHeader,
  SearchbarForm,
  SearchbarButton,
  SearchbarButtonLabel,
  SearchbarFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { searchQuery } = this.state;

    event.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Enter search query.');
      return;
    }

    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <SearchbarHeader>
        <SearchbarForm onSubmit={this.handleSubmit}>
          <SearchbarFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleChange}
          />

          <SearchbarButton type="submit">
            <SearchbarButtonLabel>Search</SearchbarButtonLabel>
          </SearchbarButton>
        </SearchbarForm>
      </SearchbarHeader>
    );
  }
}
