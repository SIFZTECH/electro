import Image from "next/image";
import Link from "next/link";
import { MdLibraryAdd } from "react-icons/md";
import ComparePopup from "../ui/ComparePopup";

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Product = ({
  id,
  slug,
  image,
  name,
  summary,
  isCompared,
  toggleCompare,
  navigateTo,
  setValue,
}) => {
  return (
    <div className="product flex flex-col justify-between gap-2 border border-gray-200 p-5 pt-3">
      <div className="h-[180px] w-[180px] self-center relative">
        <Image
          loader={imageLoader}
          src={image}
          alt={name}
          fill
          objectFit="contain"
        />
      </div>
      <Link
        href={navigateTo ? `/${navigateTo}/${slug}` : `/product/${slug}`}
        className="flex justify-between items-center gap-3 mb-2 text-start hover:underline"
      >
        <span className="font-semibold mt-2 font-serif">{name}</span>
      </Link>
      <ComparePopup
        productName={name}
        isCompared={isCompared}
        toggleCompare={toggleCompare}
        setValue={setValue}
      />
      {/* <button
        disabled={isCompared}
        onClick={(e) => {
          e.preventDefault();
          toggleCompare();
        }}
        className={`flex justify-between items-center btn-primary bg-[#f1f3f5] text-color-primary`}
      >
        <span>Add To Compare</span>
        <span className="icon-heart border border-gray-200 p-1">
          {isCompared ? <MdLibraryAdd size="18" /> : <MdLibraryAdd size="18" />}
        </span>
      </button> */}
    </div>
  );
};

export default Product;
