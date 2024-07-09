import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { BASE_URL_IMAGE } from "@/app/lib/utils";
import Image from "next/image";
import { useState } from "react";

const SelectSearchUser = ({ data, label, value, setDealer }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = data?.filter((user) => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="">
      <label className="block text-sm font-semibold font-serif leading-6 text-gray-900 after:content-['*'] after:ml-0.5 after:text-red-600">
        {label}
      </label>

      <Select onValueChange={(value) => setDealer(value)} required>
        <SelectTrigger>
          <SelectValue placeholder="Select Dealer" />
        </SelectTrigger>
        <SelectContent>
          <input
            type="search"
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-3 text-sm outline-none bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            placeholder="Search Dealers"
            autoFocus={true}
            onChange={handleSearchChange}
          />
          {filteredUsers?.map((user, i) => (
            <SelectItem
              key={i + 1}
              value={`${user.firstname} ${user.lastname}`}
              className="flex items-center gap-2"
            >
              <Image
                src={
                  user.profile
                    ? ` ${BASE_URL_IMAGE}${user.profile}`
                    : "/default.jpg"
                }
                height={30}
                width={30}
                alt=""
                className="inline rounded-full border border-gray-200"
              />{" "}
              <span>
                {user.firstname} {user.lastname}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSearchUser;
