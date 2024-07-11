"use client";

import { useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { useSearchParams } from "next/navigation";
import { useMail } from "@/app/_features/mails/useMail";
import Spinner from "@/app/components/ui/Spinner";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateMailTemplate } from "@/app/_services/apiMail";
import { useQueryClient } from "@tanstack/react-query";
import SpinnerMini from "@/app/components/ui/SpinnerMini";
import { handleValidationError } from "@/app/_hooks/useHandleValidationError";
import { SkeletonCard } from "@/app/components/ui/SkeletonCard";
import { Loader } from "../EditorLoader";

export default function EditorPage({ template_name }) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useMail(template_name);

  const mail = !isLoading && data?.data;

  const [editorContent, setEditorContent] = useState(mail?.body);

  useEffect(
    function () {
      if (data) {
        setEditorContent(mail?.body);
      }
    },
    [data]
  );

  if (isLoading) {
    return <Loader />;
  }

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const onSubmit = async () => {
    try {
      // Handle email sending logic here
      if (editorContent.length < 20) {
        return toast.error("There is no content!");
      }

      const res = await updateMailTemplate(mail.template_name, {
        subject: mail?.subject,
        mail_body: editorContent,
      });

      if (res) {
        queryClient.invalidateQueries("mail");
        toast.success(res.message);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        err?.response?.data?.message
          ? handleValidationError(err.response.data.message)
          : toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="email-editor">
      {!isError && !error && (
        <>
          <div className="bg-gray-900 text-white p-8 text-center text-2xl font-serif font-semibold">
            <h1>{mail.subject}</h1>
          </div>
          <RichTextEditor value={editorContent} onChange={handleEditorChange} />
          <div className="my-4">
            <h2 className="font-semibold">Available variables:</h2>
            <ul className="list-disc list-inside">
              {JSON.parse(mail?.available_variables)?.map((variable) => (
                <li key={variable} className="text-gray-600 text-base">
                  {variable}
                </li>
              ))}
            </ul>
          </div>

          <button
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className="btn-primary bg-[#facc15] hover:bg-color-primary text-white text-white font-bold py-2 px-4 rounded"
          >
            {isSubmitting ? <SpinnerMini /> : "Submit"}
          </button>
        </>
      )}
    </div>
  );
}
