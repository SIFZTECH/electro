"use client";

import React, { useState } from "react";

const AttributeDropdown = () => {
  const attributes = [
    { name: "Color - #d6b3b3", code: "#d6b3b3" },
    { name: "Color - #8c8c8c", code: "#8c8c8c" },
    { name: "Size - 26.2 Inches" },
    { name: "Size - 20.2 Inches" },
  ];

  const [selectedAttribute, setSelectedAttribute] = useState("");

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  return (
    <select
      name="attributeValue"
      id="attributeValue"
      value={selectedAttribute}
      onChange={handleAttributeChange}
    >
      <option value="">Select Attribute Value</option>
      {attributes.map((attr, index) => (
        <option
          key={index}
          value={attr.code || attr.name}
          style={
            attr.code ? { backgroundColor: attr.code, color: attr.code } : {}
          }
        >
          {attr.name}
        </option>
      ))}
    </select>
  );
};

export default AttributeDropdown;
