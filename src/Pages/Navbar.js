// import React, { useEffect, useState } from 'react'
// import { AppBar, Toolbar, Button, Avatar, Menu, MenuItem, IconButton, Typography, Stack } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {


//     const navigate = useNavigate()
//     const userName = JSON.parse(localStorage.getItem("user"));
   
//     const handleLogout = () => {
//         localStorage.removeItem("loggeduser");
//         navigate("/login")
//     }


//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);

//     const handleMenuOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };
//   return (
//     <>
//           <AppBar position="static">
//                 <Toolbar>
//                     <Typography variant="h6" sx={{ flexGrow: 1 }}>
//                         Threat Intelligence Platform
//                     </Typography>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                         <IconButton onClick={handleMenuOpen}>
//                             <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>
//                                 {userName?.name?.charAt(0).toUpperCase()}
//                             </Avatar>
//                         </IconButton>
//                         <Button variant="contained" color="secondary" onClick={() => setShowForm(true)}>
//                             Add User
//                         </Button>
//                     </Stack>
//                 </Toolbar>
//             </AppBar>

//             {/* Menu Dropdown */}
//             <Menu
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleMenuClose}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                 transformOrigin={{ vertical: "top", horizontal: "right" }}
//             >
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>

//     </>
//   )
// }

// export default Navbar