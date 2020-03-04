import React, { Component } from 'react';
import App from '../../../App';
import toastr from 'toastr';
import { withRouter } from "react-router-dom";
class ProviderForgotPassword extends Component {
 
    constructor(props) {
        super(props);
        this.state = { resetpasswordapiresponse: '' , email: '', password: '', submitted: false };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    confirmEmail(email,) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Reset/providerforgetpassword', requestOptions)
            .then(response => {
                 return response.json();
            })
            .then(response => {
                console.log(response);
                if (response.statuscode == 200) {
                         toastr["success"](response.message);
                            this.props.history.push({
                            pathname:"/provider-confirm-code-forgot-password",
                           state: response.message
                             
                           }); 
                   
                } 
                else {
                    toastr["error"](response.message);
                }
            });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email } = this.state;
        this.confirmEmail( email );
    }

    render() {
      
        return (
            this.forgotPassword()
        )
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

}

export default withRouter(ProviderForgotPassword)


