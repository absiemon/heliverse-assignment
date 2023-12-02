import React, { useState, useContext, useEffect } from 'react';
import UserState from '../Context/Users/UserContext';

import User from './User';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Header = (props) => {
  const context = useContext(UserState);
  const { } = context;


  return (
    <>
      <div className="container mt-3 header_small">
        <div className="ui massive secondary menu">
          <Link to="/">
            <Button variant="contained" >
            Home
          </Button>
          </Link>
          <Link to="/Teams" className='mx-2'>
            <Button variant="contained" >
            Create Team
          </Button>
          </Link>

          <Link to="/AllTeam">
            <Button variant="contained">
            View Team
          </Button>
          </Link>
        </div>
      </div>

      <User />
    </>
  );
};

export default Header;
