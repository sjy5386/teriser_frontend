import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import useInputs from "../hooks/useInputs";
import {addProject} from "../modules/client";

const AddProjectPage = () => {
    const [inputs, onChange] = useInputs({
        title: ''
    });
    const {title} = inputs;

    const onClick = async () => {
        try {
            const response = await addProject({title});
            console.log(response);
            alert(response);
        } catch (e) {
            alert(e);
        }
    };

    return (
        <div className="container">
            <h3>Add Project</h3>
            <LabelInput label="Title" name="title" value={title} onChange={onChange}/>
            <Button variant="primary" onClick={onClick}>Add project</Button>
        </div>
    );
};

export default AddProjectPage;
