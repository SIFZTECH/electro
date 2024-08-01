import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export default function DateRangePicker({ selectedRange, setSelectedRange }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-gray-100 border-gray-300",
            !selectedRange?.from && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedRange?.from && selectedRange?.to ? (
            <p>
              {format(selectedRange.from, "PPP")} -{" "}
              {format(selectedRange.to, "PPP")}
            </p>
          ) : (
            <span>Filter By Date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={selectedRange}
          onSelect={setSelectedRange}
        />
      </PopoverContent>
    </Popover>
  );
}
