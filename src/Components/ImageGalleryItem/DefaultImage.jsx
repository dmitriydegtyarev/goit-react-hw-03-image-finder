import {
  ImageGalleryItemLi,
  DefaultImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const DefaultImage = ({ data }) => {
  return (
    <>
      {data &&
        data.map(el => {
          const { id, src, alt } = el;
          return (
            <ImageGalleryItemLi key={id}>
              <DefaultImageGalleryItemImage src={src} alt={alt} />
            </ImageGalleryItemLi>
          );
        })}
    </>
  );
};
