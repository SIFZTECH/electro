"use client";

import { Dialog, DialogContent } from "@/app/components/ui/dialog";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import EmailTab from "./EmailTab";
import { useRouter } from "next/navigation";
import PhoneTab from "./PhoneTab";

const EnableTFAForm = () => {
  const router = useRouter();

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      <DialogContent>
        <Tabs
          defaultValue="email"
          className="font-serif shadow-none appearance-none "
        >
          <TabsList>
            <TabsTrigger
              value="email"
              className="focus-visible:ring-1 focus-visible:ring-color-primary"
            >
              Email
            </TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <EmailTab />
          </TabsContent>
          <TabsContent value="phone">
            <PhoneTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EnableTFAForm;
