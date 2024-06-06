"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import UsersTable from "./UsersTable";
import PermissionTable from "./PermissionTable";

import AdminTable from "./AdminTable";
import { useBlockedUsers, useUsers } from "@/app/_features/users/useUsers";
import BlockedUsers from "./BlockedUsers";
import { useRouter } from "next/navigation";

const PermissionTabs = () => {
  const router = useRouter();
  const { total_num, isLoading } = useUsers();
  const { total_num: total_num2, isLoading: isLoading2 } = useBlockedUsers();
  return (
    <>
      <Tabs defaultValue="allUsers" className="font-serif">
        <TabsList>
          <TabsTrigger value="allUsers">
            All Users
            <p className="ml-2 bg-red-500 rounded-full text-white  w-[1.42rem] h-[1.40rem] flex items-center justify-center">
              {!isLoading && (
                <span className="p-1 text-[10px] leading-3">{total_num}</span>
              )}
            </p>
          </TabsTrigger>
          <TabsTrigger value="blocked_users">
            Blocked Users
            <p className="ml-2 bg-red-500 rounded-full text-white w-[1.40rem] h-[1.40rem] flex items-center justify-center">
              {!isLoading2 && (
                <span className="p-1 text-[10px] leading-3">{total_num2}</span>
              )}
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
          <BlockedUsers />
        </TabsContent>
        <TabsContent value="roles_and_permissions">
          <PermissionTable />
        </TabsContent>
        <TabsContent value="admin">
          <AdminTable />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PermissionTabs;
