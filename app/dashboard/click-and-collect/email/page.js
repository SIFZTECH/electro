"use client";
import { sendEmail } from "@/app/_services/apiOrders";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SendMail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");
  const phone = params.get("phone");
  const order_id = params.get("order_id");

  console.log(params);
  console.log(order_id);
  const {
    register,
    reset,
    formState: { isSubmitting, errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      to: email || "",
      phone: phone === "null" ? "" : phone,
    },
  });

  const watchChannel = watch("channel");

  async function onSubmit({ channel, message, phone, to, cc, subject }) {
    let formData;
    if (channel) {
      formData = { channel: "sms", message, phone };
    } else {
      formData = { channel: "email", message, to, cc, subject };
    }

    try {
      const res = await sendEmail(formData);
      if (res) {
        toast.success(res.message);
        // router.back(-1);
        reset();
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }

  return (
    <div>
      <h1 className="heading-h1">Email: {order_id}</h1>
      <form className="mt-4 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-start gap-2 flex-col">
          <label className="text-sm font-semibold font-serif leading-6 text-gray-900">
            To:
          </label>
          <input
            {...register("to", {
              required: "This is required field",
            })}
            placeholder="example@email.com"
            className="w-full lg:w-2/4 rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="email"
          />
          {errors?.to && (
            <span className="text-red-500 text-sm">{errors.to.message}</span>
          )}
        </div>

        <div className="flex items-start gap-2 flex-col">
          <label className="text-sm font-semibold font-serif leading-6 text-gray-900">
            CC:
          </label>
          <input
            {...register("cc", {
              required: "This is required field",
            })}
            placeholder="Your cc"
            className="w-full lg:w-2/4 rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="text"
          />
          {errors?.cc && (
            <span className="text-red-500 text-sm">{errors.cc.message}</span>
          )}
        </div>

        <div className="flex items-start gap-2 flex-col">
          <label className="text-sm font-semibold font-serif leading-6 text-gray-900">
            Subject:
          </label>
          <input
            {...register("subject", {
              required: "This is required field",
            })}
            placeholder="Enter your subject"
            className="w-full lg:w-2/4 rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            type="text"
          />
          {errors?.subject && (
            <span className="text-red-500 text-sm">
              {errors.subject.message}
            </span>
          )}
        </div>

        <div className="flex items-start gap-2 flex-col">
          <div className="flex gap-3 items-center">
            <label className="text-sm font-semibold font-serif leading-6 text-gray-900">
              Send SMS:
            </label>
            <input {...register("channel")} type="checkbox" />
          </div>
          {watchChannel && (
            <input
              {...register("phone", {
                required: "This is required field",
              })}
              className="w-full lg:w-2/4 rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
              type="tel"
              placeholder={"Enter your phone"}
            />
          )}
          {errors?.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </div>
        <div className="flex">
          <textarea
            {...register("message", {
              required: "This is required field",
            })}
            placeholder="Message...."
            className="w-full lg:w-[60%] rounded-md border bg-gray-100 border-gray-300 py-1.5 px-3 text-gray-900 shadow-sm px-3placeholder:text-gray-400 sm:text-sm sm:leading-6"
            rows={15}
          />
          {errors?.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>
        <button className="btn-primary text-lg">
          {isSubmitting ? <SpinnerMini /> : "Send"}
        </button>
      </form>
    </div>
  );
};

export default SendMail;
