import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData, updateDataSource } from "../../store";
import AceEditor from "react-ace";
import { JSONTree } from "react-json-tree";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const DataSourceBlock = ({ panelID }) => {
  const dispatch = useDispatch();

  const { dataDetail } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    return {
      dataDetail: targetPanel[0]?.data?.dataDetail,
    };
  });

  const [editorData, setEditorData] = useState(dataDetail || []);

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
  const handleSetData = (datasourceName, data, panelID) => {
    console.log(data);
    dispatch(updateData({ data, panelID }));
    dispatch(updateDataSource({ datasourceName, panelID }));
  };
  //border: "1px solid black"
  return (
    <Box component="div" sx={{}} overflow="hidden">
      DataSourceBlock
      <Button
        onClick={() => {
          handleSetData("test1", data1, panelID);
          setEditorData(data1);
        }}
      >
        test1 data
      </Button>
      <Button
        onClick={() => {
          handleSetData("test2", data2, panelID);
          setEditorData(data2);
        }}
      >
        test2 data
      </Button>
    </Box>
  );
};

export default DataSourceBlock;

// #141C30
// black: {
//   100: "#d0d2d6",
//   200: "#a1a4ac",
//   300: "#727783",
//   400: "#434959",
//   500: "#141c30",
//   600: "#101626",
//   700: "#0c111d",
//   800: "#080b13",
//   900: "#04060a"
// },
