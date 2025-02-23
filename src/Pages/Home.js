import { Button, TextField, Typography,DialogTitle,Dialog,DialogContent,Autocomplete, Checkbox, FormGroup, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, TableCell, TableBody, TableContainer, Paper, Table, TableHead, TableRow, Stack, } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const userName = JSON.parse(localStorage.getItem("user"));
    const handleLogout = () => {
        localStorage.removeItem("loggeduser");
        navigate("/login")
    }

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

    const handelChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormdata((prev) => ({
                ...prev,
                check: checked
                    ? [...prev.check, value]  // Add selected checkbox to array
                    : prev.check.filter((item) => item !== value),  // Remove unchecked item
            }));
        } else {
            // console.log("e",e.target.value);
            setFormdata({ ...formdata, [e.target.name]: e.target.value })
        }
    };


    const validateForm = () => {
        let errors = {};
        if (!formdata.name.trim()) errors.name = "Name is required";
        if (!formdata.address.trim()) errors.address = "Address is required";
        if (!formdata.select) errors.select = "city selection is required";
        if (!formdata.radio) errors.radio = "Please select the Gender";
        if (!formdata.check) errors.check = "Please select at least one Language";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    // console.log("formdata",formdata)


    const formdataSubmit = (e) => {
        e.preventDefault();
        console.log("first", e.target.value)

        if (!validateForm()) return;
        if (editIndex !== null) {
            const updatedData = userData.map((item, index) =>
                index === editIndex ? formdata : item
            );
            setUserData(updatedData);
            setEditIndex(null);
        }
        else {

            console.log("data", formdata)
            setUserData([...userData, formdata])
        }
        setShowForm(false);
        setFormdata({ name: "", address: "", select: "", check: [], radio: "" });
    }

    useEffect(() => {
        console.log("userData", userData)
    }, [userData]);

    const handleDelete = (id) => {
        // console.log("dlete",id);
        const filterData = userData.filter((item, i) => (
            i != id
        ))
        setUserData(filterData)
    }

    const handelEdit = (item, index) => {
        // console.log("item",item);
        // console.log("index",index)
        setFormdata({
            name: item.name,
            address: item.address,
            select: item.select,
            check: item.check || [],  // Ensure checkboxes are stored as an array
            radio: item.radio,
        });
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
        { label: 'Surat', year: 1994 },
        { label: 'Ahemdabad', year: 1972 },
        { label: 'Vadodara', year: 1974 },
        { label: 'Mumbai', year: 2008 },
        { label: 'Bangalore', year: 1957 },
        { label: "Gandhinagar", year: 1993 },
        { label: 'Pune', year: 1994 },
    ];


    return (
        <>


            {/* <Typography component="div"> */}
            <Stack direction="row" justifyContent="end">
                <Button
                    // margin="dense"
                    variant='contained'
                    // type="submit"
                    onClick={() => setShowForm(true)}>Add User</Button>
                    </Stack>
            {/* </Typography> */}

            <Dialog open={showForm} onClose={() => setShowForm(false)} fullWidth maxWidth="sm">
                <DialogTitle>{editIndex !== null ? "Edit User" : "New User"}</DialogTitle>
                <DialogContent>

                <form >
                    <Typography component='h2'>
                        Employee Form
                    </Typography>

                    <Typography component="div">
                        <TextField
                        fullWidth
                            type="text"
                            name='name'
                            label='Name'
                            placeholder='Enter the name'
                            margin="dense"
                            value={formdata.name}
                            onChange={handelChange}
                        />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
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
                            value={formdata.address}
                            onChange={handelChange}>

                        </TextField>
                        {errors.address && <p className="text-danger">{errors.address}</p>}
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
                            value={city().find((c) => c.label === formdata.select) || null}
                            onChange={(event, newValue) => {
                                setFormdata({ ...formdata, select: newValue ? newValue.label : "" });
                            }}
                            renderInput={(params) => <TextField {...params} label="City" />}
                        >
                        </Autocomplete>
                        {errors.select && <p className="text-danger">{errors.select}</p>}

                        <FormGroup>
                            <FormLabel>
                                Language
                            </FormLabel>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="JavaScript"
                                value="JavaScript"
                                checked={formdata.check.includes("JavaScript")}
                                name="check"
                                onChange={handelChange}
                            />
                        </FormGroup>


                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="React JS"
                                value="React JS"
                                checked={formdata.check.includes("React JS")}
                                name="check"
                                onChange={handelChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Python"
                                value="Python"
                                checked={formdata.check.includes("Python")}
                                name="check"
                                onChange={handelChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Cyber Security"
                                value="Cyber Security"
                                checked={formdata.check.includes("Cyber Security")}
                                name="check"
                                onChange={handelChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="UI/UX"
                                value="UI/UX"
                                checked={formdata.check.includes("UI/UX")}
                                name="check"
                                onChange={handelChange}
                            />
                        </FormGroup>


                        {errors.select && <p className="text-danger">{errors.select}</p>}
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
                                    control={<Radio />} label="Female"
                                    checked={formdata.radio === "Female"} onChange={handelChange}

                                />
                                <FormControlLabel
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    value="Male"
                                    checked={formdata.radio === "Male"}
                                    name="radio"
                                    control={<Radio />} label="Male"
                                    onChange={handelChange}
                                />
                            </RadioGroup>
                        </FormControl>

                        {errors.radio && <p className="text-danger">{errors.radio}</p>}
                    </Typography>
                    <Typography component="div">
                        <Button
                            variant='contained'
                            //  class="btn btn-primary" 
                            type='submit'
                            onClick={formdataSubmit}>
                            {editIndex !== null ? "Update" : "Submit"}
                        </Button>
                    </Typography>
                </form>
                </DialogContent>
                </Dialog>
        
        <Stack direction="row" justifyContent="end">

            <Button
            variant='contained'
                onClick={handleLogout}
                sx={{
                }}
            // type='submit'
            // class='btn btn-success btn-block btn-lg gradient-custom-4 text-body center' 
            >
                Logout
            </Button>
        </Stack>
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


{!showForm&&(


            <TableContainer component={Paper} sx={{mt:4}}>
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
                            userData.map((item, i) => {
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
                                            <Button className='btn btn-info' onClick={() => handleDelete(i)}>Delete</Button>
                                            </Stack>
                                        </TableCell>

                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
)}
        </>
    )
}

export default Home