﻿import React, { Component } from 'react';
import { AuthenticateServiceProvider } from '../AuthenticateServiceProvider';
import { RegisterServiceProvider } from '../RegisterServiceProvider';
import { Redirect } from 'react-router-dom';

export class ProviderAuthentication extends Component {
    displayName = ProviderAuthentication.name

    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (localStorage.getItem('serviceproviderid')) {
            return <Redirect to='/provider-profile' />
        }
    }
    render() {

        document.getElementsByTagName("META")[2].content = 'Find an expert provides a fair opportunity to beauticians, handyman, IT personnel, and many others to register on for free and earn money online without any investment.';
        document.getElementsByTagName("TITLE")[0].text = 'Provider Login or Create an Account | Find an Expert';

        if (localStorage.getItem('serviceproviderid') != null) {
            
        }

        return (

            <div id="MainPageWrapper">
                {this.renderRedirect()}
                <section className="section-padding">
                    <div className="container">
                        <div className="row pb-4 mb-5 pt-5">
                            <div className="col-md-12 signinRegisterWrap mt-5 mb-5">

                                <ul class="nav nav-tabs nav-justified signinRegister" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#signIn" role="tab">
                                            Sign In
                                      </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#createAccount" role="tab">
                                            Sign Up
                                      </a>
                                    </li>
                                </ul>

                                <div class="tab-content mb-5">
                                    <div class="tab-pane fade in show active" id="signIn" role="tabpanel">
                                        <AuthenticateServiceProvider />
                                    </div>

                                    <div class="tab-pane fade in" id="createAccount" role="tabpanel">
                                        <RegisterServiceProvider />
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
