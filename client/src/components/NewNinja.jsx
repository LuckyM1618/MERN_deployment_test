import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const NewNinja = props => {
    const [ name, setName ] = useState("");
    const [ numProjects, setNumProjects ] = useState("");
    const [ gradDate, setGradDate ] = useState("");
    const [ isVeteran, setIsVeteran ] = useState(false);

    const [ errors, setErrors ] = useState({});

    const history = useHistory();

    // Single function to reset all states to defaults
    const clearState = () => {
        setName("");
        setNumProjects("");
        setGradDate("");
        setIsVeteran(false);
        setErrors({});
    }

    const submitHandler = e => {
        // prevent page refresh on form submission
        e.preventDefault();

        // create object with form data
        const formInfo = { name, numProjects, gradDate, isVeteran };
        console.log(formInfo);

        axios.post("http://localhost:8000/api/ninjas/new", formInfo)
            .then(res => {
                console.log("Response: ", res);

                if (res.data.error) {
                    setErrors(res.data.error.errors);
                } else {
                    clearState();
                    // props.ninjaAdded(); // only necessary if form is on the same page as view all
                    history.push("/")
                }
            })
            .catch(err => {
                console.log("Something went wrong", err);
            })

    }

    return (
        <>
            <form className="container w-50" onSubmit={submitHandler}>
                <div className="form-group m-2">
                    <label htmlFor="name">Name: </label>
                    <input className="form-control" type="text" name="name" onChange={e => setName(e.target.value)} value={name} />
                    <p className="text-danger">{errors.name?.message}</p>
                </div>

                <div className="form-group m-2">
                    <label htmlFor="numProjects">Number of Projects: </label>
                    <input className="form-control" type="number" name="numProjects" onChange={e => setNumProjects(e.target.value)} value={numProjects} />
                    <p className="text-danger">{errors.numProjects?.message}</p>
                </div>

                <div className="form-group m-2">
                    <label htmlFor="gradDate">Graduation Date: </label>
                    <input className="form-control" type="date" name="gradDate" onChange={e => setGradDate(e.target.value)} value={gradDate} />
                    <p className="text-danger">{errors.gradDate?.message}</p>
                </div>

                <div className="form-group m-2">
                    <label htmlFor="isVeteran">Veteran Status: </label>
                    <input className="form-check-input" type="checkbox" name="isVeteran" onChange={e => setIsVeteran(e.target.checked)} checked={isVeteran} />
                </div>

                <input type="submit" value="Add Ninja" />
            </form>
        </>
    );
}

export default NewNinja;