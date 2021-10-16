import { Component } from 'react';

import { ImageGalleryItem } from 'Components/ImageGalleryItem';
import { fetchPictures } from 'services/fetchPictures';

export class ImageGallery extends Component {
  state = {
    images: null,
    loading: false,
    page: 1,
    currentPage: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending' });

      fetchPictures(nextSearchQuery, this.state.page)
        .then(response => response.data)
        .then(data => data.hits)
        .then(images => this.setState({ images, status: 'resolved' }));
      // .finally(console.log(this.state));
    }
  }

  render() {
    const { status, images } = this.state;

    if (status === 'idle') {
      return <div></div>;
    }

    if (status === 'pending') {
      return <div></div>;
    }

    if (status === 'rejected') {
      return <div></div>;
    }

    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          <li>
            <ImageGalleryItem images={images} />
          </li>
        </ul>
      );
    }
  }
}
