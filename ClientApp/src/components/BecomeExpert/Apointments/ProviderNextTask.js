import React, { Component } from "react";
import App from "../../../App";

export class ProviderNextTask extends Component {
  displayName = ProviderNextTask.name;

  constructor(props) {
    super(props);
    this.state = { allAppointments: [], pendingList: [], loading: true };

    //var providerAccesstoken = localStorage.getItem('provideraccesstoken');
    var providerAccesstoken =
      "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSTRNaUlzSW1WdFlXbHNJam9pWm1GeWNuVnJhRUJ0WVdsc2FXNWhkRzl5TG1OdmJTSXNJbkp2YkdVaU9pSlFjbTkyYVdSbGNpSXNJa2x6Vm1Gc2FXUWlPaUowY25WbElpd2libUptSWpveE5UZ3lPRGt3TlRBM0xDSmxlSEFpT2pFMk1UYzBORFk1TURjc0ltbGhkQ0k2TVRVNE1qZzVNRFV3Tnl3aWFYTnpJam9pWm1sdVpHRnVaWGh3WlhKMExtNWxkQ0lzSW1GMVpDSTZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlmUS5PbHRPNW1fYlNOeXkta2V3ZjJtQUNlUkJEMmN0aHJYQmM5QzJIMW80XzIw";
    var providerId = localStorage.getItem("serviceproviderid");
    var providerEmail = localStorage.getItem("email");
    fetch(
      App.ApisBaseUrl +
        "/api/Provider/getpendingappointments?serviceProviderId=" +
        "&pagenumber=" +
        1 +
        "&pagesize=" +
        15 +
        "&authtoken=" +
        providerAccesstoken
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          allAppointments: data.appointmentlist,
          loading: false
        });
        var newArray = this.state.pendingList.slice();

        for (var i = 0; i < this.state.allAppointments.length; i++) {
          newArray.push(this.state.allAppointments[i]);
          this.setState({ pendingList: newArray });
        }
        console.log(this.state.pendingList[0]);
      })
      .catch(error => {
        this.state.pendingList = [];
      });
  }

  render() {
    if (this.state.pendingList != "") {
      let contents = this.state.loading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        this.pendingBookings(this.state.pendingList[0])
      );
      return <div>{contents}</div>;
    } else {
      return this.noPendingBookings();
    }
  }

  pendingBookings() {
    if (this.state.pendingList[0].bookingnotes != "") {
      var bookingNotes = (
        <p class="desc p-4">{this.state.pendingList[0].bookingnotes}</p>
      );
    } else {
      var bookingNotes = (
        <p class="desc p-4">There are no booking notes for this service.</p>
      );
    }

    return (
      <div id="MainPageWrapper">
        <div class="card bg-light text-dark desc-card">
          <div class="card-body">
            <div class="col-md-4 next_contents">
              <span class="text-secondary">
                <strong>SERVICE</strong>
              </span>
              <div>{this.state.pendingList[0].servicetypename}</div>
              <br />
              <span class="text-secondary">
                <strong>Time</strong>
              </span>
              <div>{this.state.pendingList[0].bookingtime}</div>
              <p className="pt-3 small">
                <a
                  href={
                    "/chat/?" +
                    btoa(
                      encodeURIComponent(
                        "customerid=" +
                          this.state.pendingList[0].customerid +
                          "&bookingid=" +
                          this.state.pendingList[0].bookingid
                      )
                    )
                  }
                >
                  Chat with customer
                </a>
              </p>
            </div>
            <div class="col-md-4 next_contents_two">
              <span class="text-secondary">
                <strong>DURATION</strong>
              </span>
              <div>{this.state.pendingList[0].bookingduration} Min</div>
              <br />
              <span class="text-secondary">
                <strong>Date</strong>
              </span>
              <div>{this.state.pendingList[0].bookingdate}</div>
            </div>
            <div class="col-md-4 next_contents_two">
              <span class="text-secondary">
                <strong>CLIENT</strong>
              </span>
              <div>{this.state.pendingList[0].customername}</div>
              <br />
              <span class="text-secondary">
                <strong>Address</strong>
              </span>
              <div>{this.state.pendingList[0].bookingaddress}</div>
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
    );
  }

  noPendingBookings() {
    return (
      <div>
        <p className="text-center pt-5">There is no upcoming task for you.</p>
      </div>
    );
  }
}
