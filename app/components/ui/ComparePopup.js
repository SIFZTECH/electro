import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./dialog";

import { MdLibraryAdd } from "react-icons/md";
import toast from "react-hot-toast";

const ComparePopup = ({
  productName,
  isCompared,
  toggleCompare,
  setValue,
  compareList,
}) => {
  const [open, setOpen] = useState(false);

  return compareList?.length > 2 ? (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger
        disabled={isCompared}
        onClick={(e) => {
          e.preventDefault();
          toggleCompare();
          setOpen((open) => !open);
        }}
        className={`flex justify-center items-center gap-3 btn-primary bg-[#f1f3f5] text-color-primary`}
      >
        <span>Add To Compare</span>
        <span className="icon-heart p-1">
          <MdLibraryAdd size="18" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <h1 className="text-lg font-medium font-serif mb-5">
          You have {compareList.length} E-Bikes in your comparison bucket.
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => {
              setOpen((open) => !open);
              setValue("compare-bikes");
            }}
            className="btn-primary text-lg px-4"
          >
            Compare Now
          </button>
          <DialogClose className="btn-primary px-4 text-lg bg-transparent border-2 border-color-primary text-color-primary">
            Add More
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <button
      disabled={isCompared}
      onClick={(e) => {
        e.preventDefault();
        toggleCompare();
        toast.success("You have added e-bike to your product comparison!");
      }}
      className={`flex justify-center items-center gap-3 btn-primary bg-[#f1f3f5] text-color-primary`}
    >
      <span>Add To Compare</span>
      <span className="icon-heart p-1">
        <MdLibraryAdd size="18" />
      </span>
    </button>
  );
};

export default ComparePopup;
