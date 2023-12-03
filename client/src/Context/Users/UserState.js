import UserContext from "./UserContext";
import { useState } from "react";
// const URL = "http://localhost:8000";
const URL = "https://heliverse-backend-y77y.onrender.com";

const UserState = (props) => {
  const [user, setUser] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allTeam,setAllTeam]=useState([]);
  const [team, setTeam] = useState({ teamName: "", description: ""});


  const [isFixed, setIsFixed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState()
  const [filter, setFilter] = useState({ domain: "", gender: "", available: "" });

  const [totalNoOfUsers, setTotalNoOfUsers] = useState()
  const [loading, setLoading] = useState(false)

  //Get All  a notes
  const getUser = async (sq, filterObj) => {
    //To do API call
    let url = `${URL}/api/user/fetchAllUser?search=${sq}`;

    const filterObjSize = Object.keys(filterObj).length;
    let finalFilterObj = {};
    if(filterObjSize > 0){
      finalFilterObj = {...filterObj}
    }
    else{
      finalFilterObj = {...filter}
    }

    if(finalFilterObj.domain){
      url += `&domain=${finalFilterObj.domain}`
    }
    if(finalFilterObj.gender){
      url += `&gender=${finalFilterObj.gender}`
    }
    if(finalFilterObj.available){
      url += `&available=${finalFilterObj.available}`
    }
    url += `&page=${currentPage}&perPage=20`

    setLoading(true)
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    if (json.success) {
      setUser(json.content.data);
      setTotalPages(json.content?.meta?.pages)
      if(!totalNoOfUsers){
        setTotalNoOfUsers(json.content?.meta?.total)
      }
      setLoading(false)
    }
    else {
      setLoading(false)
      alert("Users not found");
    }
  };

  //adding a user
  const addUser = async (newUser) => {
    const response = await fetch(`${URL}/api/user/adduser `, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ id:(parseInt(totalNoOfUsers) +1).toString(), first_name: newUser.first_name, last_name: newUser.last_name, email: newUser.email, gender: newUser.gender, avatar: newUser.avatar, domain: newUser.domain, available: newUser.available }) // body data type must match "Content-Type" header
    });
    const userData = await response.json();
    if (userData.success) {
      setUser(user.concat(userData.saveuser));
      alert("User added successfully");
    }
    else {
      alert(userData.error);
    }
  }
  //deleting a user
  const deleteUser = async (id) => {
    //todo API call
    const response = await fetch(`${URL}/api/user/delete/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const Json = await response.json();
    if (Json.success) {
      const newUser = user.filter((user) => { return user._id !== id })
      setUser(newUser);
      alert("User Deleted Successfully");
    }
    else {
      alert(Json.error);
    }
  }

  //   //updating a user details
  const userUpdate = async (edata) => {
    //API Call
    const id = edata._id;
    const response = await fetch(`${URL}/api/user/update/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ first_name: edata.efirst_name, last_name: edata.elast_name, gender: edata.egender, avatar: edata.eavatar, domain: edata.edomain, available: edata.eavailable }) // body data type must match "Content-Type" header
    });
    const Json = await response.json();
    if (Json.success) {
      alert("User Updated successfully");
      getUser("", {});
    }
    else {
      alert(Json.error);
    }
  }


  const getAllAvailable = async () => {
    // API Call
    let url = `${URL}/api/user/fetchAllUser?available=${true}&page=${currentPage}&perPage=20`;
    setLoading(true)
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    if (json.success) {
      setUser(json.content.data);
      setTotalPages(json.content?.meta?.pages)
      setLoading(false)
    }
    else {
      setLoading(false)
      alert("Users not found");
    }
  };


  const createTeam = (users) => {
    const { id, first_name, last_name, domain } = users;
    // Check if the user is already in the selected users array
    if (selectedUsers.some((user) => user.id === id)) {
      alert('User is already in the team.');
      return 1;

    }// Check for unique domain
    if (selectedUsers.some((user) => user.domain === domain)) {
      alert('User has the same domain as another user in the team.');
      return 1;

    }
    // If all checks pass, add the user to the selected users array
    setSelectedUsers([...selectedUsers, { id: id, first_name: first_name, last_name: last_name, domain: domain }]);
  }

  const teamSubmit = async(data) => {
    const response = await fetch(`${URL}/api/team/addTeam`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',

        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ teamName: data.teamName, description: data.description, member:data.member}) // body data type must match "Content-Type" header
    });
    const userData = await response.json();
    if (userData.success) {
      setSelectedUsers([]);
      setTeam({ teamName: "", description: ""});
      // setTeamData(userData.savedTeam);
      getAllAvailable();
      alert("Team created successfully");
    }
    else {
      alert(userData.error);
    }

  }

  const getAllTeam=async()=>{
    setLoading(true)
    const response = await fetch(`${URL}/api/team/allTeam?page=${currentPage}&perPage=20`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if(!response){
      alert("getting failed")
    }
    const json = await response.json();
    if (json.success) {
      setAllTeam(json.content.data);
      setTotalPages(json.content?.meta?.pages)
      setLoading(false)
    }
    else {
      setLoading(false)
      alert(json.error);
    }
  };

  const getTeamByID=async(id)=>{
    const response = await fetch(`${URL}/api/team/allTeam/${id}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const json = await response.json();
    if (json.success) {
      setTeam(json.team);
    }
    else {
      alert("Team not found");
    }
  };
  return (
    <UserContext.Provider value={{ user, selectedUsers, allTeam, team, getUser, addUser, userUpdate, deleteUser, getAllAvailable, createTeam, teamSubmit,getAllTeam,getTeamByID, isFixed, setIsFixed, totalPages, setTotalPages, currentPage, setCurrentPage, filter, setFilter, loading, setTeam, totalNoOfUsers, setTotalNoOfUsers }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;