import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  updateData,
  updateDataSource,
  updateDataSourceWithURL,
} from "../../store";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useRef, useState } from "react";
import axios from "axios";
import InspectDrawer from "../InspectDrawer";

const DataSourceBlock = ({ panelID }) => {
  const dispatch = useDispatch();
  const textRef = useRef("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fetchErrorMsg, setFetchErrorMsg] = useState("");

  const { datasource_url } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    return {
      datasource_url: targetPanel[0]?.data?.datasource_url,
    };
  });
  const [textValue, setTextValue] = useState(datasource_url || "");

  const fetchURl = async () => {
    try {
      const response = await axios.get(`${textRef.current.value}`);
      const data = response.data;
      dispatch(updateData({ data, panelID }));
      setFetchErrorMsg("");
    } catch (error) {
      setFetchErrorMsg(error.message);
    }
  };

  const data1 = [
    {
      name: "test1",
      x: -50,
      y: -50,
    },
    {
      name: "test2",
      x: 0,
      y: 0,
    },
    {
      name: "test3",
      x: 50,
      y: 50,
    },
    {
      name: "test4",
      x: 100,
      y: 100,
    },
    {
      name: "test5",
      x: 150,
      y: 150,
    },
    {
      name: "test6",
      x: 200,
      y: 200,
    },
    {
      name: "test7",
      x: 250,
      y: 250,
    },
    {
      name: "test8",
      x: 350,
      y: 350,
    },
    {
      name: "test9",
      x: 400,
      y: 400,
    },
    {
      name: "test10",
      x: 450,
      y: 450,
    },
    {
      name: "test11",
      x: 500,
      y: 500,
    },
  ];

  const data2 = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const handleSetURL = (datasourceName, datasource_url, panelID) => {
    dispatch(
      updateDataSourceWithURL({ datasourceName, datasource_url, panelID })
    );
  };

  const handleSetData = (datasourceName, data, panelID) => {
    console.log(data);
    dispatch(updateData({ data, panelID }));
    dispatch(updateDataSource({ datasourceName, panelID }));
  };
  //border: "1px solid black"
  return (
    <>
      <Box component="div" sx={{}} overflow="hidden">
        DataSourceBlock
        <Button
          onClick={() => {
            handleSetData("test1", data1, panelID);
          }}
        >
          test1 data
        </Button>
        <Button
          onClick={() => {
            handleSetData("test2", data2, panelID);
          }}
        >
          test2 data
        </Button>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          disableRipple
          disableFocusRipple
          disableElevation
          sx={{
            color: "#5B9AFF",
            backgroundColor: "#181B1F",
            width: "10%",
            marginRight: "1rem",
            "&:hover": { backgroundColor: "#181B1F" },
          }}
          variant="contained"
        >
          URL
        </Button>
        <TextField
          error={fetchErrorMsg ? true : false}
          sx={{ backgroundColor: "#141414" }}
          fullWidth
          inputRef={textRef}
          hiddenLabel
          id="filled-hidden-label-small"
          value={textValue}
          variant="filled"
          helperText={fetchErrorMsg ? `${fetchErrorMsg}` : ""}
          size="small"
          onChange={(e) => {
            setTextValue(e.target.value);
            const url = e.target.value;
            handleSetURL("link", url, panelID);
            fetchURl();
          }}
        />
        <Button
          variant="contained"
          style={{ textTransform: "unset", width: "15%", marginLeft: "1rem" }}
          onClick={() => setDrawerOpen(true)}
        >
          Query inspector
        </Button>
      </Box>
      <InspectDrawer
        panelID={panelID}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </>
  );
};

export default DataSourceBlock;
