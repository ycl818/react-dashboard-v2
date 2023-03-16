import { Box } from "@mui/material";
import { useContext } from "react";
import GridLayout from "../components/GridLayout";
import { ChartContext } from "../store/chartStore";

const Dashboard = () => {

  const [chartState, dispatch] = useContext(ChartContext)
  console.log(chartState)

  return (
    <Box  height="100%">
      <GridLayout chartState={chartState}/>
    </Box>
  );
};

export default Dashboard;
