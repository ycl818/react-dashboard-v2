import {
  Button,
  Drawer,
  Dialog,
  Tab,
  Tabs,
  Box,
  Typography,
} from "@mui/material";

const SettingsDrawer = ({ setOpenSetting, openSetting }) => {
  return (
    <>
      <Drawer
        anchor="right"
        open={openSetting}
        style={{ zIndex: 1 }}
        PaperProps={{
          sx: { width: "90%", backgroundColor: "#181B1F" },
        }}
        onClose={() => setOpenSetting(false)}
      ></Drawer>
    </>
  );
};

export default SettingsDrawer;
