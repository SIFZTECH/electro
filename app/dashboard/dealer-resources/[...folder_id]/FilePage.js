"use client";

import { useResource } from "@/app/_features/dealer-resources/useResource";
import NotFoundData from "@/app/components/ui/NotFoundData";
import Spinner from "@/app/components/ui/Spinner";
import UploadFileModal from "@/app/components/ui/UploadFileModal";
import Image from "next/image";
import { BASE_URL, BASE_URL_IMAGE } from "@/app/lib/utils";
import { VscFilePdf } from "react-icons/vsc";
import { GrDocumentText } from "react-icons/gr";
import { AiFillFileUnknown } from "react-icons/ai";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  InstapaperShareButton,
  InstapaperIcon,
} from "react-share";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import DeleteFile from "./DeleteFile";
import DeleteFolder from "./DeleteFolder";
import Link from "next/link";
import UpdateFolder from "./UpdateFolder";
import DownloadButton from "@/app/components/ui/DownloadFile";
import { useUser } from "@/app/_features/authentication/useUser";
import { CreateNewFile } from "@/app/_services/apiResources";
import CreateNewSubFolder from "./CreateNewSubFolder";
import BreadcrumbN from "./BreadcrumbN";
import { usePathname, useRouter } from "next/navigation";
import Search from "./Search";
import { useEffect, useState } from "react";
import DeleteFiles from "./DeleteFiles";
import DownloadFiles from "./DownloadFiles";
import toast from "react-hot-toast";

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
  const [selectedItems, setSelectedItems] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const pathName = usePathname();
  const router = useRouter();
  const { data, isLoading, isError, error } = useResource(Number(folder_id));
  const { isAdmin } = useUser();

  useEffect(() => {
    if (!isLoading && data) {
      setFolderData(data.data);
      setOriginalFolderData(data.data);
    }
  }, [data, isLoading]);

  const handleItemSelection = (itemId, type, doubleClick = false) => {
    if (doubleClick) {
      setSelectedFile(itemId);
      setOpen(true);
    } else {
      setSelectedItems((prevSelected) => {
        const newSelected = { ...prevSelected };
        if (newSelected[itemId]) {
          delete newSelected[itemId];
        } else {
          newSelected[itemId] = type;
        }
        return newSelected;
      });
    }
  };

  const handleShare = async (file) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: file,
          url: `${BASE_URL_IMAGE}${file}`,
        });
        toast.success("Shared file successfully");
      } catch (err) {
        toast.error("Failed to share file");
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex justify-between flex-wrap">
        <BreadcrumbN folderPath={pathName} />

        {Object.keys(selectedItems).length > 0 ? (
          <div className="flex gap-3 items-center mb-2">
            <DeleteFiles
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              folder_id={folder_id}
            />
            <DownloadFiles
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          </div>
        ) : (
          !isLoading &&
          !isError &&
          data?.data &&
          isAdmin && (
            <div className="flex-1 flex flex-wrap gap-2 w-full justify-end mb-2">
              <CreateNewSubFolder
                parent_folder_id={folder_id}
                folderData={data?.data}
              />
              <UpdateFolder folder_id={folder_id} folderData={data?.data} />
              <UploadFileModal
                folder_id={folder_id}
                sendTo={CreateNewFile}
                queryKey="folder"
              />
              <DeleteFolder folder_id={folder_id} />
            </div>
          )
        )}
      </div>

      <button
        onClick={() => router.back(-1)}
        className="btn-primary bg-color-primary_shade-4 text-color-primary mb-5"
      >
        Go Back
      </button>

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
          {data?.data?.child_folders.length > 0 && (
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
                <Dialog
                  key={i + 1}
                  open={open && selectedFile === file}
                  onOpenChange={() => setOpen(false)}
                >
                  <DialogTrigger>
                    <div
                      className={`border border-gray-200 shadow-sm flex flex-col items-center justify-center cursor-pointer relative h-full p-2 ${
                        selectedItems[file] ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleItemSelection(file, "file")}
                      onDoubleClick={() =>
                        handleItemSelection(file, "file", true)
                      }
                    >
                      {selectedItems[file] && (
                        <svg
                          className="absolute top-0 right-0 m-2 h-5 w-5 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18.293 2.293a1 1 0 0 1 1.414 1.414l-13 13a1 1 0 0 1-1.414 0l-7-7a1 1 0 1 1 1.414-1.414L5 12.086l12.293-12.293a1 1 0 0 1 1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
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
                    <div className="flex gap-2 flex-wrap items-center justify-end mt-4">
                      <FacebookShareButton
                        url={`${BASE_URL_IMAGE}${file}`}
                        quote={file}
                        className="btn-primary"
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={`${BASE_URL_IMAGE}${file}`}
                        className="btn-primary"
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <LinkedinShareButton
                        url={`${BASE_URL_IMAGE}${file}`}
                        className="btn-primary"
                      >
                        <LinkedinIcon size={32} round />
                      </LinkedinShareButton>
                      <WhatsappShareButton
                        url={`${`${BASE_URL_IMAGE}${file}`}`}
                        className="btn-primary"
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      <InstapaperShareButton
                        url={`${`${BASE_URL_IMAGE}${file}`}`}
                        className="btn-primary"
                      >
                        <InstapaperIcon size={32} round />
                      </InstapaperShareButton>
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
        <NotFoundData message="There are no files in this folder!" />
      )}
    </div>
  );
};

export default FolderPage;
