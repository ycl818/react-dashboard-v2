import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  styled,
  Tooltip,
} from "@mui/material";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWidget } from "../store";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const Icons = styled(Box)(({ theme }) => ({
    backgroundColor: "yellow",
  }));

  const handleAddPanel = () => {
    dispatch(addWidget());
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
            {pathname !== "/" ? "New Dashboard / Edit Panel" : "New Dashboard"}
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
