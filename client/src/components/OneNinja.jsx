import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import axios from 'axios';

const OneNinja = props => {
    const [ninja, setNinja] = useState("");

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ninjas/${id}`)
            .then(res => {
                console.log("Response: ", res);
                setNinja(res.data.results);
                console.log(ninja);
            })
            .catch(err => {
                console.log("Something went wrong", err);
            })
    }, [])

    const deleteNinja = e => {
        axios.delete(`http://localhost:8000/api/ninjas/${id}/delete`)
            .then( res => {
                console.log("Response: ", res);
                history.push("/")
            })
            .catch(err => {
                console.log("Something went wrong", err);
            })
    }

    return (
        <div>
            <div>
                <h3>Name: { ninja.name }</h3>
                <p>Number of Project: { ninja.numProjects }</p>
                <p>Graduation Date: { moment.utc(ninja.gradDate?.toLocaleString()).format("MMMM Do, YYYY") }</p>
                <p>Veteran Status: { ninja.isVeteran ? "Veteran" : "Non-veteran" }</p>
                <button className="btn btn-danger" onClick = { deleteNinja }>Delete { ninja.name }</button>
            </div>
        </div>
    );
};

export default OneNinja;