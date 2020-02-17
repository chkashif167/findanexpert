import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import App from '../App';

export interface BookingFieldsDataState {
    bookings: BookingFields;
    customerid : number;
    serviceid: number;
    servicetypeid: number;
    bookingdate: Date;
    bookinghours: numberS;
    booked : boolean;
}

export class Bookings extends React.Component {
    displayName = Bookings.name

    constructor(props) {
        super(props);
        var customerID = localStorage.getItem('customerid');
        var serviceID = localStorage.getItem('serviceid');
        var servicetypeid = localStorage.getItem('servicetypeid');
        var postalcode = localStorage.getItem('postalcode');
        var addressid = localStorage.getItem('addressid');
        var bookingtime = localStorage.getItem('bookingTime');
        var bookinghours = localStorage.getItem('srvtypeduration');

        this.state = {
            bookings: new BookingFields(),
            customerid: customerID,
            servicemapperid: serviceID,
            servicetypeid: servicetypeid,
            bookingdate: new Date(),
            bookingtime: bookingtime,
            bookinghours: bookinghours,
            postalcode: postalcode,
            addressid: addressid,
            bookingpreference: '',
            genderpreference: '',
            notes: '',
            booked : false
        };

        this.handleChangeCustomerID = this.handleChangeCustomerID.bind(this);
        this.handleChangeServiceID = this.handleChangeServiceID.bind(this);
        this.handleChangeServiceTypeID = this.handleChangeServiceTypeID.bind(this);
        this.handleChangeBookingDate = this.handleChangeBookingDate.bind(this);
        this.handleChangeBookingTime = this.handleChangeBookingTime.bind(this);
        this.handleChangeBookingHours = this.handleChangeBookingHours.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeAddressId = this.handleChangeAddressId.bind(this);
        this.handleChangeBookingPreference = this.handleChangeBookingPreference.bind(this);
        this.handleChangeGenderPreference = this.handleChangeGenderPreference.bind(this);
        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    DoBooking(customerid, serviceid, servicetypeid, bookingdate, bookingtime, bookinghours, postalcode, addressid, bookingpreference, genderpreference, notes) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                CustomerID: customerid,
                ServiceID: serviceid,
                ServiceTypeID: servicetypeid,
                BookingDate: bookingdate,
                BookingTime: bookingtime,
                BookingHours: bookinghours,
                PostalCode: postalcode,
                AddressId: addressid,
                BookingPreference: bookingpreference,
                GenderPreference: genderpreference,
                Notes: notes
            })
        };
        
        return fetch(App.ApisBaseUrl + '/api/Booking/dobooking', requestOptions)
            .then(response => response.json())
            .then(response => {
                this.setState({ bookings: response, booked: true });
                console.log(response);
            });
    }

    handleChangeCustomerID(e) {
        this.setState({ customerid: e.target.value });
    }

    handleChangeServiceID(e) {
        this.setState({ serviceid: e.target.value });
    }

    handleChangeServiceTypeID(e) {
        this.setState({ servicetypeid: e.target.value });
    }

    handleChangeBookingDate(e) {
        this.setState({ bookingdate: e.target.value });
    }

    handleChangeBookingTime(e) {
        this.setState({ bookingtime: e.target.value });
    }

    handleChangeBookingHours(e) {
        this.setState({ bookinghours: e.target.value });
    }

    handleChangePostalCode(e) {
        this.setState({ postalcode: e.target.value });
    }

    handleChangeAddressId(e) {
        this.setState({ addressid: e.target.value });
    }

    handleChangeBookingPreference(e) {
        this.setState({ bookingpreference: e.target.value });
    }

    handleChangeGenderPreference(e) {
        this.setState({ genderpreference: e.target.value });
    }

    handleChangeNotes(e) {
        this.setState({ notes: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { customerid, serviceid, servicetypeid, bookingdate, bookingtime, bookinghours, postalcode, addressid, bookingpreference, genderpreference, notes } = this.state;
        this.DoBooking(customerid, serviceid, servicetypeid, bookingdate, bookingtime, bookinghours, postalcode, addressid, bookingpreference, genderpreference, notes);
    }

    render() {
        let contents = this.renderBookingScreen();
        return <div>
                   {contents}
               </div>;
    }

    renderBookingScreen() {
        return (
            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">
                            <div className="col-md-12">
                                <div className="Bookings">
                                    <h3>Customer Bookings</h3>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="customerid">Customer ID</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="text" name="customerid" value={this.state.customerid} onChange={this.handleChangeCustomerID} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="serviceid">Service ID</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="text" name="serviceid" value={this.state.serviceid} onChange={this.handleChangeServiceID} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="servicetypeid">Service Type ID</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="text" name="servicetypeid" value={this.state.servicetypeid} onChange={this.handleChangeServiceTypeID} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="bookingdate">Booking Date</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="Date" name="bookingdate" value={this.state.bookingdate} onChange={this.handleChangeBookingDate} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="bookingtime">Booking Time</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="text" name="bookingtime" value={this.state.bookingtime} onChange={this.handleChangeBookingTime} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="bookinghours">Booking Hours</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="text" name="bookinghours" value={this.state.bookinghours} onChange={this.handleChangeBookingHours} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="postalcode">Postal Code</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="text" name="postalcode" value={this.state.postalcode} onChange={this.handleChangePostalCode} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="addressid">Address Id</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="text" name="addressid" value={this.state.addressid} onChange={this.handleChangeAddressId} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="bookingpreference">Booking Preference</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="text" name="bookingpreference" value={this.state.bookingpreference} onChange={this.handleChangeBookingPreference} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="genderpreference">Gender Preference</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="text" name="genderpreference" value={this.state.genderpreference} onChange={this.handleChangeGenderPreference} required />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className=" control-label col-md-12" htmlFor="notes">Booking Notes</label>
                                            <div className="col-md-4">
                                                <input className="form-control" type="text" name="notes" value={this.state.notes} onChange={this.handleChangeNotes} required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-default">Confirm Booking</button>
                                        </div >
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

export class BookingFields {
    customerid = 0;
    serviceid = 0;
    servicetypeid = 0;
    bookingdate = new Date();
    bookingtime = 0;
    bookinghours = 0;
    postalcode = 0;
    addressid = 0;
    bookingpreference = 0;
    genderpreference = 0;
    notes = 0;
}