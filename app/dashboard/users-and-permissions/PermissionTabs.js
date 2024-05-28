import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import PermissionTable from "./PermissionTable";

const PermissionTabs = () => {
  return (
    <Tabs defaultValue="allOrders" className="font-serif">
      <TabsList>
        <TabsTrigger value="allOrders" className="">
          All Orders
          <p className="ml-2 bg-red-500 rounded-full text-white  w-[1.42rem] h-[1.40rem] flex items-center justify-center">
            <span className="p-1 text-[10px] leading-3">99+</span>
          </p>
        </TabsTrigger>
        <TabsTrigger value="marketing">
          Marketing
          <p className="ml-2 bg-red-500 rounded-full text-white  w-[1.40rem] h-[1.40rem] flex items-center justify-center">
            <span className=" text-[10px] leading-3">9</span>
          </p>
        </TabsTrigger>
        <TabsTrigger value="customerService">Customer Service</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
      </TabsList>
      <TabsContent value="allOrders">
        <PermissionTable />
      </TabsContent>
      <TabsContent value="marketing">
        <PermissionTable />
      </TabsContent>
      <TabsContent value="customerService">Customer Service</TabsContent>
      <TabsContent value="admin">Admin</TabsContent>
    </Tabs>
  );
};

export default PermissionTabs;
