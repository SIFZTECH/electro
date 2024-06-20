"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";

const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ProductImage = ({ images, product_name }) => {
  const [loading, setLoading] = useState(
    images.reduce((acc, img) => {
      const imgPath = `https://electro-api.sifztech.com${img.image_path}`;
      acc[imgPath] = true;
      return acc;
    }, {})
  );

  const handleLoadingComplete = (imagePath) => {
    setLoading((prevState) => ({
      ...prevState,
      [imagePath]: false,
    }));
  };

  return (
    <Tabs
      defaultValue={`https://electro-api.sifztech.com${images[0].image_path}`}
    >
      <div className="product__image">
        {images.map((img, i) => {
          const imgPath = `https://electro-api.sifztech.com${img.image_path}`;
          return (
            <TabsContent key={i + 1} value={imgPath}>
              <div className="relative mt-4 md:mt-0">
                {loading[imgPath] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="loader"></div>
                  </div>
                )}
                <div className="h-[550px] w-[550px]">
                  <Image
                    loader={imageLoader}
                    src={imgPath}
                    alt={`Image of ${product_name}`}
                    fill
                    className="object-contain"
                    onLoadingComplete={() => handleLoadingComplete(imgPath)}
                  />
                </div>
              </div>
            </TabsContent>
          );
        })}
      </div>
      <TabsList className="product__thumbnails flex items-center justify-center gap-3 mt-6">
        {images.map((img) => {
          const imgPath = `https://electro-api.sifztech.com${img.image_path}`;
          return (
            <TabsTrigger
              value={imgPath}
              key={imgPath}
              className="border border-gray-300 data-[state='active']:ring-1 data-[state='active']:ring-color-primary"
            >
              <div className="relative">
                {loading[imgPath] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="loader"></div>
                  </div>
                )}
                <Image
                  src={imgPath}
                  alt={`Image of ${product_name}`}
                  width={90}
                  height={70}
                  className="object-contain"
                  onLoadingComplete={() => handleLoadingComplete(imgPath)}
                />
              </div>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default ProductImage;
