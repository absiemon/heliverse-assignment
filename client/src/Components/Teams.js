import React, { useState, useEffect, useContext } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import UserState from '../Context/Users/UserContext';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TeamUserItem from './TeamUserItem';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

const Team = () => {
    const context = useContext(UserState);
    const {  getAllAvailable, selectedUsers, teamSubmit, user, setCurrentPage, currentPage, totalPages, team, setTeam, loading } = context;

    useEffect(() => {
        setCurrentPage(1);
    }, [])

    useEffect(() => {
        getAllAvailable();
    }, [currentPage]);

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            if(!team.teamName || !team.description ){
                alert("Please fill all inputs")
                return;
            }
            if(selectedUsers.length === 0){
                alert("Please select at least one team member")
                return;
            }
            const updatedTeam = { ...team, member: selectedUsers };
            teamSubmit(updatedTeam);

        }
        catch (error) {
            console.error("Error submitting data:", error);
        }
    }
    const handleChange = (e) => {
        setTeam({ ...team, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="container mt-3">
                <div className="ui massive secondary menu">
                    <Link to="/">
                        <Button variant="contained">
                        Home
                    </Button>
                    </Link>
                    <Link to="/AllTeam">
                    <Button variant="contained" className='mx-2'>
                        View Team
                    </Button>
                    </Link>
                </div>
            </div>
            <div className=" container my-5 " >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <h1>create team</h1>
                    <div className="container">
                        <div className="d-flex justify-content-between ">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="teamName"
                                    required
                                    fullWidth
                                    type="text"
                                    id="teamName"
                                    label="Team Name"
                                    value={team.teamName}
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    type='text'
                                    label="Description"
                                    name="description"
                                    value={team.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                create Team
                            </Button>
                        </div>
                    </div>
                    {loading ?
                        <div style={{ marginTop: '50px' }}>
                            <p style={{
                                textAlign: "center",
                                fontSize: "20px",
                                fontWeight: "500",
                                color: "#413c3cc",
                            }}
                            >Fetching user..</p>
                            <LinearProgress />
                        </div>
                        :
                        <>
                            <div className="row">
                                {user.map((user) => (
                                    <div className="col-md-3" key={user.id}>
                                        <TeamUserItem user={user} />
                                    </div>
                                ))}
                            </div>
                            <Stack spacing={3} direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
                                <Pagination count={totalPages} size="large" page={currentPage} onChange={(_, value) => setCurrentPage(value)} />
                            </Stack>
                        </>
                    }
                </Box>
            </div>
        </>
    )
}

export default Team