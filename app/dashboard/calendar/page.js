"use client";

import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import CreateNewEvent from "./CreateNewEvent";
import UpdateAndDeleteEvent from "./UpdateAndDeleteEvent";
import { useEvents } from "@/app/_features/events/useEvents";
import Spinner from "@/app/components/ui/Spinner";
import useCheckPermission from "@/app/_hooks/usePermission";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const isCreateEventPermission = useCheckPermission("create_event");
  const { isLoading, isError, error, data } = useEvents();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [date, setDate] = useState("");
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("null");
  const [visible, setVisible] = useState(null);

  const handleSelect = ({ start }) => {
    setDate(start);
    setOpen((open) => !open);
  };
  const handleManage = (e) => {
    setOpen2((open) => !open);

    setId(e.id);
    setTitle(e.title);
    setDate(e.start);
    setVisible(e.visible_to);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const formattedDate = data.data.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.date),
    end: new Date(event.date),
    visible_to: event.visible_to,
  }));

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-3">
        <h1 className="heading-h1 mb-6">Promotional Calendar</h1>
        {isCreateEventPermission && (
          <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
            {/* <DialogTrigger className="btn-primary">Add New Event</DialogTrigger> */}
            <DialogContent>
              <CreateNewEvent date={date} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={formattedDate}
        style={{ height: "90dvh" }}
        onSelectEvent={handleManage}
        onSelectSlot={handleSelect}
      />
      <Dialog open={open2} onOpenChange={() => setOpen2((open) => !open)}>
        <UpdateAndDeleteEvent
          id={id}
          date={date}
          title={title}
          visible={visible}
          setOpen={setOpen2}
        />
      </Dialog>
    </div>
  );
}
