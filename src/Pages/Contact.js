import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, Stack, IconButton, Avatar, Menu, MenuItem, Card, CardContent } from "@mui/material";

const Contact = () => {
    const [submittedData, setSubmittedData] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        setSubmittedData(formData);
        setFormData({ name: "", email: "", subject: "", message: "" }); 
    };

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: "#ba68c8" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Sidebar />
                        Employee Dashboard
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton>
                            <Avatar sx={{ bgcolor: "primary.main", color: "white" }}></Avatar>
                        </IconButton>
                        <Button variant="contained" color="secondary">
                            Add User
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm">
                <Box
                    sx={{
                        mt: 4,
                        p: 3,
                        boxShadow: 3,
                        borderRadius: 2,
                        backgroundColor: "#fff",
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom>
                        Contact Us
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        variant="outlined"
                        margin="normal"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        variant="outlined"
                        margin="normal"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        value={formData.message}
                        onChange={handleChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSubmit}
                    >
                        Send Message
                    </Button>
                </Box>

                {submittedData && (
                    <Card sx={{ mt: 4, p: 2 }}>
                        <CardContent>
                            <Typography variant="h5">Submitted Data</Typography>
                            <Typography>Name:{submittedData.name}</Typography>
                            <Typography>Email:{submittedData.email}</Typography>
                            <Typography>Subject: {submittedData.subject}</Typography>
                            <Typography>Message: {submittedData.message}</Typography>
                        </CardContent>
                    </Card>
                )}
            </Container>
        </>
    );
};

export default Contact;
