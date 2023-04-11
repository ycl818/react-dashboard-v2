import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWidget, store, loadUploadData } from "../store";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // const Icons = styled(Box)(({ theme }) => ({
  //   backgroundColor: "yellow",
  // }));

  const handleAddPanel = () => {
    dispatch(addWidget());
  };

  const handleDownloadPanel = () => {
    const data = store.getState().widget.widgetArray;

    // file name time
    let currentYear = new Date().getFullYear().toString();
    let currentMonth = (new Date().getMonth() + 1).toString();
    let currentDate = new Date().getDate().toString();
    let currentHour = new Date().getHours().toString();
    let currentMin = new Date().getMinutes().toString();
    let currentSec = new Date().getSeconds().toString();

    if (currentMonth < 10) {
      currentMonth = "0" + currentMonth;
    }
    if (currentDate < 10) {
      currentDate = "0" + currentDate;
    }
    if (currentHour < 10) {
      currentHour = "0" + currentHour;
    }
    if (currentMin < 10) {
      currentMin = "0" + currentMin;
    }
    if (currentSec < 10) {
      currentSec = "0" + currentSec;
    }
    let currentTimeString =
      currentYear +
      currentMonth +
      currentDate +
      "_" +
      currentHour +
      currentMin +
      currentSec;

    // create file in browser
    const fileName = `${currentTimeString}_DashboardConfig`;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const handleUploadPanel = (e) => {
    console.log(e.target.files);
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      const fileData = JSON.parse(e.target.result);
      dispatch(loadUploadData({ fileData }));
    };
    if (fileReader.readyState === 2) {
      fileReader.abort();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={1}>
        <Toolbar variant="dense">
          {pathname !== "/" ? (
            <Tooltip title="Back">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}
          <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
            {pathname !== "/" ? (
              "New dashboard / Edit Panel"
            ) : (
              <>
                <GridViewIcon sx={{ marginRight: "0.5rem" }} />
                {"New dashboard"}
              </>
            )}
          </Typography>
          {/* <Button color="inherit">
      
            Add Panel
          </Button> */}

          {pathname === "/" ? (
            <Tooltip title="Add Panel">
              <IconButton onClick={handleAddPanel}>
                <DashboardCustomizeIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}

          {pathname === "/" ? (
            <Tooltip title="Download Panel">
              <IconButton>
                <FileDownloadIcon onClick={handleDownloadPanel} />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}

          {pathname === "/" ? (
            <Tooltip title="Upload Panel">
              <IconButton component="label">
                <FileUploadIcon />
                <input
                  id="uploadFileID"
                  hidden
                  accept=".json"
                  type="file"
                  onChange={handleUploadPanel}
                />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}

          {pathname === "/" ? (
            <Tooltip title="Save Dashboard">
              <IconButton>
                <SaveIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}

          {pathname === "/" ? <Button color="inherit">Time</Button> : ""}

          {pathname !== "/" ? (
            <Tooltip title="Save Panel">
              <IconButton
                onClick={() => {
                  navigate("/");
                }}
              >
                <SaveAltIcon />
              </IconButton>
            </Tooltip>
          ) : (
            ""
          )}

          <Tooltip title="Settings">
            <IconButton>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
