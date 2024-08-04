"use client";

import * as React from "react";

import { BASE_URL_IMAGE, cn } from "@/app/lib/utils";

import { Check, ChevronDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import { useAdminUsers } from "@/app/_features/users/useUsers";
import Image from "next/image";

export function UserAdminOptionsForNew({ setValue: setValue2 }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const { data, isLoading, isError, error } = useAdminUsers();

  const userOptions =
    !isLoading &&
    !isError &&
    data &&
    data?.data?.data?.map((opt) => {
      return {
        label: `${opt?.firstname} ${opt?.lastname}`,
        value: opt?.id,

        image: opt?.profile,
      };
    });

  return (
    <div className="relative">
      <span
        onClick={() => setOpen((open) => !open)}
        className="flex items-center rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 justify-between w-full"
      >
        {value
          ? userOptions &&
            userOptions?.find((user) => {
              return user.value === value;
            })?.label
          : "Select user..."}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </span>

      {open && (
        <div className="p-0 z-[99999] absolute w-full rounded-md border bg-gray-100 border-gray-300">
          <Command>
            <CommandInput placeholder="Search user..." className="h-9" />
            <CommandEmpty>No Admin user found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {!isLoading &&
                  !isError &&
                  userOptions?.map((user) => (
                    <CommandItem
                      key={user.value}
                      value={user.value}
                      onSelect={() => {
                        setValue(user.value === value ? null : user.value);
                        setValue2(
                          "assign_to_admin",
                          user.value === value ? null : user.value
                        );
                        setOpen(false);
                      }}
                    >
                      <Image
                        src={
                          user?.image
                            ? ` ${BASE_URL_IMAGE}${user.image}`
                            : "/default.jpg"
                        }
                        height={30}
                        width={30}
                        alt=""
                        className="inline rounded-full object-cover h-[30px] border border-gray-200"
                      />{" "}
                      <span className="ml-1">{user.label}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === user.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </div>
      )}
    </div>
  );
}
