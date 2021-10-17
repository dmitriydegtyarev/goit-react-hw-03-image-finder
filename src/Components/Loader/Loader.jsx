import Loader from 'react-loader-spinner';

export const Spinner = () => {
  return (
    <Loader
      type="BallTriangle"
      color="#00BFFF"
      height={300}
      width={300}
      timeout={3000}
    />
  );
};
