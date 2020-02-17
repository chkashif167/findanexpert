import React, { Component } from 'react';
import App from '../App';
import toastr from 'toastr';

export class ProviderSchedular extends Component {
    displayName = ProviderSchedular.name

    constructor() {
        super();

        this.state = {
            //serviceproviderid: '',
            availableday: '',
            availabletimefrommonday: '',
            availabletimetomonday: '',
            availabletimefromtuesday: '',
            availabletimetotuesday: '',
            availabletimefromwednesday: '',
            availabletimetowednesday: '',

            availabletimefromthursday: '',
            availabletimetothursday: '',
            availabletimefromfriday: '',
            availabletimetofriday: '',
            availabletimefromsaturday: '',
            availabletimetosaturday: '',

            availabletimefromsunday: '',
            availabletimetosunday: '',
            serviceProviderAvailabilityList: [], updated: false,
            serviceProviderAvailability: []
        };

        this.handleChangeAvailabledays = this.handleChangeAvailabledays.bind(this);

        this.handleChangeAvailabletimefromMonday = this.handleChangeAvailabletimefromMonday.bind(this);
        this.handleChangeAvailabletimetoMonday = this.handleChangeAvailabletimetoMonday.bind(this);

        this.handleChangeAvailabletimefromTuesday = this.handleChangeAvailabletimefromTuesday.bind(this);
        this.handleChangeAvailabletimetoTuesday = this.handleChangeAvailabletimetoTuesday.bind(this);

        this.handleChangeAvailabletimefromWednesday = this.handleChangeAvailabletimefromWednesday.bind(this);
        this.handleChangeAvailabletimetoWednesday = this.handleChangeAvailabletimetoWednesday.bind(this);

        this.handleChangeAvailabletimefromThursday = this.handleChangeAvailabletimefromThursday.bind(this);
        this.handleChangeAvailabletimetoThursday = this.handleChangeAvailabletimetoThursday.bind(this);

        this.handleChangeAvailabletimefromFriday = this.handleChangeAvailabletimefromFriday.bind(this);
        this.handleChangeAvailabletimetoFriday = this.handleChangeAvailabletimetoFriday.bind(this);

        this.handleChangeAvailabletimefromSaturday = this.handleChangeAvailabletimefromSaturday.bind(this);
        this.handleChangeAvailabletimetoSaturday = this.handleChangeAvailabletimetoSaturday.bind(this);

        this.handleChangeAvailabletimefromSunday = this.handleChangeAvailabletimefromSunday.bind(this);
        this.handleChangeAvailabletimetoSunday = this.handleChangeAvailabletimetoSunday.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        var serviceproviderid = localStorage.getItem("serviceproviderid");
        this.state.serviceProviderAvailabilityList[0] = serviceproviderid;
    }

    getInitialState = () => {
        const initialState = {
        };
        return initialState;
    }

    resetState = () => {
        this.setState(this.getInitialState());
    }


