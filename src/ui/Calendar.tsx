import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Calendar as Cal, EventPropGetter, View } from 'react-big-calendar'
import { CalendarEvent } from '../definitions'
import { localizer, CalendarMessages } from '../helpers'
import { useEffect, useState } from 'react'
import EventBox from './EventBox'
import { useSearchParams } from 'react-router-dom'
import { ModalComponent } from './Modal'
import { CreateEventForm } from './CreateEventForm'
import useCalendarStore from '../hooks/calendar-hook'
import useUiStore from '../hooks/ui-store-hook'

interface Props {
  events: CalendarEvent[]
}

export function Calendar ({ events }: Props): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState<View>('month')
  const { lang, setActiveEvent } = useCalendarStore()
  const { openModal } = useUiStore()

  useEffect(() => {
    const currentView= searchParams.get('view') || 'month'
    setView(currentView as View)
  }, [searchParams])

  const eventStyleGetter: EventPropGetter<CalendarEvent> = (event) => {
    const style = {
      backgroundColor: event.bgColor,
    }
    return {
      className: '',
      style: style
    }
  }

  const onDoubleClickEvent = (event: CalendarEvent) => {
    setActiveEvent(event)
    openModal()
  }

  const onClickEvent = (event: CalendarEvent) => {
    console.log(event)
  }

  const onViewChanged = (view: View) => {
    setSearchParams({ view: view })
  }

  return (
    <div>
      <Cal
        view={view}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        events={events}
        style={{ height: 'calc(100vh - 96px)' }}
        culture={lang}
        messages={CalendarMessages[lang]}
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventBox
        }}
        onSelectEvent={onClickEvent}
        onDoubleClickEvent={onDoubleClickEvent}
        onView={onViewChanged}
      />
      <ModalComponent>
        <CreateEventForm />
      </ModalComponent>
    </div>
  )
}
