import { Switch } from "@/components/ui/switch";

const dummyData = [
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 1",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 2",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 3",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 4",
  },
];

const PermissionTable = () => {
  return (
    <table className="mt-10 recentOrders">
      <thead>
        <tr className="text-center">
          <th scope="col" className="2xl:w-[18rem]">
            Dealer Name
          </th>
          <th scope="col" className="text-center">
            Click and Collect
          </th>
          <th scope="col" className="text-center">
            Stock in Store
          </th>
          <th scope="col" className="text-center">
            Social Media Assets
          </th>
          <th scope="col" className="text-center">
            Dealer Resources
          </th>
          <th scope="col" className="text-center">
            Warranty
          </th>
          <th scope="col" className="text-center">
            Product Specifications
          </th>
          <th scope="col" className="text-center">
            Promotional Calendar
          </th>
          <th scope="col" className="text-center">
            Promotional Calendar
          </th>
          <th scope="col" className="text-center">
            Active
          </th>
        </tr>
      </thead>
      <tbody>
        {dummyData.map((data, i) => {
          return (
            <tr key={i + 1}>
              <td data-label="Dealer Name">{data.dealerName}</td>
              <td data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </td>
              <td data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </td>
              <td data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </td>
              <td data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </td>
              <td data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </td>
              <td data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </td>
              <td data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </td>
              <td data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <input type="checkbox" className="" />
                </div>
              </td>
              <td data-label="Click and Collect">
                <div className="flex items-center justify-end lg:justify-center">
                  <Switch />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default PermissionTable;
