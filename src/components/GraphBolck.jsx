import { Box } from "@mui/material";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { ChartContext } from "../store/chartStore";
import ChartNameField from "./EditComponents/ChartNameField";
import GraphTypeSwitcher from "./GraphTypeSwitcher";

const GraphBolck = ({ panelID }) => {
  const [chartState, dispatch] = useContext(ChartContext);

  const { dataDetail } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    console.log(panelArray);
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    console.log(targetPanel);
    return {
      dataDetail: targetPanel[0]?.data?.dataDetail,
    };
  });
  console.log(dataDetail);
  let keysArry = [];
  if (dataDetail) {
    keysArry = Object.keys(dataDetail[0]);
    console.log(keysArry);
  }
  // const data = [
  //   {
  //     gppd: 1,
  //   },
  // ];

  return (
    <>
      <Box
        component="div"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
        p={5}
        m={2}
      >
        <ChartNameField />
        <GraphTypeSwitcher
          type={`${chartState.type}`}
          data={dataDetail}
          width={500}
          height={300}
          dataKey={keysArry[1]}
          XaxisName={keysArry[0]}
        />
      </Box>
    </>
  );
};

{
  /* <GraphTypeSwitcher type={`${chartState.type}`} data={data} width={500} height={300}/>
</Box> */
}
export default GraphBolck;
