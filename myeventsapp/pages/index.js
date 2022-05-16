import React from "react";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

const Homepage = (props) => {
  console.log(props.events);
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, //every half hour we renegrate this page for new requests for production
    //if we add new featured events, we want it to run every 30 mins.
  };
}
export default Homepage;
