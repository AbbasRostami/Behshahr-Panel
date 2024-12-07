import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'
import Calendar from './Calendar'
import { useRTL } from '@hooks/useRTL'
import { useSelector, useDispatch } from 'react-redux'
import '@styles/react/apps/app-calendar.scss'
import { useGetSth } from '../../core/apiPost'
import { format } from 'date-fns'


const CalendarComponent = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar)
  const [calendarApi, setCalendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [isRtl] = useRTL()
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)
  const toggleSidebar = val => setLeftSidebarOpen(val)

  const { data } = useGetSth('/Course/CourseList?PageNumber=1&RowsOfPage=1000&SortingCol=DESC&SortType=Expire&Query&endDate=2050/01/01&startDate=1922/01/01', {
    staleTime: 5 * 60 * 1000,
    enabled: true,
  });
  console.log(data);

  const [events, setEvents] = useState([])

  useEffect(() => {
    if (data?.courseDtos) {
      const eventsData = data.courseDtos.map(event => ({
        title: event.title,
        start: format(new Date(event.lastUpdate), 'yyyy-MM-dd'),
        end: format(new Date(event.lastUpdate), 'yyyy-MM-dd'),
        id: event.courseId,
      }));
      console.log("data tabdil shode: ", eventsData); 
      setEvents(eventsData); 
    }
  }, [data]); 
  
  return (
    <Fragment>
      <div className='app-calendar overflow-hidden border'>
        <Row className='g-0'>
          <Col className='position-relative'>
            <Calendar
              isRtl={isRtl}
              store={store}
              dispatch={dispatch}
              calendarApi={calendarApi}
              toggleSidebar={toggleSidebar}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
              events={events} 
              
            />
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
    </Fragment>
  )
}

export default CalendarComponent
