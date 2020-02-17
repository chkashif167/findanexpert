import React, { Component } from 'react';
import { ProviderSidebarLinks } from '../Profile/SidebarLinks';
import { ProviderSchedular } from '../../ProviderSchedular';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';
import App from '../../../App';
import toastr from 'toastr';

export class ProviderAllSchedules extends Component {
    displayName = ProviderAllSchedules.name

    constructor(props) {
        super(props);
        var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        var serviceproviderID = localStorage.getItem('serviceproviderid');
        var serviceproviderEmail = localStorage.getItem('email');
        this.state = {
            serviceprovideravailability: [], availablibilityList: [], availableTimeFromList: [], availableTimeto: [], serviceproviderUnavailability: [], loading: true,
            serviceproviderid: serviceproviderID, email: serviceproviderEmail, date: '', selectedDate: '', from: '', to: '', authtoken: providerAccesstoken, add: false
        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        fetch(App.ApisBaseUrl + '/api/ServiceProvider/getserviceprovideravailability?serviceProviderId=' + serviceproviderID + '&authToken=' + providerAccesstoken)
            .then(response => {
                console.log(response);
                if (response.status == '404') {
                    localStorage.setItem('providerAvailibilityStatus', response.status);
                }
                else {
                    localStorage.removeItem('providerAvailibilityStatus');
                    return response.json();
                }
            })
            .then(data => {
                console.log(data.serviceprovideravailability);
                
                this.setState({ serviceprovideravailability: data.serviceprovideravailability, loading: false });
            });

        fetch(App.ApisBaseUrl + '/api/ServiceProvider/getunavailability?serviceProviderId=' + serviceproviderID + '&email=' + serviceproviderEmail + '&authToken=' + providerAccesstoken)
            .then(response => {
                console.log(response);
                if (response.status == '404') {
                    localStorage.setItem('providerUnavailibilityStatus', response.status);
                }
                else {
                    localStorage.removeItem('providerUnavailibilityStatus');
                    return response.json();
                }
                
            })
            .then(data => {
                console.log(data);
                this.setState({ serviceproviderUnavailability: data, loading: false });
            });
    }

    AddUnavailibility(serviceproviderid, email, date, from, to, authtoken) {

        var selectedDate = new Date(date);
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var DAY = weekday[selectedDate.getDay()];
        var day = DAY.toLowerCase();
        console.log(day);

        var j = 0;
        for (var i = 0; i < this.state.serviceprovideravailability.length; i++) {

            this.state.availablibilityList.push(this.state.serviceprovideravailability[i]);
            console.log(this.state.availablibilityList[i].availableDay);
            if (day == this.state.availablibilityList[i].availableDay && from >= this.state.availablibilityList[i].availableTimeFrom && to <= this.state.availablibilityList[i].availableTimeto) {
                j++;
            }
        }

        if (j == 1) {

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    serviceproviderid: serviceproviderid,
                    email: email,
                    unavailabilitydate: date,
                    fromtime: from,
                    totime: to,
                    unavailabilityid: 0,
                    isdeleted: false,
                    authtoken: authtoken
                })
            };

            console.log(requestOptions);

            return fetch(App.ApisBaseUrl + '/api/ServiceProvider/addeditunavailability', requestOptions)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(response => {
                    console.log(response);
                    if (response.message == 'Added/Deleted') {
                        this.setState({ added: response, add: true });

                        toastr['success']('Unavailablity added successfully!');
                        setTimeout(function () {
                            window.location = '/provider-schedular';
                        }, 3000);

                        
                    }
                    else {
                        toastr['error']('Unavailablity already exists!');
                    }
                });

