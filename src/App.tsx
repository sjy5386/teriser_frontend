import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import PointCardsPage from "./pages/PointCardsPage";
import CheckoutPage from "./pages/CheckoutPage";
import AddProjectPage from "./pages/AddProjectPage";

function App() {
    return (
        <div className="App">
            <Route path="/" exact={true} component={HomePage}/>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/logout" component={LogoutPage}/>
            <Route path="/point-cards" component={PointCardsPage}/>
            <Route path="/checkout" component={CheckoutPage}/>
            <Route path="/add-project" component={AddProjectPage}/>
        </div>
    );
}

export default App;
