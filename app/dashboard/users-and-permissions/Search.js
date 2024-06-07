"use client";
import toast from "react-hot-toast";
import { getAllUsers } from "@/app/_services/apiAuth";
import { searchUsers } from "@/app/_services/apiUsers";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const Search = () => {
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const page = params.get("page") ? +params.get("page") : 1;

  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting, errors },
  } = useForm();

  async function onSubmit({ query }) {
    try {
      const res = await searchUsers(query);
      if (res.data) {
        queryClient.setQueryData(["users", page], res);
        resetField("query");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="flex items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 me-2 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          {...register("query")}
          className="bg-gray-100 text-gray-900 text-sm  focus:ring-yellow-400 focus:ring-1 focus:outline-none focus:border-yellow-500 block w-full ps-10 p-2.5"
          placeholder="Search..."
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-6 ms-2 text-sm font-serif bg-color-primary   hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-300"
      >
        <svg
          className="w-4 h-4 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        {isSubmitting ? <SpinnerMini /> : "Search"}
      </button>
    </form>
  );
};

export default Search;
