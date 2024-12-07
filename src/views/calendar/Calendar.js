// ** React Import
import { useEffect, useRef, memo } from 'react'

import '@fullcalendar/react/dist/vdom'
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Menu } from 'react-feather'
import { Card, CardBody } from 'reactstrap'
import moment from 'moment-jalaali'
import faLocale from '@fullcalendar/core/locales/fa'; // اضافه کردن فایل زبان فارسی
import { useNavigate } from 'react-router-dom'
const convertToJalali = (date) => {
  return moment(date).format('jYYYY/jMM/jDD')
}
const Calendar = (props) => {
  const calendarRef = useRef(null)
  const {
    isRtl,
    dispatch,
    calendarApi,
    handleAddEventSidebar,
    blankEvent,
    toggleSidebar,
    events,
    selectEvent,
  } = props
  console.log("Events in calendar options:", events);
  // ** UseEffect checks for CalendarAPI Update
  useEffect(() => {
    if (calendarApi) {
      calendarApi.render(); 
    }
  }, [events, calendarApi]);

  const navigate = useNavigate();

  // ** calendarOptions(Props)
  const calendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    editable: true,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 2,
    navLinks: true,
    eventClick: (coursesID) => {
      const courseId = coursesID.event.id;
      navigate(`/courses-view/${courseId}`);
    },
    eventClassNames() {
      const backgroundColor = '#28a745'; 
      const textColor = 'black'; 
      return [
        `bg-light-green-${backgroundColor.replace('#', '')} !important`,
        `text-${textColor} !important`
      ];
    },
    events: events, 
    
    customButtons: {
      sidebarToggle: {
        text: <Menu className="d-xl-none d-block" />,
        click() {
          toggleSidebar(true);
        }
      }
    },
    dateClick(info) {
      const ev = { ...blankEvent };
      ev.start = convertToJalali(info.date);
      ev.end = convertToJalali(info.date);
      dispatch(selectEvent(ev));
      handleAddEventSidebar();
    },
    ref: calendarRef,
    direction: isRtl ? 'rtl' : 'ltr',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: false,
    },
    locale: faLocale,
  };

  return (
    <Card className='shadow-none border-0 mb-0 rounded-0'>
      <CardBody className='pb-0'>
        <FullCalendar {...calendarOptions} />
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)

