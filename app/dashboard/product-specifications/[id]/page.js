import Image from "next/image";
import { BsPatchExclamation } from "react-icons/bs";
import ProductSpecifications from "./ProductSpecifications";

const page = () => {
  return (
    <div>
      <h1 className="heading-h1">Product Specification</h1>
      <div className="flex gap-8">
        <div className="product__image flex flex-col items-center gap-8 flex-wrap">
          <Image
            src="/Cycle1.jpg"
            alt="name"
            width={600}
            height={450}
            className="object-contain"
          />
          <div className="product__thumbnails flex gap-3">
            <Image
              src="/Cycle1.jpg"
              alt="name"
              width={100}
              className="border border-color-primary"
              height={70}
            />
            <Image
              src="/Cycle1.jpg"
              alt="name"
              width={100}
              className="border border-color-primary"
              height={70}
            />
            <Image
              src="/Cycle1.jpg"
              alt="name"
              width={100}
              className="border border-color-primary"
              height={70}
            />
            <Image
              src="/Cycle1.jpg"
              alt="name"
              width={100}
              className="border border-color-primary"
              height={70}
            />
          </div>
        </div>
        <div className="product__summary flex flex-col gap-8">
          <div className="product__name flex items-center gap-3">
            <span className="font-serif font-semibold text-xl">NCMs 3</span>
            <span className="badge bg-color-primary rounded-full px-2 text-[12px]">
              Best Seller
            </span>
          </div>
          <div className="product__colors ">
            <h3 className="font-serif mb-1">Colors</h3>
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 rounded-full ring-2 ring-offset-1 ring-color-primary bg-red-600">
                &nbsp;
              </div>
              <div className="w-6 h-6 rounded-full bg-yellow-600">&nbsp;</div>
              <div className="w-6 h-6 rounded-full bg-gray-600">&nbsp;</div>
            </div>
          </div>
          <div className="product__sizes">
            <h3 className="font-serif mb-1">Sizes</h3>
            <div className="flex items-center font-serif">
              <div className="bg-color-primary px-3 py-1 rounded-sm">42</div>
              <div className="42 px-3 py-1">34</div>
            </div>
          </div>
        </div>
      </div>
      <div className="product__details mt-12">
        <h2>Product Details</h2>
        <div className="product__introduction">
          <h2 className="bg-color-primary flex items-center justify-center gap-1 py-2 font-serif">
            <BsPatchExclamation />
            <span>Introduction</span>
          </h2>
          <p className="text-center my-3 shadow-sm pb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, ipsum
            numquam impedit quo itaque harum magnam veritatis? Eligendi, unde
            impedit. Vero reprehenderit placeat iusto temporibus dolorum nisi
            iste cumque fuga!
          </p>
        </div>
        <div className="product__features">
          <h2 className="bg-color-primary flex items-center justify-center gap-1 py-2 font-serif">
            <BsPatchExclamation />
            <span>Key Features</span>
          </h2>
          <div className="my-3 shadow-sm pb-3">
            <ul className="list-disc px-10">
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            </ul>
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

export default page;
