"use client";

import ProductTop from "./ProductTop";
import { useProduct } from "@/app/_features/products/useProduct";
import Spinner from "@/app/components/ui/Spinner";
import DeleteProduct from "./DeleteProduct";
import EditProduct from "./UpdateProduct";
import useCheckPermission from "@/app/_hooks/usePermission";
import featuresWithKeyAndIcon from "@/app/lib/features.json";

import Image from "next/image";
import ProductSpecifications from "./ProductSpecifications";

const ProductDetailsPage = ({ params }) => {
  const isProductUpdatePermission = useCheckPermission("product_update");
  const isProductDeletePermission = useCheckPermission("product_delete");
  const { isLoading, product, error, isError } = useProduct(params.slug);
  const allFeatures = featuresWithKeyAndIcon.map((feature) => feature.key);

  if (isLoading) return <Spinner />;
  if (isError && error) return;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="heading-h1 my-4 mb-8">Product Specifications</h1>

        <div className="flex gap-3">
          {isProductUpdatePermission && <EditProduct product={product} />}
          {isProductDeletePermission && (
            <DeleteProduct productId={product?.id} />
          )}
        </div>
      </div>
      <ProductTop product={product} />
      <div className="product__details mt-12">
        <div>
          <h2 className="heading-h1 my-3 text-2xl mt-6 text-center">
            Product Details
          </h2>
          <div className="product__introduction">
            <h2 className="bg-color-primary text-white flex items-center justify-center gap-1 py-2 font-serif">
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
            <h2 className="bg-color-primary text-white flex items-center justify-center gap-1 py-2 font-serif">
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
        {product.compare && (
          <div className="product__specifications">
            <h2 className="bg-color-primary text-white flex items-center justify-center gap-1 py-2 font-serif">
              <Image
                src="/Specs.png"
                height={25}
                width={25}
                alt="Specifications"
              />
              <span>Specifications</span>
            </h2>
            <ProductSpecifications specification={product?.compare} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
