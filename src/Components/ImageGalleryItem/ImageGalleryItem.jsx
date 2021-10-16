export const ImageGalleryItem = ({ images }) => {
  return (
    <>
      {images &&
        images.map(image => {
          const { id, webformatURL, tags } = image;
          return (
            <li className="ImageGalleryItem" key={id}>
              <img src={webformatURL} alt={tags} />
            </li>
          );
        })}
    </>
  );
};
