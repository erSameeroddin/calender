import React, { useEffect, useState } from "react";

import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Calendar1 from "./Components/calendar";
import Calender2 from "./Components/Calendar2";
import { Route, Routes } from "react-router-dom";

const App = () => {

  const [allEvents, setAllEvents] = useState([]);
  const [allEvents2, setAllEvents2] = useState([]);
  const [visible, setVisible] = useState(true);
  const [Data, setData] = useState({});
  const [defaultDate, setDefaultDate] = useState(true);
  const [applyLeave, setApplyLeave] = useState(true);
  const [newEvent, setNewEvent] = useState({
    id: "",
    title: '',
    start: "",
    end: "",
  });
  const [finalList, setFinalList] = useState([])
  useEffect(() => {

    const startEvents = allEvents.map((e) => {
      return { start: e.start.getDate(), title: e.title }

    })
    console.log("startEvents2startEvents2", startEvents);
    const uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
    const unique = uniqueArray(startEvents)
    console.log("unique2unique2", unique);

    const finalArr = unique?.map((x) => {
      const items = allEvents?.find((e) => {
        return e.start.getDate() === x.start && e.title === x.title
      })
      if (items) {
        return items
      }
    }).filter((item) => item !== undefined)

    console.log("finalArrfinalArr", finalArr);
    setFinalList(finalArr)

  }, [allEvents]);

  function handleAddEvent() {

    setAllEvents([...allEvents, {
      id: newEvent?.id,
      start: newEvent?.start,
      end: newEvent?.end,
      title: (newEvent?.title === "leave" ? "leave" : "class"),
    }
    ]);
    setAllEvents2([...allEvents2, newEvent]);
    setNewEvent("");
    setApplyLeave(!applyLeave);
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Calender2
              handleAddEvent={handleAddEvent}
              Data={Data}
              setData={setData}
              defaultDate={defaultDate}
              setDefaultDate={setDefaultDate}
              applyLeave={applyLeave}
              setApplyLeave={setApplyLeave}
              allEvents={allEvents}
              setAllEvents={setAllEvents}
              setNewEvent={setNewEvent}
              newEvent={newEvent}
              finalList={finalList}
            />
          }
        />
        <Route
          path="detail"
          element={
            <Calendar1
              allEvents={allEvents2}
              visible={visible}
              setVisible={setVisible}
            />
          }
        />
      </Routes>

      <div className="rbc-agenda-view"></div>
    </div>
  );
};

export default App;
