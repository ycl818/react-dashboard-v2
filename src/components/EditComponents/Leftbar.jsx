import { Box } from "@mui/material";
import React from "react";
import Barchart from "../Barchart";
import GraphBolck from "../GraphBolck";
import DataSourceBlock from "./DataSourceBlock";

import { useState } from "react";
import SplitPane, { Pane, SashContent } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Rotate90DegreesCcw } from "@mui/icons-material";

const Leftbar = ({ panelID }) => {
  const [sizes, setSizes] = useState([400]);

  return (
    <Box display="flex" height="100vh" flexDirection="column" overflow="hidden">
      <Box
        component="div"
        className="demo-wrap"
        bgcolor={`rgba(0,0,0,0.2 )`}
        flex={1}
        color={"text.primary"}
        overflow="auto"
      >
        <SplitPane
          split="horizontal"
          sizes={sizes}
          onChange={setSizes}
          sashRender={(index, active) => (
            <SashContent className="action-sash-wrap">
              <span className="action">
                {sizes[0] !== 0 ? (
                  "^"
                ) : (
                  <div style={{ transform: `rotate(180deg)` }}>^</div>
                )}
              </span>
            </SashContent>
          )}
        >
          <Pane maxSize="80%">
            <GraphBolck panelID={panelID} />
          </Pane>
          <DataSourceBlock panelID={panelID} />
        </SplitPane>
      </Box>
    </Box>
  );
};

export default Leftbar;
