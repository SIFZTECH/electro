"use client";

import Link from "next/link";
import DownloadFile from "./DownloadFile";
import UploadProduct from "./UploadProduct";

const ProductCategories = () => {
  return (
    <div className="flex flex-wrap font-serif gap-4 sm:justify-between py-3 px-2 border-b border-t border-gray-100 text-sm font-medium">
      {/* <ul className="categories flex gap-4">
        <li className="hover:text-color-primary text-color-primary">
          <Link href="#">All E-Bikes</Link>
        </li>
        <li className="hover:text-color-primary">
          <Link href="#">E-Mountain Bike</Link>
        </li>
        <li className="hover:text-color-primary">
          <Link href="#">E-Trekking</Link>
        </li>
        <li className="hover:text-color-primary">
          <Link href="#">E-City</Link>
        </li>
        <li className="hover:text-color-primary">
          <Link href="#">E-Folding</Link>
        </li>
      </ul> */}

      <UploadProduct />
      <DownloadFile />
      <Link href="product-specifications/add-product" className="btn-primary">
        Add New Product
      </Link>
    </div>
  );
};

export default ProductCategories;
