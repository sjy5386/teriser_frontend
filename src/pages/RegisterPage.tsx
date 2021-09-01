import React from "react";
import {Link} from "react-router-dom";
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import {register} from "../modules/client";
import Card, {CardBody, CardSubtitle, CardTitle} from "../components/Card";
import {AlertProps} from "../components/Alert";
import ColorVariant from "../types/ColorVariant";
import useInputs from "../hooks/useInputs";
import useArray from "../hooks/useArray";
import AlertGroup from "../components/AlertGroup";

const RegisterPage = () => {
    const [inputs, onChange] = useInputs({
        name: '',
        email: ''
    });

    const {name, email} = inputs;

    const [alerts, addAlert] = useArray<AlertProps>([]);

    const requestRegister = async () => {
        let variant: ColorVariant = 'primary';
        let message = '';
        try {
            await register(name, email);
            variant = 'success';
            message = 'Please check your email.';
        } catch (error) {
            variant = 'danger';
            // @ts-ignore
            message = error.response.data.error.message;
        } finally {
            addAlert({variant: variant, children: message});
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md"/>
                <div className="col">
                    <h3 className="text-center">Teriser</h3>
                    <AlertGroup alerts={alerts}/>
                </div>
                <div className="col-md"/>
            </div>
            <div className="row">
                <div className="col-md"/>
                <div className="col">
                    <Card>
                        <CardBody>
                            <CardTitle className="text-center">Register</CardTitle>
                            <CardSubtitle className="text-center">Create a Teriser account</CardSubtitle>
                            <LabelInput label="Name" name="name" type="text" placeholder="Teri Kim" value={name}
                                        onChange={onChange}/>
                            <LabelInput label="Email" name="email" type="email" placeholder="terikim@codrest.com"
                                        value={email}
                                        onChange={onChange}/>
                            <div className="d-grid gap-2">
                                <Button variant="primary" onClick={() => requestRegister()}>Register</Button>
                            </div>
                            <p className="mt-3 mb-0 text-center">Already have an account? <Link
                                className="text-decoration-none" to="/login">Login</Link></p>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md"/>
            </div>
        </div>
    );
};

export default RegisterPage;
