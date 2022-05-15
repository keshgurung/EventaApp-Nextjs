import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import Eventlist from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const searchedEvents = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">loading</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  //  changing the value into number as in array we get strings only ['2021','4']
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // checking if URL is valid so it doesnot take soma altered values like /events/abc/4

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter, please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events </Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // check if there is no event
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events founds.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1); //date functions starts from 0 bt we have used from 1 in our form value

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <Eventlist items={filteredEvents} />
    </Fragment>
  );
};

export default searchedEvents;
