"use client";

import NotFoundData from "@/app/components/ui/NotFoundData";
import Spinner from "@/app/components/ui/Spinner";
import Image from "next/image";
import { BASE_URL, BASE_URL_IMAGE } from "@/app/lib/utils";
import { VscFilePdf } from "react-icons/vsc";
import { GrDocumentText } from "react-icons/gr";
import { AiFillFileUnknown } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import DeleteFile from "./DeleteFile";
import DeleteFolder from "./DeleteFolder";
import { useSocialMediaAsset } from "@/app/_features/social_media/useMedia";
import UpdateAssetsFolder from "./UpdateAssetsFolder";
import DownloadButton from "@/app/components/ui/DownloadFile";
import { useUser } from "@/app/_features/authentication/useUser";
import UploadFileModal from "@/app/components/ui/UploadFileModal";
import { CreateNewMediaFile } from "@/app/_services/apiMedia";
import Link from "next/link";
import CreateNewSubFolder from "./CreateNewSubFolder";
import BreadcrumbN from "../../dealer-resources/[...folder_id]/BreadcrumbN";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Search from "../../dealer-resources/[...folder_id]/Search";

// Utility functions to check file types
const isImage = (file) => file.match(/\.(jpeg|jpg|gif|png|webp)$/);
const isPDF = (file) => file.match(/\.pdf$/);
const isText = (file) => file.match(/\.(txt|doc|docx)$/);
const isVideo = (file) => file.match(/\.(mp4|mkv|webm|avi)$/);
const isAudio = (file) => file.match(/\.(mp3|wav|ogg)$/);
const isSpreadsheet = (file) => file.match(/\.(xls|xlsx|csv)$/);

