import { Box } from "@mui/material";
import { useContext } from "react";
import GridLayout from "../components/GridLayout";
import { ChartContext } from "../store/chartStore";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const [chartState, dispatch] = useContext(ChartContext);
  console.log(chartState);

  return (
    <Box height="100%">
      <GridLayout chartState={chartState} />
    </Box>
  );
};

export default Dashboard;
