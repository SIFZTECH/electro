import { useForm } from "react-hook-form";

const UploadLogo = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  return (
    <form className="">
      <label className="block text-sm font-semibold font-serif leading-6 text-gray-900">
        Upload your logo
      </label>
      <div className="mt-1">
        <input
          {...register("logo")}
          type="file"
          placeholder="Upload"
          accept="image/*"
          className="block w-full rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 shadow-sm sm:text-sm sm:leading-6 file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-color-primary file:text-white
      hover:file:bg-color-primary/70"
        />
      </div>
    </form>
  );
};

export default UploadLogo;
