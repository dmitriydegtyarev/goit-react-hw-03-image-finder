import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const DefaultImage = ({ data }) => {
  return (
    <>
      {data &&
        data.map(el => {
          const { id, src, alt } = el;
          return (
            <ImageGalleryItemLi key={id}>
              <ImageGalleryItemImage src={src} alt={alt} />
            </ImageGalleryItemLi>
          );
        })}
    </>
  );
};
