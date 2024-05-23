"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import Image from "next/image";

const images = ["/cycle-1.jpg", "/cycle-2.jpg", "/cycle-3.jpg", "/cycle-4.jpg"];

const ProductImage = () => {
  return (
    <>
      <Tabs>
        <div className="lg:h-[500px] product__image">
          <TabsContent defaultValue={images[0]}>
            <Image
              src={images[0]}
              alt="name"
              width={600}
              height={450}
              className="object-contain"
            />
          </TabsContent>
          {images.map((img) => (
            <TabsContent key={img} value={img}>
              <Image
                src={img}
                alt="name"
                width={600}
                height={450}
                className="object-contain"
              />
            </TabsContent>
          ))}
        </div>
        <TabsList className="product__thumbnails flex items-center justify-center gap-3">
          {images.map((img) => (
            <TabsTrigger
              value={img}
              key={img}
              className="border border-gray-300 data-[state='active']:ring-1 data-[state='active']:ring-color-primary"
            >
              <Image
                src={img}
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
