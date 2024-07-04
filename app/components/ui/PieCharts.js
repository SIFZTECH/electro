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
  const { isAdmin } = useUser();
  const { data: data2, isLoading } = useBrandsForPublic();

  const colors = {
    pending: "#FFB500",
    collected: "#2B2B2B",
    delivered: "#323232",
  };

  const clickAndCollectStats = Object.keys(data?.click_and_collect).map(
    (key) => ({
      name: key.charAt(0).toUpperCase(),
      value: data?.click_and_collect[key],
      color: colors[key],
    })
  );

  const { data: data3, isLoading3 } = useBrandsForPublic();
  const brandColors = {
    FOO: "#84cc16",
    NCM: "#84cc16",
    "ET.Cycle": "#84cc16",
  };
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
    <div className="mt-14 flex flex-col lg:grid lg:grid-cols-4 gap-10">
      <Chart
        startData={clickAndCollectStats}
        title="Click and Collect orders"
      />
      <Chart startData={mappedBrandArray} title="Orders By Brand" />
      {isAdmin && <DealerPortalChart title="Dealer Portal" />}
    </div>
  );
};

export default PieCharts;
