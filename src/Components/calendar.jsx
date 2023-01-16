import { momentLocalizer } from "react-big-calendar";
import Calendar from "react-big-calendar/lib/Calendar";
import moment from "moment";
import { Outlet } from "react-router-dom";
import "./calendar.css";

const Calendar1 = ({ allEvents, visible, setVisible }) => {
  const localizer = momentLocalizer(moment);

  return (
    <div className="DetaileCalendar">
      <Calendar
        localizer={localizer}
        events={allEvents}
        showAllEvents={visible}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400, width: 750, margin: "50px" }}
        defaultDate={moment().toDate()}
        onSelectSlot={() => setVisible(!visible)}
        defaultView="month"
        //  eventPropGetter={eventStyleGetter}
        // onSelectEvent={(events) => onSelectEvent(events.id)}
        // onSelectEvent={(events) =>HandelDateSection(events)}
        // onDoubleClickEvent={(events) => HandelSelectEvent(events.id)}
      />
      <Outlet />
    </div>
  );
};

export default Calendar1;
