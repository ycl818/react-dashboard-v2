import { Box } from "@mui/material";
import { useEffect } from "react";
import GridLayout from "../components/GridLayout";

import { useDispatch } from "react-redux";
import { fetchExistDashboard, useFetchWidgetDataQuery } from "../store";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, error, isFetching } = useFetchWidgetDataQuery();

  // useEffect(() => {
  //   data && dispatch(fetchExistDashboard({ data }));
  // }, [data]);
  return (
    <Box height="100%">
      <GridLayout />
    </Box>
  );
};

export default Dashboard;
