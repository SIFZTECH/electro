import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/app/components/ui/dialog";
import RegisterForm from "./RegisterForm";

const NewUserModal = ({ title, btn }) => {
  return (
    <Dialog className="bg-white w-[36rem]">
      <DialogTrigger className="btn-primary px-6 py-1 text-base">
        {btn}
      </DialogTrigger>
      <DialogContent className="bg-white max-w-[50rem]">
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewUserModal;
