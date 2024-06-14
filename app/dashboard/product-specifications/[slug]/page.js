"use client";

import { BsPatchExclamation } from "react-icons/bs";
import ProductSpecifications from "./ProductSpecifications";
import ProductTop from "./ProductTop";
import { useProduct } from "@/app/_features/products/useProduct";
import Spinner from "@/app/components/ui/Spinner";
import DeleteProduct from "./DeleteProduct";

const Product = ({ params }) => {
  const { isLoading, product, error, isError } = useProduct(params.slug);

  if (isLoading) return <Spinner />;

  const keyFeatures = product.key_features.split(",");

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="heading-h1 my-4 mb-8">Product Specifications</h1>
        <div className="flex gap-3">
          <button className="btn-primary">Edit</button>
          <DeleteProduct productId={product.id} />
        </div>
      </div>
      <ProductTop product={product} />
      <div className="product__details mt-12">
        <div>
          <h2 className="heading-h1 my-3 text-2xl mt-6 text-center">
            Product Details
          </h2>
          <div className="product__introduction">
            <h2 className="bg-color-primary flex items-center justify-center gap-1 py-2 font-serif">
              <BsPatchExclamation />
              <span>Introduction</span>
            </h2>
            <p className="text-center my-3 shadow-sm pb-3">
              {product.introduction}
            </p>
          </div>
          <div className="product__features">
            <h2 className="bg-color-primary flex items-center justify-center gap-1 py-2 font-serif">
              <BsPatchExclamation />
              <span>Key Features</span>
            </h2>
            <div className="my-3 shadow-sm pb-3">
              <ul className="md:list-disc pl-1 md:pl-10">
                {keyFeatures.map((feature, i) => (
                  <li key={i + 1}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="product__specifications">
          <h2 className="bg-color-primary flex items-center justify-center gap-1 py-2 font-serif">
            <BsPatchExclamation />
            <span>Specifications</span>
          </h2>
          <ProductSpecifications />
        </div>
      </div>
    </div>
  );
};

export default Product;
