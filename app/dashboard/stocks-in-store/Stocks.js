const dummyData = [
  {
    id: "dyyds735363",
    products: "NTM T3s",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735364",
    products: "NTM Tcs",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735365",
    products: "NTM Tcs",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735366",
    products: "NTM Tcs",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735367",
    products: "OLD Tcs",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735368",
    products: "SST Tcs",
    myEBikes: "50",
    clicks: "50",
  },
  {
    id: "dyyds735369",
    products: "NTM 4ST",
    myEBikes: "50",
    clicks: "50",
  },
];

const Stocks = () => {
  return (
    <table className="mt-10 recentOrders">
      <thead>
        <tr>
          <th scope="col">Products</th>
          <th scope="col">E Bikes</th>
          <th scope="col">Clicks</th>
        </tr>
      </thead>
      <tbody>
        {dummyData.map((data, i) => {
          return (
            <tr key={i + 1}>
              <td data-label="Products">{data.products}</td>
              <td data-label="MyEBikes">{data.myEBikes}</td>
              <td data-label="Clicks">{data.clicks}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Stocks;
