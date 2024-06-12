import { DialogContent } from "@/app/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import UpdateEventTab from "./UpdateEventTab";
import DeleteEventTab from "./DeleteEventTab";

const UpdateAndDeleteEvent = () => {
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
          <UpdateEventTab />
        </TabsContent>
        <TabsContent value="deleteEvent">
          <DeleteEventTab />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default UpdateAndDeleteEvent;
