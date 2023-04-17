import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dialoag from "./Dialoag";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchErrorShowBorder,
  updateDataByURL,
  updateTargetVariable,
} from "../../store";
import axios from "axios";

const columns = [
  //{ field: "id", headerName: "ID", width: 200, hidden: true, editable: true },
  {
    field: "variableName",
    headerName: "Variable",
    width: 150,
    editable: true,
  },
  {
    field: "defaultValue",
    headerName: "Default Value",
    width: 150,
    editable: true,
  },
];

// const rows = [
//   { id: 1, variable: "product", Definition: "Test" },
//   { id: 2, variable: "project", Definition: "all" },
// ];

const SettingVariables = () => {
  const [open, setOpen] = useState(false);
  const handleNewVariable = () => {
    setOpen(true);
  };

  const rows = useSelector((state) => {
    return state.variable.variableArray;
  });

  const { panelURLs } = useSelector((state) => {
    const panelURLs = state.widget.widgetArray.map((panel) => {
      return { id: panel.i, url: panel.data.datasource_url };
    });

    return {
      panelURLs,
    };
  });

  const dispatch = useDispatch();

  const handleProcessRowUpdate = (newRow, oldRow) => {
    dispatch(updateTargetVariable({ newRow }));
    console.log(
      "file: SettingVariables.jsx:55 ~ handleProcessRowUpdate ~ newRow:",
      newRow
    );

    const targetURLs = panelURLs.filter((panel) =>
      panel.url.includes(newRow.variableName)
    );

    console.log(
      "file: SettingVariables.jsx:61 ~ handleProcessRowUpdate ~ targetURLs:",
      targetURLs
    );
    const newTargetURLs = targetURLs?.map((panel) => {
      let panelURL = panel.url;
      if (panelURL.includes(newRow.variableName)) {
        panelURL = panelURL.replace(
          new RegExp(`\\$${newRow.variableName}`, "g"),
          newRow.defaultValue
        );
      }
      return { id: panel.id, url: panelURL };
    });
    console.log(
      "file: SettingVariables.jsx:75 ~ newTargetURLs ~ newTargetURLs:",
      newTargetURLs
    );

    // Step 2: Send all URLs at the same time using Promise.all()
    Promise.all(
      newTargetURLs.map(async (panel) => {
        try {
          const response = await axios.get(panel.url);
          const id = panel.id;
          let result = response?.data;
          const res = false;
          // find url is in which panel then update
          dispatch(updateDataByURL({ result, id }));
          dispatch(fetchErrorShowBorder({ res, id }));
        } catch (error) {
          const id = panel.id;
          const res = true;
          dispatch(fetchErrorShowBorder({ res, id }));
          console.log(
            "file: variablesArea.jsx:65 ~ newPanelsURL.map ~ error:",
            error
          );
        }
      })
    )
      .then((responses) => {
        console.log(responses);
        // Do something with the array of response data
      })
      .catch((error) => {
        console.error(error);
      });

    // after modified variable, need to fetch urL again in every panel. So need to map over all panel's url and check which variables are in using.
  };

  return (
    <Box bgcolor="#181B1F" className="fullHeightBox">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          style={{ color: "white", padding: "2rem", fontSize: "1.5rem" }}
        >
          Variables
        </Typography>
        <Button
          variant="contained"
          sx={{ marginRight: "5rem" }}
          onClick={handleNewVariable}
        >
          New
        </Button>
      </Box>
      <Divider
        sx={{
          backgroundColor: "white",
          borderBottomWidth: 1,
          width: "100%",
          textAlign: "center",
        }}
      />
      <Box sx={{ height: "80%", width: "100%", padding: "2rem" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          //checkboxSelection
          disableRowSelectionOnClick
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={(error) => console.log(error)}
        />
      </Box>

      <Dialoag open={open} setOpen={setOpen} />
    </Box>
  );
};

export default SettingVariables;
