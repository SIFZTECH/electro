import toast from "react-hot-toast";
import UpdateStatus from "./UpdateStatus";
import DeleteOrder from "./DeleteOrder";
import Link from "next/link";
import DownloadFile from "./Download-doclet";

const Actions = ({ id, status }) => {
  return (
    <div className="mt-12">
      <h2 className="font-serif text-lg">
        Please download the delivery and ask customer to sign
      </h2>
      <div className="flex items-center gap-3 mt-3">
        <DownloadFile id={id} />
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

export default Actions;
