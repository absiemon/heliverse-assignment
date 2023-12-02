import React, { useContext, useState, useRef } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import UserState from '../Context/Users/UserContext';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Avatar, Button } from '@mui/material';
import UserEditModal from './UserEditModal';

const Useritem = React.memo((props) => {
    const [updateUser, setUpdateUser] = useState({
        _id: "",
        eid: "",
        efirst_name: "",
        elast_name: "",
        eemail: "",
        egender: "",
        eavatar: "",
        edomain: "",
        eavailable: ""
    });

    const { user } = props;
    const { first_name, last_name, email, gender, domain, available, avatar } = user;
    const context = useContext(UserState);
    const { userUpdate, deleteUser} = context;


    const handleClick = (id) => {
        setUpdateUser((prev)=>{
            const newState = {
                ...prev,
                _id: user?._id,
                eid: user.id,
                efirst_name: user.first_name,
                elast_name: user.last_name,
                egender: user.gender,
                eavatar: user.avatar,
                edomain: user.domain,
                eavailable: user.available,
            };
            return newState
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateUser.eavailable = String(true) === updateUser.eavailable
        userUpdate(updateUser);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteUser(id)
        } else {
        }
    }

    const handleChange = (e) => {
        console.log(e.target.value)
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    }
    return (
        <>
            <UserEditModal handleChange={handleChange} updateUser={user} handleSubmit={handleSubmit}/>

            <div className="my-3">
                <div className="ui cards" style={{width:'280px'}}>
                    <div className="green card">
                        <div className="content">
                            <div className="header mt-2" style={{ display: 'flex', gap: '20px', alignItems: 'center', flexDirection: 'column' }}>
                                <Avatar src={avatar} alt="profileImage" style={{ backgroundColor: '#f58b8b', height: '60px', width: '60px' }} />
                                {first_name} {last_name}
                                {/* <i className="envelope icon"></i> */}
                            </div>
                            <p style={{
                                textAlign: "center",
                                marginTop: "10px",
                                fontSize: "16px",
                                color: "#8d8686cc",
                                fontWeight: "600"
                            }}> {email} </p>
                            <div className="description" style={{ marginTop: '20px', fontSize: "16px" }}>
                                <p><i className={`${(gender === "Male" ? "male" : "female")} icon`}></i> {gender} </p>
                                <p><WorkIcon /> {domain}</p>
                                <p><i className="circle icon" style={(available === true) ? { color: "green" } : { color: "red" }}></i>{(available === true) ? "Available" : "Not Available"} </p>
                            </div>
                        </div>
                        <div className="extra content">
                            <div className="ui two buttons" style={{ gap: '17px' }}>
                                <Button variant="contained" onClick={() => handleClick(user._id)} data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                    <i className="edit icon" style={{ margin: "0px 7px 11px 2px" }}></i>
                                    Edit
                                </Button>
                                <Button variant="contained" style={{ backgroundColor: 'red' }} onClick={() => { handleDelete(user._id) }}>
                                    <i className="trash icon" style={{ margin: "0px 7px 11px 2px" }}></i>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Useritem