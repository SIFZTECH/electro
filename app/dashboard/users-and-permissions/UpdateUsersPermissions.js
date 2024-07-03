"use client";

import toast from "react-hot-toast";
import { updateRole } from "@/app/_services/apiUsers";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import Spinner from "@/app/components/ui/Spinner";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UpdateList from "./UpdateListPermissions";
import { useRoles } from "@/app/_features/roles/useRoles";

const UpdateUsersPermissions = ({
  roleName,
  id,
  permissions: permissionsName,
}) => {
  const [open, setOpen] = useState(false);
  const { permissions = [], isLoading } = useRoles();

  const queryClient = useQueryClient();

  const groupedPermissions = {
    product: [],
    category: [],
    subcategory: [],
    attribute: [],
    social: [],
    brand: [],
    dealer: [],
    clickAndCollect: [],
    findDealer: [],
    warranty: [],
    calendar: [],
    store: [],
    stock: [],
    user: [],
    other: [],
  };

  if (!isLoading && permissions) {
    permissions.forEach((permission) => {
      if (permission.name.startsWith("product")) {
        groupedPermissions.product.push(permission);
      } else if (permission.name.startsWith("category")) {
        groupedPermissions.category.push(permission);
      } else if (permission.name.startsWith("subcategory")) {
        groupedPermissions.subcategory.push(permission);
      } else if (
        permission.name.startsWith("attribute") ||
        permission.name.startsWith("add_attribute")
      ) {
        groupedPermissions.attribute.push(permission);
      } else if (permission.name.startsWith("brand")) {
        groupedPermissions.brand.push(permission);
      } else if (permission.name.startsWith("dealer")) {
        groupedPermissions.dealer.push(permission);
      } else if (permission.name.startsWith("social")) {
        groupedPermissions.social.push(permission);
      } else if (
        permission.name.startsWith("calendar") ||
        permission.name.startsWith("create_event")
      ) {
        groupedPermissions.calendar.push(permission);
      } else if (
        permission.name.startsWith("stock") ||
        permission.name.startsWith("upload_stock") ||
        permission.name.startsWith("edit_stock")
      ) {
        groupedPermissions.stock.push(permission);
      } else if (permission.name.startsWith("click")) {
        groupedPermissions.clickAndCollect.push(permission);
      } else if (
        permission.name.startsWith("warranty") ||
        permission.name.startsWith("create_warranty")
      ) {
        groupedPermissions.warranty.push(permission);
      } else if (permission.name.startsWith("find")) {
        groupedPermissions.findDealer.push(permission);
      } else if (
        permission.name.startsWith("search_dealer") ||
        permission.name.startsWith("update_dealer") ||
        permission.name.startsWith("edit_dealer") ||
        permission.name.startsWith("delete_dealer") ||
        permission.name.startsWith("create_dealer")
      ) {
        groupedPermissions.store.push(permission);
      } else if (
        permission.name.startsWith("user") ||
        permission.name.startsWith("assign_role") ||
        permission.name.startsWith("block_user") ||
        permission.name.startsWith("all_users") ||
        permission.name.startsWith("roles_and_permissions") ||
        permission.name.startsWith("edit_user") ||
        permission.name.startsWith("block_list")
      ) {
        groupedPermissions.user.push(permission);
      } else {
        groupedPermissions.other.push(permission);
      }
    });
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: roleName,
    },
  });

  async function onSubmit(data) {
    try {
      const res = await updateRole(id, data);

      if (res) {
        toast.success(res.message);
        queryClient.invalidateQueries("roles");
        setOpen((open) => !open);
        reset();
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger className="btn-primary transition-all py-1 bg-emerald-200">
        Edit
      </DialogTrigger>
      <DialogContent className="max-h-dvh max-w-[55rem]">
        <div>
          <h2 className="font-serif text-lg">Edit Role</h2>
          <p className="text-sm text-gray-800 mt-3">
            Make changes to your role here. Click save when you&apos;re done.
          </p>
          <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Role Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="block w-full rounded-md border border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              {errors?.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="">
              <UpdateList
                title="User Management"
                permissions={groupedPermissions.user}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Product Management"
                permissions={groupedPermissions.product}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Category Management"
                permissions={groupedPermissions.category}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Sub-Category Management"
                permissions={groupedPermissions.subcategory}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Attribute Management"
                permissions={groupedPermissions.attribute}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Brand Management"
                permissions={groupedPermissions.brand}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Dealer Management"
                permissions={groupedPermissions.dealer}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Stock Management"
                permissions={groupedPermissions.stock}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Social Media Management"
                permissions={groupedPermissions.social}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Calendar Management"
                permissions={groupedPermissions.calendar}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Warranty Management"
                permissions={groupedPermissions.warranty}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Click-and-Collect Management"
                permissions={groupedPermissions.clickAndCollect}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Find Dealer Management"
                permissions={groupedPermissions.findDealer}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Store Management"
                permissions={groupedPermissions.store}
                permissionsName={permissionsName}
                register={register}
              />
              <UpdateList
                title="Other"
                permissions={groupedPermissions.other}
                permissionsName={permissionsName}
                register={register}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 font-serif flex justify-center rounded-md bg-color-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-color-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-color-primary"
              >
                {isSubmitting ? <SpinnerMini /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUsersPermissions;
