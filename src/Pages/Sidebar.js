import React, { useState } from 'react'
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SecurityIcon from "@mui/icons-material/Security";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";


const Sidebar = () => {
    const[openbar,setOpenBar]=useState(false);
    const navigate = useNavigate();
    const toggleDrawer = (state) => () => {
        setOpenBar(state);
      };


      const handleNavigation = (path) => {
        navigate(path);
        setOpenBar(false);
      };
  return (

<>
    <IconButton onClick={toggleDrawer(true)}>
    <MenuIcon />
  </IconButton>
    <Drawer anchor="left" open={openbar} onClose={toggleDrawer(false)}>
    <Box sx={{ width: 250 }}>
    <Box display="flex" justifyContent="flex-end" p={1}>
    <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
  
    </Box>
    
        
    <List sx={{ width: 250 }}>
      <ListItem disablePadding>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton  onClick={() => navigate("/contact")}>
          <ListItemIcon><SecurityIcon /></ListItemIcon>
          <ListItemText primary="Contect" />
        </ListItemButton>
      </ListItem>

     
    </List>
    </Box>
  </Drawer>
  </>
  )
}

export default Sidebar