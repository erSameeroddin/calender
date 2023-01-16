import { momentLocalizer } from "react-big-calendar";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Link } from "react-router-dom";
import "./calendar2.css";

// import DateTimePicker from 'react-datetime-picker';
// const locales = {
//     "en-US": require("date-fns/locale/en-US"),
// };
const localizer = momentLocalizer(moment);

function Calender2({
  handleAddEvent,
  setDefaultDate,
  allEvents,
  setAllEvents,
  setNewEvent,
  newEvent,
  setApplyLeave,
  applyLeave,
  Data,
  setData,
  defaultDate,
  finalList
}) {

  const HandelSelectEvent = (pID) => {
    const res = window.confirm("Would you like to remove this event?");
    if (res === true) {
      setAllEvents(allEvents.filter((e) => e.id !== pID));
      setDefaultDate(true);
    }
  };

  const HandelDateSection = (data) => {
    console.log("data", data);
    if (data) {
      setData(data);
      console.log("setData", data);
      setDefaultDate(false);
    }
  };
  const date = new Date();

  const handle=(e)=>{
    console.log("onRangeChange",e)
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  return (
    <>
      <div className="calendar">
        <Calendar
          localizer={localizer}
          events={finalList.map((e) => e)}
          // events={allEvents}
          showAllEvents={false}
          allDayAccessor={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400, width: 750, margin: "50px" }}
          defaultDate={moment().toDate()}
          // onSelectSlot={() => setVisible(!visible)}
          //  eventPropGetter={eventStyleGetter}
          // onSelectEvent={(events) => onSelectEvent(events.id)}
          // onRangeChange={(e)=>{console.log("herererer",e)}}
          onSelectEvent={(events) => HandelDateSection(events)}
          onDoubleClickEvent={(events) => HandelSelectEvent(events.id)}
          onRangeChange={(e)=>handle(e)}
        />
        <div className="leaveSection">
          {applyLeave ? (
            <button
              onClick={() => setApplyLeave(!applyLeave)}
              className="applyLeave"
            >
              Apply Leave
            </button>
          ) : (
            <div className="Datepicker">
              <input
                type="text"
                placeholder="Add Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({
                    ...newEvent,
                    id: Date.now(),
                    title: e.target.value,
                  })
                }
              />
              <DatePicker
                placeholderText="Start Date"
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
              />
              <DatePicker
                placeholderText="End Date"
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end })}
              />
              {/* <input type="time"/> */}
              {/* <DateTimePicker value={value} /> */}
              <button className="applyLeave" onClick={handleAddEvent}>
                Add Event
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="detailSection">
        <Link to="/detail">
          <button className="detailBtn">details</button>
        </Link>
        {allEvents.map((e) => {
          if (e.id === Data.id) {
            return (
              <>
                <p className="dateSection">
                  {" "}
                  <span>{e.start.getDate()}</span>{" "}
                  {/* {(e.start.getMonth() === 4 && "May") || (e.start.getMonth() === 5 && "June")} */}
                   {monthNames[e.start.getMonth()]} 2022
                </p>
              </>
            );
          } else {
            return null;
          }
        })}
        {defaultDate && (
          <p className="dateSection">
            {" "}
            <span>{date.getDate()}</span> May 2022
          </p>
        )}
        <p>
          {Data?.title?.includes("class") ? (
            <>{Data.title} for today
        
             </>
          ) : (
            <>No class for today</>
          )}
        </p>
      </div>
    </>
  );
}

export default Calender2;
