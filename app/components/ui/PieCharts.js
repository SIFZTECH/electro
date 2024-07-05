"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import Chart from "./Chart";
import DealerPortalChart from "./DealerPortalChart";
import { useBrandsForPublic } from "@/app/_features/brands/useBrands";

const defaultBrandColors = {
  NCM: "#495057",
  "ET.Cycle": "#FFB500",
  FOO: "#323232",
};

const PieCharts = ({ data }) => {
  const { isAdmin, isLoading: isLoading2 } = useUser();
  const { data: data2, isLoading } = useBrandsForPublic();

  const colors = {
    pending: "#FFB500",
    collected: "#2B2B2B",
    delivered: "#495057",
  };

  const clickAndCollectStats =
    data?.click_and_collect &&
    Object.keys(data?.click_and_collect).map((key) => ({
      name: key.charAt(0).toUpperCase(),
      value: data?.click_and_collect[key],
      color: colors[key],
    }));

  const mappedBrandArray = data?.order_by_brand.map((brandOrder) => {
    const brandInfo = data2?.data.find(
      (brand) => brand.name === brandOrder.brand_name
    );
    return {
      name: brandInfo ? brandInfo.name.toUpperCase() : "Unknown",
      value: brandOrder.order_count,
      color: defaultBrandColors[brandOrder.brand_name] || "#000000", // use default brand color
    };
  });

  return (
    <div className="mt-14 flex flex-wrap flex-col xl:grid 2xl:grid-cols-4 xl:grid-cols-3 gap-10">
      {isLoading || isLoading2 ? (
        ""
      ) : (
        <>
          {data?.click_and_collect &&
            data?.click_and_collect.pending !== 0 &&
            data?.click_and_collect.collected !== 0 &&
            data?.click_and_collect.delivered !== 0 && (
              <Chart
                startData={clickAndCollectStats}
                title="Click and Collect orders"
              />
            )}
          {data?.order_by_brand.length > 0 && (
            <Chart startData={mappedBrandArray} title="Orders By Brand" />
          )}
          {isAdmin && (
            <DealerPortalChart
              title="Dealer Portal"
              engagements={data?.engagements}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PieCharts;
