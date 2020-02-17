import React, { Component } from 'react';
import App from '../../../App';
import toastr from 'toastr';

export class CustomerForgotPassword extends Component {
    displayName = CustomerForgotPassword.name

    constructor(props) {
        super(props);
        this.state = { forgorpasswordresponse: '', email: '', password: '', submitted: false };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetPassword(email, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/ResetPassword/customerforgetpassword', requestOptions)
            .then(response => {
                console.log(response);
                localStorage.setItem('customerForgetPassStatus', response);
                this.setState({ forgorpasswordresponse: response.status })
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ emailSent: response, submitted: true });

                    // Toasting message here
                    if (this.state.forgorpasswordresponse == 200) {
                        toastr["success"](response.message);
                        //console.log(response.message);
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
        this.resetPassword(email, password);
    }

    render() {
        if (localStorage.getItem('customerForgetPassStatus') == '200') {
            let contents = this.state.submitted
                ? this.forgotPasswordSent(this.state.emailSent)
                : this.forgotPassword();
            return <div>
                {contents}
            </div>;
        }
        else {
            let contents = this.state.submitted
                ? this.emailNotExist()
                : this.forgotPassword();
            return <div>
                {contents}
            </div>;
        }
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

                                        <div className="text-center mb-4">
                                            <button type="submit" className="btn bg-orange btn-block text-white">Send</button>
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
                                    <div className="alert alert-success" role="alert">
                                        <p>Your Passwrod reset link sent! Please check your email.</p>
                                    </div>

                                    <form onSubmit={this.handleSubmit} className="signinRegisterWrap p-5">

                                        <div className="md-form pb-3 text-center">
                                            <h3>Forgot Password</h3>
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="email" className="form-control validate" name="email" values={this.state.email} onChange={this.handleChangeEmail} placeholder="Email Address" required />
                                        </div>

                                        <div className="text-center mb-4">
                                            <button type="submit" className="btn bg-orange btn-block text-white">Send</button>
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

    emailNotExist() {
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

                                        <div className="text-center mb-4">
                                            <button type="submit" className="btn bg-orange btn-block text-white">Send</button>
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


