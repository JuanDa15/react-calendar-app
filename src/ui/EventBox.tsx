import { EventProps } from "react-big-calendar"
import { CalendarEvent } from "../definitions"


export default function EventBox (props: EventProps<CalendarEvent>): JSX.Element {
  const { event } = props
  return (
    <>
      <strong>{event.title}</strong> - 
       <span>{event.user.name}</span>
    </>
  )
}
