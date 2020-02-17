import React, { Component } from 'react';
import App from '../../App';

export class CustomerBookingDetail extends Component {
    displayName = CustomerBookingDetail.name


    constructor(props) {
        super(props);
        var customerid = localStorage.getItem("customerid");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        
        const bookingid = params.get('bookingid');
        const bookingdate = params.get('bookingdate');
        const bookingtime = params.get('bookingtime');
        const servicetypename = params.get('servicetype');
        const bookingNotes = params.get('bookingnotes');
        const serviceprovider = params.get('serviceprovider');
        const serviceproviderid = params.get('serviceproviderid');
        
        this.state = {
            customerid: customerid,
            bookingid: bookingid,
            serviceid: '0',
            servicetypeid: '0',
            bookingconfirmed: false,
            bookingdate: bookingdate,
            bookingtime: bookingtime,
            iscancelled: true,
            notes: '',
            serviceproviderid: serviceproviderid,
            authtoken: customerAccesstoken,
            updated: false
        };

        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    cancelBooking(customerid, bookingid, serviceid, servicetypeid, bookingconfirmed, bookingdate, bookingtime, iscancelled, notes, serviceproviderid, authtoken) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerid: customerid,
                bookingid: bookingid,
                serviceid: serviceid,
                servicetypeid: servicetypeid,
                bookingconfirmed: bookingconfirmed,
                bookingdate: bookingdate,
                bookingtime: bookingtime,
                iscancelled: iscancelled,
                notes: notes,
                serviceproviderid: serviceproviderid,
                authtoken: authtoken
            })
        };
        console.log(requestOptions);
        return fetch(App.ApisBaseUrl + '/api/Booking/editbooking', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(response => {
                console.log(response);
                if (response.status == '200') {
                    alert('Booking cancelled successfully!');
                }
                this.setState({ cancelbooking: response, updated: true });
                if (response.message != '') {
                    //window.location = '/customer-bookings';
                }
            });
    }

    handleChangeNotes(e) {
        this.setState({ notes: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { customerid, bookingid, serviceid, servicetypeid, bookingconfirmed, bookingdate, bookingtime, iscancelled, notes, serviceproviderid, authtoken } = this.state;
        this.cancelBooking(customerid, bookingid, serviceid, servicetypeid, bookingconfirmed, bookingdate, bookingtime, iscancelled, notes, serviceproviderid, authtoken );
    }

    render() {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const bookingdate = params.get('bookingdate');
        const bookingid = params.get('bookingid');
        const servicename = params.get('servicename');
        const servicetypename = params.get('servicetype');
        const bookingNotes = params.get('bookingnotes');
        const serviceprovider = params.get('serviceprovider');

        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="service-decription">
                                    <h3 className="section-title pb-2"><strong>Service:</strong> {servicetypename}</h3>
                                    <h3 className="section-title pb-2"><strong>Service Provider:</strong> {serviceprovider}</h3>
                                    <p>
                                        <strong>Notes:</strong> {bookingNotes}
                                    </p>
                                    <p>
                                        <strong>Date:</strong> {bookingdate.slice('0', 10)}
                                    </p>

                                    <hr class="my-4" />
                                    <a className="btn btn-large bg-orange text-white float-right" href={'/customer-consent/?' +
                                        btoa(encodeURIComponent('servicename=' + servicename + '&srvtypename=' + servicetypename + '&bookingid=' + bookingid))}>Consent Form</a>
                                    
                                </div>
                            </div>
                        </div>
                        
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">

                                            <div className="card">

                                                <div className="card-header" role="tab" id="headingOne1">
                                                    <a data-toggle="collapse" data-parent="#accordionEx" href="#collapseOne1" aria-expanded="true"
                                                        aria-controls="collapseOne1">
                                                        <h3 className="mb-0">
                                                            Want to Cancel this Booking? <i className="fas fa-angle-down rotate-icon"></i>
                                                        </h3>
                                                    </a>
                                                </div>

                                                <div id="collapseOne1" className="collapse" role="tabpanel" aria-labelledby="headingOne1" data-parent="#accordionEx">
                                                    <div className="card-body">
                                                        <div className="md-form pb-3">
                                                            <label>Reasons</label>
                                                            <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="5" placeholder="Tell us why you are cancelling this Booking"
                                                                required />
                                                        </div>
                                                        <div className="text-center mb-3">
                                                            <button className="btn btn-lg bg-orange text-white" type="submit">Submit</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


