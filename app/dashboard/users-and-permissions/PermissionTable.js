import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import DeleteRole from "./DeleteRole";
import { useRoles } from "@/app/_features/roles/useRoles";
import Spinner from "@/app/components/ui/Spinner";
import CreateNewRoleWithPermissions from "./CreateNewRoleWithPermissions";
import UpdateUsersPermissions from "./UpdateUsersPermissions";

const PermissionTable = () => {
  const { isLoading, data, isError, error } = useRoles();

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex gap-3 justify-end">
        <CreateNewRoleWithPermissions />
        {/* <CreatePermission />
        <CreateRolesAndPermissions /> */}
      </div>

      <Table className="mt-10 ">
        <TableHeader>
          <TableRow className="text-center">
            <TableHead scope="col" className="w-fit">
              SN
            </TableHead>
            <TableHead scope="col" className="w-fit">
              Role Name
            </TableHead>
            <TableHead scope="col" className="w-2/4">
              Perimission
            </TableHead>
            <TableHead scope="col" className="w-fit">
              Guard Name
            </TableHead>
            <TableHead scope="col" className="w-fit">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-sans">
          {data?.data?.rolesWithPermissions?.map((data, i) => {
            return (
              <TableRow key={i + 1}>
                <TableCell data-label="Id">{i + 1}</TableCell>
                <TableCell data-label="Role Name">{data.name}</TableCell>
                <TableCell className="space-x-2" data-label="Permissions">
                  <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
                    {data.permissions.map((permission) => (
                      <span
                        className="btn-primary bg-color-primary_shade-4 text-color-primary"
                        key={permission}
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell data-label="Click and Collect">Web</TableCell>
                <TableCell data-label="Actions">
                  <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
                    <UpdateUsersPermissions
                      roleName={data.name}
                      id={data.id}
                      permissions={data.permissions}
                    />

                    {data.id !== 1 && data.id !== 2 && data.id !== 3 && (
                      <DeleteRole roleName={data.name} />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export default PermissionTable;
