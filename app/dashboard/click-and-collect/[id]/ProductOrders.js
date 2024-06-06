const dummyData = [
  {
    sku: "dyyds735363",
    name: "E-Bike Retailer 1",
    quantity: 2,
    commission: 150,
    amount: 300,
  },
  {
    sku: "d4ds735t363",
    name: "E-Bike Retailer 2",
    quantity: 1,
    commission: 150,
    amount: 999,
  },
];

const ProductOrders = () => {
  return (
    <div className="mt-12">
      <h1 className="heading-h1 mb-2 text-lg mt-4">Product On Order</h1>
      <table className="mt-10 table_modify">
        <thead>
          <tr className="font-serif">
            <th scope="col">SKU</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Commission</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((data, i) => {
            return (
              <tr key={i + 1}>
                <td data-label="SKU">{data.sku}</td>
                <td className="text-color-primary" data-label="Name">
                  {data.name}
                </td>
                <td data-label="Quantity">{data.quantity}</td>
                <td data-label="Commission">{data.commission}</td>
                <td data-label="Commission">{data.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ProductOrders;
