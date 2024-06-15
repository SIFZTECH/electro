import Image from "next/image";
import Link from "next/link";
import { IoMdHeartEmpty } from "react-icons/io";

const Product = ({ id, slug, image, name, summary }) => {
  console.log(image);
  return (
    <Link
      href={`product-specifications/${slug}`}
      className="product flex flex-col gap-2 border border-gray-200 p-5 pt-3"
    >
      <Image
        src={image}
        className="self-center"
        alt={name}
        height={180}
        width={180}
      />
      <button className="flex justify-between items-center gap-3 mb-2">
        <span className="font-semibold mt-2 font-serif">{name}</span>
        <span className="icon-heart border border-gray-200 p-1 bg-gray-100">
          <IoMdHeartEmpty size="18" />
        </span>
      </button>
      <div className="line-clamp-3">{summary}</div>
    </Link>
  );
};

export default Product;
