"use client";

import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { events } from "@/app/lib/events";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import CreateNewEvent from "./CreateNewEvent";
import UpdateAndDeleteEvent from "./UpdateAndDeleteEvent";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [date, setDate] = useState("");

  const handleSelect = ({ start }) => {
    setDate(start);
    setOpen((open) => !open);
  };
  const handleManage = () => {
    setOpen2((open) => !open);
  };

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-3">
        <h1 className="heading-h1 mb-6">Promotional Calendar</h1>
        <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
          <DialogTrigger className="btn-primary">Add New Event</DialogTrigger>
          <DialogContent>
            <CreateNewEvent date={date} />
          </DialogContent>
        </Dialog>
      </div>
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "90dvh" }}
        onSelectEvent={handleManage}
        onSelectSlot={handleSelect}
      />
      <Dialog open={open2} onOpenChange={() => setOpen2((open) => !open)}>
        <UpdateAndDeleteEvent />
      </Dialog>
    </div>
  );
}
