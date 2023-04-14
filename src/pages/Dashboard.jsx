import { Box } from "@mui/material";
import { useEffect } from "react";
import GridLayout from "../components/GridLayout";

import { useDispatch } from "react-redux";
import {
  fetchExistDashboard,
  fetchExistDashboardVariable,
  useFetchWidgetDataQuery,
} from "../store";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, error, isFetching } = useFetchWidgetDataQuery();
  console.log(data);
  // const panelArray = data?.widget?.widgetArray;
  // const variableArray = data?.variable?.variableArray;

  // useEffect(() => {
  //   data &&
  //     dispatch(fetchExistDashboard({ panelArray })) &&
  //     dispatch(fetchExistDashboardVariable({ variableArray }));
  // }, [data]);
  return (
    <Box height="100%">
      <GridLayout />
    </Box>
  );
};

export default Dashboard;
