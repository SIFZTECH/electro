import { BASE_URL_IMAGE, MEDIA_PAGE_SIZE } from "@/app/lib/utils";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import DeleteMedia from "./DeleteMedia";
import PaginationUI from "@/app/components/ui/PaginationUI";

const FolderFiles = ({ metaData, page, data }) => {
  return (
    <div>
      {/* <h1 className="heading-h1 mt-12">NCM Moscow</h1> */}
      <div className="folders flex flex-wrap gap-8  mt-12">
        {data.map((item, i) => (
          <Dialog key={i + 1}>
            <DialogTrigger className="h-[200px]">
              <div className="border border-gray-200 shadow-sm flex items-center justify-center cursor-pointer h-full">
                <Image
                  src={`${BASE_URL_IMAGE}${item}`}
                  alt={`Media ${i + 1}`}
                  width={200}
                  height={200}
                  className="p-2"
                />
              </div>
            </DialogTrigger>
            <DialogContent>
              <Image
                src={`${BASE_URL_IMAGE}${item}`}
                alt={`Media ${i + 1}`}
                width={1000}
                height={800}
              />
              <DeleteMedia item={item} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
      <PaginationUI
        data={metaData}
        page={+page}
        page_size={MEDIA_PAGE_SIZE}
        navigation="social-media-assets"
      />
    </div>
  );
};

export default FolderFiles;
