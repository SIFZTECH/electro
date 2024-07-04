"use client";

import { useUser } from "@/app/_features/authentication/useUser";
import Chart from "./Chart";
import DealerPortalChart from "./DealerPortalChart";

const startData1 = [
  {
    name: "A",
    value: 3,
    color: "#ef4444",
  },
  {
    name: "B",
    value: 2,
    color: "#ffd43b",
  },
  {
    name: "C",
    value: 1,
    color: "#495057",
  },
  {
    name: "D",
    value: 2,
    color: "#84cc16",
  },
];

const startData2 = [
  {
    name: "A",
    value: 1,
    color: "#ef4444",
  },
  {
    name: "B",
    value: 4,
    color: "#ffd43b",
  },
  {
    name: "C",
    value: 1,
    color: "#495057",
  },
  {
    name: "D",
    value: 3,
    color: "#84cc16",
  },
];

const PieCharts = ({ data }) => {
  const { isAdmin } = useUser();

  const colors = {
    pending: "#495057",
    collected: "#ffe066",
    delivered: "#69db7c",
  };

  const clickAndCollectStats = Object.keys(data.click_and_collect).map(
    (key) => ({
      name: key.charAt(0).toUpperCase(),
      value: data?.click_and_collect[key],
      color: colors[key],
    })
  );

  // const orderStats = Object.keys(data.click_and_collect).map((key) => ({
  //   name: key.charAt(0).toUpperCase(),
  //   value: data?.order_by_brand[key],
  //   color: "#ffe066",
  // }));

  return (
    <div className="mt-14 flex flex-col lg:grid lg:grid-cols-4 gap-10">
      <Chart
        startData={clickAndCollectStats}
        title="Click and Collect orders"
      />
      <Chart startData={startData2} title="Orders By Brand" />
      {isAdmin && <DealerPortalChart title="Dealer Portal" />}
    </div>
  );
};

export default PieCharts;
