import Image from "next/image";
import ProductSpecifications from "./ProductSpecifications";
import NotFoundData from "../ui/NotFoundData";

import { BASE_URL_IMAGE } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CompareProducts = ({ compareList, toggleCompare }) => {
  const pathname = usePathname();

  if (compareList.length === 0) {
    return <NotFoundData message="There are no products in compare!" />;
  }

  return (
    <div className="compare-products max-w-[92dvw] mx-auto sm:max-w-full">
      <h1 className="heading-h1 mb-10 mt-6">Compare Bikes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-8">
        {compareList?.map((product) => (
          <div
            key={product.id}
            className="product flex flex-col gap-2 border border-gray-200 p-5 pt-3"
          >
            <div className="h-[180px] w-[180px] self-center relative">
              <Image
                src={
                  product?.images[0]?.image_path.startsWith(
                    "https://www.leoncycle.com.au"
                  )
                    ? product?.images[0]?.image_path
                    : `${BASE_URL_IMAGE}${product?.images[0]?.image_path}`
                }
                alt={product.name}
                fill
                objectFit="contain"
              />
            </div>
            <Link
              href={
                pathname.startsWith("/dashboard")
                  ? `${pathname}/${product.slug}`
                  : `/product/${product.slug}`
              }
              className="flex justify-between items-center gap-3 mb-2 text-start hover:underline"
            >
              <span className="font-semibold mt-2 font-serif">
                {product.name}
              </span>
            </Link>
            <div className="flex-1 flex justify-start items-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleCompare(product);
                }}
                className={`btn-primary bg-[#f1f3f5] text-color-primary py-2`}
              >
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <ProductSpecifications specification={compareList} />
    </div>
  );
};

export default CompareProducts;
