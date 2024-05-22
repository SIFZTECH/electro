import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

const Modal = ({ title, btn }) => {
  return (
    <Dialog className="bg-white">
      <DialogTrigger className="btn-primary">{btn}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="mb-3 font-serif">{title}</DialogTitle>
          <form className="">
            <div className="flex items-center gap-3 flex-col text-center border-dashed border border-gray-400 p-3">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40 63.5897L40 40V44.1026"
                  stroke="#6F7787"
                  stroke-width="2.46154"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M28.718 51.2821L40 40L51.2821 51.2821"
                  stroke="#6F7787"
                  stroke-width="2.46154"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
                <path
                  d="M48.2051 63.5057C52.8419 63.1189 57.2742 61.4258 60.988 58.6227C64.7018 55.8196 67.5451 52.0214 69.1882 47.6683C70.8314 43.3151 71.2071 38.5854 70.2718 34.0275C69.3365 29.4696 67.1285 25.27 63.9038 21.9158C60.6791 18.5616 56.5698 16.19 52.0522 15.076C47.5346 13.962 42.7938 14.1512 38.3793 15.6218C33.9649 17.0923 30.0577 19.7839 27.1106 23.3844C24.1635 26.985 22.2972 31.3472 21.7282 35.9652C18.1935 36.3159 14.9287 38.0118 12.6092 40.702C10.2896 43.3922 9.09266 46.871 9.26588 50.4188C9.4391 53.9667 10.9692 57.3124 13.5398 59.7638C16.1104 62.2153 19.5248 63.585 23.0769 63.5898L31.7949 63.5898"
                  stroke="#6F7787"
                  stroke-width="2.46154"
                  stroke-miterlimit="10"
                  stroke-linecap="square"
                />
              </svg>

              <h1 className="font-serif text-lg">Drop Files Here</h1>
              <p className="text-sm text-gray-500">Supported Format: CSV</p>
              <div>
                <p className="text-gray-500 mb-3">OR</p>

                <label
                  htmlFor="stock-csv"
                  className="block text-sm font-medium font-serif leading-6 text-color-primary"
                >
                  Browse files
                </label>

                <input
                  id="stock-csv"
                  name="stock-csv"
                  type="file"
                  className="hidden"
                />
              </div>
            </div>
          </form>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <button className="mr-2">Close</button>
          </DialogClose>
          <button type="submit" className="btn-primary">
            Upload
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
