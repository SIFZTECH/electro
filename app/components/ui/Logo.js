const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="40"
        height="42"
        viewBox="0 0 40 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30.5698 18.86C35.6508 18.86 39.7698 14.741 39.7698 9.65996C39.7698 4.57894 35.6508 0.459961 30.5698 0.459961C25.4887 0.459961 21.3698 4.57894 21.3698 9.65996C21.3698 14.741 25.4887 18.86 30.5698 18.86Z"
          fill="#FFB500"
        />
        <path
          d="M30.5698 41.0201C35.6508 41.0201 39.7698 36.9011 39.7698 31.8201C39.7698 26.7391 35.6508 22.6201 30.5698 22.6201C25.4887 22.6201 21.3698 26.7391 21.3698 31.8201C21.3698 36.9011 25.4887 41.0201 30.5698 41.0201Z"
          fill="#323232"
        />
        <path
          d="M0.129761 16.14C0.129761 7.5023 7.13207 0.5 15.7698 0.5V25.34C15.7698 33.9777 8.76746 40.98 0.129761 40.98V16.14Z"
          fill="#2B2B2B"
        />
      </svg>
      <div className="flex flex-col gap-1 text-[1.35rem] font-serif font-semibold leading-5">
        <span>Leon Cycle</span>
        <span>Dealer Portal</span>
      </div>
    </div>
  );
};

export default Logo;
