"use client";

import { BsPatchExclamation } from "react-icons/bs";
import ProductSpecifications from "./ProductSpecifications";
import ProductTop from "./ProductTop";
import { useProduct } from "@/app/_features/products/useProduct";

const Product = ({ params }) => {
  const { isLoading, product, error } = useProduct(params.slug);
  console.log(product);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1 className="heading-h1 my-4 mb-8">Product Specifications</h1>
      <ProductTop />
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
              ipsum numquam impedit quo itaque harum magnam veritatis? Eligendi,
              unde impedit. Vero reprehenderit placeat iusto temporibus dolorum
              nisi iste cumque fuga!
            </p>
          </div>
          <div className="product__features">
            <h2 className="bg-color-primary flex items-center justify-center gap-1 py-2 font-serif">
              <BsPatchExclamation />
              <span>Key Features</span>
            </h2>
            <div className="my-3 shadow-sm pb-3">
              <ul className="md:list-disc pl-1 md:pl-10">
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </li>
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
