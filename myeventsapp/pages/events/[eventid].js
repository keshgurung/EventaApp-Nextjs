import React from 'react'
import {useRouter} from 'next/router'
import {getEventById} from '../../dummy-data'
import { Fragment } from 'react'
import EventSummary from '../../components/event-detail/event-summary'
import EvenLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'

const singleEvent = () => {
  const router = useRouter()

  const eventId = router.query.eventid
  const event = getEventById(eventId)

  if (!event){
    return <p>no event found</p>
  }

  return (
    <Fragment>
      <EventSummary title={event.title}/>
      <EvenLogistics 
      date={event.date} 
      address={event.location} 
      image={event.image} 
      alt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  )
}

export default singleEvent