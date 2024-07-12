import { useState } from "react";
import MapSelector from "./Mapselector";

const SelectPosition = ({ coordinates, setCoordinates }) => {
  return (
    <MapSelector onSelectPosition={(position) => setCoordinates(position)} />
  );
};

export default SelectPosition;
