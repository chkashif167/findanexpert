import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class ProviderSignOut extends Component {
    displayName = ProviderSignOut.name

    render() {

        localStorage.removeItem("provideraccesstoken");
        localStorage.removeItem("serviceproviderid");
        localStorage.removeItem("firstname");
        localStorage.removeItem("surname");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("mobile");
        localStorage.removeItem("gender");
        localStorage.removeItem("genderpreference");
        localStorage.removeItem('providerDob');
        localStorage.removeItem('providerprofileImage');
        localStorage.removeItem('providerPostalCode');
        localStorage.removeItem('providerAddress');

        return <Redirect to='/' />;

    }
}