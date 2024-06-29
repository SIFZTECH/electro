import Image from "next/image";
import ProductSpecifications from "./ProductSpecifications";
import NotFoundData from "../ui/NotFoundData";
import { CiSquareMinus } from "react-icons/ci";

const CompareProducts = ({ compareList, toggleCompare }) => {
  if (compareList.length === 0) {
    return <NotFoundData message="There are no products in compare!" />;
  }

  return (
    <div className="compare-products">
      <h1 className="heading-h1 mb-10 mt-6">Compare Bikes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-8">
        {compareList.map((product) => (
          <div
            key={product.id}
            className="product flex flex-col gap-2 border border-gray-200 p-5 pt-3"
          >
            <div className="h-[180px] w-[180px] self-center relative">
              <Image
                src={`https://electro-api.sifztech.com/${product?.images[0]?.image_path}`}
                alt={product.name}
                fill
                objectFit="contain"
              />
            </div>
            <button
              className="flex justify-between items-center gap-3 mb-2 text-start"
              onClick={() => toggleCompare(product)}
            >
              <span className="font-semibold mt-2 font-serif line-clamp-2">
                {product.name}
              </span>
              <span className="icon-heart border border-gray-200 p-1 bg-gray-100">
                <CiSquareMinus size="18" />
              </span>
            </button>
            <div className="line-clamp-3">{product.introduction}</div>
          </div>
        ))}
      </div>
      <ProductSpecifications specification={compareList} />
    </div>
  );
};

export default CompareProducts;
