import React, { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";

import Appbar from "../MUI-components/Appbar";
import MyDrawer from "../MUI-components/Drawer";
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "../styles/MyTheme";

export default function Root() {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  const drawerWidth = 240;
  const [displayMenu, setDisplayMenu] = useState("none");
  const darkTheme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <Appbar {...{ drawerWidth, setDisplayMenu }} />
        <MyDrawer {...{ drawerWidth, setMode, displayMenu, setDisplayMenu }} />
        <Box
          component="main"
          sx={{
            ml: { md: `${drawerWidth}px` },
            display: "flex",
            justifyContent: "center",
            mt: "66px",
          }}
        >
          <Outlet />
        </Box>
      </div>
    </ThemeProvider>
  );
}
