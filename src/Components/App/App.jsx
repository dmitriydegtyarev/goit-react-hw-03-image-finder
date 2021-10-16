import { Component } from 'react';
import { Toaster } from 'react-hot-toast';

import { Container } from 'Components/Container';
import { Searchbar } from 'Components/Searchbar';
import { ImageGallery } from 'Components/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={searchQuery} />
        <Toaster />
      </Container>
    );
  }
}
