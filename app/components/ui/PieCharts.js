"use client";

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

const PieCharts = () => {
  return (
    <div className="mt-14 flex flex-col lg:grid lg:grid-cols-4 gap-10">
      <Chart startData={startData1} title="Click and Collect orders" />
      <Chart startData={startData2} title="Orders By Brand" />
      <DealerPortalChart title="Dealer Portal" />
    </div>
  );
};

export default PieCharts;
