import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  { id: "1", title: "First Event" },
  { id: "2", title: "Second Event" },
];

function EventsPage() {
  return (
    <>
      <h1>EventsPage</h1>
      <ul>
        {DUMMY_EVENTS.map((element) => (
          <li key={element.id}>
            <Link to={element.id}>{element.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
