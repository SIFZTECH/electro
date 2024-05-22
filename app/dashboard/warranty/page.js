import Link from "next/link";
import WarrantyProducts from "./WarrantyProducts";
import Stats from "./WarrantyStats";

const page = () => {
  return (
    <div>
      <h1 className="heading-h1 my-6">SEB Customer Warranty Registration</h1>
      <Stats
        title="Month to Warranty Registrations"
        value={452}
        percentage={0.03}
      />
      <div className="w-full flex justify-end">
        <Link href="warranty/registration" className="btn-primary my-6 mb-14">
          Add New Warranty
        </Link>
      </div>

      <WarrantyProducts />
    </div>
  );
};

export default page;
