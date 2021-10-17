import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images &&
        images.map(image => {
          const { id, webformatURL, tags } = image;
          return (
            <ImageGalleryItemLi key={id}>
              <ImageGalleryItemImage src={webformatURL} alt={tags} />
            </ImageGalleryItemLi>
          );
        })}
    </>
  );
};
