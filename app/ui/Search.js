const Search = () => {
  return (
    <form className="flex items-center gap-4">
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
          type="search"
          id="search"
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
        Search
      </button>
    </form>
  );
};

export default Search;
