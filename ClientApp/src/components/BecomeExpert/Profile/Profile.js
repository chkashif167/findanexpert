import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProviderSidebarLinks } from './SidebarLinks';
import { ProviderAppointments } from '../Apointments/ProviderAppointments';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';
import App from '../../../App';

export class ProviderProfile extends Component {
    displayName = ProviderProfile.name

    constructor() {
        super();

        this.state = {
            imagePreview: ''
        };
    }

    render() {
        
 
        if (localStorage.getItem('genderpreference') == 'na') {
            var providerGenderPreference = (<p className="card-text">Other</p>);
        }
        else {
            var providerGenderPreference = (<p className="card-text">{localStorage.getItem('genderpreference')}</p>);
        }

        if (localStorage.getItem('gender') == 'na') {
            var providerGender = (<p className="card-text">Other</p>);
        }
        else {
            var providerGender = (<p className="card-text">{localStorage.getItem('gender')}</p>);
        }

        var border = {
            borderRight: '1px solid #ddd'
        }
       


        return (

            <div id="MainPageWrapper">

                <ProviderSidebarLinks />

                <section class="section-padding customerProfile">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div className="col-md-12 pt-4 pb-4">

                                    <div class="row">
                                        <div class="col-md-12 p-0 mb-4">
                                            <div class="text-right">
                                                <Link to="/provider-edit-profile" class="btn btn_black mr-2">Edit Profile</Link>
                                                <Link to="/provider-change-password" class="btn btn_red">Change Password</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row coloredBox">

                                        <div className="col-md-12">
                                            <p className="font-weight-bold">Profile <span className="text-red">Details</span></p>
                                        </div>

                                        <div className="col-md-6 pb-4">
                                            <div class="profileBox info">
                                                <h4 class="text-muted">Full Name</h4>
                                                <h3>{localStorage.getItem("firstname")} {localStorage.getItem("lastname")}</h3>
                                            </div>
                                        </div>

                                        {/* <div className="col-md-6 pb-4">
                                            <div className="profileBox info">
                                                <h4 className="text-muted">Email Address</h4>
                                                <h3>{localStorage.getItem("email")}</h3>
                                            </div>
                                        </div> */}

                                        <div className="col-md-6 pb-4">
                                            <div className="profileBox info">
                                                <h4 className="text-muted">Mobile Number</h4>
                                                <h3>{localStorage.getItem("mobile")}</h3>
                                            </div>
                                        </div>

                                        <div className="col-md-6 pb-4">
                                            <div className="profileBox info">
                                                <h4 className="text-muted">Address</h4>
                                                <h3>{localStorage.getItem('address')}</h3>
                                            </div>
                                        </div>

                                        <div className="col-md-6 pb-4">
                                            <div className="profileBox info">
                                                <h4 className="text-muted">Gender</h4>
                                                <h3>{providerGender}</h3>
                                            </div>
                                        </div>

                                        {/* <div className="col-md-6 pb-4">
                                            <div className="profileBox info">
                                                <h4 className="text-muted">Gender Preference</h4>
                                                <h3>{providerGenderPreference}</h3>
                                            </div>
                                        </div>

                                        <div className="col-md-6 pb-4">
                                            <div className="profileBox info">
                                                <h4 className="text-muted">Date of Birth</h4>
                                                <h3>{localStorage.getItem('dob').split('', 10)}</h3>
                                            </div>
                                        </div> */}

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
