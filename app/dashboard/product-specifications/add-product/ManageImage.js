import { BASE_URL_IMAGE } from "@/app/lib/utils";
import Image from "next/image";

const ManageImage = ({ images }) => {
  function handleClick() {}
  return (
    <div className="flex gap-2 items-start flex-wrap mt-2">
      {images.map((img, index) => (
        <>
          <Image
            key={index + 1}
            src={`${BASE_URL_IMAGE}${img.image_path}`}
            height={50}
            width={50}
            alt={`Image ${index + 1}`}
            className="border border-gray-200"
          />
          <span
            className="text-sm font-serif btn-primary bg-gray-200 cursor-pointer"
            onClick={() => handleClick}
          >
            Remove
          </span>
        </>
      ))}
    </div>
  );
};

export default ManageImage;
