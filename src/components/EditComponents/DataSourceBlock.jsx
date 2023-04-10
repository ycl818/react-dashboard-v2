import { Box, Button } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { updateData, updateDataSource } from "../../store";
import AceEditor from "react-ace";
import { JSONTree } from "react-json-tree";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const DataSourceBlock = ({ panelID }) => {
  const dispatch = useDispatch();
  console.log(panelID);

  const [editorData, setEditorData] = useState([]);

  const data3 = [
    {
      i: "IkXdvP3buRXWxk-sqPVXR",
      x: 0,
      y: 3,
      w: 2,
      h: 3,
      data: {
        datasource: "test2",
        dataType: "Line Chart",
        dataDetail: [
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
        ],
      },
    },
    {
      i: "XN0xA9G40ZHGv5H_M46EX",
      x: 4,
      y: 3,
      w: 4,
      h: 1.5,
      data: {
        datasource: "test1",
        dataType: "Line Chart",
        dataDetail: [
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
        ],
      },
    },
    {
      i: "zbV8Pu_dITzaduelhBuSK",
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      data: {
        datasource: "test1",
        dataType: "Line Chart",
        dataDetail: [
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
        ],
      },
    },
    {
      i: "DoDYMpKVKikE3P5JPt9wR",
      x: 2,
      y: 1.5,
      w: 4,
      h: 1.5,
      data: {
        datasource: "test1",
        dataType: "Area Chart",
        dataDetail: [
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
        ],
      },
    },
    {
      i: "vmihTOVC7CQ7Cc7fX9oRk",
      x: 7,
      y: 0,
      w: 1,
      h: 1,
      data: {
        datasource: "test2",
        dataType: "Pie Chart",
        dataDetail: [
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
        ],
      },
    },
    {
      i: "aX8s7R6adeOp0QpqdZ6AC",
      x: 0,
      y: 2,
      w: 2,
      h: 1,
      data: {
        datasource: "test1",
        dataType: "Area Chart",
        dataDetail: [
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
        ],
      },
    },
    {
      i: "x_a0O5rFIh10iMxNcQCn-",
      x: 2,
      y: 0,
      w: 4,
      h: 1.5,
      data: {
        datasource: "test1",
        dataType: "Line Chart",
        dataDetail: [
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
        ],
      },
    },
  ];

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

  console.log("adfasdfasdf", editorData);

  return (
    <Box component="div" sx={{ border: "1px solid black" }} overflow="hidden">
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
      <span style={{ display: "flex", flexDirection: "row" }}>
        <AceEditor
          mode="json"
          theme="monokai"
          name="layouteditor"
          width="100%"
          height="500px"
          wrapEnabled
          readOnly={true}
          editorProps={{ $blockScrolling: true }}
          onChange={() => {}}
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={false}
          value={JSON.stringify(editorData, null, 2)}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: "500px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              overflowY: "scroll",
              position: "absolute",
              height: "500px",
              width: "100%",
            }}
          >
            <JSONTree
              data={editorData}
              theme={{
                // switch key for objects to uppercase when object is expanded.
                // `nestedNodeLabel` receives additional argument `expandable`
                nestedNodeLabel: ({ style }, keyPath, nodeType, expanded) => ({
                  style: {
                    ...style,
                    textTransform: expanded ? "uppercase" : style.textTransform,
                    backgroundColor: undefined,
                  },
                }),
              }}
            />
          </Box>
        </Box>
      </span>
    </Box>
  );
};

export default DataSourceBlock;
