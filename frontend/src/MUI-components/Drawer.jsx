import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { Box, IconButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


export default function MyDrawer({
  drawerWidth,
  setMode,
  displayMenu,
  setDisplayMenu,
}) {
  const nav = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const { selectedProducts } = useSelector((state) => state.cart);



  const myList = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    {
      text: "Cart",
      icon: (
        <StyledBadge badgeContent={selectedProducts.length} color="primary">
          <ShoppingCartIcon />
        </StyledBadge>
      ),
      path: "/cart",
    },
  ];
  return (
    <Box component="nav">
      <Drawer
        sx={{
          display: { xs: displayMenu, md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant={displayMenu === "none" ? "permanent" : "temporary"}
        anchor="left"
        open={true}
        onClose={() => {
          setDisplayMenu("none");
        }}
      >
        <IconButton
          sx={{ width: "fit-content", margin: "11px auto" }}
          onClick={() => {
            const modeToogle = theme.palette.mode === "dark" ? "light" : "dark";
            localStorage.setItem("mode", modeToogle);
            setMode(modeToogle);
          }}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7 sx={{ color: "orange" }} />
          ) : (
            <Brightness4 />
          )}
        </IconButton>{" "}
        <Divider />
        <List>
          {myList.map((el, i) => (
            <ListItem key={i} disablePadding>
              <ListItemButton
                sx={{
                  bgcolor:
                    el.path === location.pathname &&
                    theme.palette.newColor.main,
                }}
                onClick={() => {
                  setDisplayMenu("none");
                  nav(el.path);
                }}
              >
                <ListItemIcon color="primary">{el.icon}</ListItemIcon>
                <ListItemText primary={el.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
