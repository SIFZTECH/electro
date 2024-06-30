import Image from "next/image";
import Link from "next/link";
import { CiSquarePlus, CiSquareCheck } from "react-icons/ci";

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
}) => {
  return (
    <Link
      href={navigateTo ? `/${navigateTo}/${slug}` : `/${slug}`}
      className="product flex flex-col gap-2 border border-gray-200 p-5 pt-3"
    >
      <div className="h-[180px] w-[180px] self-center relative">
        <Image
          loader={imageLoader}
          src={image}
          alt={name}
          fill
          objectFit="contain"
        />
      </div>
      <button
        className="flex justify-between items-center gap-3 mb-2 text-start"
        onClick={(e) => {
          e.preventDefault();
          toggleCompare();
        }}
      >
        <span className="font-semibold mt-2 font-serif line-clamp-2">
          {name}
        </span>
        <span className="icon-heart border border-gray-200 p-1 bg-gray-100">
          {isCompared ? (
            <CiSquareCheck size="18" />
          ) : (
            <CiSquarePlus size="18" />
          )}
        </span>
      </button>
      <div className="line-clamp-3">{summary}</div>
    </Link>
  );
};

export default Product;