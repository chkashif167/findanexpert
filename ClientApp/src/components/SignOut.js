import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class SignOut extends Component {
    displayName = SignOut.name

    render() {

        localStorage.removeItem("provideraccesstoken");
        localStorage.removeItem("customerid");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        localStorage.removeItem("surename");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("mobile");
        localStorage.removeItem("postalcode");
        localStorage.removeItem("addressid");
        localStorage.removeItem("customerprofileImage");
        localStorage.removeItem("gender");
        localStorage.removeItem("customerGenderpreference");
        localStorage.removeItem("customerDob");
        localStorage.removeItem("customercardtokenmakedefault");
        localStorage.removeItem("hasFreeTreatment");

        return <Redirect to='/' />;

    }
}