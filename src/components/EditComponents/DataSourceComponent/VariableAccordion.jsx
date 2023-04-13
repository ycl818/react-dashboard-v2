import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const VariableAccordion = () => {
  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Accordion>
        <AccordionSummary expandIcon={">"}>
          <Typography>Variables</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "#323232" }}>
          <Typography>hello</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default VariableAccordion;
