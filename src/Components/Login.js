import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { TextField, Button, Typography, Card, Box } from "@mui/material"
import * as Yup from 'yup';
import { useFormik } from 'formik';




const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/(?=.*[a-z])(?=.*[A-Z])/, "Must include uppercase and lowercase letters")
        .matches(/\d/, "Must include at least one number")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Must include one special character"),
});


const Login = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: "",
        password: "",
    });


    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit:(values)=>{
            const loggeduser = JSON.parse(localStorage.getItem("user"));

            if (values.email == loggeduser.email && values.password == loggeduser.password) {
                localStorage.setItem("loggeduser", true)
                navigate("/")
            }
            else {
                alert("wrong Email or Password")
            } 
        },
    });

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     const loggeduser = JSON.parse(localStorage.getItem("user"));

    //     if (input.email == loggeduser.email && input.password == loggeduser.password) {
    //         localStorage.setItem("loggeduser", true)
    //         navigate("/")
    //     }
    //     else {
    //         alert("wrong Email or Password")
    //     }
    // };
    return (

        <>
            <section>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh", // Full viewport height
                        backgroundImage:"url('D:\Webito\ex-mui\mui\src\Components\pexels-jplenio-1103970.jpg')"
                    }}
                >
                    {/* <div className='mask d-flex align-item-center h-100 gradient-custom-3'>
                <div className='container h-100'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-12 col-md-9 col-lg-7 col-xl-6'>
                            <div className='card' style={{borderRadius:"15px"}}>
                                <div className='card-body p-5'> */}
                    <Card
                        sx={{ maxWidth: 300, p: 2 }}
                    >
                        <Typography variant="h3" sx={{textTransform: "uppercase" }}>
                            Login
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Typography component="div"
                            // className='form-outline mb-4'
                            >
                                <TextField
                                    label="Email"
                                    name='email'
                                    margin="dense"
                                    // required
                                    variant="outlined"
                                    value={formik.values.email}
                                    // onChange={(e) => setInput({
                                    //     ...input, [e.target.name]: e.target.value,
                                    // })}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    // type='email'
                                    // id='form3Example3cg'
                                    // className='form-control form-control-lg'
                                />
                                {/* <label className='form-label' htmlFor='form3Example3cg'>Your Email</label> */}
                            </Typography>

                            <Typography
                                component="div"
                            //  className='form-outline mb-4'
                            >
                                <TextField
                                    required
                                    margin="dense"
                                    label="Password"
                                    variant="outlined"
                                    name='password'
                                    value={input.password}
                                    onChange={(e) => setInput({
                                        ...input, [e.target.name]: e.target.value,
                                    })}
                                    type='Password'
                                    id='form3Example4cg'
                                // className='form-control form-control-lg'
                                />
                                {/* <label className='form-label' htmlFor='form3Example4cg'>Password</label> */}
                            </Typography>
                            <Typography
                                component="div"
                            // className='d-flex justify-content-center'
                            >
                                <Button
                                    sx={{ mt: 2 }}
                                    margin="dense"
                                    variant="contained"
                                    type='submit'
                                // className='btn btn-success btn-block btn-lg gradient-custom-4 text-body text-white'
                                >Login</Button>

                            </Typography>
                            <Typography
                                variant='p'
                                sx={{ mt: 2 }}
                            // className='text-center text-muted mt-5 mb-0'
                            >
                                Don't have an account?
                                <Link to="/register" className='fw-bild text-body'>
                                    <u>Register here</u></Link>
                            </Typography>
                        </form>
                        {/* </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div> */}
                    </Card>
                </Box>
            </section>
        </>
    )
}

export default Login