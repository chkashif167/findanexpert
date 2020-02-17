import React, { Component } from 'react';
import { ProviderSidebarLinks } from './SidebarLinks';
import { ProviderAppointments } from '../Apointments/ProviderAppointments';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';
import App from '../../../App';

export class ProviderJobs extends Component {
    displayName = ProviderJobs.name

    constructor() {
        super();

        this.state = {
            imagePreview: ''
        };
    }

    render() {
        
        //if (profileImage == 'IMAGE NOT AVAILABLE' || profileImage == '') {
        //    var imgUrl = 'https://www.integraconference.info/wp-content/uploads/2018/03/placeholder-face-big-300x300.png';
        //    var imagePreview = (<img src={imgUrl} class="img-fluid providerProfileImg"
        //        alt="Responsive image" />);
        //} else {
        //    var imagePreview = (<img src={App.ApisBaseUrl + profileImage} class="img-fluid providerProfileImg"
        //        alt="Responsive image one" />);
        //}

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

                                    <div className="providerTasksWrap shadow mb-5 p-5 coloredBox">
                                        <p className="font-weight-bold mb-5">Your <span className="text-red">Jobs</span></p>
                                        <ProviderAppointments />

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
