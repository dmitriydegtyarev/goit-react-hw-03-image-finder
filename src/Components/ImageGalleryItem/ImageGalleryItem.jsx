import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, onClick }) => {
  return (
    <>
      {images &&
        images.map((image, idx) => {
          const { id, webformatURL, tags } = image;
          return (
            <ImageGalleryItemLi key={idx}>
              <ImageGalleryItemImage
                src={webformatURL}
                alt={tags}
                id={id}
                onClick={() => onClick(image)}
              />
            </ImageGalleryItemLi>
          );
        })}
    </>
  );
};
