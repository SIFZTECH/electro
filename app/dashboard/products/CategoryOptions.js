"use client";

import * as React from "react";

import { cn } from "@/app/lib/utils";

import { Check, ChevronDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";

export function CategoryOptions({
  data,
  isLoading,
  isError,
  setValue: setValue2,
  id,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(id);

  const categoryOptions =
    !isLoading &&
    !isError &&
    data &&
    data?.data?.map((category) => {
      return {
        label: category?.name,
        value: category.id,
      };
    });

  return (
    <div className="relative">
      <span
        onClick={() => setOpen((open) => !open)}
        className="flex items-center rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 justify-between w-full"
      >
        {value
          ? categoryOptions &&
            categoryOptions?.find((category) => category.value === value)?.label
          : "Select category..."}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </span>

      {open && (
        <div className="p-0 z-[99999] absolute w-full rounded-md border bg-gray-100 border-gray-300">
          <Command>
            <CommandInput placeholder="Search brand..." className="h-9" />
            <CommandEmpty>No Category found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {!isLoading &&
                  !isError &&
                  categoryOptions?.map((category) => (
                    <CommandItem
                      key={category.value}
                      value={category.value}
                      onSelect={() => {
                        setValue(
                          category.value === value ? null : category.value
                        );
                        setValue2(
                          "category_id",
                          category.value === value ? null : category.value
                        );
                        setOpen(false);
                      }}
                    >
                      {category.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === category.value ? "opacity-100" : "opacity-0"
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
