import React, { Component } from "react";
import App from "../App";
import toastr from "toastr";

export class ProviderSchedular extends Component {
  displayName = ProviderSchedular.name;

  constructor() {
    super();

    this.time = [
      "00:00",
      "00:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
      "03:30",
      "04:00",
      "04:30",
      "05:00",
      "05:30",
      "06:00",
      "06:30",
      "07:00",
      "07:30",
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
      "22:30",
      "23:00",
      "23:30"
    ];

    this.state = {
      updated: false,

      availabledayList: "",
      availabletimefromList: "",
      availabletimetoList: "",
      dayTimeList: [],

      serviceProviderAvailability: [],
      provideravailabilityArray: [],

      fromMonday: "",
      fromTuesday: "",
      fromWednesday: "",
      fromThursday: "",
      fromFriday: "",
      fromSaturday: "",
      fromSunday: "",

      toMonday: "",
      toTuesday: "",
      toWednesday: "",
      toThursday: "",
      toFriday: "",
      toSaturday: "",
      toSunday: "",

      days: {
        monday: {
          isSelect: false,
          from: "0:00",
          to: "0:00"
        },
        tuesday: {
          isSelect: false,
          from: "0:00",
          to: "0:00"
        },
        wednesday: {
          isSelect: false,
          from: "0:00",
          to: "0:00"
        },
        thursday: {
          isSelect: false,
          from: "0:00",
          to: "0:00"
        },
        friday: {
          isSelect: false,
          from: "0:00",
          to: "0:00"
        },
        saturday: {
          isSelect: false,
          from: "0:00",
          to: "0:00"
        },
        sunday: {
          isSelect: false,
          from: "0:00",
          to: "0:00"
        }
      },

      dayMonday: "",
      dayTuesday: "",
      dayWednesday: "",
      dayThursday: "",
      dayFriday: "",
      daySaturday: "",
      daySunday: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    var ddd = false;
  }

  getInitialState = () => {
    const initialState = {};
    return initialState;
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  AddAvailibility() {
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");

    // const provideravailabilityOjb = {
    //   availableday: this.state.availabledayList,
    //   availabletimefrom: this.state.availabletimefromList,
    //   availabletimeto: this.state.availabletimetoList
    // };

    // this.state.provideravailabilityArray.push(provideravailabilityOjb);
    // console.log(this.state.provideravailabilityArray);
    const { days } = this.state;

    const daysName = Object.keys(days);

    const dayTimeList = [];
    daysName.forEach(name => {
      const { isSelect, from, to } = days[name];
      if (isSelect) {
        dayTimeList.push({
          availableday: name,
          availabletimefrom: from,
          availabletimeto: to
        });
      }
    });

    console.log(dayTimeList);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provideravailability: dayTimeList,
        authtoken: providerAccesstoken
      })
    };
    console.log(requestOptions.body);
    //console.log(serviceproviderid);
    return fetch(
      App.ApisBaseUrl + "/api/Provider/addavailability",
      requestOptions
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.statuscode == 200) {
          toastr["success"]("Your schedular details are Updated Successfully!");
          setTimeout(function() {
            window.location = "/provider-schedular";
          }, 1000);
        } else {
          toastr["error"](response.message);
        }
      });
  }

  handleChangeAvailableDay({ target: { name, id, checked } }) {
    const { days } = this.state;
    let day = days[id];
    if (checked) {
      day.isSelect = true;
      day.from = "0:00";
      day.to = "0:00";
    } else {
      day.isSelect = false;
      day.from = "0:00";
      day.to = "0:00";
    }
    const newData = {
      ...days,
      [id]: day
    };
    this.setState({
      [name]: checked,
      days: newData
    });
    // this.setState({ availabledayList: e.target.id });
    // const provideravailabilityOjb = {
    //   availableday: e.target.id,
    //   availabletimefrom: "",
    //   availabletimeto: ""
    // };
  }

  handleChangeAvailableTimeFrom({ target: { name, value } }) {
    const dayName = name.split("from")[1].toLowerCase();

    const { days } = this.state;
    let day = days[dayName];
    day.from = value;
    const newData = {
      ...days,
      [dayName]: day,
      [name]: value
    };
    this.setState({ [name]: value, days: newData });
    // this.setState({ availabletimefromList: e.target.value });
    // const provideravailabilityOjb = {
    //   availableday: this.state.availabledayList,
    //   availabletimefrom: e.target.value,
    //   availabletimeto: ""
    // };
  }

  handleChangeAvailableTimeTo({ target: { name, value } }) {
    const dayName = name.split("to")[1].toLowerCase();

    const { days } = this.state;
    let day = days[dayName];
    day.to = value;
    const newData = {
      ...days,
      [dayName]: day
    };
    this.setState({ [name]: value, days: newData });
    // this.setState({ availabletimetoList: e.target.value });
    // const provideravailabilityOjb = {
    //   availableday: this.state.availabledayList,
    //   availabletimefrom: this.state.availabletimefromList,
    //   availabletimeto: e.target.value
    // };
    // this.state.dayTimeList.push(provideravailabilityOjb);
    // console.log(this.state.dayTimeList);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.AddAvailibility();
  }

  render() {
    let contents = this.state.updated
      ? this.UpdatedProviderProfile(this.state.updateCustomer)
      : this.ProviderProfile();
    return <div>{contents}</div>;
  }

  ProviderProfile() {
    return (
      <div className="Register coloredBox">
        <p className="font-weight-bold mb-5">
          Update your <span className="text-red">Schedule</span>
        </p>
        <form
          onSubmit={this.handleSubmit}
          enctype="multipart/form-data"
          className="profileBox p-5"
        >
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
          {/* //////////////////////////////  Monday Start  ///////////////////////////////////////////// */}
          <div className="form-row pb-3">
            <div class="col">
              <input
                class="form-check-input frm-field"
                type="checkbox"
                id="monday"
                name="dayMonday"
                value={this.state.dayMonday}
                onChange={this.handleChangeAvailableDay.bind(this)}
              />
              <label class="form-check-label" for="monday">
                Monday
              </label>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.fromMonday}
                onChange={this.handleChangeAvailableTimeFrom.bind(this)}
                name="fromMonday"
                disabled={!this.state.dayMonday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.toMonday}
                onChange={this.handleChangeAvailableTimeTo.bind(this)}
                name="toMonday"
                disabled={!this.state.fromMonday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  if (this.state.fromMonday && this.state.fromMonday >= time) {
                    return (
                      <option disabled value={time} key={index}>
                        {time}
                      </option>
                    );
                  }
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* //////////////////////////////  Tuesday Start  ///////////////////////////////////////////// */}
          <div className="form-row pb-3">
            <div class="col">
              <input
                class="form-check-input frm-field"
                type="checkbox"
                id="tuesday"
                name="dayTuesday"
                value={this.state.dayTuesday}
                onChange={this.handleChangeAvailableDay.bind(this)}
              />
              <label class="form-check-label" for="tuesday">
                Tuesday
              </label>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.fromTuesday}
                onChange={this.handleChangeAvailableTimeFrom.bind(this)}
                name="fromTuesday"
                disabled={!this.state.dayTuesday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.toTuesday}
                onChange={this.handleChangeAvailableTimeTo.bind(this)}
                name="toTuesday"
                disabled={!this.state.fromTuesday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  if (
                    this.state.fromTuesday &&
                    this.state.fromTuesday >= time
                  ) {
                    return (
                      <option disabled value={time} key={index}>
                        {time}
                      </option>
                    );
                  }
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* //////////////////////////////  Wednesday Start  ///////////////////////////////////////////// */}
          <div className="form-row pb-3">
            <div class="col">
              <input
                class="form-check-input frm-field"
                type="checkbox"
                id="wednesday"
                name="dayWednesday"
                value={this.state.dayWednesday}
                onChange={this.handleChangeAvailableDay.bind(this)}
              />
              <label class="form-check-label" for="wednesday">
                Wednesday
              </label>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.fromWednesday}
                onChange={this.handleChangeAvailableTimeFrom.bind(this)}
                name="fromWednesday"
                disabled={!this.state.dayWednesday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.toWednesday}
                onChange={this.handleChangeAvailableTimeTo.bind(this)}
                name="toWednesday"
                disabled={!this.state.fromWednesday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  if (
                    this.state.fromWednesday &&
                    this.state.fromWednesday >= time
                  ) {
                    return (
                      <option disabled value={time} key={index}>
                        {time}
                      </option>
                    );
                  }
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* //////////////////////////////  Thursday Start  ///////////////////////////////////////////// */}
          <div className="form-row pb-3">
            <div class="col">
              <input
                class="form-check-input"
                type="checkbox"
                id="thursday"
                name="dayThursday"
                value={this.state.dayThursday}
                onChange={this.handleChangeAvailableDay.bind(this)}
              />
              <label class="form-check-label" for="thursday">
                Thursday
              </label>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.fromThursday}
                onChange={this.handleChangeAvailableTimeFrom.bind(this)}
                name="fromThursday"
                disabled={!this.state.dayThursday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.toThursday}
                onChange={this.handleChangeAvailableTimeTo.bind(this)}
                name="toThursday"
                disabled={!this.state.fromThursday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  if (
                    this.state.fromThursday &&
                    this.state.fromThursday >= time
                  ) {
                    return (
                      <option disabled value={time} key={index}>
                        {time}
                      </option>
                    );
                  }
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* //////////////////////////////  Friday Start  ///////////////////////////////////////////// */}
          <div className="form-row pb-3">
            <div class="col">
              <input
                class="form-check-input"
                type="checkbox"
                id="friday"
                name="dayFriday"
                value={this.state.dayFriday}
                onChange={this.handleChangeAvailableDay.bind(this)}
              />
              <label class="form-check-label" for="friday">
                Friday
              </label>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.fromFriday}
                onChange={this.handleChangeAvailableTimeFrom.bind(this)}
                name="fromFriday"
                disabled={!this.state.dayFriday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.toFriday}
                onChange={this.handleChangeAvailableTimeTo.bind(this)}
                name="toFriday"
                disabled={!this.state.fromFriday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  if (this.state.fromFriday && this.state.fromFriday >= time) {
                    return (
                      <option disabled value={time} key={index}>
                        {time}
                      </option>
                    );
                  }
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* //////////////////////////////  Saturday Start  ///////////////////////////////////////////// */}
          <div className="form-row pb-3">
            <div class="col">
              <input
                class="form-check-input"
                type="checkbox"
                id="saturday"
                name="daySaturday"
                value={this.state.daySaturday}
                onChange={this.handleChangeAvailableDay.bind(this)}
              />
              <label class="form-check-label" for="saturday">
                Saturday
              </label>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.fromSaturday}
                onChange={this.handleChangeAvailableTimeFrom.bind(this)}
                name="fromSaturday"
                disabled={!this.state.daySaturday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.toSaturday}
                onChange={this.handleChangeAvailableTimeTo.bind(this)}
                name="toSaturday"
                disabled={!this.state.fromSaturday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  if (
                    this.state.fromSaturday &&
                    this.state.fromSaturday >= time
                  ) {
                    return (
                      <option disabled value={time} key={index}>
                        {time}
                      </option>
                    );
                  }
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* //////////////////////////////  Sunday Start  ///////////////////////////////////////////// */}
          <div className="form-row pb-5">
            <div class="col">
              <input
                class="form-check-input"
                type="checkbox"
                id="sunday"
                name="daySunday"
                value={this.state.daySunday}
                onChange={this.handleChangeAvailableDay.bind(this)}
              />
              <label class="form-check-label" for="sunday">
                Sunday
              </label>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.fromSunday}
                onChange={this.handleChangeAvailableTimeFrom.bind(this)}
                name="fromSunday"
                disabled={!this.state.daySunday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="col">
              <select
                className="form-control frm-field"
                value={this.state.toSunday}
                onChange={this.handleChangeAvailableTimeTo.bind(this)}
                name="toSunday"
                disabled={!this.state.fromSunday}
              >
                <option value="">Select an option</option>
                {this.time.map((time, index) => {
                  if (this.state.fromSunday && this.state.fromSunday >= time) {
                    return (
                      <option disabled value={time} key={index}>
                        {time}
                      </option>
                    );
                  }
                  return (
                    <option value={time} key={index}>
                      {time}
                    </option>
                  );
                })}
                })}
              </select>
            </div>
          </div>

          <div className="text-center mb-5">
            <button
              type="submit"
              className="btn bg-black btn-block text-white z-depth-1a w-auto float-right"
            >
              Update Your Schedule
            </button>
          </div>
        </form>
      </div>
    );
  }

  // UpdatedProviderProfile(updateCustomer) {
  //   return (
  //     <div>
  //       <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
  //         <div className="form-row bg-half-white mb-4 px-2">
  //           <div class="col">
  //             <h4>Days</h4>
  //           </div>
  //           <div class="col">
  //             <h4>From</h4>
  //           </div>
  //           <div class="col">
  //             <h4>To</h4>
  //           </div>
  //         </div>

  //         <div className="form-row pb-3">
  //           <div class="col">
  //             <input
  //               class="form-check-input"
  //               type="checkbox"
  //               value=""
  //               id="monday"
  //             />
  //             <label class="form-check-label" for="monday">
  //               Monday
  //             </label>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div className="form-row pb-3">
  //           <div class="col">
  //             <input
  //               class="form-check-input frm-field"
  //               type="checkbox"
  //               value=""
  //               id="tuesday"
  //             />
  //             <label class="form-check-label" for="tuesday">
  //               Tuesday
  //             </label>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div className="form-row pb-3">
  //           <div class="col">
  //             <input
  //               class="form-check-input"
  //               type="checkbox"
  //               value=""
  //               id="wednesday"
  //             />
  //             <label class="form-check-label" for="wednesday">
  //               Wednesday
  //             </label>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div className="form-row pb-3">
  //           <div class="col">
  //             <input
  //               class="form-check-input"
  //               type="checkbox"
  //               value=""
  //               id="thursday"
  //             />
  //             <label class="form-check-label" for="thursday">
  //               Thursday
  //             </label>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div className="form-row pb-3">
  //           <div class="col">
  //             <input
  //               class="form-check-input"
  //               type="checkbox"
  //               value=""
  //               id="friday"
  //             />
  //             <label class="form-check-label" for="friday">
  //               Friday
  //             </label>
  //           </div>
  //           <div class="col">
  //             <select className="form-control" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div className="form-row pb-3">
  //           <div class="col">
  //             <input
  //               class="form-check-input"
  //               type="checkbox"
  //               value=""
  //               id="saturday"
  //             />
  //             <label class="form-check-label" for="saturday">
  //               Saturday
  //             </label>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div className="form-row pb-5">
  //           <div class="col">
  //             <input
  //               class="form-check-input"
  //               type="checkbox"
  //               value=""
  //               id="sunday"
  //             />
  //             <label class="form-check-label" for="sunday">
  //               Sunday
  //             </label>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //           <div class="col">
  //             <select className="form-control frm-field" value="" onChange="">
  //               <option value="">Select an option</option>
  //               <option value="0">00:00</option>
  //               <option value="00:30">00:30</option>
  //               <option value="01:00">01:00</option>
  //               <option value="01:30">01:30</option>
  //               <option value="02:00">02:00</option>
  //               <option value="02:30">02:30</option>
  //               <option value="03:00">03:00</option>
  //               <option value="03:30">03:30</option>
  //               <option value="04:00">04:00</option>
  //               <option value="04:30">04:30</option>
  //               <option value="05:00">05:00</option>
  //               <option value="05:30">05:30</option>
  //               <option value="06:00">06:00</option>
  //               <option value="06:30">06:30</option>
  //               <option value="07:00">07:00</option>
  //               <option value="07:30">07:30</option>
  //               <option value="08:00">08:00</option>
  //               <option value="08:30">08:30</option>
  //               <option value="09:00">09:00</option>
  //               <option value="09:30">09:30</option>
  //               <option value="10:00">10:00</option>
  //               <option value="10:30">10:30</option>
  //               <option value="11:00">11:00</option>
  //               <option value="11:30">11:30</option>
  //               <option value="12:00">12:00</option>
  //               <option value="12:30">12:30</option>
  //               <option value="13:00">13:00</option>
  //               <option value="13:30">13:30</option>
  //               <option value="14:00">14:00</option>
  //               <option value="14:30">14:30</option>
  //               <option value="15:00">15:00</option>
  //               <option value="15:30">15:30</option>
  //               <option value="16:00">16:00</option>
  //               <option value="16:30">16:30</option>
  //               <option value="17:00">17:00</option>
  //               <option value="17:30">17:30</option>
  //               <option value="18:00">18:00</option>
  //               <option value="18:30">18:30</option>
  //               <option value="19:00">19:00</option>
  //               <option value="19:30">19:30</option>
  //               <option value="20:00">20:00</option>
  //               <option value="20:30">20:30</option>
  //               <option value="21:00">21:00</option>
  //               <option value="21:30">21:30</option>
  //               <option value="22:00">22:00</option>
  //               <option value="22:30">22:30</option>
  //               <option value="23:00">23:00</option>
  //               <option value="23:30">23:30</option>
  //             </select>
  //           </div>
  //         </div>

  //         <div className="text-center mb-3">
  //           <button
  //             type="submit"
  //             className="btn bg-black btn-block text-white z-depth-1a w-auto float-right mb-5"
  //           >
  //             Update Your Schedule
  //           </button>
  //         </div>
  //       </form>
  //     </div>

  //     //<Redirect to='/profile' />
  //   );
  // }
}