    AddAvailibility(serviceproviderid, availableday, availabletimefrom, availabletimeto, serviceProviderAvailabilityList) {
        /*--- Monday ---*/
        if (this.state.serviceProviderAvailabilityList[1] != null) {
            this.state.serviceProviderAvailability.push({
                serviceproviderid: this.state.serviceProviderAvailabilityList[0],
                availableday: this.state.serviceProviderAvailabilityList[1],
                availabletimefrom: this.state.serviceProviderAvailabilityList[2],
                availabletimeto: this.state.serviceProviderAvailabilityList[3]
            });
        }
        if (this.state.serviceProviderAvailabilityList[4] != null) {
            /*--- Tuesday ---*/
            this.state.serviceProviderAvailability.push({
                serviceproviderid: this.state.serviceProviderAvailabilityList[0],
                availableday: this.state.serviceProviderAvailabilityList[4],
                availabletimefrom: this.state.serviceProviderAvailabilityList[5],
                availabletimeto: this.state.serviceProviderAvailabilityList[6]
            });
        }
        if (this.state.serviceProviderAvailabilityList[7] != null) {
            /*--- Wednesday ---*/
            this.state.serviceProviderAvailability.push({
                serviceproviderid: this.state.serviceProviderAvailabilityList[0],
                availableday: this.state.serviceProviderAvailabilityList[7],
                availabletimefrom: this.state.serviceProviderAvailabilityList[8],
                availabletimeto: this.state.serviceProviderAvailabilityList[9]
            });
        }
        if (this.state.serviceProviderAvailabilityList[10] != null) {
            /*--- Thursday ---*/
            this.state.serviceProviderAvailability.push({
                serviceproviderid: this.state.serviceProviderAvailabilityList[0],
                availableday: this.state.serviceProviderAvailabilityList[10],
                availabletimefrom: this.state.serviceProviderAvailabilityList[11],
                availabletimeto: this.state.serviceProviderAvailabilityList[12]
            });
        }
        if (this.state.serviceProviderAvailabilityList[13] != null) {
            /*--- Friday ---*/
            this.state.serviceProviderAvailability.push({
                serviceproviderid: this.state.serviceProviderAvailabilityList[0],
                availableday: this.state.serviceProviderAvailabilityList[13],
                availabletimefrom: this.state.serviceProviderAvailabilityList[14],
                availabletimeto: this.state.serviceProviderAvailabilityList[15]
            });
        }
        if (this.state.serviceProviderAvailabilityList[16] != null) {
            /*--- Saturday ---*/
            this.state.serviceProviderAvailability.push({
                serviceproviderid: this.state.serviceProviderAvailabilityList[0],
                availableday: this.state.serviceProviderAvailabilityList[16],
                availabletimefrom: this.state.serviceProviderAvailabilityList[17],
                availabletimeto: this.state.serviceProviderAvailabilityList[18]
            });
        }
        if (this.state.serviceProviderAvailabilityList[19] != null) {
            /*--- Sunday ---*/
            this.state.serviceProviderAvailability.push({
                serviceproviderid: this.state.serviceProviderAvailabilityList[0],
                availableday: this.state.serviceProviderAvailabilityList[19],
                availabletimefrom: this.state.serviceProviderAvailabilityList[20],
                availabletimeto: this.state.serviceProviderAvailabilityList[21]
            });
        }

        var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serviceProviderAvailability: this.state.serviceProviderAvailability,
                authtoken: providerAccesstoken

            })
        };
        console.log(requestOptions.body);
        //console.log(serviceproviderid);
        console.log(this.state.serviceProviderAvailabilityList);
        return fetch(App.ApisBaseUrl + '/api/ServiceProvider/addserviceprovideravailability', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ updateCustomer: response, updated: true });
                //window.location = '/provider-schedular';

                toastr['success']('Your schedular details are Updated Successfully!');
                setTimeout(function () {
                    window.location = '/provider-schedular';
                }, 3000);

            });
    }

    handleChangeAvailabledays(e) {
        this.setState({ availableday: e.target.value });
        //alert(e.target.value);
        //this.state.serviceProviderAvailabilityList.push(e.target.value);
        if (e.target.value == 'monday') {
            this.state.serviceProviderAvailabilityList[1] = e.target.value;
        }
        if (e.target.value == 'tuesday') {
            this.state.serviceProviderAvailabilityList[4] = e.target.value;
        }
        if (e.target.value == 'wednesday') {
            this.state.serviceProviderAvailabilityList[7] = e.target.value;
        }
        if (e.target.value == 'thursday') {
            this.state.serviceProviderAvailabilityList[10] = e.target.value;
        }
        if (e.target.value == 'friday') {
            this.state.serviceProviderAvailabilityList[13] = e.target.value;
        }
        if (e.target.value == 'saturday') {
            this.state.serviceProviderAvailabilityList[16] = e.target.value;
        }
        if (e.target.value == 'sunday') {
            this.state.serviceProviderAvailabilityList[19] = e.target.value;
        }

    }

    /*-------Monday---------*/
    handleChangeAvailabletimefromMonday(e) {
        this.setState({ availabletimefrommonday: e.target.value });
        this.state.serviceProviderAvailabilityList[2] = e.target.value;
    }
    handleChangeAvailabletimetoMonday(e) {
        if (e.target.value <= this.state.availabletimefrommonday) {
            //alert('Please select greater time.');
            toastr['error']('Please select greater time.');
            return false;
        }
        else {
            this.setState({ availabletimetomonday: e.target.value });
            this.state.serviceProviderAvailabilityList[3] = e.target.value;
        }
    }

    /*-------Tuesday---------*/
    handleChangeAvailabletimefromTuesday(e) {
        this.setState({ availabletimefromtuesday: e.target.value });
        this.state.serviceProviderAvailabilityList[5] = e.target.value;
    }
    handleChangeAvailabletimetoTuesday(e) {
        if (e.target.value <= this.state.availabletimefromtuesday) {
            //alert('Please select greater time.');
            toastr['error']('Please select greater time.');
            return false;
        }
        else {
            this.setState({ availabletimetotuesday: e.target.value });
            this.state.serviceProviderAvailabilityList[6] = e.target.value;
        }
    }

    /*-------Wednesday---------*/
    handleChangeAvailabletimefromWednesday(e) {
        this.setState({ availabletimefromwednesday: e.target.value });
        this.state.serviceProviderAvailabilityList[8] = e.target.value;
    }
    handleChangeAvailabletimetoWednesday(e) {
        if (e.target.value <= this.state.availabletimefromwednesday) {
            //alert('Please select greater time.');
            toastr['error']('Please select greater time.');
            return false;
        }
        else {
            this.setState({ availabletimetowednesday: e.target.value });
            this.state.serviceProviderAvailabilityList[9] = e.target.value;
        }
    }

    /*-------Thursday---------*/
    handleChangeAvailabletimefromThursday(e) {
        this.setState({ availabletimefromthursday: e.target.value });
        this.state.serviceProviderAvailabilityList[11] = e.target.value;
    }
    handleChangeAvailabletimetoThursday(e) {
        if (e.target.value <= this.state.availabletimefromthursday) {
            //alert('Please select greater time.');
            toastr['error']('Please select greater time.');
            return false;
        }
        else {
            this.setState({ availabletimetothursday: e.target.value });
            this.state.serviceProviderAvailabilityList[12] = e.target.value;
        }
    }

    /*-------Friday---------*/
    handleChangeAvailabletimefromFriday(e) {
        this.setState({ availabletimefromfriday: e.target.value });
        this.state.serviceProviderAvailabilityList[14] = e.target.value;
    }
    handleChangeAvailabletimetoFriday(e) {
        if (e.target.value <= this.state.availabletimefromfriday) {
            //alert('Please select greater time.');
            toastr['error']('Please select greater time.');
            return false;
        }
        else {
            this.setState({ availabletimetofriday: e.target.value });
            this.state.serviceProviderAvailabilityList[15] = e.target.value;
        }
    }

    /*-------Saturday---------*/
    handleChangeAvailabletimefromSaturday(e) {
        this.setState({ availabletimefromsaturday: e.target.value });
        this.state.serviceProviderAvailabilityList[17] = e.target.value;
    }
    handleChangeAvailabletimetoSaturday(e) {
        if (e.target.value <= this.state.availabletimefromsaturday) {
            //alert('Please select greater time.');
            toastr['error']('Please select greater time.');
            return false;
        }
        else {
            this.setState({ availabletimetosaturday: e.target.value });
            this.state.serviceProviderAvailabilityList[18] = e.target.value;
        }
    }

    /*-------Sunday---------*/
    handleChangeAvailabletimefromSunday(e) {
        this.setState({ availabletimefromsunday: e.target.value });
        this.state.serviceProviderAvailabilityList[20] = e.target.value;
    }
    handleChangeAvailabletimetoSunday(e) {
        if (e.target.value <= this.state.availabletimefromsunday) {
            //alert('Please select greater time.');
            toastr['error']('Please select greater time.');
            return false;
        }
        else {
            this.setState({ availabletimetosunday: e.target.value });
            this.state.serviceProviderAvailabilityList[21] = e.target.value;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { availableday, availabletimefrom, availabletimeto, serviceProviderAvailabilityList } = this.state;
        this.AddAvailibility(availableday, availabletimefrom, availabletimeto, serviceProviderAvailabilityList);
    }

    render() {
        let contents = this.state.updated
            ? this.UpdatedProviderProfile(this.state.updateCustomer)
            : this.ProviderProfile();
        return <div>
            {contents}
        </div>;
    }

    ProviderProfile() {
        return (

            <div className="Register coloredBox">
                <p className="font-weight-bold mb-5">Update your <span className="text-red">Schedule</span></p>
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data" className="profileBox p-5">
                    <div className="form-row bg-half-white mb-4 px-2">
                        <div class="col">
                            <h4>Days</h4>
                        </div>
                        <div class="col">
                            <h4>From</h4>
                        </div>
                        <div class="col">
                            <h4>To</h4>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input frm-field" type="checkbox" value="monday" id="monday"
                                onChange={this.handleChangeAvailabledays} />
                            <label class="form-check-label" for="monday">
                                Monday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimefrommonday}
                                onChange={this.handleChangeAvailabletimefromMonday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimetomonday}
                                onChange={this.handleChangeAvailabletimetoMonday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input frm-field" type="checkbox" value="tuesday" id="tuesday"
                                onChange={this.handleChangeAvailabledays} />
                            <label class="form-check-label" for="tuesday">
                                Tuesday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimefromtuesday}
                                onChange={this.handleChangeAvailabletimefromTuesday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimetotuesday}
                                onChange={this.handleChangeAvailabletimetoTuesday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input frm-field" type="checkbox" value="wednesday" id="wednesday"
                                onChange={this.handleChangeAvailabledays} />
                            <label class="form-check-label" for="wednesday">
                                Wednesday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimefromwednesday}
                                onChange={this.handleChangeAvailabletimefromWednesday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimetowednesday}
                                onChange={this.handleChangeAvailabletimetoWednesday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="thursday" id="thursday"
                                onChange={this.handleChangeAvailabledays} />
                            <label class="form-check-label" for="thursday">
                                Thursday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimefromthursday}
                                onChange={this.handleChangeAvailabletimefromThursday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimetothursday}
                                onChange={this.handleChangeAvailabletimetoThursday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="friday" id="friday"
                                onChange={this.handleChangeAvailabledays} />
                            <label class="form-check-label" for="friday">
                                Friday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimefromfriday}
                                onChange={this.handleChangeAvailabletimefromFriday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimetofriday}
                                onChange={this.handleChangeAvailabletimetoFriday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="saturday" id="saturday"
                                onChange={this.handleChangeAvailabledays} />
                            <label class="form-check-label" for="saturday">
                                Saturday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimefromsaturday}
                                onChange={this.handleChangeAvailabletimefromSaturday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimetosaturday}
                                onChange={this.handleChangeAvailabletimetoSaturday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-5">
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="sunday" id="sunday"
                                onChange={this.handleChangeAvailabledays} />
                            <label class="form-check-label" for="sunday">
                                Sunday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimefromsunday}
                                onChange={this.handleChangeAvailabletimefromSunday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value={this.state.availabletimetosunday}
                                onChange={this.handleChangeAvailabletimetoSunday} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-center mb-5">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Update Your Schedule</button>
                    </div>
                </form>
            </div>
        );
    }

    UpdatedProviderProfile(updateCustomer) {
        return (
            <div>
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    <div className="form-row bg-half-white mb-4 px-2">
                        <div class="col">
                            <h4>Days</h4>
                        </div>
                        <div class="col">
                            <h4>From</h4>
                        </div>
                        <div class="col">
                            <h4>To</h4>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="" id="monday" />
                            <label class="form-check-label" for="monday">
                                Monday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input frm-field" type="checkbox" value="" id="tuesday" />
                            <label class="form-check-label" for="tuesday">
                                Tuesday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="" id="wednesday" />
                            <label class="form-check-label" for="wednesday">
                                Wednesday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="" id="thursday" />
                            <label class="form-check-label" for="thursday">
                                Thursday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="" id="friday" />
                            <label class="form-check-label" for="friday">
                                Friday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="" id="saturday" />
                            <label class="form-check-label" for="saturday">
                                Saturday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row pb-5">
                        <div class="col">
                            <input class="form-check-input" type="checkbox" value="" id="sunday" />
                            <label class="form-check-label" for="sunday">
                                Sunday
                            </label>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control frm-field" value=""
                                onChange="">
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right mb-5">Update Your Schedule</button>
                    </div>
                </form>
            </div>

            //<Redirect to='/profile' />
        );
    }


}


