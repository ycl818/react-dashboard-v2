import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import { style } from "@mui/system";
import { Typography } from "@mui/material";

const DropdownTitle = ({ title, panelID }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          position: "fixed",
          top: "7%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 100,
        }}
        sx={{
          // width: "20%",
          borderBottom: "1px solid black",
          textTransform: "none",
          color: "white",
        }}
      >
        {title}
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
            style={{ textDecoration: "none", color: "white" }}
            to={`${panelID}/view`}
          >
            View
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`${panelID}/edit`}
          >
            Edit
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropdownTitle;
