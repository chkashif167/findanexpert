import React, { Component } from 'react';
import App from '../../../App';

export class ConfirmProvider extends Component {
    displayName = ConfirmProvider.name

    constructor(props) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const Token = params.get('confirmationtoken');

        super(props);
        this.state = { token: Token, confirmed: [], confirm: false };

        console.log(this.state.token);

        fetch(App.ApisBaseUrl + '/api/Confirmation/confirmserviceprovider?confirmationtoken=' + this.state.token)
            .then(response => {
                console.log("this ");
                console.log(response);
                localStorage.setItem('providerConfirmationMessage', response);
                if (response != 'Link expired because your account has been already confirmed. Thanks!') {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ confirmed: response, confirm: true });

                }
            });
    }

    render() {
        if (this.state.confirmed.status == true) {
            return (
                this.confirmAccount()
            );
        } else {
            return (
                this.alreadyConfirmAccount()
            );
        }
    }

    confirmAccount() {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4 mb-5">

                                <div className="col-md-8 offset-md-2 pb-5 pt-5 mt-5 mb-5">
                                    <div className="alert alert-success registerWelcome p-5 text-center" role="alert">
                                        <p className="fs-18">Your account has been confirm! Now you can login to your account.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    alreadyConfirmAccount() {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="alert alert-danger" role="alert">
                                        <p>Link expired because your account has been already confirmed. Thanks!</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}


