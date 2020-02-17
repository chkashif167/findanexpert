import React, { Component } from 'react';
import App from '../../../App';

export class AddUnavailibility extends Component {
    displayName = AddUnavailibility.name

    constructor(props) {
        super(props);
        var serviceproviderID = localStorage.getItem('serviceproviderid');
        var serviceproviderEmail = localStorage.getItem('email');
        this.state = {
            serviceproviderid: serviceproviderID, email: serviceproviderEmail, date: '', from: '', to: '', add: false
        };

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    AddUnavailibility(serviceproviderid, email, date, from, to) {
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
        console.log(n);
        console.log(date);
        console.log(d);

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
                totime: to
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/ServiceProvider/addunavailability', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ added: response, add: true });
                }

            });
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
        const { serviceproviderid, email, date, from, to } = this.state;
        this.AddUnavailibility( serviceproviderid, email, date, from, to );
    }

    render() {
        let contents = this.state.add
            ? this.addedUnavailibility(this.state.added)
            : this.addUnavailibility();
        return <div>
            {contents}
        </div>;
    }

    addUnavailibility() {

        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-control" type="date" value={this.state.date}
                                onChange={this.handleChangeDate} />
                        </div>
                        <div class="col">
                            <select className="form-control" value={this.state.from}
                                onChange={this.handleChangeFrom} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control" value={this.state.to}
                                onChange={this.handleChangeTo} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-orange btn-block text-white">Add</button>
                    </div>
                </form>

            </div>
        );
    }

    addedUnavailibility(Updated) {
        return (
            <div>
                <div className="alert alert-success" role="alert">
                    <p>Your unavailibility added Successfully!</p>
                </div>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-row pb-3">
                        <div class="col">
                            <input class="form-control" type="date" value={this.state.date}
                                onChange={this.handleChangeDate} />
                        </div>
                        <div class="col">
                            <select className="form-control" value={this.state.from}
                                onChange={this.handleChangeFrom} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                        <div class="col">
                            <select className="form-control" value={this.state.to}
                                onChange={this.handleChangeTo} >
                                <option value="">Select an option</option><option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-orange btn-block text-white">Add</button>
                    </div>
                </form>

            </div>
        );
    }
}