            j = 0;

        } else {
            toastr['error']('You selected Schedule does not match your availibility! Please another one.');
        }


    }

    handleChangeDate(e) {
        this.setState({ date: e.target.value });
    }

    handleChangeFrom(e) {
        this.setState({ from: e.target.value });
    }

    handleChangeTo(e) {
        this.setState({ to: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { serviceproviderid, email, date, from, to, authtoken } = this.state;
        this.AddUnavailibility(serviceproviderid, email, date, from, to, authtoken);
    }

    getUnavailibilityID(e) {
        console.log(e.target.id)
        localStorage.setItem('unavailabilityid', e.target.id)
    }

    handleRemoveUnavailibilty(e) {
        e.preventDefault();

        var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        var serviceproviderID = localStorage.getItem('serviceproviderid');
        var serviceproviderEmail = localStorage.getItem('email');
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                serviceproviderid: serviceproviderID,
                email: serviceproviderEmail,
                unavailabilitydate: '2019-03-22',
                fromtime: '',
                totime: '',
                unavailabilityid: localStorage.getItem('unavailabilityid'),
                isdeleted: true,
                authtoken: providerAccesstoken
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/ServiceProvider/addeditunavailability', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    
                    toastr['error']('Unavailibility has been removed!');
                    setTimeout(function () {
                        window.location = '/provider-schedular';
                    }, 3000);

                }

            });
    }

    render() {
        if (localStorage.getItem('providerAvailibilityStatus') == '404') {
            return (
                this.ProviderNoAvailibility(this.state.serviceprovideravailability)
            );
        }
        else if (localStorage.getItem('providerUnavailibilityStatus') == '404') {
            return (
                this.ProviderNoUnAvailibility(this.state.serviceprovideravailability)
            );
        }
        else {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.ProviderAllSchedule(this.state.serviceprovideravailability, this.state.serviceproviderUnavailability);
            return (
                <div>
                    {contents}
                </div>
            );
        }
    }

    ProviderNoAvailibility() {

        return (

            <div id="MainPageWrapper">

                <ProviderSidebarLinks />

                <section class="section-padding customerProfile">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div className="col-md-12">

                                    <div className="addProviderScheduleBtn text-right">
                                        <a className="btn bg-black text-white" href="/provider-edit-schedular">
                                            Add Your Availibility
                                        </a>
                                    </div>

                                    <div className="AvailibilityWrap">
                                        <h3 className="section-title pb-2"><strong>Your schedule is empty</strong></h3>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    ProviderAllSchedule(serviceprovideravailability, serviceproviderUnavailability) {

        return (

            <div id="MainPageWrapper">

                <ProviderSidebarLinks />

                <section class="section-padding customerProfile">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div className="col-md-12 pb-5">

                                    <div className="addProviderScheduleBtn text-right">
                                        <a className="btn bg-black text-white" href="/provider-edit-schedular">
                                            Add Your Unavailibility
                                        </a>
                                    </div>

                                    <div className="AvailibilityWrap p-5 coloredBox">
                                        <p className="font-weight-bold mb-5">Your <span className="text-red">Availibility</span></p>
                                        <div className="form-row border-bottom mb-3 px-2">
                                            <div class="col">
                                                <h4><strong>Days</strong></h4>
                                            </div>
                                            <div class="col">
                                                <h4><strong>From</strong></h4>
                                            </div>
                                            <div class="col">
                                                <h4><strong>To</strong></h4>
                                            </div>
                                        </div>

                                        <div className="contents pb-5">
                                        
                                            {serviceprovideravailability.map(srv =>
                                                <div>
                                                    <div className="form-row mb-3">
                                                            <div class="col">
                                                                <h4>{srv.availableDay}</h4>
                                                            </div>
                                                            <div class="col">
                                                                <h4>{srv.availableTimeFrom}</h4>
                                                            </div>
                                                            <div class="col">
                                                                <h4>{srv.availableTimeto}</h4>
                                                            </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="UnAvailibilityWrap coloredBox">
                                        <p className="font-weight-bold mb-5">Your <span className="text-red">Unavailibility</span></p>
                                        <div className="form-row border-bottom mb-3 px-2">
                                            <div class="col">
                                                <h4><strong>Days</strong></h4>
                                            </div>
                                            <div class="col">
                                                <h4><strong>From</strong></h4>
                                            </div>
                                            <div class="col">
                                                <h4><strong>To</strong></h4>
                                            </div>
                                            <div class="col">
                                                <h4><strong>Delete</strong></h4>
                                            </div>
                                        </div>

                                        <div className="contents pb-5">

                                            {serviceproviderUnavailability.map(unavlblty =>
                                                <div>
                                                    <div className="form-row mb-3">
                                                        <div class="col">
                                                            <h4>{unavlblty.unavailabilityday}</h4>
                                                        </div>
                                                        <div class="col">
                                                            <h4>{unavlblty.unavailabletimefrom}</h4>
                                                        </div>
                                                        <div class="col">
                                                            <h4>{unavlblty.unavailabletimeto}</h4>
                                                        </div>
                                                        <div className="col">
                                                            <form onSubmit={this.handleRemoveUnavailibilty}>
                                                                <button type="submit" className="btn bg-orange text-white" name="remove" id={unavlblty.unavailabilityid}
                                                                    onClick={this.getUnavailibilityID}  >Remove</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>

                                        <form onSubmit={this.handleSubmit} >
                                            <div className="form-row pb-3">
                                                <div class="col">
                                                    <input class="form-control frm-field" type="date" value={this.state.date}
                                                        onChange={this.handleChangeDate} />
                                                </div>
                                                <div class="col">
                                                    <select className="form-control frm-field" value={this.state.from}
                                                        onChange={this.handleChangeFrom} >
                                                        <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                    </select>
                                                </div>
                                                <div class="col">
                                                    <select className="form-control frm-field" value={this.state.to}
                                                        onChange={this.handleChangeTo} >
                                                        <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="text-center mb-5">
                                                <button type="submit" className="btn bg-black btn-block text-white w-auto float-right mb-5">Add Your Unavailibility</button>
                                            </div>
                                        </form>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    ProviderNoUnAvailibility(serviceprovideravailability) {

        return (

            <div id="MainPageWrapper">

                <ProviderSidebarLinks />

                <section class="section-padding customerProfile">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div className="col-md-12">

                                    <div className="addProviderScheduleBtn text-right">
                                        <a className="btn bg-black text-white" href="/provider-edit-schedular">
                                            Add Your Availibility
                                        </a>
                                    </div>

                                    <div className="AvailibilityWrap p-5 coloredBox">
                                        <h3 className="section-title pb-2 mt-0"><strong>Your Availibility</strong></h3>
                                        <div className="form-row bg-half-white mb-3 px-2">
                                            <div class="col">
                                                <h4><strong>Days</strong></h4>
                                            </div>
                                            <div class="col">
                                                <h4><strong>From</strong></h4>
                                            </div>
                                            <div class="col">
                                                <h4><strong>To</strong></h4>
                                            </div>
                                        </div>

                                        <div className="contents pb-5 profileBox mb-4">

                                            {serviceprovideravailability.map(srv =>
                                                <div className="">
                                                    <div className="form-row mb-3">
                                                        <div class="col">
                                                            <h4>{srv.availableDay}</h4>
                                                        </div>
                                                        <div class="col">
                                                            <h4>{srv.availableTimeFrom}</h4>
                                                        </div>
                                                        <div class="col">
                                                            <h4>{srv.availableTimeto}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>

                                    </div>

                                    <div className="UnAvailibilityWrap coloredBox">
                                        
                                        <h3 className="section-title pb-2"><strong>Your Unavailibility</strong></h3>
                                        <form onSubmit={this.handleSubmit} className="p-5 profileBox">
                                            <div className="form-row pb-3">
                                                <div class="col">
                                                    <input class="form-control frm-field" type="date" value={this.state.date}
                                                        onChange={this.handleChangeDate} required />
                                                </div>
                                                <div class="col">
                                                    <select className="form-control frm-field" value={this.state.from}
                                                        onChange={this.handleChangeFrom} required >
                                                        <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                    </select>
                                                </div>
                                                <div class="col">
                                                    <select className="form-control frm-field" value={this.state.to}
                                                        onChange={this.handleChangeTo} required >
                                                        <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="text-center mb-5">
                                                <button type="submit" className="btn bg-black btn-block text-white w-auto float-right">Add Your Unavailibility</button>
                                            </div>
                                        </form>

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

ProviderAllSchedules.defaultProps = {
    serviceprovideravailability: []
}
