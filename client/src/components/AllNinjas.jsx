import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

const AllNinjas = props => {
    const [ allNinjas, setAllNinjas ] = useState([]);
    const [ deleteToggle, setDeleteToggle ] = useState(false);

    const { newNinjaToggle } = props;

    const history = useHistory();

    useEffect( () => {
        axios.get("http://localhost:8000/api/ninjas")
            .then( res => {
                console.log("Response: ", res);
                setAllNinjas(res.data.results);
            })
            .catch( err =>{
                console.log("Something went wrong", err);
            })
    }, [deleteToggle, newNinjaToggle])

    const deleteNinja = (id) => {
        console.log("Deleting ninja with _id: ", id)
        axios.delete(`http://localhost:8000/api/ninjas/${id}/delete`)
            .then( res => {
                console.log("Response: ", res);
                setDeleteToggle(!deleteToggle);
            })
            .catch( err => {
                console.log("Something went wrong", err);
            })
    }

    return (
        <div className = "container mx-auto">
            <h3>All Ninjas Components Online</h3>
            {
                allNinjas.map( (ninja, idx) => {
                    return (
                        <div key = { idx } className = "my-2 mx-auto pt-2" style = {{ border: "2px solid black", height: "325px", width: "250px"}}>
                            <h4><Link to = {`/ninjas/${ninja._id}`}>{ ninja.name }</Link></h4>
                            <p>Number of Project: { ninja.numProjects }</p>
                            <p>Graduation Date: {  moment.utc(ninja.gradDate?.toLocaleString()).format("MMM Do, YYYY") }</p>
                            <p>Veteran Status: {ninja.isVeteran ? "Veteran" : "Non-veteran"}</p>
                            <Link className = "btn btn-primary" to = {`/edit/${ninja._id}`}>Edit {ninja.name}</Link>
                            <button className="btn btn-danger m-2" onClick = { e => deleteNinja(ninja._id) }>Delete {ninja.name}</button>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default AllNinjas