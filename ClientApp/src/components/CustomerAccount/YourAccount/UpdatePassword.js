import React, { Component } from 'react';
import App from '../../../App';
import toastr from 'toastr';

export class CustomerUpdatePassword extends Component {
    displayName = CustomerUpdatePassword.name

    constructor(props) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const Token = params.get('token');

        super(props);
        this.state = { customerupdatepassresponse: '', token: Token, password: '', update: false };

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updatePassword(token, password) {
        console.log(token);
        console.log(password);

        return fetch(App.ApisBaseUrl + '/api/ResetPassword/updatecustomerpassword?token=' + token + '&password=' + password )
            .then(response => {
                console.log(response);
                this.setState({ customerupdatepassresponse: response.status })
                if (token != null) {
                    return response.json();
                }
                else {
                    alert('Incorrect Token');
                }

            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ updated: response, update: true });

                    // Toasting message here
                    if (this.state.customerupdatepassresponse == 200) {
                        toastr["success"](response.message);
                        //console.log(response.message);
                    }

                }
            });
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { token, password } = this.state;
        this.updatePassword(token, password);
    }

    render() {
        let contents = this.state.update
            ? this.forgotPasswordSent(this.state.updated)
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
                                            <h3>Change Password</h3>
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="password" className="form-control validate" name="password" values={this.state.password} onChange={this.handleChangePassword} placeholder="Enter new password" required />
                                        </div>

                                        <div className="text-center mb-4">
                                            <button type="submit" className="btn bg-orange text-white btn-block">Update</button>
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

    forgotPasswordSent(update) {
        return (
            <div id="MainPageWrapper" >

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    
                                    <form onSubmit={this.handleSubmit} className="signinRegisterWrap p-5">

                                        <div className="md-form pb-3 text-center">
                                            <h3>Change Password</h3>
                                        </div>

                                        <div className="md-form pb-4">
                                            <input type="password" className="form-control validate" name="password" values={this.state.password} onChange={this.handleChangePassword} placeholder="Enter new password" required />
                                        </div>

                                        <div className="text-center mb-4">
                                            <button type="submit" className="btn bg-orange btn-block text-white">Update</button>
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


