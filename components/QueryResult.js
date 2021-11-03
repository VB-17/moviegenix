import Loader from "./Loader";

const QueryResult = ({ loading, error, data, children }) => {
  // if (error) {
  //   return <p>ERROR: {error.message}</p>;
  // }

  if (loading) {

    return (
      <div className="flex items-center justify-center w-full h-24">
        <Loader />
      </div>
    );
  }
  if (!data) {
    return <p>Nothing to show...</p>;
  }
  if (data) {
    return children;
  }
};

export default QueryResult;
