import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import RecentOrder from "./AllOrders";
import { useOrders } from "@/app/_features/orders/useOrders";
import AllOrders from "./AllOrders";
import CollectedOrders from "./CollectedOrders";
import IntransitOrders from "./IntransitOrders";

const Orders = () => {
  const { total_num, isLoading } = useOrders();
  const { total_num: total_num2, isLoading: isLoading2 } = useOrders(
    1,
    null,
    "collected"
  );
  const { total_num: total_num3, isLoading: isLoading3 } = useOrders(
    1,
    null,
    "pending"
  );

  return (
    <Tabs defaultValue="allOrders" className="font-serif">
      <TabsList>
        <TabsTrigger value="allOrders" className="">
          All Orders{" "}
          {!isLoading && total_num > 0 && (
            <p className="ml-2 bg-red-500 rounded-full text-white w-[1.40rem] h-[1.40rem] flex items-center justify-center">
              <span className="p-1 text-[10px] leading-3">
                {total_num ? total_num : 0}
              </span>
            </p>
          )}
        </TabsTrigger>
        <TabsTrigger value="collectedOrder">
          Collected Order{" "}
          {!isLoading2 && total_num2 > 0 && (
            <p className="ml-2 bg-red-500 rounded-full text-white w-[1.40rem] h-[1.40rem] flex items-center justify-center">
              <span className="p-1 text-[10px] leading-3">
                {total_num2 ? total_num2 : 0}
              </span>
            </p>
          )}
        </TabsTrigger>
        <TabsTrigger value="intransitOrders">
          Intransit Orders{" "}
          {!isLoading3 && total_num3 > 0 && (
            <p className="ml-2 bg-red-500 rounded-full text-white w-[1.40rem] h-[1.40rem] flex items-center justify-center">
              <span className="p-1 text-[10px] leading-3">
                {total_num3 ? total_num3 : 0}
              </span>
            </p>
          )}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="allOrders">
        <AllOrders />
      </TabsContent>
      <TabsContent value="collectedOrder">
        <CollectedOrders />
      </TabsContent>
      <TabsContent value="intransitOrders">
        <IntransitOrders />
      </TabsContent>
    </Tabs>
  );
};

export default Orders;
