import { useWarrantyStats } from "@/app/_features/warranties/useWarranties";
import Stat from "./Stat";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDashboardStats } from "@/app/_features/stats/useDashboardStats";

const Stats = ({ isLoading, isError, error, data }) => {
  return (
    <>
      {!isLoading && !isError && !error && data && (
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-10">
          <Stat
            title="Month to date E Bike Order"
            icon={<MdOutlineShoppingCart />}
            value={data?.data?.month_to_date_count || 0}
            percentage="0.27"
          />
          <Stat
            title="Last 30 days E-Bike Order"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1.71387L8 14.2853"
                  stroke="#fff"
                  stroke-width="1.37143"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M10.5714 3.42885C9.76269 3.06357 8.8873 2.86904 7.99998 2.85742C6.55427 2.85742 4.85713 3.42885 4.85713 5.14314C4.85713 8.57171 11.1428 6.85742 11.1428 10.286C11.1428 12.0003 9.70513 12.5586 7.99998 12.5717C6.83302 12.5767 5.67369 12.3834 4.57141 12.0003"
                  stroke="#fff"
                  stroke-width="1.37143"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
              </svg>
            }
            value={data?.data?.last_30_days_count || 0}
            percentage="0.27"
          />
          <Stat
            title="Last 12 Month E-Bike Orders"
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9937 12.8538C11.9166 11.4893 11.1383 11.0561 9.99999 10.6767C9.13028 10.387 8.89085 9.47383 8.82513 8.98926"
                  stroke="white"
                  stroke-width="1.37143"
                  stroke-miterlimit="10"
                />
                <path
                  d="M7.1743 8.98926C7.10973 9.47154 6.87487 10.3858 6.00001 10.6773C4.86173 11.0567 4.0823 11.4887 4.00516 12.8533"
                  stroke="white"
                  stroke-width="1.37143"
                  stroke-miterlimit="10"
                />
                <path
                  d="M8.00001 9.14286C6.73772 9.14286 5.71429 8.11943 5.71429 6.85714L5.71429 6.28571C5.71429 5.02343 6.73772 4 8.00001 4C9.26229 4 10.2857 5.02343 10.2857 6.28571L10.2857 6.85714C10.2857 8.11943 9.26229 9.14286 8.00001 9.14286Z"
                  stroke="white"
                  stroke-width="1.37143"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M8.00001 14.2853C11.4715 14.2853 14.2857 11.4711 14.2857 7.99958C14.2857 4.52808 11.4715 1.71387 8.00001 1.71387C4.5285 1.71387 1.71429 4.52808 1.71429 7.99958C1.71429 11.4711 4.5285 14.2853 8.00001 14.2853Z"
                  stroke="white"
                  stroke-width="1.37143"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
              </svg>
            }
            value={data?.data?.last_12_months_count[1]?.count || 0}
            percentage="0.27"
          />
        </div>
      )}
    </>
  );
};

export default Stats;
