import {
    Button, TextField, Typography, DialogActions, Snackbar, Alert, DialogTitle, Dialog, DialogContent, Autocomplete, Checkbox, FormGroup, Avatar, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, TableCell, TableBody, TableContainer, Paper, Table, TableHead, TableRow, Stack,
    Menu, MenuItem, IconButton, AppBar, Toolbar, Pagination
} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Sidebar from './Sidebar';
// import Contact from './Pages/Contact'

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    address: Yup.string().required("Address is required"),
    select: Yup.string().required("City selection is required"),
    radio: Yup.string().required("Please select a Gender"),
    check: Yup.array().min(1, "Please select at least one Language"),
});




const Home = () => {
    const navigate = useNavigate()
    const userName = JSON.parse(localStorage.getItem("user"));

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("loggeduser");
        navigate("/login")
    }

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");


    const showAlert = (message, severity = "success") => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };


    const formik = useFormik({
        initialValues: { name: "", address: "", select: "", check: [], radio: "" },
        validationSchema,
        onSubmit: (values) => {
            if (editIndex !== null) {
                const updatedData = userData.map((item, index) => index === editIndex ? values : item);
                setUserData(updatedData);
                setEditIndex(null);
                showAlert("User data updated successfully!", "info");
            } else {
                setUserData([...userData, values]);
                showAlert("User added successfully!", "success");
            }
            setShowForm(false);
            formik.resetForm();
        }
    });



    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [formdata, setFormdata] = useState({
        name: "",
        address: "",
        select: "",
        check: [],
        radio: "",

    });



    const [errors, setErrors] = useState({});
    const [userData, setUserData] = useState([]);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // const handelChange = (e) => {
    //     const { name, value, type, checked } = e.target;

    //     if (type === "checkbox") {
    //         setFormdata((prev) => ({
    //             ...prev,
    //             check: checked
    //                 ? [...prev.check, value]  // Add selected checkbox to array
    //                 : prev.check.filter((item) => item !== value),  // Remove unchecked item
    //         }));
    //     } else {
    //         // console.log("e",e.target.value);
    //         setFormdata({ ...formdata, [e.target.name]: e.target.value })
    //     }
    // }

    const [currentPage, setCurrentPage] = useState(1);


    const itemsPerPage = 5;
    const totalPages = Math.ceil(userData.length / itemsPerPage);
    const paginatedData = userData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    const confirmDelete = (index) => {
        setDeleteIndex(index);
        setDeleteDialogOpen(true);
    };

    const handleDelete = (id) => {
        setUserData(userData.filter((item, i) => (
            // i != id
            i !== deleteIndex
        )))
        setDeleteIndex(null);
        setDeleteDialogOpen(false);
        showAlert("User deleted successfully!", "error");
        // console.log("dlete",id);
        // const filterData = userData.filter((item, i) => (
        //     i != id
        // ))
        // setUserData(filterData)
    }

    const handelEdit = (item, index) => {
        // console.log("item",item);
        // console.log("index",index)
        formik.setValues(item);
        setEditIndex(index);
        setShowForm(true);

    }

    // const formdataSubmit = () => {
    //     console.log("first", formdataSubmit)
    // }
    const handleContect = () => {
        localStorage.removeItem("loggeduser");
        navigate("/contect")
    }


    const city = () => [
        { label: 'Surat' },
        { label: 'Ahemdabad' },
        { label: 'Vadodara' },
        { label: 'Mumbai' },
        { label: 'Bangalore' },
        { label: "Gandhinagar" },
        { label: 'Pune' },
    ];




    return (
        <>



            {/* <Contact/> */}
            <AppBar position="static" sx={{ bgcolor: "#ba68c8" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Sidebar></Sidebar>
                        {/* <Contact></Contact> */}
                        Employee Dashboard
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton onClick={handleMenuOpen}>
                            <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>
                                {userName?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>
                        <Button variant="contained" color="secondary" onClick={() => setShowForm(true)}>
                            Add User
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Menu Dropdown */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>



            {/* <Typography component="div"> */}

            {/* <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton onClick={handleMenuOpen}>
                    <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>
                        {userName?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    </IconButton>
                   
                </Stack>
                 <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => setShowForm(true)}>Add User</Button> */}
            {/* <Button variant="contained" color="error" onClick={handleLogout}>Logout</Button> */}
            {/* </Stack>
            </Stack> */}




            <Dialog open={showForm} onClose={() => setShowForm(false)} fullWidth maxWidth="sm">
                <DialogTitle>{editIndex !== null ? "Edit User" : "New User"}</DialogTitle>
                <DialogContent>

                    <form onSubmit={formik.handleSubmit} >
                        <Typography component='h2'>
                            Employee Form
                        </Typography>

                        <Typography component="div">
                            <TextField
                                fullWidth
                                // type="text"
                                name='name'
                                label='Name'
                                placeholder='Enter the name'
                                margin="dense"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Typography>
                        <Typography>
                            <TextField
                                fullWidth
                                margin="dense"
                                name='address'
                                label='Address'
                                placeholder='123,acbsocity'
                                multiline
                                rows={3}
                                maxRows={5}
                                value={formik.values.address}
                                // onChange={handelChange}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                            />
                        </Typography>

                        <Typography component="div">
                            <Autocomplete
                                fullWidth
                                name='select'

                                // onChange={handelChange}
                                placeholder='Select the City'
                                margin="dense"

                                options={city()}
                                getOptionLabel={(option) => option.label}
                                value={city().find((c) => c.label === formik.values.select) || null}
                                // onChange={(event, newValue) => {
                                //     setFormdata({ ...formdata, select: newValue ? newValue.label : "" });
                                // }}
                                onChange={(e, newValue) => formik.setFieldValue("select", newValue ? newValue.label : "")}
                                renderInput={(params) => <TextField {...params} label="City"
                                    error={formik.touched.select && Boolean(formik.errors.select)}
                                    helperText={formik.touched.select && formik.errors.select} />}
                            />
                        </Typography>
                        <Typography>
                            <FormGroup>
                                <FormLabel>
                                    Language
                                </FormLabel>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="JavaScript"
                                    value="JavaScript"
                                    checked={formik.values.check.includes("JavaScript")}
                                    name="check"
                                    // onChange={handelChange}
                                    onChange={formik.handleChange}
                                />
                            </FormGroup>


                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="React JS"
                                    value="React JS"
                                    checked={formik.values.check.includes("React JS")}
                                    name="check"
                                    // onChange={handelChange}
                                    onChange={formik.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Python"
                                    value="Python"
                                    checked={formik.values.check.includes("Python")}
                                    name="check"
                                    // onChange={handelChange}
                                    onChange={formik.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Cyber Security"
                                    value="Cyber Security"
                                    checked={formik.values.check.includes("Cyber Security")}
                                    name="check"
                                    // onChange={handelChange}
                                    onChange={formik.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="UI/UX"
                                    value="UI/UX"
                                    checked={formik.values.check.includes("UI/UX")}
                                    name="check"
                                    // onChange={handelChange}
                                    onChange={formik.handleChange}
                                />
                            </FormGroup>

                            {formik.touched.check && formik.errors.check && <Typography color="error">{formik.errors.check}</Typography>}
                        </Typography>

                        <Typography component="div">
                            <FormControl>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >

                                    <FormControlLabel
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        value="Female"
                                        name="radio"
                                        control={<Radio />}
                                        label="Female"
                                        // checked={formdata.radio === "Female"}
                                        checked={formik.values.radio === "Female"}
                                        //  onChange={handelChange}
                                        onChange={formik.handleChange}

                                    />
                                    <FormControlLabel
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        value="Male"
                                        checked={formik.values.radio === "Male"}
                                        name="radio"
                                        control={<Radio />}
                                        label="Male"
                                        // onChange={handelChange}
                                        onChange={formik.handleChange}
                                    />
                                </RadioGroup>
                            </FormControl>
                            {formik.touched.radio && formik.errors.radio && <Typography color="error">{formik.errors.radio}</Typography>}
                            {/* {errors.radio && <p className="text-danger">{errors.radio}</p>} */}
                        </Typography>
                        <Typography component="div">
                            <Button
                                variant='contained'
                                //  class="btn btn-primary" 
                                type='submit'
                            // onClick={formdataSubmit}
                            >
                                {editIndex !== null ? "Update" : "Submit"}
                            </Button>
                        </Typography>
                    </form>
                </DialogContent>
            </Dialog >


            {/* <button
                                   onClick={handleContect}
                                    type='submit'
                                    class='btn btn-success btn-block btn-lg gradient-custom-4 text-body center' 
                                    >
                                        Contect
                                    </button> */}

            {/* </div> */}
            <section>
                {/* <div className='mask d-flex align-item-center h-100 gradient-custom-3'>
                <div className='container h-100'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-12 col-md-9 col-lg-7 col-xl-6'>
                            <div className='card' style={{ borderRadius: "15px" }}>
                                <div className='card-body p-5'>
                                    <h2 className='text-uppercase text-center mb-5'>
                                        Home Page
                                    </h2>
                                    <p className='text-center'> Welcome To Home Page -{userName.name}</p>

                                    <button class="btn btn-primary" type="submit">New User</button>
                                    <button
                                    onClick={handleLogout}
                                    type='submit'
                                    class='btn btn-success btn-block btn-lg gradient-custom-4 text-body center' 
                                    >
                                        Logout
                                    </button>
                                    <button
                                   onClick={handleContect}
                                    type='submit'
                                    class='btn btn-success btn-block btn-lg gradient-custom-4 text-body center' 
                                    >
                                        Contect
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            </section>


            {
                !showForm && (


                    <TableContainer component={Paper} sx={{ mt: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>City</TableCell>
                                    <TableCell>Languages</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    // userData.map((item, i) => {
                                    paginatedData.map((item, i) => {
                                        return (
                                            <TableRow key={i} >

                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.address}</TableCell>
                                                <TableCell>{item.select}</TableCell>
                                                <TableCell>{item.check.join(",")}</TableCell>
                                                <TableCell>{item.radio}</TableCell>
                                                <TableCell>
                                                    <Stack direction="row" spacing={1}>
                                                        <Button className='btn btn-info mx-3' onClick={() => handelEdit(item, i)}>Edit</Button>
                                                        <Button className='btn btn-info' onClick={() => confirmDelete(i)}>Delete</Button>
                                                    </Stack>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                        {userData.length > itemsPerPage && (
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                                sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                            />
                        )}
                    </TableContainer>
                )
            }



            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} variant="filled">
                    {alertMessage}
                </Alert>
            </Snackbar>


            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>Are you sure you want to delete this user?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Home