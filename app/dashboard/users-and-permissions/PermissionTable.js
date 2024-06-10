import { Switch } from "@/app/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import EditPermission from "./EditPermission";
import DeleteRole from "./DeleteRole";
import Link from "next/link";
import CreateRolesAndPermissions from "./CreateRolesAndPermissions";
import { useRoles } from "@/app/_features/roles/useRoles";
import Spinner from "@/app/components/ui/Spinner";
import CreatePermission from "./CreatePermission";
import CreateNewRole from "./CreateNewRole";
import DeletePermission from "./DeletePermission";
import UpdateRole from "./UpdateRole";

const PermissionTable = () => {
  const { isLoading, data, isError, error } = useRoles();

  if (isLoading) return <Spinner />;

  // dashboard;
  // product_add;
  // product_update;
  // product_delete;
  // product_list;
  // category_add;
  // category_update;
  // category_delete;
  // category_list;
  // subcategory_add;
  // subcategory_update;
  // subcategory_delete;
  // subcategory_list;
  // add_attribute;
  // add_attribute_value;
  // attribute_list;
  // brand_add;
  // brand_update;
  // brand_delete;
  // social_media_assets;
  // dealer_edit;
  // dealer_delete;
  // dealer_block;
  // dealer_list;
  // create_event;
  // calendar_view;
  // click_and_collect;
  // stock;
  // upload_stock;
  // edit_stock;
  // find_dealer;
  // warranty;
  // create_warranty;
  // users_and_permissions;
  // all_users;
  // block_user;
  // roles_and_permissions;
  // admin;
  // edit_user;
  // assign_role;
  // block_list;
  // settings;

  return (
    <>
      <div className="flex gap-3 justify-end">
        <CreateNewRole />
        {/* <CreatePermission />
        <CreateRolesAndPermissions /> */}
      </div>

      <Table className="mt-10 table_modify">
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
          {data.data.rolesWithPermissions.map((data, i) => {
            return (
              <TableRow key={i + 1}>
                <TableCell data-label="Id">{i + 1}</TableCell>
                <TableCell data-label="Role Name">{data.name}</TableCell>
                <TableCell className="space-x-2" data-label="Permissions">
                  <div className="flex gap-2 flex-wrap justify-end xl:justify-normal">
                    {data.permissions.map((permission) => (
                      <span
                        className="btn-primary bg-green-200"
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
                    <UpdateRole roleName={data.name} id={data.id} />
                    <DeleteRole roleName={data.name} />
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
