import moment from "moment";

const OrderDetails = ({ data }) => {
  return (
    <div>
      <div className="order__details grid md:grid-cols-2 gap-x-2 gap-y-1 font-serif">
        <p className="">Order ID: {data.order_id}</p>
        <p className="">Order Status: {data.status}</p>
        <p className="">
          Order Dispacted: {moment(data.created_at).format("YYYY-MM-DD")}
        </p>
        <p className="">
          Pick up: {data.customer_address}, {data.city} {data.country}
        </p>
        {/* <p className="">Traking Number: 18dgydnyd74</p> */}
        <p className="">Courier: {data.courier_name}</p>
        <p className="">
          Collected Status:{" "}
          {data.status === "collected" ? (
            <span className="font-semibold text-green-400">Collected</span>
          ) : (
            <span className="font-semibold text-[#FFB500]">Not Collected</span>
          )}
        </p>
        <p className="">Customer Name: {data.customer_name}</p>
        <p className="">Address: {data.customer_address}</p>
        <p className="">City: {data.customer_city || "Not Avialable"}</p>
        <p className="">Country: {data.country || "Not Avialable"}</p>
        <p className="">
          Post Code: {data.customer_post_code || "Not Avialable"}
        </p>
        <p className="">
          Phone: {data.customer_phone_number || "Not Avialable"}
        </p>
        <p className="">Email: {data.email || "Not Found"}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
