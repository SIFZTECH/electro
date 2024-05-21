"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ProductCategories = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex font-serif  gap-4 justify-between py-3 px-2 border-b border-t border-gray-100 text-sm font-medium">
      <ul className="categories flex gap-4">
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
      </ul>
      <button className="btn-primary">View on website</button>
    </div>
  );
};

export default ProductCategories;
