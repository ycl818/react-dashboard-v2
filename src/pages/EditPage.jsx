import React, { useReducer } from "react";
import { Box, Container, Stack } from "@mui/material";
import Leftbar from "../components/EditComponents/Leftbar";
import Rightbar from "../components/EditComponents/Rightbar";
import { useState } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";

const EditPage = () => {
  const locationPath = window.location.href;
  const panelID = locationPath.split("/")[4];

  const [sizes, setSizes] = useState([1200]);

  return (
    <Box height="100vh" display="flex" overflow="hidden">
      <Box component="div" className="demo-wrap" flex={1} overflow="auto">
        <SplitPane
          sizes={sizes}
          onChange={setSizes}
          resizerSize={10}
          sashRender={(index, active) => (
            <SashContent className="action-sash-wrap">
              <span
                className="action"
                // onClick={() => {
                //   setSizes([sizes[0] === 0 ? 250 : 0]);
                // }}
              >
                {sizes[0] > 1000 ? "<" : ">"}
              </span>
            </SashContent>
          )}
        >
          <Pane>
            <Leftbar panelID={panelID} />
          </Pane>
          <Pane maxSize="40%" minSize="20%">
            <Rightbar panelID={panelID} />
          </Pane>
        </SplitPane>
      </Box>
    </Box>
  );
};

export default EditPage;
