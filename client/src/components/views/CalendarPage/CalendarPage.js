import React,{useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import event from './event'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment/locale/ko'
const localizer = momentLocalizer(moment)
function CalendarPage() {
    

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={event}
                startAccessor="start"
                endAccessor="end"
                style={{height: 500}}
            />
        </div>
    )
}

export default CalendarPage
