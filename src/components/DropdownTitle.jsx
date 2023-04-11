import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import { style } from "@mui/system";
import { Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoFixHighSharpIcon from "@mui/icons-material/AutoFixHighSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";
import InspectDrawer from "./InspectDrawer";
import { useState } from "react";

const DropdownTitle = ({ title, panelID }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { dataDetail } = useSelector((state) => {
    const panelArray = state.widget.widgetArray;
    const targetPanel = panelArray.filter((panel) => panel.i === panelID);
    return {
      dataDetail: targetPanel[0]?.data?.dataDetail,
    };
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleInspect = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        onClose={(_, reason) => reason === "backdropClick" && setAnchorEl(null)}
        style={{
          position: "fixed",
          top: "7%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        sx={{
          // width: "20%",
          //borderBottom: "1px solid black",
          textTransform: "none",
          color: "white",
        }}
      >
        {title}{" "}
        <ExpandMoreIcon style={{ fontSize: "12px", marginLeft: "0.2rem" }} />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        // sx={{ position: "fixed", left: "5%" }}
      >
        <MenuItem>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
            to={`${panelID}/view`}
          >
            <VisibilityIcon
              style={{ fontSize: "12px", marginRight: "0.5rem" }}
            />
            <Typography>View</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
            to={`${panelID}/edit`}
          >
            <AutoFixHighSharpIcon
              style={{ fontSize: "12px", marginRight: "0.5rem" }}
            />
            Edit
          </Link>
        </MenuItem>
        <MenuItem onClick={handleInspect}>
          <InfoIcon style={{ fontSize: "12px", marginRight: "0.5rem" }} />
          Inspect
        </MenuItem>
      </Menu>
      <InspectDrawer
        panelID={panelID}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </>
  );
};

export default DropdownTitle;
