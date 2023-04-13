import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HiveIcon from "@mui/icons-material/Hive";
import BuildIcon from "@mui/icons-material/Build";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const listArray = [
    {
      name: "General",
      icon: <BuildIcon />,
      link: "general",
    },
    {
      name: "Variables",
      icon: <HiveIcon />,
      link: "variables",
    },
  ];
  return (
    <Box bgcolor="#111217" className="fullHeightBox" p={2}>
      <List>
        {listArray.map((listElement) => (
          <ListItem key={listElement.name}>
            <ListItemButton component={Link} to={listElement.link}>
              <ListItemIcon>{listElement.icon}</ListItemIcon>
              <ListItemText
                primary={listElement.name}
                sx={{ color: "white" }}
              ></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
