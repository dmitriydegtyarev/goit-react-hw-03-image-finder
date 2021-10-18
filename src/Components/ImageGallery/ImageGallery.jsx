import { Component } from 'react';
import toast from 'react-hot-toast';

import { DefaultImage } from 'Components/ImageGalleryItem/DefaultImage';
import { ImageGalleryItem } from 'Components/ImageGalleryItem';
import { Spinner } from 'Components/Loader';
import { Button } from 'Components/Button';
import { Modal } from 'Components/Modal';

import { ImageGalleryList } from './ImageGallery.styled';

import { fetchPictures } from 'services/fetchPictures';

import data from 'data/defaultImage.json';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    responseTotalHits: null,
    loadMore: false,
    status: 'idle',
    imageSelected: null,
    error: null,
  };

  handleSelectImage = image => {
    this.setState({ imageSelected: image });
  };

  handleCloseModal = () => {
    this.setState({ imageSelected: null });
  };

  handleClickBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const notify = () =>
      toast.error(
        `Did not can  searched picture  on the search query "${nextSearchQuery}"`,
      );

    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;

    const { page, responseTotalHits } = this.state;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({
        status: 'pending',
        page: 1,
        loadMore: false,
        images: [],
      });

      fetchPictures(nextSearchQuery, page)
        .then(data => {
          this.setState({ responseTotalHits: data.totalHits });
          return data.hits;
        })
        .then(images => {
          if (images.length === 0) {
            this.setState({
              images,
              status: 'idle',
            });
            notify();
            return;
          }
          this.setState({ images, status: 'resolved', loadMore: true });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (page !== prevState.page && prevSearchQuery === nextSearchQuery) {
      this.setState({ status: 'pending' });

      if (responseTotalHits / 12 <= page) {
        this.setState({ loadMore: false });
      }

      fetchPictures(nextSearchQuery, page)
        .then(data => data.hits)
        .then(newImages =>
          this.setState(prevState => ({
            images: [...prevState.images, ...newImages],
            status: 'resolved',
          })),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  render() {
    const { status, images, loadMore, imageSelected } = this.state;

    if (status === 'idle') {
      return (
        <>
          <ImageGalleryList>
            <DefaultImage data={data} />
          </ImageGalleryList>
        </>
      );
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
            <ImageGalleryItem
              images={images}
              onClick={this.handleSelectImage}
            />
          </ImageGalleryList>
          {loadMore && <Button onClick={this.handleClickBtn} />}
          {imageSelected && (
            <Modal
              onClick={this.handleCloseModal}
              src={imageSelected.largeImageURL}
              alt={imageSelected.tags}
            />
          )}
        </>
      );
    }
  }
}
