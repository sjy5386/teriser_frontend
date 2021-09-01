import React, {useState} from "react";
import {Link} from "react-router-dom";
import LabelInput from "../components/LabelInput";
import Button from "../components/Button";
import {ClientResponse, login, LoginResult, setBearer} from "../modules/client";
import Card, {CardBody, CardSubtitle, CardTitle} from "../components/Card";
import useInputs from "../hooks/useInputs";
import useArray from "../hooks/useArray";
import {AlertProps} from "../components/Alert";
import AlertGroup from "../components/AlertGroup";

const LoginPage = () => {
    const [inputs, onChange] = useInputs({
        email: '',
        loginToken: ''
    });

    const {email, loginToken} = inputs;

    const [alerts, addAlert] = useArray<AlertProps>([]);

    const onClick = async () => {
        try {
            const response = await login(email, loginToken);
            if (step === 1) {
                const loginResult = (response.data as ClientResponse<LoginResult>).response
                if (loginResult) {
                    setBearer(loginResult.token);
                    localStorage.setItem('user', JSON.stringify(loginResult));
                }
            }
            setStep((step + 1) % steps.length);
        } catch (error) {
            // @ts-ignore
            const message = error.response.data.error.message;
            addAlert({
                variant: 'danger',
                children: message
            });
        }
    };

    const [step, setStep] = useState<number>(0);

    const steps = [
        (<>
            <LabelInput label="Email" name="email" type="email" placeholder="terikim@codrest.com" value={email}
                        onChange={onChange}/>
            <div className="d-grid gap-2">
                <Button variant="primary" onClick={onClick}>Next</Button>
            </div>
            <p className="mt-3 mb-0 text-center">Don't have an account? <Link
                className="text-decoration-none" to="/register">Register</Link></p>
        </>),
        (<>
            <p className="text-center"><span className="btn border rounded-pill px-3 py-1"
                                             onClick={setStep.bind(this, step - 1)}>{email}</span></p>
            <input className="d-none" type="email" name="email" value={email}/>
            <LabelInput label="LoginToken" name="loginToken" type="password" value={loginToken} onChange={onChange}/>
            <div className="d-grid gap-2">
                <Button variant="primary" onClick={onClick}>Login</Button>
            </div>
        </>),
        (
            <p>Ok</p>
        )
    ];

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
                            <CardTitle className="text-center">Login</CardTitle>
                            <CardSubtitle className="text-center">Use your Teriser account</CardSubtitle>
                            {steps[step]}
                        </CardBody>
                    </Card>
                </div>
                <div className="col-md"/>
            </div>
        </div>
    )
}

export default LoginPage;
