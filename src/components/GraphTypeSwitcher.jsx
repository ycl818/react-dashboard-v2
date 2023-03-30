import React from "react";
import { ChartTypeSwitcher } from "../ChartTypeSwitcher";

const GraphTypeSwitcher = ({
  type,
  data,
  width,
  height,
  XaxisName,
  dataKey,
}) => {
  return (
    <ChartTypeSwitcher
      type={type}
      data={data}
      width={width}
      height={height}
      XaxisName={XaxisName}
      dataKey={dataKey}
    />
  );
};

export default GraphTypeSwitcher;
