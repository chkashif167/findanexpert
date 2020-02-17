import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import App from '../../App';

export class EditCustomerBooking extends Component {
    displayName = EditCustomerBooking.name

    constructor() {
        super();

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customerID = localStorage.getItem('customerid');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const serviceproviderid = params.get('serviceproviderid');
        const serviceid = params.get('serviceid');
        const servicetypeid = params.get('servicetypeid');
        const servicetypeids = params.get('servicetypeids');
        const bookingid = params.get('bookingid');
        const bookingDate = params.get('bookingdate');
        const bookingTime = params.get('bookingtime');
        const servicetypeduration = params.get('servicetypeduration');
        const bookingNotes = params.get('bookingNotes');

        const postalcode = params.get('postalcode');
        const addressid = params.get('addressid');
        const genderpreference = params.get('genderpreference');
        const serviceprovidername = params.get('serviceprovidername');

        this.state = {
            availableSlotAvailibility: '',
            availableSlots: [],
            availibilityTimeSlots: [],

            serviceproviderid: serviceproviderid,
            customerid: customerID,
            bookingid: bookingid,
            serviceid: serviceid,
            servicetypeid: servicetypeid,
            servicetypeids: [],
            bookingconfirmed: false,
            bookingdate: bookingDate.slice('0', 10),
            bookingtime: bookingTime,
            currentDate: '',
            currentDateSlot: '',
            bookingduration: servicetypeduration,
            notes: bookingNotes,
            iscancelled: false,
            authtoken: customerAccesstoken,
            postalcode: postalcode,
            addressid: addressid,
            bookingpreference: '',
            genderpreference: genderpreference,
            serviceprovideremail: serviceproviderid,
            serviceprovidername: serviceprovidername,
            updated: false
        };

        this.handleChangeBookingTime = this.handleChangeBookingTime.bind(this);
        this.handleChangeCurrentDate = this.handleChangeCurrentDate.bind(this);
        this.handleChangeCurrentDateSlot = this.handleChangeCurrentDateSlot.bind(this);
        this.handleChangeBookingDate = this.handleChangeBookingDate.bind(this);
        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkAvailibility() {

        fetch(App.ApisBaseUrl + '/api/ServiceProvider/getavailabilityslots?serviceproviderid=' + this.state.serviceproviderid +
            '&customerid=' + this.state.customerid + '&bookingdate=' + this.state.bookingdate + '&bookingtime=' + this.state.bookingtime
            + '&bookingduration=' + this.state.bookingduration + '&authtoken=' + this.state.authtoken)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(response => {
                    console.log("Check availibility response:");
                    console.log(response);
                    if (response.availability == false) {
                        this.setState({ availableSlotAvailibility: response.availability_slot.availability });
                        console.log(this.state.availableSlotAvailibility);
                    }
                });
    }

    handleChangeBookingTime(e) {
        this.setState({ bookingtime: e.target.value });
        this.checkAvailibility();
    }

    handleChangeCurrentDate(e) {
        this.setState({ currentDate: e.target.value });
        alert(this.state.currentDate);
        var providerAvaialibility = this.state.availableSlots.filter(obj => obj.availableDate == e.target.value);
        if (providerAvaialibility.length > 0) {
            this.setState({ availibilityTimeSlots: providerAvaialibility[0].availableSlots.map(obj => obj.availableFrom) });
        }
    }

    handleChangeCurrentDateSlot(e) {
        this.setState({ currentDateSlot: e.target.value });
    }

    handleChangeBookingDate(date) {
        this.setState({
            bookingdate: date
        });
    }


    handleChangeNotes(e) {
        this.setState({ notes: e.target.value });
    }

    DoBooking(customerid, bookingid, serviceid, servicetypeid, bookingconfirmed, bookingdate, bookingtime, bookingduration, postalcode,
        addressid, bookingpreference, genderpreference, notes, serviceproviderid, serviceprovideremail, serviceprovidername,
        authtoken) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                customerid: customerid,
                bookingid: bookingid,
                serviceid: serviceid,
                servicetypeid: servicetypeid,
                bookingconfirmed: false,
                bookingdate: bookingdate,
                bookingtime: bookingtime,
                bookingduration: bookingduration,
                postalcode: postalcode,
                addressid: addressid,
                iscancelled: false,
                bookingpreference: bookingpreference,
                genderpreference: genderpreference,
                notes: notes,
                serviceproviderid: serviceproviderid,
                serviceprovideremail: serviceproviderid,
                serviceprovidername: serviceprovidername,
                authtoken: authtoken
            })
        };
        console.log(requestOptions);
        return fetch(App.ApisBaseUrl + '/api/Booking/editbooking', requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({ editbooking: response, updated: true });
                
            });
    }

    DoGenericBooking(customerid, bookingid, serviceid, servicetypeid, servicetypeids, bookingdate, bookingtime, bookingduration,
        notes, serviceproviderid, authtoken) {

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicetypeIds = params.get('servicetypeids');

        this.state.servicetypeids.push(servicetypeIds);
        console.log(this.state.servicetypeids);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                customerid: customerid,
                bookingid: bookingid,
                serviceid: serviceid,
                servicetypeids: servicetypeids,
                bookingdate: bookingdate,
                bookingtime: bookingtime,
                bookingduration: bookingduration,
                iscancelled: false,
                notes: notes,
                serviceproviderid: serviceproviderid,
                authtoken: authtoken
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Booking/editgenericbooking', requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({ editbooking: response, updated: true });

            });
    }

    handleSubmit(e) {
        e.preventDefault();

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        const isgeneric = params.get('isgeneric');

        if (isgeneric == 'false') {
            if (this.state.availableSlots != '') {
                if (this.state.currentDate != '' && this.state.currentDateSlot) {
                    const { customerid, bookingid, serviceid, servicetypeid, bookingconfirmed, bookingdate, bookingtime, bookingduration, postalcode,
                        addressid, bookingpreference, genderpreference, notes, serviceproviderid, serviceprovideremail, serviceprovidername,
                        authtoken } = this.state;
                    this.DoBooking(customerid, bookingid, serviceid, servicetypeid, bookingconfirmed, bookingdate, bookingtime, bookingduration, postalcode,
                        addressid, bookingpreference, genderpreference, notes, serviceproviderid, serviceprovideremail, serviceprovidername,
                        authtoken);
                }
                else {
                    alert('Please select Date and Time from available list!');
                }
            }
            else {
                const { customerid, bookingid, serviceid, servicetypeid, bookingconfirmed, bookingdate, bookingtime, bookingduration, postalcode,
                    addressid, bookingpreference, genderpreference, notes, serviceproviderid, serviceprovideremail, serviceprovidername,
                    authtoken } = this.state;
                this.DoBooking(customerid, bookingid, serviceid, servicetypeid, bookingconfirmed, bookingdate, bookingtime, bookingduration, postalcode,
                    addressid, bookingpreference, genderpreference, notes, serviceproviderid, serviceprovideremail, serviceprovidername,
                    authtoken);
            }
        }
        else if (isgeneric == 'true') {
            if (this.state.availableSlots != '') {
                if (this.state.currentDate != '' && this.state.currentDateSlot) {
                    const { customerid, bookingid, serviceid, servicetypeid, servicetypeids, bookingdate, bookingtime, bookingduration,
                        notes, serviceproviderid, authtoken } = this.state;
                    this.DoGenericBooking( customerid, bookingid, serviceid, servicetypeid, servicetypeids, bookingdate, bookingtime, bookingduration,
                        notes, serviceproviderid, authtoken );
                }
                else {
                    alert('Please select Date and Time from available list!');
                }
            }
            else {
                const { customerid, bookingid, serviceid, servicetypeid, servicetypeids, bookingdate, bookingtime, bookingduration,
                    notes, serviceproviderid, authtoken } = this.state;
                this.DoGenericBooking( customerid, bookingid, serviceid, servicetypeid, servicetypeids, bookingdate, bookingtime, bookingduration,
                    notes, serviceproviderid, authtoken );
            }
        }
    }

    render() {
        let contents = this.state.updated
            ? this.editBookingSubmitted(this.state.editbooking)
            : this.editBooking();
        return <div>
            {contents}
        </div>;
    }

    editBooking() {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const serviceType = params.get('serviceType');

        if (this.state.availableSlots != '') {

            var dialog = (<div className="text-center">
                <p>Unfortunately we are fully booked today. Please choose an alternative Date &Time from the list below.</p>
                <button type="button" class="btn btn-primary bg-black" data-toggle="modal" data-target="#exampleModal">
                    View List
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                    <div class="form-row">
                                        <div class="col mb-4">
                                            <select className="form-control" value={this.state.currentDate}
                                                onChange={this.handleChangeCurrentDate} required>
                                                <option value="">Select an option</option>
                                                {this.state.availableSlots.map((slot, index) =>
                                                    <option name={index} value={slot.availableDate} id={index}>{slot.availableDate}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div class="col mb-4">
                                            <select className="form-control" value={this.state.currentDateSlot}
                                                onChange={this.handleChangeCurrentDateSlot} required>
                                                <option value="">Select an option</option>
                                                {this.state.availibilityTimeSlots.map((slot1) =>
                                                    <option value={slot1}>{slot1}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
        }
        else {
            var dialog = (<p></p>);
        }

        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="booking-tp-rw">
                                    <h3 className="section-title pb-2"><strong>Edit Your Booking Details</strong></h3>

                                    <div className="pb-3">
                                        <h4>Service Name: {serviceType}</h4>
                                    </div>
                                </div>

                                <form onSubmit={this.handleSubmit}>

                                    <div className="md-form pb-3">
                                        <label>Booking Date</label>
                                        <ModernDatepicker
                                            date={this.state.bookingdate}
                                            format={'YYYY-MM-DD'}
                                            showBorder
                                            onChange={(date) => this.handleChangeBookingDate(date)}
                                            placeholder={'Select a date'} />
                                    </div>

                                    <div>
                                        <div className="md-form pb-5">
                                            <label>Booking Time</label>
                                            <select className="form-control" value={this.state.bookingtime}
                                                onChange={this.handleChangeBookingTime} required >
                                                <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                            </select>
                                        </div>
                                    </div>

                                    {dialog}

                                    <div className="md-form pb-5">
                                        <label className="lead">Booking Notes</label>
                                        <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8" placeholder="Add Booking Notes" />
                                    </div>

                                    <div className="text-center mb-3">
                                        <button className="btn btn-lg bg-orange text-white" type="submit">Confirm your Booking</button>
                                    </div>
                                        
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }

    editBookingSubmitted(editbooking) {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const serviceType = params.get('serviceType');

        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="booking-tp-rw">
                                    <div className="alert alert-success" role="alert">
                                        <p>You have Successfully updated your booking!</p>
                                    </div>

                                    <div className="pb-3">
                                        <h4>Service Name: {serviceType}</h4>
                                    </div>
                                </div>

                                <form onSubmit={this.handleSubmit}>

                                    <div className="md-form pb-3">
                                        <label>Booking Date</label>
                                        <ModernDatepicker
                                            date={this.state.bookingdate}
                                            format={'YYYY-MM-DD'}
                                            showBorder
                                            onChange={(date) => this.handleChangeBookingDate(date)}
                                            placeholder={'Select a date'} />
                                    </div>

                                    <div>
                                        <div className="md-form pb-5">
                                            <label>Booking Time</label>
                                            <select className="form-control" value={this.state.bookingtime}
                                                onChange={this.handleChangeBookingTime} required >
                                                <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="md-form pb-5">
                                        <label className="lead">Booking Notes</label>
                                        <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8" placeholder="Add Booking Notes" />
                                    </div>

                                    <div className="text-center mb-3">
                                        <button className="btn btn-lg bg-orange text-white" type="submit">Confirm your Booking</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
