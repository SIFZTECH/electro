import { updateOrderStatus } from "@/app/_services/apiOrders";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import UpdateStatus from "./UpdateStatus";
import DeleteOrder from "./DeleteOrder";
import Link from "next/link";

const DownloadDocket = ({ id, status }) => {
  return (
    <div className="mt-12">
      <h2 className="font-serif text-lg">
        Please download the delivery and ask customer to sign
      </h2>
      <div className="flex items-center gap-3 mt-3">
        <button className="btn-primary">Download Docket</button>
        <Link href="/dashboard/click-and-collect/email" className="btn-primary">
          Send Email
        </Link>

        <UpdateStatus id={id} status={status} />
        <DeleteOrder id={id} />
        {/* <button type="submit" className="btn-primary">
            {isSubmitting ? <SpinnerMini /> : "Collected"}{" "}
          </button> */}
      </div>
    </div>
  );
};

export default DownloadDocket;
