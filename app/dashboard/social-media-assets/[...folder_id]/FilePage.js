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
import { usePathname } from "next/navigation";

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
  const pathName = usePathname();
  const { data, isLoading, isError, error } = useSocialMediaAsset(folder_id);

  const { isAdmin } = useUser();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <BreadcrumbN folderPath={pathName} />
        {!isLoading && !isError && data?.data && isAdmin && (
          <div className="flex-1 flex flex-wrap gap-2 w-full justify-end mb-8">
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

      <h1 className="font-serif text-2xl mb-6 text-color-primary font-semibold">
        {data?.data?.folder_name}
      </h1>

      {!isLoading && isError && error && (
        <NotFoundData message="There is no files with that ID" />
      )}
      {!isLoading && !isError && !error && data && (
        <div className="flex items-start flex-col gap-10">
          {data?.data?.child_folders.length > 0 && (
            <div className="flex flex-col mt-3">
              <h1 className="font-serif text-xl mb-3 font-semibold">
                Sub-Folders
              </h1>

              <div className="flex gap-8 flex-wrap">
                {data?.data?.child_folders?.map((item) => (
                  <Link
                    href={`/dashboard/social-media-assets/${item.id}`}
                    key={item.id}
                    className="folder flex flex-col items-center flex-wrap"
                  >
                    <Image
                      src="/icons8-folder.svg"
                      height={100}
                      width={100}
                      alt="Icon of"
                    />
                    <span className="text-sm font-medium">
                      {item.folder_name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {data?.data?.files?.length === 0 || !data?.data?.files ? (
            <div className="flex-[100%]">
              <NotFoundData message="There is no files belongs to that folder" />
            </div>
          ) : (
            <div className="flex gap-2 flex-col mt-3">
              <h1 className="font-serif text-xl mb-3 font-semibold">Files</h1>
              <div className="flex gap-8 flex-wrap">
                {data?.data?.files?.map((file, i) => (
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
                            <GrDocumentText
                              size={100}
                              className="file-preview"
                            />
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
          )}
        </div>
      )}
    </div>
  );
};

export default FolderPage;