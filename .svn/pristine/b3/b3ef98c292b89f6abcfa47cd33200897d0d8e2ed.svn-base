import React, { Component } from 'react';
import { ProviderSidebarLinks } from '../Profile/SidebarLinks';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';

export class ProviderAppointmentDetail extends Component {
    displayName = ProviderAppointmentDetail.name

    render() {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicename = params.get('servicename');
        const customername = params.get('customername');
        const customeraddress = params.get('customeraddress');
        const serviceduration = params.get('serviceduration');
        const bookingnotes = params.get('bookingnotes');
        const bookingdate = params.get('bookingdate');
        const bookingtime = params.get('bookingtime');

        if (bookingnotes != '') {
            var bookingNotes = (
            <p class="desc p-4">
                {bookingnotes}
            </p>);
        }

        return (

            <div id="MainPageWrapper">

                <BreadCrumbs />

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <ProviderSidebarLinks />

                                <div className="col-md-9 pt-5">
                                    <div className="service-decription pb-5">

                                        <div class="card bg-light text-dark desc-card">
                                            <div class="card-body">
                                                <div class="col-md-4 next_contents">
                                                    <span class="text-secondary"><strong>SERVICE</strong></span>
                                                    <div>{servicename}</div><br />
                                                    <span class="text-secondary"><strong>Time</strong></span><div>{bookingtime}</div>
                                                </div>
                                                <div class="col-md-4 next_contents_two">
                                                    <span class="text-secondary"><strong>DURATION</strong></span><div>{serviceduration} Min</div><br />
                                                    <span class="text-secondary"><strong>Date</strong></span><div>{bookingdate}</div>
                                                </div>
                                                <div class="col-md-4 next_contents_two">
                                                    <span class="text-secondary"><strong>CLIENT</strong></span><div>{customername}</div><br />
                                                    <span class="text-secondary"><strong>Address</strong></span><div>{customeraddress}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="bookingNotesWrap pt-3">
                                            <div class="title">
                                                <h4>Notes</h4>
                                            </div>
                                            {bookingNotes}
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


