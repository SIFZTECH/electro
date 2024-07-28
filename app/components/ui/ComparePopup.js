import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./dialog";

import { MdLibraryAdd } from "react-icons/md";

const ComparePopup = ({ productName, isCompared, toggleCompare, setValue }) => {
  const [open, setOpen] = useState(false);

  return (
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
          You have added{" "}
          <strong className="text-color-primary">{productName}</strong> to your
          product comparison!
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
            Continue
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComparePopup;
