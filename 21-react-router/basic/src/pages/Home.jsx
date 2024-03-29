import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  console.log("HOME");

  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="/products">Products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}

export default HomePage;
