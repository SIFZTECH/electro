import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import RecentOrder from "./RecentOrder";
import { useOrders } from "@/app/_features/orders/useOrders";

const Orders = () => {
  const { total_num, isLoading } = useOrders();
  console.log(total_num);

  return (
    <Tabs defaultValue="allOrders" className="font-serif">
      <TabsList>
        <TabsTrigger value="allOrders" className="">
          All Orders{" "}
          {!isLoading && total_num && (
            <p className="ml-2 bg-red-500 rounded-full text-white w-[1.40rem] h-[1.40rem] flex items-center justify-center">
              <span className="p-1 text-[10px] leading-3">
                {total_num ? total_num : 0}
              </span>
            </p>
          )}
        </TabsTrigger>
        <TabsTrigger value="collectedOrder">
          Collected Order{" "}
          <p className="ml-2 bg-red-500 rounded-full text-white  w-[1.40rem] h-[1.40rem] flex items-center justify-center">
            <span className=" text-[10px] leading-3">9</span>
          </p>
        </TabsTrigger>
        <TabsTrigger value="intransitOrders">Intransit Orders </TabsTrigger>
      </TabsList>
      <TabsContent value="allOrders">
        <RecentOrder />
      </TabsContent>
      <TabsContent value="collectedOrder">
        <RecentOrder />
      </TabsContent>
      <TabsContent value="intransitOrders">Transit order</TabsContent>
    </Tabs>
  );
};

export default Orders;
