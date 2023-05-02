import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adjustVariable,
  fetchErrorShowBorder,
  updateData,
  updateDataSourceWithURL,
} from "../../../store";
import axios from "axios";

const VariableAccordion = ({
  fetchURl,
  panelID,
  setTextValue,
  textValue,
  dataPanelID,
  inputs,
  setInputs,
}) => {
  // console.log("file: VariableAccordion.jsx:27 ~ textValue:", textValue);
  const dispatch = useDispatch();
  let variablesArray = useSelector((state) => {
    return state.variable.variableArray;
  });
  console.log(
    "file: VariableAccordion.jsx:32 ~ variablesArray ~ variablesArray:",
    variablesArray
  );

  const { allPanelURLs } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const allPanelURLs = panelArray.map((panel) => {
      const siglePanelURLs = panel.data.map((dataPanel) => {
        return {
          dataPanelID: dataPanel.dataName,
          dataPanelURL: dataPanel.datasource_url,
        };
      });
      return { id: panel.i, url: siglePanelURLs };
    });

    return {
      allPanelURLs,
    };
  });

  const handleChange = (e) => {
    let updatedVariablesArray = variablesArray.map((variable) => {
      return variable.variableName === e.target.name
        ? { ...variable, defaultValue: e.target.value }
        : variable;
    });
    setInputs(updatedVariablesArray);
    dispatch(adjustVariable({ inputs }));
  };

  const handleOnBlur = (e) => {
    dispatch(adjustVariable({ inputs }));
    // 1. get all panels url
    // 2. check the urls which contain target variable
    // 3. fectch all target url
    const newPanelsURL = allPanelURLs.map((panel) => {
      const newSigleDataPanelURLs = panel.url.map((dataPanel) => {
        let newUrl = dataPanel.dataPanelURL;
        inputs.forEach((variable) => {
          if (newUrl?.includes(`@${variable.variableName}`)) {
            newUrl = newUrl.replace(
              new RegExp(`@${variable.variableName}`, "g"),
              variable.defaultValue
            );
          }
        });
        return { dataPanelID: dataPanel.dataPanelID, dataPanelURL: newUrl };
      });
      return { id: panel.id, url: newSigleDataPanelURLs };
    });

    console.log(
      "file: VariableAccordion.jsx:124 ~ newPanelsURL ~ newPanelsURL:",
      newPanelsURL
    );

    Promise.all(
      newPanelsURL.map((panel) => {
        panel.url.forEach(async (dataPanel) => {
          try {
            if (!dataPanel.dataPanelURL) return;
            const response = await axios.get(dataPanel.dataPanelURL);
            const panelID = panel.id;
            const id = panel.id;
            const data = response.data;
            const dataPanelID = dataPanel.dataPanelID;
            const res = false;
            const message = "";
            dispatch(updateData({ data, panelID, dataPanelID }));
            dispatch(fetchErrorShowBorder({ id, res, message, dataPanelID }));
          } catch (error) {
            const id = panel.id;
            const dataPanelID = dataPanel.dataPanelID;
            const res = true;
            const message = error.message;

            console.log(
              "file: VariableAccordion.jsx:84 ~ filteredURLs.map ~ panel.url:",
              panel.url
            );
            dispatch(fetchErrorShowBorder({ res, id, message, dataPanelID }));
          }
        });
      })
    )
      .then((responses) => {
        console.log(responses);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePasteVariable = (e) => {
    const pasteKey = e.target.value;
    let newURL = "";
    const newState = textValue.map((text) => {
      if (text.dataName === dataPanelID) {
        newURL = text.datasource_url + "/@" + `${pasteKey}`;
        return {
          ...text,
          datasource_url: newURL,
        };
      }
      return text;
    });
    setTextValue(newState);
    dispatch(
      updateDataSourceWithURL({
        panelID,
        dataPanelID,
        datasource_url: newURL,
        datasourceName: "link",
      })
    );

    // let cuurentText = textRef.current.value + "/@" + `${pasteKey}`;
    console.log("I pastes!!");
    fetchURl(inputs, newURL, dataPanelID);
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
          {variablesArray.map((variable, index) => {
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
                  // defaultValue={`${variable.defaultValue}`}
                  value={inputs[index].defaultValue}
                  onChange={handleChange}
                  onBlur={handleOnBlur}
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
