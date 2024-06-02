import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import UsersTable from "./UsersTable";
import PermissionTable from "./PermissionTable";

const PermissionTabs = () => {
  return (
    <Tabs defaultValue="allUsers" className="font-serif">
      <TabsList>
        <TabsTrigger value="allUsers" className="">
          All Users
          <p className="ml-2 bg-red-500 rounded-full text-white  w-[1.42rem] h-[1.40rem] flex items-center justify-center">
            <span className="p-1 text-[10px] leading-3">99+</span>
          </p>
        </TabsTrigger>
        <TabsTrigger value="blocked_users">
          Blocked Users
          <p className="ml-2 bg-red-500 rounded-full text-white  w-[1.40rem] h-[1.40rem] flex items-center justify-center">
            <span className=" text-[10px] leading-3">9</span>
          </p>
        </TabsTrigger>
        <TabsTrigger value="roles_and_permissions">
          Roles and Perimission
        </TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
      </TabsList>
      <TabsContent value="allUsers">
        <UsersTable />
      </TabsContent>
      <TabsContent value="blocked_users">
        <UsersTable />
      </TabsContent>
      <TabsContent value="roles_and_permissions">
        <PermissionTable />
      </TabsContent>
      <TabsContent value="admin">Admin</TabsContent>
    </Tabs>
  );
};

export default PermissionTabs;
