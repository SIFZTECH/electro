"use client";

import { useResource } from "@/app/_features/dealer-resources/useResource";
import NotFoundData from "@/app/components/ui/NotFoundData";
import Spinner from "@/app/components/ui/Spinner";
import UploadFileModal from "./UploadFile";
import Image from "next/image";
import { BASE_URL_IMAGE } from "@/app/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import DeleteFile from "./DeleteFile";
import DeleteFolder from "./DeleteFolder";

const FolderPage = ({ folder_id }) => {
  const { data, isLoading, isError, error } = useResource(Number(folder_id));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex gap-2 w-full justify-end mb-8">
        <DeleteFolder folder_id={folder_id} />
        <UploadFileModal folder_id={folder_id} />
      </div>
      {!isLoading &&
      !isError &&
      (!data?.data?.files || data?.data?.files?.length === 0) ? (
        <NotFoundData message="There is no files belongs to that folder!" />
      ) : (
        <div className="flex flex-wrap gap-8">
          {data?.data.files.map((file, i) => (
            <Dialog key={i + 1}>
              <DialogTrigger className="h-[200px]">
                <div className="border border-gray-200 shadow-sm flex items-center justify-center cursor-pointer h-full">
                  <Image
                    src={`${BASE_URL_IMAGE}${file}`}
                    alt={`Media ${i + 1}`}
                    width={200}
                    height={200}
                    className="p-2"
                  />
                </div>
              </DialogTrigger>
              <DialogContent>
                <Image
                  src={`${BASE_URL_IMAGE}${file}`}
                  alt={`Media ${i + 1}`}
                  width={1000}
                  height={800}
                />
                <DeleteFile file_path={file} folder_id={folder_id} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderPage;
