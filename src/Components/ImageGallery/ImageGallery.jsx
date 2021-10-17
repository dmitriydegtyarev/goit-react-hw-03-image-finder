import { Component } from 'react';
import toast from 'react-hot-toast';

import { ImageGalleryItem } from 'Components/ImageGalleryItem';
import { Spinner } from 'Components/Loader';
import { Button } from 'Components/Button';

import { ImageGalleryList } from './ImageGallery.styled';

import { fetchPictures } from 'services/fetchPictures';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    totalImages: null,
    status: 'idle',
    error: null,
  };

  handleClickBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ status: 'pending', page: 1 });

      fetchPictures(nextSearchQuery, this.state.page)
        .then(data => {
          this.setState({ totalImages: data.totalHits });
          return data.hits;
        })
        .then(images => this.setState({ images, status: 'resolved' }));
    }

    if (this.state.page !== prevState.page) {
      this.setState({ status: 'pending', page: prevState.page + 1 });

      fetchPictures(nextSearchQuery, this.state.page)
        .then(data => data.hits)
        .then(newImages =>
          this.setState(prevState => ({
            images: [...prevState.images, ...newImages],
            status: 'resolved',
          })),
        );
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });

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
      return <></>;
    }

    if (status === 'pending') {
      return <Spinner />;
    }

    if (status === 'rejected') {
      return <></>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ImageGalleryList>
            <ImageGalleryItem images={images} />
          </ImageGalleryList>
          {images.length > 0 && <Button onClick={this.handleClickBtn} />}
        </>
      );
    }
  }
}
