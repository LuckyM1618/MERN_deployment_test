import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const EditNinja = props => {
    const [ ninja, setNinja ] = useState({});

    const { id } = useParams();

    const history = useHistory();

    useEffect( () => {
        axios.get(`http://localhost:8000/api/ninjas/${id}`)
            .then(res => {
                console.log("Response: ", res);
                setNinja(res.data.results);
            })
            .catch(err => {
                console.log("Something went wrong", err);
            })
    }, [])

    const changeHandler = e => {
        setNinja({
            ...ninja,
            [e.target.name]: e.target.type == "checkbox"
                ? e.target.checked
                : e.target.value
        })
    }

    const submitHandler = e => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/ninjas/${id}/update`, ninja)
            .then( res => {
                console.log("Response: ", res);
                history.push("/")
            })
            .catch(err => {
                console.log("Something went wrong", err);
            })
    }

    return (
        <>
            <form className="container w-50" onSubmit = { submitHandler }>
                <div className="form-group m-2">
                    <label htmlFor="name">Name: </label>
                    <input className="form-control" type="text" name="name" onChange = { changeHandler } value={ ninja.name } />
                </div>

                <div className="form-group m-2">
                    <label htmlFor="numProjects">Number of Projects: </label>
                    <input className="form-control" type="number" name="numProjects" onChange = { changeHandler } value={ ninja.numProjects } />
                </div>

                <div className="form-group m-2">
                    <label htmlFor="gradDate">Graduation Date: </label>
                    <input className="form-control" type="date" name="gradDate" onChange = { changeHandler } value={ moment.utc(ninja.gradDate?.toLocaleString()).format("YYYY-MM-DD") } />
                </div>

                <div className="form-group m-2">
                    <label htmlFor="isVeteran">Veteran Status: </label>
                    <input className="form-check-input" type="checkbox" name="isVeteran" onChange = { changeHandler } checked={ ninja.isVeteran } />
                </div>

                <input type="submit" value="Update Ninja" />
            </form>
        </>
    );
}

export default EditNinja;