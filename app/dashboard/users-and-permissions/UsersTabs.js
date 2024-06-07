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
import {
  useAdminUsers,
  useBlockedUsers,
  useUsers,
} from "@/app/_features/users/useUsers";
import BlockedUsers from "./BlockedUsers";
import { useRouter } from "next/navigation";

const UsersTabs = () => {
  const router = useRouter();
  const { data, total_num, isLoading } = useUsers();
  const { total_num: total_num2, isLoading: isLoading2 } = useBlockedUsers();
  const { total_num: total_num3, isLoading: isLoading3 } = useAdminUsers();

  return (
    <>
      <Tabs defaultValue="allUsers" className="font-serif">
        <TabsList>
          <TabsTrigger value="allUsers">
            All Users
            {!isLoading && (
              <p className="ml-2 bg-red-500 rounded-full text-white w-[1.40rem] h-[1.40rem] flex items-center justify-center">
                <span className="p-1 text-[10px] leading-3">
                  {total_num ? total_num : data?.data.length}
                </span>
              </p>
            )}
          </TabsTrigger>
          <TabsTrigger value="blocked_users">
            Blocked Users
            {!isLoading2 && (
              <p className="ml-2 bg-red-500 rounded-full text-white w-[1.40rem] h-[1.40rem] flex items-center justify-center">
                <span className="p-1 text-[10px] leading-3">{total_num2}</span>
              </p>
            )}
          </TabsTrigger>
          <TabsTrigger value="roles_and_permissions">
            Roles and Perimission
          </TabsTrigger>
          <TabsTrigger value="admin">
            Admin
            {!isLoading3 && (
              <p className="ml-2 bg-red-500 rounded-full text-white w-[1.40rem] h-[1.40rem] flex items-center justify-center">
                <span className="p-1 text-[10px] leading-3">{total_num3}</span>
              </p>
            )}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="allUsers">
          {!isLoading && data?.data.length === 0 ? (
            <h1 className="font-serif text-center font-semibold">
              There is no user with that name
            </h1>
          ) : (
            <UsersTable />
          )}
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

export default UsersTabs;
