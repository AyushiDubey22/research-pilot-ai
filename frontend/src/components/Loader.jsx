import { useLoader } from "../context/LoaderContext";

const Loader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="global-loader">
      <span className="loader-dialog"></span>
    </div>
  );
};

export default Loader;
