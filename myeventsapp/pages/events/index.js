import React from 'react'
import { getAllEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import EventsSearch from '../../components/events/events-search'
import { Fragment } from 'react'
import { useRouter } from 'next/router'

const displayAllEvents = (props) => {
  const router = useRouter()

  const { events } = props

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents()
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  }
}

export default displayAllEvents
