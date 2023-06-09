import * as React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Fade,
  MenuItem,
  Menu,
  Button,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AutoFixHighSharpIcon from "@mui/icons-material/AutoFixHighSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import InspectDrawer from "./InspectDrawer";
import { useState } from "react";
import RemoveDialog from "./RemoveDialog";

const DropdownTitle = ({ title, panelID }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmDelete, setComfirmDelete] = useState(false);

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
              style={{ fontSize: "16px", marginRight: "0.5rem" }}
            />
            <Typography sx={{ fontSize: "14px" }}>View</Typography>
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
              style={{ fontSize: "16px", marginRight: "0.5rem" }}
            />
            <Typography sx={{ fontSize: "14px" }}>Edit</Typography>
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleInspect();
            handleClose();
          }}
        >
          <InfoIcon style={{ fontSize: "16px", marginRight: "0.5rem" }} />

          <Typography sx={{ fontSize: "14px" }}>Inspect</Typography>
        </MenuItem>
        <Divider
          sx={{
            backgroundColor: "white",
            borderBottomWidth: 1,
            width: "100%",
            textAlign: "center",
          }}
        />
        <MenuItem
          onClick={() => {
            setComfirmDelete(true);
            handleClose();
          }}
        >
          <DeleteIcon style={{ fontSize: "16px", marginRight: "0.5rem" }} />
          <Typography sx={{ fontSize: "14px" }}>Remove</Typography>
        </MenuItem>
      </Menu>
      <InspectDrawer
        panelID={panelID}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />

      <RemoveDialog
        setComfirmDelete={setComfirmDelete}
        confirmDelete={confirmDelete}
        panelID={panelID}
      />
    </>
  );
};

export default DropdownTitle;
