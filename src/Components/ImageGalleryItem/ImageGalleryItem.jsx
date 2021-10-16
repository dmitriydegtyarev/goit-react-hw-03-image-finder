export const ImageGalleryItem = ({ id, src, alt }) => {
  return (
    <li className="ImageGalleryItem" key={id}>
      <img src={src} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
};
