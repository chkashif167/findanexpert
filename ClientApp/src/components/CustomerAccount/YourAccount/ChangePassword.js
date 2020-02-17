import React, { Component } from 'react';
import { SidebarLinks } from './SidebarLinks';
import App from '../../../App';

export class ChangePassword extends Component {
    displayName = ChangePassword.name

    constructor(props) {
        super(props);
        var customerEmail = localStorage.getItem('email');
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        this.state = {
            email: customerEmail, password: '', newpassword: '', confirmpassword: '', authtoken: customerAccesstoken, update: false
        };

        console.log(this.state.accesstoken);

        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UpdatePassword(email, password, newpassword, confirmpassword, authtoken) {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json-patch+json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                newpassword: confirmpassword,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/ResetPassword/changecustomerpassword', requestOptions)
            .then(response => {
                localStorage.setItem('customerPasswordUpdateStatus', response.status);
                if (response.status == '200' && newpassword == confirmpassword) {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                //if (response.message == 'Error occurred.') {
                //    alert('You entered an incorrect password.');
                //}
                //else {
                    this.setState({ Updated: response, update: true });
                //}
            });
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleChangeNewPassword(e) {
        this.setState({ newpassword: e.target.value });
    }

    handleChangeConfirmPassword(e) {
        this.setState({ confirmpassword: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password, newpassword, confirmpassword } = this.state;
        this.UpdatePassword(email, password, newpassword, confirmpassword );
    }

    render() {
        if (localStorage.getItem('customerPasswordUpdateStatus') == '200') {
            let contents = this.state.update
                ? this.PasswordUpdated(this.state.Updated)
                : this.PasswordUpdate();
            return <div>
                {contents}
            </div>;
        }
        else {
            let contents = this.state.update
                ? this.wrongePassword()
                : this.PasswordUpdate();
            return <div>
                {contents}
            </div>;
        }
    }

    PasswordUpdate() {
        return (
            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Change Password</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">

                                    <form onSubmit={this.handleSubmit}>
                                       
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Old Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.newpassword} onChange={this.handleChangeNewPassword} placeholder="New Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.confirmpassword} onChange={this.handleChangeConfirmPassword} placeholder="Confrim Password" required />
                                        </div>
                                        <div className="text-center mb-3">
                                            <button type="submit" className="btn bg-black text-white float-right">Change Password</button>
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

    wrongePassword(newpassword, confirmpassword) {
        return (
            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Change Password</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">

                                    <div className="alert alert-success" role="alert">
                                        <p>Password is not correct!</p>
                                    </div>

                                    <form onSubmit={this.handleSubmit}>

                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Old Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.newpassword} onChange={this.handleChangeNewPassword} placeholder="New Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.confirmpassword} onChange={this.handleChangeConfirmPassword} placeholder="Confrim Password" required />
                                        </div>
                                        <div className="text-center mb-3">
                                            <button type="submit" className="btn bg-black text-white float-right">Change Password</button>
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

    passwordMismatch() {
        return (
            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Change Password</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">

                                    <div className="alert alert-success" role="alert">
                                        <p>Password do not match!</p>
                                    </div>

                                    <form onSubmit={this.handleSubmit}>

                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Old Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.newpassword} onChange={this.handleChangeNewPassword} placeholder="New Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.confirmpassword} onChange={this.handleChangeConfirmPassword} placeholder="Confrim Password" required />
                                        </div>
                                        <div className="text-center mb-3">
                                            <button type="submit" className="btn bg-black text-white float-right">Change Password</button>
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

    PasswordUpdated() {
        return (
            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Change Password</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">

                                    <div className="alert alert-success" role="alert">
                                        <p>Password updated Successfully!</p>
                                    </div>

                                    <form onSubmit={this.handleSubmit}>

                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Old Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.newpassword} onChange={this.handleChangeNewPassword} placeholder="New Password" required />
                                        </div>
                                        <div className="md-form pb-3">
                                            <input type="password" className="form-control validate" name="password" value={this.state.confirmpassword} onChange={this.handleChangeConfirmPassword} placeholder="Confrim Password" required />
                                        </div>
                                        <div className="text-center mb-3">
                                            <button type="submit" className="btn bg-black text-white float-right">Change Password</button>
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