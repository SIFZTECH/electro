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
import NoPermission from "@/app/components/ui/NoPermission";
import "moment/locale/en-gb";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const isCreateEventPermission = useCheckPermission("create_event");
  const isCalendarViewPermission = useCheckPermission("calendar_view");
  const { isLoading, isError, error, data } = useEvents();

  const [color, setColor] = useState("#000000");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("null");
  const [description, setDescription] = useState("null");
  const [visible, setVisible] = useState(null);
  const [visibleAnyone, setVisibleAnyone] = useState(null);

  const handleSelect = ({ start }) => {
    setDate(start);
    setOpen((open) => !open);
  };
  const handleManage = (e) => {
    setOpen2((open) => !open);
    setOpen3((open) => !open);

    setId(e.id);
    setTitle(e.title);
    setDescription(e.description);
    setStartDate(e.start_date);
    setEndDate(e.end_date);
    setVisible(e.visible_to);
    setVisibleAnyone(e.visible_to_anyone);
    setColor(e.color);
  };

  if (!isCalendarViewPermission) {
    return (
      <NoPermission message="You don't have permission to access this route" />
    );
  }

  if (isLoading) {
    return <Spinner />;
  }
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const formattedDate = data?.data?.data
    ? data?.data?.data?.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
        start: new Date(event.start_date),
        end: new Date(event.end_date),
        color: event.color,
        visible_to: event.visible_to,
        visible_to_anyone: event.visible_to_anyone,
      }))
    : data?.data?.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,

        start: new Date(event.start_date),
        end: new Date(event.end_date),

        color: event.color,
        visible_to: event.visible_to,
        visible_to_anyone: event.visible_to_anyone,
      }));

  const eventStyleGetter = (event) => {
    let style = {};

    style.backgroundColor = event.color;

    return {
      style: style,
    };
  };

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-3">
        <h1 className="heading-h1 mb-6">Promotion Calendar</h1>

        {isCreateEventPermission ? (
          <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
            <DialogTrigger className="btn-primary">Add New Event</DialogTrigger>
            <DialogContent className="max-w-2xl">
              <CreateNewEvent
                date={date}
                setOpen={setOpen}
                color={color}
                handleColorChange={handleColorChange}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog open={open3} onOpenChange={() => setOpen3((open) => !open)}>
            {/* <DialogTrigger className="btn-primary">Add New Event</DialogTrigger> */}
            <DialogContent>
              <h1 className="font-serif font-semibold text-xl">{title}</h1>
              <p>{description}</p>
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
        eventPropGetter={eventStyleGetter}
      />
      {isCreateEventPermission && (
        <Dialog open={open2} onOpenChange={() => setOpen2((open) => !open)}>
          <UpdateAndDeleteEvent
            id={id}
            startDate={startDate}
            endDate={endDate}
            title={title}
            description={description}
            visible_to={visible}
            visible_to_anyone={visibleAnyone}
            color={color}
            setColor={setColor}
            setOpen={setOpen2}
          />
        </Dialog>
      )}
    </div>
  );
}
