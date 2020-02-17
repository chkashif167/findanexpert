import React, { Component } from 'react';
import { ProviderSidebarLinks } from '../Profile/SidebarLinks';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';
import App from '../../../App';

export class ProviderEarnings extends Component {
    displayName = ProviderEarnings.name

    constructor() {
        super();
        this.state = { allEarnings: [], loading: true };

        var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        var providerId = localStorage.getItem("serviceproviderid");
        var providerEmail = localStorage.getItem("email");

        fetch(App.ApisBaseUrl + '/api/ServiceProvider/getserviceproviderearnings?serviceProviderId=' + providerId + '&email=' + providerEmail + '&authToken=' + providerAccesstoken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ allEarnings: data, loading: false });
            });
    }

    render() {
        let contents = this.state.loading
            ? <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            : this.ProviderAllearnings(this.state.allEarnings);
        return (
            <div>
                {contents}
            </div>
        );
    }

    ProviderAllearnings(allEarnings) {
        return (

            <div id="MainPageWrapper">

                <ProviderSidebarLinks />

                <section class="section-padding customerProfile provider-earnings">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div className="col-md-12 pt-5 pb-5 coloredBox">

                                    <div className="row pb-4 profileBox">
                                        <div className="col-md-12 p-5">
                                            <div className="row">
                                                <div className="col-md-6 mb-5">
                                                    <div className="st_pro_shadow p-5 text-center">
                                                        <h4>This Week's Earning</h4>
                                                        <p className="lead">£ {allEarnings.weekEarnings}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-5">
                                                    <div className="st_pro_shadow p-5 text-center">
                                                        <h4>Number of Jobs</h4>
                                                        <p className="lead">{allEarnings.weekJobs}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-5">
                                                    <div className="st_pro_shadow">
                                                        <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">

                                                            <div className="card">

                                                                <div className="card-header" role="tab" id="headingOne1">
                                                                    <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true"
                                                                        aria-controls="collapseOne1">
                                                                        <h4 className="mb-0 text-dark">
                                                                            Earn More <i className="fas fa-angle-down rotate-icon"></i>
                                                                        </h4>
                                                                    </a>
                                                                </div>

                                                                <div id="collapseOne1" className="collapse" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
                                                                    <div className="card-body">
                                                                        <h3 className="text-dark font-weight-bold pb-4">Your earnings will vary based on the following:</h3>
                                                                        <ul>
                                                                            <li>The number of days you choose to work.</li>
                                                                            <li>The number and type of areas you are able to work in.</li>
                                                                            <li>Your willingness to travel.</li>
                                                                            <li>Your willingness to accept last minute bookings.</li>
                                                                            <li>The services you provide – if you are trained in a few areas you will receive more jobs.</li>
                                                                            <li>The number of repeat customers you have.</li>
                                                                            <li> The season - around key events like Christmas and Halloween, booking numbers tend to be higher.</li>
                                                                            <li>The tips you receive from customers.</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                            
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
