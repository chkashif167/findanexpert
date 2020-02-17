import React, { Component } from 'react';
import App from '../../../App';
import toastr from 'toastr';

export class ProviderForgotPassword extends Component {
    displayName = ProviderForgotPassword.name

    constructor(props) {
        super(props);
        this.state = { resetpasswordapiresponse: '' , email: '', password: '', submitted: false };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetPassword(email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, Password: password })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/ResetPassword/serviceprviderforgetpassword', requestOptions)
            .then(response => {
                this.setState({ resetpasswordapiresponse: response.status })
                //console.log("something" + this.state.resetpasswordapiresponse);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ emailSent: response, submitted: true });

                    if (this.state.resetpasswordapiresponse == 200) {
                        toastr["success"](response.message);
                        console.log(response.message);
                    }
                } 
            });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.resetPassword( email, password );
    }

    render() {
        let contents = this.state.submitted
            ? this.forgotPasswordSent(this.state.emailSent)
            : this.forgotPassword();
        return <div>
            {contents}
        </div>;
    }

    forgotPassword() {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <form onSubmit={this.handleSubmit} className="signinRegisterWrap p-5">

                                        <div className="md-form pb-3 text-center">
                                            <h3>Forgot Password</h3>
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="email" className="form-control validate" name="email" values={this.state.email} onChange={this.handleChangeEmail} placeholder="Email Address" required />
                                        </div>

                                        <div className="text-right pb-4">
                                            <button type="submit" className="btn bg-orange text-white">Send</button>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    forgotPasswordSent(emailSent) {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    
                                    <form onSubmit={this.handleSubmit} className="signinRegisterWrap p-5">

                                        <div className="md-form pb-3 text-center">
                                            <h3>Forgot Password</h3>
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="email" className="form-control validate" name="email" values={this.state.email} onChange={this.handleChangeEmail} placeholder="Email Address" required />
                                        </div>

                                        <div className="text-right pb-4">
                                            <button type="submit" className="btn bg-orange text-white">Send</button>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

}


