"use client";
import React from "react";

const attributes = {
  Color: [
    {
      id: 4,
      value: "Red",
    },
    {
      id: 5,
      value: "Green",
    },
    {
      id: 13,
      value: "Yellow",
    },
    {
      id: 14,
      value: "Gray",
    },
  ],
  Size: [
    {
      id: 6,
      value: "S",
    },
    {
      id: 7,
      value: "M",
    },
    {
      id: 9,
      value: "XL",
    },
    {
      id: 10,
      value: "L",
    },
    {
      id: 11,
      value: "XXL",
    },
  ],
  Test: [
    {
      id: 16,
      value: "test",
    },
  ],
};

const AttributeList = () => {
  return (
    <div>
      {Object.keys(attributes).map((key) => (
        <div key={key}>
          <h3>{key}</h3>
          <ul>
            {attributes[key].map((item) => {
              console.log(item);
              return (
                <li key={item.id}>
                  {key}, Value: {item.value}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AttributeList;
