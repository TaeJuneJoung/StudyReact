import { Link, useParams } from "react-router-dom";

function EventDetailPage() {
  const param = useParams();
  return (
    <>
      <h1>EventDetailPage</h1>
      <p>{param["some-id"]}</p>

      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
}

export default EventDetailPage;
