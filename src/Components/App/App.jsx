import { Component } from 'react';
import { Toaster } from 'react-hot-toast';

import { Container } from 'Components/Container';
import { Searchbar } from 'Components/Searchbar';

import { fetchPictures } from 'services/fetchPictures';

// idle, pending, rejected, resolved

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    status: 'idle',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    // const { searchQuery, page, status } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Toaster />
      </Container>
    );
  }
}

fetchPictures('ukraine', 1);
