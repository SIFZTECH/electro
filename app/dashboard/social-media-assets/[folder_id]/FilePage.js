"use client";

import { useResource } from "@/app/_features/dealer-resources/useResource";
import NotFoundData from "@/app/components/ui/NotFoundData";
import Spinner from "@/app/components/ui/Spinner";
import UploadFileModal from "../UploadFile";
import Image from "next/image";
import { BASE_URL_IMAGE } from "@/app/lib/utils";
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
import { useState } from "react";
import { useSocialMediaAsset } from "@/app/_features/social_media/useMedia";

// Utility functions to check file types
const isImage = (file) => {
  return file.match(/\.(jpeg|jpg|gif|png|webp)$/);
};

const isPDF = (file) => {
  return file.match(/\.pdf$/);
};

const isText = (file) => {
  return file.match(/\.(txt|doc|docx)$/);
};

const isVideo = (file) => {
  return file.match(/\.(mp4|mkv|webm|avi)$/);
};

const isAudio = (file) => {
  return file.match(/\.(mp3|wav|ogg)$/);
};

const isSpreadsheet = (file) => {
  return file.match(/\.(xls|xlsx|csv)$/);
};

const FolderPage = ({ folder_id }) => {
  const { data, isLoading, isError, error } = useSocialMediaAsset(
    Number(folder_id)
  );

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
        <NotFoundData message="There are no files in this folder!" />
      ) : (
        <div className="flex flex-wrap gap-8">
          {data?.data.files.map((file, i) => (
            <Dialog key={i + 1}>
              <DialogTrigger>
                <div className="border border-gray-200 shadow-sm flex items-center justify-center cursor-pointer h-full">
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
                      <p className="font-serif">PDF Document</p>
                    </div>
                  )}
                  {isText(file) && (
                    <div className="p-2 flex flex-col gap-2 items-center">
                      <GrDocumentText size={100} className="file-preview" />
                      <p className="font-serif">Text Document</p>
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
                      <p className="font-serif">Video File</p>
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
                      <p className="font-serif">Audio File</p>
                    </div>
                  )}
                  {isSpreadsheet(file) && (
                    <div className="p-2 flex flex-col gap-2 items-center">
                      <p className="font-serif">Spreadsheet</p>
                    </div>
                  )}
                  {!isImage(file) &&
                    !isPDF(file) &&
                    !isText(file) &&
                    !isVideo(file) &&
                    !isAudio(file) &&
                    !isSpreadsheet(file) && (
                      <div className="p-2 flex flex-col gap-2 items-center">
                        <AiFillFileUnknown size={100} />
                        <p className="font-serif">Unknown File Type</p>
                      </div>
                    )}
                </div>
              </DialogTrigger>
              <DialogContent className=" pt-9">
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
                    <source src={`${BASE_URL_IMAGE}${file}`} type="video/mp4" />
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
                  <a
                    href={`${BASE_URL_IMAGE}${file}`}
                    download
                    className="btn-primary"
                  >
                    Download
                  </a>
                  <DeleteFile file_path={file} folder_id={folder_id} />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderPage;
