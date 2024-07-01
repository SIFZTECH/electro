"use client";

import ProductTop from "./ProductTop";
import { useProductForPublic } from "@/app/_features/products/useProduct";
import Spinner from "@/app/components/ui/Spinner";

import Image from "next/image";
import Link from "next/link";
import ProductSpecifications from "../dashboard/product-specifications/[slug]/ProductSpecifications";

const ProductDetailsPage = ({ params }) => {
  const { isLoading, product, error, isError } = useProductForPublic(
    params.slug
  );

  if (isLoading) return <Spinner />;
  if (isError && error) return;

  return (
    <div className="px-6 py-4 w-full">
      <Link className="btn-primary" href="/">
        Go Back
      </Link>
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="heading-h1 my-4 mb-8">Product Specifications</h1>
      </div>
      <ProductTop product={product} />
      <div className="product__details mt-12">
        <div>
          <h2 className="heading-h1 my-3 text-2xl mt-6 text-center">
            Product Details
          </h2>
          <div className="product__introduction">
            <h2 className="bg-color-primary flex items-center justify-center gap-1 py-2 font-serif">
              <Image
                src="/Info.png"
                height={25}
                width={25}
                alt="Key Features"
              />
              <span>Introduction</span>
            </h2>
            <p className="text-center my-3 shadow-sm pb-3">
              {product.introduction}
            </p>
          </div>

          <div className="product__features">
            <h2 className="bg-color-primary flex items-center justify-center gap-1 py-2 font-serif">
              <Image
                src="/key_features.png"
                height={25}
                width={25}
                alt="Key Features"
              />
              <span>Key Features</span>
            </h2>
            <ProductSpecifications product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
