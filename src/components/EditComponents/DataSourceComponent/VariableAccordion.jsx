import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adjustVariable, pasteVariableIntoDataSourceURL } from "../../../store";

const VariableAccordion = ({
  fetchURl,
  panelID,
  setTextValue,
  handleSetURL,
  textRef,
}) => {
  const dispatch = useDispatch();
  let variablesArray = useSelector((state) => {
    return state.variable.variableArray;
  });

  const { datasource_url } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    return {
      datasource_url: targetPanel[0]?.data?.datasource_url,
    };
  });

  const [inputs, setInputs] = useState(variablesArray);

  const handleChange = (e) => {
    let updatedVariablesArray = variablesArray.map((variable) => {
      return variable.variableName === e.target.name
        ? { ...variable, defaultValue: e.target.value }
        : variable;
    });
    setInputs(updatedVariablesArray);

    fetchURl(updatedVariablesArray, textRef.current.value);
  };

  const handlePasteVariable = (e) => {
    console.log(e.target.value);
    const newDataSouceUrl = datasource_url + `/$${e.target.value}`;
    setTextValue(newDataSouceUrl);
    handleSetURL("link", newDataSouceUrl, panelID);

    console.log("I pasted varibale~~~~~", inputs);
    console.log("ref value~~~~~~~~", textRef.current.value);
    let cuurentText = textRef.current.value + `/$${e.target.value}`;
    fetchURl(inputs, cuurentText);
  };

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Accordion>
        <AccordionSummary expandIcon={">"}>
          <Typography>Variables</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: "#323232", display: "flex", flexWrap: "wrap" }}
        >
          {variablesArray.map((variable) => {
            return (
              <Box
                sx={{ marginLeft: "1rem", marginTop: "1rem" }}
                key={variable.id}
              >
                <Button
                  value={variable.variableName}
                  onClick={handlePasteVariable}
                  disableRipple
                  disableFocusRipple
                  disableElevation
                  sx={{
                    color: "#5B9AFF",
                    backgroundColor: "#181B1F",
                    width: "10%",
                    textTransform: "none",

                    "&:hover": { backgroundColor: "#181B1F" },
                  }}
                  variant="contained"
                >
                  {variable.variableName}
                </Button>

                <TextField
                  name={variable.variableName}
                  sx={{
                    width: { sm: 50, md: 100 },
                    marginBottom: "1rem",
                  }}
                  variant="outlined"
                  size="small"
                  defaultValue={`${variable.defaultValue}`}
                  value={inputs.defaultValue}
                  onChange={handleChange}
                  onBlur={() => {
                    dispatch(adjustVariable({ inputs }));
                  }}
                />
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default VariableAccordion;
