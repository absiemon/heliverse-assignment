import { Box, Grid, TextField } from '@mui/material'
import React, { useContext } from 'react'
import UserState from '../Context/Users/UserContext';


function UserModal({handleSubmit, handleChange, }) {
  const context = useContext(UserState);
  const { totalNoOfUsers } = context;
  return (
    <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addUserModalLabel">Add New User</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Box onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="first_name"
                      type='text'
                      onChange={handleChange}
                      required
                      fullWidth
                      id="first_name"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type='text'
                      onChange={handleChange}
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      required
                      fullWidth
                      onChange={handleChange}
                      type='email'
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      onChange={handleChange}
                      type='number'
                      id="id"
                      label="ID"
                      name="id"
                      autoComplete="family-name"
                      disabled
                      value={(parseInt(totalNoOfUsers) +1).toString()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="gender"
                      type='text'
                      required
                      fullWidth
                      onChange={handleChange}
                      id="gender"
                      label="Gender"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      fullWidth
                      onChange={handleChange}
                      type='text'
                      id="domain"
                      label="Domain"
                      name="domain"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="avail"
                      type="text"
                      required
                      fullWidth
                      id="avail"
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
                      name="url"
                      label="profile url"
                      type="text"
                      id="url"
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary " onClick={handleSubmit} data-bs-dismiss="modal">Add User </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UserModal