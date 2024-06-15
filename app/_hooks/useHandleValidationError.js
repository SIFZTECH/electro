import toast from "react-hot-toast";

export function handleValidationError(errors) {
  for (const field in errors) {
    if (errors.hasOwnProperty(field)) {
      errors[field].forEach((err) => {
        console.error(`Error in ${field}: ${err}`);
        // Display error messages to the user
        toast.error(err);
      });
    }
  }
}
