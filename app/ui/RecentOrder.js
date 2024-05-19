const dummyData = [
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 1",
    customerName: "Jane Smith",
    status: "New",
    deatils: "test",
    invoice: "test",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 2",
    customerName: "Jane Smith",
    status: "Prev",
    deatils: "test",
    invoice: "test",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 3",
    customerName: "Jane Smith 2",
    status: "Instrasit",
    deatils: "test",
    invoice: "test",
  },
  {
    id: "dyyds735363",
    dealerName: "E-Bike Retailer 4",
    customerName: "Jane Smith",
    status: "New",
    deatils: "#",
    invoice: "#",
  },
];

// const RecentOrder = () => {
//   return (
//     <div className="flex flex-col gap-4 mt-12 ">
//       <h1 className="heading-h1">Recent clicks and Collect Orders</h1>
//       <div className="">
//         <div className="grid grid-cols-6 bg-gray-100 font-semibold">
//           <div className="border border-gray-200 px-2 py-3">Order ID</div>
//           <div className="border border-gray-200 px-2 py-3">Dealer Name</div>
//           <div className="border border-gray-200 px-2 py-3">Customer Name</div>
//           <div className="border border-gray-200 px-2 py-3">Status</div>
//           <div className="border border-gray-200 px-2 py-3">View Details</div>
//           <div className="border border-gray-200 px-2 py-3">Invoice</div>
//         </div>
//         {dummyData.map((data) => (
//           <div className="grid grid-cols-6" key={data.id}>
//             <div className="border border-gray-200 px-2 py-3 text-wrap">
//               {data.id}
//             </div>
//             <div className="border border-gray-200 px-2 py-3">
//               {data.dealerName}
//             </div>
//             <div className="border border-gray-200 px-2 py-3">
//               {data.customerName}
//             </div>
//             <div className="border border-gray-200 px-2 py-3">
//               {data.status}
//             </div>
//             <div
//               className="border border-gray-200 px-2 py-3 flex items-center justify-center"
//               type="button"
//             >
//               <a className="btn-primary text-center" href={data.deatils}>
//                 View
//               </a>
//             </div>
//             <div
//               className="border border-gray-200 px-2 py-3 flex items-center justify-center"
//               type="button"
//             >
//               <a className="btn-primary text-center" href={data.deatils}>
//                 View
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const RecentOrder = () => {
  return (
    <table className="mt-10">
      <caption className="heading-h1">Recent clicks and Collect Orders</caption>
      <thead>
        <tr>
          <th scope="col">Order ID</th>
          <th scope="col">Dealer Name</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Status</th>
          <th scope="col">View Details</th>
          <th scope="col">Invoice</th>
        </tr>
      </thead>
      <tbody>
        {dummyData.map((data, i) => {
          return (
            <tr key={i + 1}>
              <td data-label="Order ID">{data.id}</td>
              <td data-label="Dealer Name">{data.dealerName}</td>
              <td data-label="Customer Name">{data.customerName}</td>
              <td data-label="Status">{data.status}</td>
              <td data-label="View Details" className="text-center">
                <a href="#" className="btn-primary">
                  View
                </a>
              </td>
              <td data-label="Invoice" className="text-center">
                <a href="#" className="btn-primary">
                  View
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default RecentOrder;
