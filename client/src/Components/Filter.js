import React, { useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import UserState from '../Context/Users/UserContext';


const Filter = (props) => {
    const showModal = props.isModal;
    const context = useContext(UserState);
    const { isFixed, setIsFixed, filter, setFilter, getUser} = context;

    const domain = [
        {
            value: 'Business Development',
            label: 'Business Development',
        },
        {
            value: 'Finance',
            label: 'Finance',
        },
        {
            value: 'IT',
            label: 'IT',
        },
        {
            value: 'Management',
            label: 'Management',
        },
        {
            value: 'Sales',
            label: 'Sales',
        },
        {
            value: 'UI Designing',
            label: 'UI Designing',
        }
    ];
    const gender = [
        {
            value: 'Agender',
            label: 'Agender',
        },
        {
            value: 'Bigender',
            label: 'Bigender',
        },
        {
            value: 'Female',
            label: 'Female',
        },
        {
            value: 'Genderfluid',
            label: 'Genderfluid',
        },
        {
            value: 'Genderqueer',
            label: 'Genderqueer',
        },
        {
            value: 'Male',
            label: 'Male',
        },
        {
            value: 'Non-binary',
            label: 'Non-binary',
        },
        {
            value: 'Polygender',
            label: 'Polygender',
        }
    ];
    const available = [
        {
            value: 'true',
            label: 'true',
        },
        {
            value: 'false',
            label: 'false',
        }
    ];
    

    window.addEventListener("resize", ()=>{
        if(window.screen.width < 760){
            setIsFixed(false);
        }
    });
    useEffect(() => {
        const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
            const isScrolled = scrollY > 151;
            setIsFixed(isScrolled);
        };

        const handleResize = () => {
            // Reattach the event listener when the screen size changes
            if (window.innerWidth > 760) {
              window.addEventListener('scroll', handleScroll);
            } else {
              window.removeEventListener('scroll', handleScroll);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
        
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        getUser("", {});
        // setFilter({ domain: "", gender: "", available: "" })
    }

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }
    return (
        <>
            {showModal && (
            <div className="modal fade" id="filterModal" tabIndex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="filterModalLabel">Filter</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Grid item xs={10} sm={8} md={5} component={Paper} elevation={6} square>
                                <Box
                                    sx={{
                                        my: 8,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="doamin"
                                            name='domain'
                                            value={filter.domain}
                                            select
                                            label="Domain"
                                            // helperText="Please select domain"
                                            onChange={handleFilterChange}
                                        >
                                            {domain.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="gender"
                                            name="gender"
                                            select
                                            label="Gender"
                                            defaultValue=""
                                            value={filter.gender}
                                            onChange={handleFilterChange}
                                            // helperText="Please select gender"
                                        >
                                            {gender.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="available"
                                            name="available"
                                            select
                                            label="Available"
                                            defaultValue=""
                                            value={filter.available}
                                            onChange={handleFilterChange}
                                            // helperText="Please select availability"
                                        >
                                            {available.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            data-bs-dismiss="modal"
                                        >
                                            Apply filter
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>)}
            {!showModal && (
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
            style={{
                position: isFixed ? 'fixed' : 'relative',
                transform: isFixed ? 'translateY(-111px)' : 'translateY(0)',
                width: '100%',
                zIndex: 1000,
                transition: 'transform 0.4s ease-in-out',
                background: "linear-gradient(170deg, rgb(236, 239, 239) 0%, rgb(255, 235, 176) 100%)"
              }}
              >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ pt: 5 }} component="h1" variant="h5">
                        <i className="filter icon"></i> Filter
                    </Typography>
                    <Box component="form" 
                        onSubmit={handleSubmit} 
                        style={{display:'flex', gap: '20px', width: '100%', alignItems:'center'}}
                        noValidate sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            id="doamin"
                            name='domain'
                            value={filter.domain}
                            select
                            label="Domain"
                            onChange={handleFilterChange}
                        >
                            {domain.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="gender"
                            name="gender"
                            select
                            label="Gender"
                            defaultValue=""
                            value={filter.gender}
                            onChange={handleFilterChange}
                        >
                            {gender.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="available"
                            name="available"
                            select
                            label="Available"
                            defaultValue=""
                            value={filter.available}
                            onChange={handleFilterChange}
                        >
                            {available.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            // sx={{ mt: 3, mb: 2 }}
                            style={{padding:'16px 17px', marginTop:'7px'}}
                        >
                            Apply filter
                        </Button>
                    </Box>
                </Box>
            </Grid>)}
        </>
    )
}

export default Filter