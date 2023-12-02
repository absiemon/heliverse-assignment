import React, { useState, useEffect, useContext } from 'react'
import UserItem from './UserItem'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import UserState from '../Context/Users/UserContext';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Filter from './Filter';
import Typography from '@mui/material/Typography';
import { Button, LinearProgress } from '@mui/material';
import UserModal from './UserModal';
import {cancel} from './icons.js'


const User = () => {


  const context = useContext(UserState);
  const { user, addUser, getUser, isFixed, currentPage, setCurrentPage, totalPages, loading, totalNoOfUsers, filter, setFilter } = context;
  const [newUser, setNewUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    avatar: "",
    domain: "",
    available: ""
  });

  const [inputVal, setInputVal] = useState("")


  useEffect(() => {
    setCurrentPage(1);
  }, [])

  useEffect(() => {
    getUser(inputVal);
  }, [currentPage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newUser)
    if (!newUser.first_name || !newUser.gender || !newUser.email || !newUser.domain) {
      alert("please fill all inputs");
      return;
    }
    newUser.available = String(true) === newUser.available

    addUser(newUser);
  };

  const handleClick = () => {
    window.location.reload();
  }

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  const handleSearch = () => {
    console.log(inputVal)
    getUser(inputVal)
  }

  const handleSearchQueryChange = (e) => {
    setInputVal(e.target.value)
    if (e.target.value.length === 0) {
      setCurrentPage(1)
      getUser(inputVal);
    }
  }

  const handelCancelFilter = (key)=>{
    setFilter((prev)=>{
      return {
        ...prev, [key]: ""
      }
    })
    getUser(inputVal)
  }

  return (
    <>
      <UserModal handleSubmit={handleSubmit} handleChange={handleChange} />

      <div className='d-md-none my-5 text-center'>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#filterModal">
          <Typography component="h1" variant="h5">
            <i className="filter icon"></i> Filter
          </Typography>
        </button>
        <Filter isModal={true} />
      </div>


      <div className="ui grid " style={{ height: '100vh' }}>
        <div className="four wide column d-sm-none d-md-block d-none d-sm-block my-5">
          <Filter isModal={false} />
        </div>

        <div className='twelve wide ui container' style={{ marginTop: `${isFixed ? "190px" : "0px"}` }}>

          <div className="right menu search_container" style={{ display: 'flex', justifyContent: 'end' }}>
            <div className="ui massive secondary menu">
              <div className="item">
                <div className="ui icon input">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={inputVal}
                    onChange={handleSearchQueryChange}
                  />
                  <i className="search link icon" role='button'
                    onClick={handleSearch}
                  >

                  </i>
                </div>
              </div>
            </div>
          </div>

          <div className="my-5 " >
            <div className="container">
              <div className="d-flex justify-content-between user_info_header" style={{ alignItems: 'center' }}>
                <h1>User Information</h1>

                {filter.domain && <div className='filter_container'>
                  <p style={{margin:'0px'}}>{filter.domain}</p>
                  <div role='button' style={{marginBottom:'3px'}} onClick={()=> handelCancelFilter("domain")}>
                    {cancel}
                  </div>
                </div>}

                {filter.gender && <div className='filter_container'>
                  <p style={{margin:'0px'}}>{filter.gender}</p>
                  <div role='button' style={{marginBottom:'3px'}} onClick={()=> handelCancelFilter("gender")}>
                    {cancel}
                  </div>
                </div>}

                {filter.available && <div className='filter_container'>
                  <p style={{margin:'0px'}}>{filter.available}</p>
                  <div role='button' style={{marginBottom:'3px'}} onClick={()=> handelCancelFilter("available")}>
                    {cancel}
                  </div>
                </div>}


                {totalNoOfUsers && <p style={{ fontWeight: '600', marginBottom: '0px' }}>Total No of users is {totalNoOfUsers}</p>}
                <Button variant="contained" data-bs-toggle="modal" data-bs-target="#addUserModal">
                  <i className="plus icon" style={{ margin: '0px 10px 10px 0px' }}></i>
                  new user
                </Button>
              </div>
            </div>
            {loading ?
              <div style={{ marginTop: '33px' }}>
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
                <div className="row cards_container">
                  {user.map((user) => (
                    <div className="col-md-3" key={user.id}>
                      <UserItem user={user} />
                    </div>
                  ))}
                </div>
                <Stack spacing={3} direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
                  <Pagination count={totalPages} size="large" page={currentPage} onChange={(_, value) => setCurrentPage(value)} />
                </Stack>
              </>
            }

          </div>
        </div>
      </div>

    </>
  );
};

export default User