import { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, fetchEvent } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../../util/http.js";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 5000,
  });

  const {
    mutate: deleteMutate,
    isPending: isDeletePending,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  function handleDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function eventDeleteHandler() {
    deleteMutate({ id: params.id });
  }

  let content;

  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to fetch event data, please try again later."
          }
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={"http://localhost:3000/" + data.image} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>정말 삭제하시겠습니까?</h2>
          <p>이 이벤트를 삭제하시겠습니까?</p>
          <div className="form-actions">
            {isDeletePending && <p>Deleting, please wait...</p>}
            {!isDeletePending && (
              <>
                <button onClick={handleStopDelete} className="button-text">
                  Cancel
                </button>
                <button onClick={eventDeleteHandler} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {isDeleteError && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                deleteError.info?.message ||
                "Failed to delete event, please try again later."
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
