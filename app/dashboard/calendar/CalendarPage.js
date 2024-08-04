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
import Link from "next/link";
import Image from "next/image";

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
  const [social_media_folders, setSocial_media_folders] = useState(null);
  const [resources_folders, setResources_folders] = useState(null);
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
    setSocial_media_folders(e.social_media_folders);
    setResources_folders(e.resources_folders);
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
        social_media_folders: event.social_media_folders,
        resources_folders: event.resources_folders,
        visible_to_anyone: event.visible_to_anyone,
      }))
    : data?.data?.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,

        start: new Date(event.start_date),
        end: new Date(event.end_date),

        color: event.color,
        social_media_folders: event.social_media_folders,
        resources_folders: event.resources_folders,
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
              <hr />
              {resources_folders && resources_folders.length !== 0 && (
                <div className="flex flex-col gap-1">
                  <h2 className="font-medium">Resources:</h2>
                  <ul className="flex gap-2 gap-y-5 flex-wrap">
                    {resources_folders?.map((folder) => {
                      return (
                        <li key={folder.id}>
                          <Link
                            className="flex items-center gap-1"
                            href={`/dashboard/dealer-resources/${folder.id}`}
                          >
                            <Image
                              src="/icons8-folder.svg"
                              height={20}
                              width={20}
                              alt=""
                            />{" "}
                            <span>{folder.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {social_media_folders && social_media_folders.length !== 0 && (
                <div className="flex flex-col gap-1 mt-3">
                  <h2 className="font-medium">Social Media Assests:</h2>

                  <ul className="flex gap-3 gap-y-5 flex-wrap">
                    {social_media_folders?.map((folder) => {
                      return (
                        <li key={folder.id}>
                          <Link
                            className="flex items-center gap-1"
                            href={`/dashboard/social-media-assets/${folder.id}`}
                          >
                            <Image
                              src="/icons8-folder.svg"
                              height={20}
                              width={20}
                              alt=""
                            />{" "}
                            <span>{folder.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
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
            social_media_folders={social_media_folders}
            resources_folders={resources_folders}
            color={color}
            setColor={setColor}
            setOpen={setOpen2}
          />
        </Dialog>
      )}
    </div>
  );
}
