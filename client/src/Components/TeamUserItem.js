import React, { useContext, useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import UserState from '../Context/Users/UserContext';
import { Avatar } from '@mui/material';

const TeamUserItem = (props) => {
    const context = useContext(UserState);
    const [isSelect, setSlect] = useState(false);
    const { createTeam } = context;
    const { user } = props;
    const { first_name, last_name, email, gender, domain, available, avatar } = user;
    const handleClick = () => {
        let temp = createTeam(user);
        if(temp!==1){
            setSlect(true);
        }
    }

    return (
        <div>
            <div className="my-3">
                <div className="ui cards">
                    <div className="green card">
                        <div className="content">
                            <div className="header mt-2" style={{display:'flex', gap:'20px', alignItems:'center', flexDirection:'column'}}>
                                <Avatar src={avatar} alt="profileImage" style={{backgroundColor:'#f58b8b', height:'60px', width:'60px'}}/>
                                {first_name} {last_name}
                                {/* <i className="envelope icon"></i> */}
                            </div>
                            <p style={{
                                textAlign:"center",
                                marginTop:"10px",
                                fontSize:"16px",
                                color: "#8d8686cc",
                                fontWeight:"600"
                            }}> {email} </p>
                            <div className="description" style={{ marginTop: '20px', fontSize: "16px" }}>
                                <p><i className={`${(gender === "Male" ? "male" : "female")} icon`}></i> {gender} </p>
                                <p><WorkIcon /> {domain}</p>
                                <p><i className="circle icon" style={(available === true) ? { color: "green" } : { color: "red" }}></i>{(available === true) ? "Available" : "Not Available"} </p>
                            </div>
                        </div>
                        {(!isSelect) ? <div className="ui bottom attached button" onClick={handleClick}>
                            <i className="add icon"></i>
                            Add Team
                        </div> : <div className="ui bottom attached positive button">
                            <i className="check icon"></i>
                            Added
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamUserItem