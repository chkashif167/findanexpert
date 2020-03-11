import React, { Component } from "react";
import { ProviderSidebarLinks } from "../Profile/SidebarLinks";
import App from "../../../App";

export class ProviderPendingAppointments extends Component {
  displayName = ProviderPendingAppointments.name;

  constructor(props) {
    super(props);
    this.state = {
      allAppointments: [],
      totalPendingPages: "",
      loading: true
    };

    // var providerAccesstoken =
    //   "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSTRNaUlzSW1WdFlXbHNJam9pWm1GeWNuVnJhRUJ0WVdsc2FXNWhkRzl5TG1OdmJTSXNJbkp2YkdVaU9pSlFjbTkyYVdSbGNpSXNJa2x6Vm1Gc2FXUWlPaUowY25WbElpd2libUptSWpveE5UZ3lPRGt3TlRBM0xDSmxlSEFpT2pFMk1UYzBORFk1TURjc0ltbGhkQ0k2TVRVNE1qZzVNRFV3Tnl3aWFYTnpJam9pWm1sdVpHRnVaWGh3WlhKMExtNWxkQ0lzSW1GMVpDSTZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlmUS5PbHRPNW1fYlNOeXkta2V3ZjJtQUNlUkJEMmN0aHJYQmM5QzJIMW80XzIw";
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");

    const search = window.location.search;
    //var decodedString = window.atob(search.replace('?', ''));
    //const decodeParams = decodeURIComponent(decodedString);
    const params = new URLSearchParams(search);

    const pendingpageNumber = params.get("page");
    console.log(pendingpageNumber);

    if (pendingpageNumber != null) {
      var pendingPageSize = pendingpageNumber;
    } else {
      var PageNumber = 1;
    }
    fetch(
      App.ApisBaseUrl +
        "/api/Provider/getpendingappointments?pageNumber=" +
        PageNumber +
        "&pageSize=" +
        15 +
        "&authToken=" +
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
      })
      .catch(error => {
        this.state.pendingList = [];
      });
  }

  render() {
    if (this.state.allAppointments) {
      let contents = this.state.loading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        this.pendingBookings()
      );
      return <div>{contents}</div>;
    } else {
      return this.noPendingBookings();
    }
  }

  pendingBookings() {
    var pageItem = "";
    for (var i = 0; i < this.state.totalPendingPages; i++) {
      pageItem += (
        <li class="page-item">
          <a class="page-link" href="/provider-profile">
            {i}
          </a>
        </li>
      );
    }
    console.log(pageItem);

    if (this.state.totalPendingPages == "2") {
      var listItems = (
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              href={"/provider-profile/?" + "booking=" + "pending"}
            >
              1
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/provider-profile/?" + "booking=" + "pending" + "&page=" + 2
              }
            >
              2
            </a>
          </li>
        </ul>
      );
    } else if (this.state.totalPendingPages == "3") {
      var listItems = (
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              href={"/provider-profile/?" + "booking=" + "pending"}
            >
              1
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/provider-profile/?" + "booking=" + "pending" + "&page=" + 2
              }
            >
              2
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/provider-profile/?" + "booking=" + "pending" + "&page=" + 3
              }
            >
              3
            </a>
          </li>
        </ul>
      );
    } else if (this.state.totalPendingPages == "4") {
      var listItems = (
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              href={"/provider-profile/?" + "booking=" + "pending"}
            >
              1
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/provider-profile/?" + "booking=" + "pending" + "&page=" + 2
              }
            >
              2
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/provider-profile/?" + "booking=" + "pending" + "&page=" + 3
              }
            >
              3
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/provider-profile/?" + "booking=" + "pending" + "&page=" + 4
              }
            >
              4
            </a>
          </li>
        </ul>
      );
    } else {
      var listItems = <div></div>;
    }

    return (
      <div id="MainPageWrapper">
        <div className="list-group providerPendingList">
          {this.state.allAppointments &&
            this.state.allAppointments.map(apts => (
              <a
                href={
                  "/provider-booking-detail/?" +
                  btoa(
                    encodeURIComponent(
                      "servicename=" +
                        apts.servicetypename +
                        "&customername=" +
                        apts.customername +
                        "&serviceduration=" +
                        apts.bookingduration +
                        "&customeraddress=" +
                        apts.bookingaddress +
                        "&bookingnotes=" +
                        apts.notes +
                        "&bookingdate=" +
                        apts.bookingdate +
                        "&bookingtime=" +
                        apts.bookingtime
                    )
                  )
                }
                className="list-group-item list-group-item-action flex-column align-items-start"
                key={apts.bookingid}
              >
                <div className="d-flex w-100 justify-content-between">
                  <div>
                    <h5 className="mb-2">
                      <strong>Service:</strong> {apts.servicetypename}
                    </h5>
                    <p className="mb-3">
                      <strong>Customer:</strong> {apts.customername}
                    </p>
                    <p className="small">
                      <a
                        href={
                          "/chat/?" +
                          btoa(
                            encodeURIComponent(
                              "customerid=" +
                                apts.customerid +
                                "&bookingid=" +
                                apts.bookingid
                            )
                          )
                        }
                      >
                        Chat with customer
                      </a>
                    </p>
                  </div>
                  <p className="emailShortDesc pt-2">{apts.bookingnotes}</p>
                  <span>
                    <p className="m-0">{apts.bookingdate.split("", 10)}</p>
                    <p>{apts.bookingtime.split("", 8)}</p>
                  </span>
                </div>
              </a>
            ))}
        </div>

        <div className="row pb-4">
          <div className="col-md-12">
            <nav aria-label="Page navigation" className="text-center">
              {listItems}
            </nav>
          </div>
        </div>
      </div>
    );
  }

  noPendingBookings() {
    return (
      <div>
        <p className="text-center pt-5">
          You have no pending bookings right now
        </p>
      </div>
    );
  }
}
