import React, { useContext, useEffect, useState } from 'react'
import UserState from '../Context/Users/UserContext';
import Team from './Team'
import { Link } from 'react-router-dom';
import { Button, LinearProgress, Pagination, Stack } from '@mui/material';

const AllTeam = () => {
    const context = useContext(UserState);
    const { allTeam, getAllTeam, setCurrentPage, currentPage, totalPages, loading} = context;
    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        setCurrentPage(1);
    }, [])

    useEffect(() => {
        getAllTeam();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
    const handleClick = (team) => {
        setSelectedTeam(team);
    };
    return (
        <>
            <div className='ui container mt-3'>
                <div className="ui massive secondary menu">
                    <Link to="/">
                        <Button variant="contained">
                            Home
                        </Button>
                    </Link>
                </div>
                <div className=' my-5'>  <h1>All Team</h1>
                    {!loading ? 
                    <div className='my-5 row'>
                        {allTeam.map((team) => (
                            <div className="col-md-3" key={team._id}>
                                <div className="ui card mb-5 green">
                                    <div className="content">
                                        <div className="header" style={{textAlign:'center'}}>{team.teamName}</div>
                                        <div className="meta">
                                            {/* <span className="date">Created in {team.date.split('T')[0]}</span> */}
                                        </div>
                                        <div className="description" style={{textAlign:'center', color:'gray'}}>
                                            {team.description}
                                        </div>
                                    </div>
                                    <div className="extra content">
                                        <i className="users icon"></i>
                                        {team.member.length}
                                        <div className="right floated author">
                                            <Button 
                                                variant="contained"
                                                data-bs-toggle="modal"
                                                data-bs-target={`#TeamModal-${team._id}`}
                                                onClick={() => handleClick(team)}
                                            >
                                                View Team
                                            </Button>
                                        </div>
                                    </div>
                                    <div
                                        className="modal fade"
                                        id={`TeamModal-${team._id}`}
                                        tabIndex="-1"
                                        aria-labelledby="exampleModalLabel"
                                        aria-hidden="true"
                                    >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                                                        Team Details
                                                    </h1>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                    ></button>
                                                </div>
                                                <div className="modal-body">
                                                    {selectedTeam && selectedTeam._id === team._id && (
                                                        <Team team={selectedTeam} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Stack spacing={3} direction="row" justifyContent="center" sx={{ marginTop: '20px' }}>
                                <Pagination count={totalPages} size="large" page={currentPage} onChange={(_, value) => setCurrentPage(value)} />
                            </Stack>
                    </div>
                        :
                        <div style={{ marginTop: '50px' }}>
                            <p style={{
                                textAlign: "center",
                                fontSize: "20px",
                                fontWeight: "500",
                                color: "#413c3cc",
                            }}
                            >Fetching teams..</p>
                            <LinearProgress />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default AllTeam