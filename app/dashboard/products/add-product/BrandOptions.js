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
import { useBrandsForSelect } from "@/app/_features/brands/useBrands";

export function BrandOptions({ id, setValue: setValue2 }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(id);
  const { data: brands, isLoading, isError } = useBrandsForSelect();

  const brandOptions =
    !isLoading &&
    !isError &&
    brands &&
    brands?.data?.map((brand) => {
      return {
        label: brand?.name,
        value: brand.id,
      };
    });

  return (
    <div className="relative">
      <span
        onClick={() => setOpen((open) => !open)}
        className="flex items-center rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6 justify-between w-full"
      >
        {value
          ? brandOptions &&
            brandOptions?.find((brand) => brand.value === value)?.label
          : "Select brand..."}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </span>

      {open && (
        <div className="p-0 z-[99999] absolute w-full rounded-md border bg-gray-100 border-gray-300">
          <Command>
            <CommandInput placeholder="Search brand..." className="h-9" />
            <CommandEmpty>No Brand found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {!isLoading &&
                  !isError &&
                  brandOptions?.map((brand) => (
                    <CommandItem
                      key={brand.value}
                      value={brand.value}
                      onSelect={() => {
                        setValue(brand.value === value ? null : brand.value);
                        setValue2(
                          "brand_id",
                          brand.value === value ? null : brand.value
                        );
                        setOpen(false);
                      }}
                    >
                      {brand.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === brand.value ? "opacity-100" : "opacity-0"
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
