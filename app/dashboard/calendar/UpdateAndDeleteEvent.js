import { DialogContent } from "@/app/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import UpdateEventTab from "./UpdateEventTab";
import DeleteEventTab from "./DeleteEventTab";

const UpdateAndDeleteEvent = ({
  id,
  startDate,
  endDate,
  title,
  description,
  visible,
  setOpen,
}) => {
  return (
    <DialogContent>
      <Tabs
        defaultValue="updateEvent"
        className="font-serif shadow-none appearance-none "
      >
        <TabsList>
          <TabsTrigger
            value="updateEvent"
            className="focus-visible:ring-1 focus-visible:ring-color-primary"
          >
            Update Event
          </TabsTrigger>
          <TabsTrigger value="deleteEvent">Delete Event</TabsTrigger>
        </TabsList>
        <TabsContent value="updateEvent">
          <UpdateEventTab
            id={id}
            startDate={startDate}
            endDate={endDate}
            title={title}
            description={description}
            visible={visible}
            setOpen={setOpen}
          />
        </TabsContent>
        <TabsContent value="deleteEvent">
          <DeleteEventTab id={id} setOpen={setOpen} />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default UpdateAndDeleteEvent;
