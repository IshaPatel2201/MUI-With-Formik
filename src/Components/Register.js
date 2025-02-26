import { Button, TextField, Typography, Card, Box, Snackbar, Alert,IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react'
// import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
// import { Formik, Form, Field ,useFormik} from 'formik';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from "@mui/icons-material";


const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/(?=.*[a-z])(?=.*[A-Z])/, "Must include uppercase and lowercase letters")
        .matches(/\d/, "Must include at least one number")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Must include one special character"),
});





const Register = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    // const [input, setInput] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    // });


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            localStorage.setItem('user', JSON.stringify(values));
            setOpenSnackbar(true);
            setTimeout(() => navigate("/login"), 2000);
            // navigate("/login");
        },
    });


    // localStorage
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     localStorage.setItem('user', JSON.stringify(input));
    //     navigate("/login")
    // };
    return (
        <>
            <section>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                        backgroundImage: "url('/images/background.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Card sx={{ maxWidth: 300, p: 2 }}>

                        <Typography variant='h4'>
                            Create an account
                        </Typography>
                        {/* </h2> */}
                        {/* <form onSubmit={handleSubmit} > */}





                        <form
                            onSubmit={formik.handleSubmit}
                        >
                            <Typography
                            // className='form-outline mb-4'
                            >

                                <TextField
                                fullWidth
                                    label="Name"
                                    margin="dense"
                                    // required
                                    name='name'

                                    value={formik.values.name}
                                    // type='text'
                                    // id='form3example1cg'
                                    // onBlur={handleBlur}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                // onChange={(e) => setInput({
                                //     ...input, [e.target.name]: e.target.value,
                                // })}
                                // onChange={(e)=>
                                //         setInput({
                                //             ...input,
                                //             [e.target.name]: e.target.value,
                                //     })
                                // }

                                // className='form-control form-control-lg'
                                />
                                {/* <label className='form-label' htmlFor='form3Example1cg'>Your Name</label> */}
                            </Typography>

                            <Typography className='form-outline mb-4'>
                                <TextField
                                    // required
                                    fullWidth
                                    label='Email'
                                    margin="dense"
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                // onChange={(e) => setInput({
                                //     ...input, [e.target.name]: e.target.value,
                                // })}
                                // type='email'
                                // id='form3Example3cg'
                                // className='form-control form-control-lg'
                                />
                                {/* <label className='form-label' htmlFor='form3Example3cg'>Your Email</label> */}
                            </Typography>

                            <Typography className='form-outline mb-4'>
                                <TextField
                                    // required
                                    fullWidth
                                    margin="dense"
                                    label="Paasword"
                                     type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}

                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                // onChange={(e) => setInput({
                                //     ...input, [e.target.name]: e.target.value,
                                // })}
                                // type='Password'
                                // id='form3Example4cg'
                                // className='form-control form-control-lg'
                                />
                                {/* <label className='form-label' htmlFor='form3Example4cg'>Password</label> */}
                            </Typography>
                            <Typography className='d-flex justify-content-center'>
                                <Button
                                    sx={{ mt: 2 }}
                                    variant="contained"
                                    type='submit'
                                // className='btn btn-success btn-block btn-lg gradient-custom-4 text-body text-white'
                                >
                                    Register
                                </Button>

                            </Typography>

                            <Typography variant='p'>
                                Have already an account?
                                <Link to="/login">
                                    Login here</Link>
                            </Typography>
                        </form>


                    </Card>
                </Box>
                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                        Registration successful Done!
                    </Alert>
                </Snackbar>
            </section>
        </>
    )
}

export default Register