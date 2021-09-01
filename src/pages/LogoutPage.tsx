import React from "react";
import {Redirect} from "react-router-dom";
import {ClientResponse, logout, setBearer} from "../modules/client";

const LogoutPage = () => {
    localStorage.removeItem('user');

    logout().then((response) => {
        console.log((response.data as ClientResponse<boolean>).response);
    }).catch((error) => {
        console.log(error);
    });

    setBearer();

    return (
        <Redirect to="/login"/>
    );
};

export default LogoutPage;
