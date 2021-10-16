import { Component } from 'react';
import toast from 'react-hot-toast';

import { ImageGalleryItem } from 'Components/ImageGalleryItem';
import { fetchPictures } from 'services/fetchPictures';

export class ImageGallery extends Component {
  state = {
    images: [],
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
    }

    if (this.state.images.length === 0 && this.state.status === 'resolved') {
      toast.error(
        `Did not can  searched picture  on the search query "${nextSearchQuery}"`,
      );

      this.setState({ status: 'idle' });
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
          <ImageGalleryItem images={images} />
        </ul>
      );
    }
  }
}
