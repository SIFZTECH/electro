import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import ProductsPage from "@/app/_root_ui/ProductsPage";

const page = () => {
  return (
    <div className="relative w-full min-h-dvh">
      <div className="py-4 px-6 flex gap-6 items-start">
        <Image
          className="pt-5"
          src={"/logo.svg"}
          height={40}
          width={40}
          alt="Logo"
        />

        <div className="flex-1">
          <Tabs defaultValue="e-bikes" className="font-serif">
            <TabsList>
              <TabsTrigger value="e-bikes" className="">
                E Bikes
              </TabsTrigger>
              <TabsTrigger value="compare-bikes">Compare Bikes</TabsTrigger>
            </TabsList>
            <TabsContent value="e-bikes">
              <ProductsPage />
            </TabsContent>
            <TabsContent value="compare-bikes">Compare</TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="absolute right-10">
        <div className="relative">
          <Image src="/container.png" width={40} height={40} alt="container" />
          <p className="absolute right-0 top-0 bg-red-500 rounded-full text-white w-[1.40rem] h-[1.40rem] flex items-center justify-center">
            <span className="p-1 text-[10px] leading-3">2</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