const FolderPage = ({ folder_id }) => {
  const [originalFolderData, setOriginalFolderData] = useState(null);
  const [folderData, setFolderData] = useState(null);
  const router = useRouter();
  const pathName = usePathname();
  const { data, isLoading, isError, error } = useSocialMediaAsset(folder_id);

  const { isAdmin } = useUser();

  useEffect(() => {
    if (!isLoading && data) {
      setFolderData(data.data);
      setOriginalFolderData(data.data);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <BreadcrumbN folderPath={pathName} data={data?.data} />
        {!isLoading && !isError && data?.data && isAdmin && (
          <div className="flex-1 flex flex-wrap gap-2 w-full justify-end mb-2">
            <CreateNewSubFolder
              parent_folder_id={folder_id}
              folderData={data?.data}
            />
            <UpdateAssetsFolder folder_id={folder_id} folderData={data?.data} />

            <UploadFileModal
              folder_id={folder_id}
              sendTo={CreateNewMediaFile}
              queryKey="media-folder"
            />
            <DeleteFolder folder_id={folder_id} />
          </div>
        )}
      </div>

      <button
        onClick={() => router.back(-1)}
        className="btn-primary bg-color-primary_shade-4 text-color-primary mb-3"
      >
        Go Back
      </button>

      {/* <h1 className="font-serif text-2xl mb-6 font-semibold bg-slate-900 text-white text-center py-3">
        {data?.data?.folder_name}
      </h1> */}
      <Search
        originalFolderData={originalFolderData}
        setFolderData={setFolderData}
      />

      {!isLoading && isError && error && (
        <NotFoundData message="There is no files with that ID" />
      )}
      {!isLoading &&
      !isError &&
      !error &&
      data &&
      (folderData?.files?.length > 0 ||
        folderData?.child_folders?.length > 0) ? (
        <div className="flex items-start flex-col gap-10">
          {folderData?.child_folders.length > 0 && (
            <div className="flex flex-col mt-3">
              <div className="flex gap-12 flex-wrap">
                {folderData?.child_folders?.map((item) => (
                  <Link
                    href={`${pathName}/${item.id}`}
                    key={item.id}
                    className="folder flex flex-col items-center flex-wrap"
                  >
                    <Image
                      src="/icons8-folder.svg"
                      height={100}
                      width={100}
                      alt="Folder Icon"
                    />
                    <span className="text-sm font-medium">
                      {item.folder_name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 flex-col mt-3">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
              {folderData?.files?.map((file, i) => (
                <Dialog key={i + 1}>
                  <DialogTrigger>
                    <div className="border border-gray-200 shadow-sm flex flex-col items-center justify-center cursor-pointer h-full p-2">
                      {isImage(file) && (
                        <Image
                          src={`${BASE_URL_IMAGE}${file}`}
                          alt={`Resources ${i + 1}`}
                          width={150}
                          height={150}
                          className="p-2"
                        />
                      )}
                      {isPDF(file) && (
                        <div className="p-2 flex flex-col gap-2 items-center">
                          <VscFilePdf size={100} />
                        </div>
                      )}
                      {isText(file) && (
                        <div className="p-2 flex flex-col gap-2 items-center">
                          <GrDocumentText size={100} className="file-preview" />
                        </div>
                      )}
                      {isVideo(file) && (
                        <div className="p-2 flex flex-col gap-2 items-center">
                          <video width={150} height={150} controls>
                            <source
                              src={`${BASE_URL_IMAGE}${file}`}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}
                      {isAudio(file) && (
                        <div className="p-2 flex flex-col gap-2 items-center">
                          <audio controls>
                            <source
                              src={`${BASE_URL_IMAGE}${file}`}
                              type="audio/mpeg"
                            />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                      {isSpreadsheet(file) && (
                        <div className="p-2 flex flex-col gap-2 items-center"></div>
                      )}
                      {!isImage(file) &&
                        !isPDF(file) &&
                        !isText(file) &&
                        !isVideo(file) &&
                        !isAudio(file) &&
                        !isSpreadsheet(file) && (
                          <div className="p-2 flex flex-col gap-2 items-center">
                            <AiFillFileUnknown size={100} />
                          </div>
                        )}
                      <p className="text-center text-sm font-medium mt-2 break-words text-ellipsis w-full">
                        {file.split("/").at(-1)}
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl pt-9">
                    {isImage(file) && (
                      <Image
                        src={`${BASE_URL_IMAGE}${file}`}
                        alt={`Media ${i + 1}`}
                        width={1000}
                        height={800}
                      />
                    )}
                    {isPDF(file) && (
                      <iframe
                        src={`https://docs.google.com/gview?url=${BASE_URL_IMAGE}${file}&embedded=true`}
                        width="100%"
                        height="600px"
                        frameBorder="0"
                      />
                    )}
                    {isText(file) && (
                      <iframe
                        src={`https://docs.google.com/gview?url=${BASE_URL_IMAGE}${file}&embedded=true`}
                        width="100%"
                        height="600px"
                        frameBorder="0"
                      />
                    )}
                    {isVideo(file) && (
                      <video width="100%" height="600px" controls>
                        <source
                          src={`${BASE_URL_IMAGE}${file}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {isAudio(file) && (
                      <audio controls>
                        <source
                          src={`${BASE_URL_IMAGE}${file}`}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                    {isSpreadsheet(file) && (
                      <iframe
                        src={`https://docs.google.com/gview?url=${BASE_URL_IMAGE}${file}&embedded=true`}
                        width="100%"
                        height="600px"
                        frameBorder="0"
                      />
                    )}
                    {!isImage(file) &&
                      !isPDF(file) &&
                      !isText(file) &&
                      !isVideo(file) &&
                      !isAudio(file) &&
                      !isSpreadsheet(file) && (
                        <div>
                          <p>Cannot display this file type.</p>
                        </div>
                      )}
                    <div className="flex gap-4 items-center justify-end mt-4">
                      <DownloadButton
                        fileUrl={`${BASE_URL}/download?path=${file}`}
                      />
                      <DeleteFile file_path={file} folder_id={folder_id} />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NotFoundData message="There is files belongs to that folder!" />
      )}
    </div>
  );
};

export default FolderPage;
