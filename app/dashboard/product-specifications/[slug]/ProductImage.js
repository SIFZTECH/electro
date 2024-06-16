"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import Image from "next/image";

const ProductImage = ({ images }) => {
  return (
    <>
      <Tabs
        defaultValue={`https://electro-api.sifztech.com${images[0].image_path}`}
      >
        <div className="product__image">
          {images.map((img, i) => {
            return (
              <TabsContent
                key={i + 1}
                value={`https://electro-api.sifztech.com${img.image_path}`}
              >
                <Image
                  src={`https://electro-api.sifztech.com${img.image_path}`}
                  alt="name"
                  width={600}
                  height={450}
                  className="object-contain"
                />
              </TabsContent>
            );
          })}
        </div>
        <TabsList className="product__thumbnails flex items-center justify-center gap-3 mt-6">
          {images.map((img) => (
            <TabsTrigger
              value={`https://electro-api.sifztech.com${img.image_path}`}
              key={`https://electro-api.sifztech.com${img.image_path}`}
              className="border border-gray-300 data-[state='active']:ring-1 data-[state='active']:ring-color-primary"
            >
              <Image
                src={`https://electro-api.sifztech.com${img.image_path}`}
                alt="name"
                width={90}
                className="object-contain"
                height={70}
              />
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
};

export default ProductImage;
