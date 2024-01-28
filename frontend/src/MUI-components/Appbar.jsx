import React from "react";
import { Avatar, Link, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

export default function Appbar({drawerWidth,setDisplayMenu}) {
  return (
      <AppBar
        position="static"
        sx={{ ml:{md:`${drawerWidth}px`}, width:{md:`calc(100% - ${drawerWidth}px)`}}}
      >
        
        <Toolbar>
          <IconButton sx={{display: {md:'none'},mr:'10px', color:'white'}} onClick={()=>{
            setDisplayMenu( 'block' )
          }}>
            <Menu/>
          </IconButton>
          <Link
            href="/"
            color="inherit"
            sx={{ flexGrow: 1, "&:hover": { fontSize: "17px" } }}
            underline="none"
          >
            Online Store
          </Link>
          <Typography mr={2} color="inherit">
            Motra
          </Typography>
          <Avatar
            alt="Motra"
            src="https://res.cloudinary.com/dxf6qicwj/image/upload/v1685960356/home3_d9tsaz.png"
          />
        </Toolbar>
      </AppBar>
  );
}
  