import React from "react";
// import {useRouter} from 'next/router'
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EvenLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const singleEvent = (props) => {
  // const router = useRouter()

  // const eventId = router.query.eventid
  const event = props.selectedEvent;

  if (!event) {
    return;
    <div className="center">
      <p>Loading...</p>;
    </div>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EvenLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        alt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};
export async function getStaticProps(context) {
  const eventId = context.params.eventid;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30, //if any event data changes,
  };
}

export async function getStaticPaths() {
  //fetching all events could be a huge waste,
  // pre render only featured events cuz they r more likely to be visited
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventid: event.id } }));
  return {
    paths: paths,
    //fallback: false, //this will make sure other url is not accepted and takes to 404 page.
    fallback: true, //tells there are more pages to generate rather than featured events, all events too.
  };
}
export default singleEvent;
