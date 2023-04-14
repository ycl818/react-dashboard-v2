import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dialoag from "./Dialoag";
import { useDispatch, useSelector } from "react-redux";
import { updateTargetVariable } from "../../store";

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
    headerName: "Definition",
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

  const dispatch = useDispatch();

  const handleProcessRowUpdate = (newRow, oldRow) => {
    dispatch(updateTargetVariable({ newRow }));
    console.log(
      "file: SettingVariables.jsx:55 ~ handleProcessRowUpdate ~ newRow:",
      newRow
    );
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
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
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
