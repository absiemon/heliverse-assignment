import { Box, Grid, TextField } from '@mui/material'
import React, { useEffect } from 'react'

function UserEditModal({updateUser, handleChange, handleSubmit}) {

    return (
        <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">User Update</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Box noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="efirst_name"
                                        type='text'
                                        onChange={handleChange}
                                        value={updateUser.first_name}
                                        required
                                        fullWidth
                                        id="efirst_name"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={updateUser.last_name}
                                        type='text'
                                        onChange={handleChange}
                                        id="elast_name"
                                        label="Last Name"
                                        name="elast_name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        name="egender"
                                        type='text'
                                        required
                                        fullWidth
                                        value={updateUser.gender}
                                        onChange={handleChange}
                                        id="egender"
                                        label="Gender"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        onChange={handleChange}
                                        value={updateUser.domain}
                                        type='text'
                                        id="edomain"
                                        label="Domain"
                                        name="edomain"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        name="eavailable"
                                        type="text"
                                        required
                                        fullWidth
                                        value={updateUser.available}
                                        id="eavailable"
                                        onChange={handleChange}
                                        label="Available"
                                        title='true | false'
                                        placeholder='true | false'
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        onChange={handleChange}
                                        value={updateUser.avatar}
                                        name="eavatar"
                                        label="profile url"
                                        type="text"
                                        id="eavatar"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary " onClick={handleSubmit} data-bs-dismiss="modal"> save changes </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserEditModal