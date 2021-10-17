import Loader from 'react-loader-spinner';

export const Spinner = () => {
  return (
    <Loader
      type="BallTriangle"
      color="#00BFFF"
      height={600}
      width={600}
      timeout={3000}
    />
  );
};
