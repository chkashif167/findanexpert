import React, { Component } from "react";
import App from "../../../App";

export class ProviderInbox extends Component {
  displayName = ProviderInbox.name;

  constructor(props) {
    super(props);
    this.state = { allMessages: [], loading: true };

    var providerAccesstoken = localStorage.getItem("provideraccesstoken");
    // var providerAccesstoken =
    //   "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSTRNaUlzSW1WdFlXbHNJam9pWm1GeWNuVnJhRUJ0WVdsc2FXNWhkRzl5TG1OdmJTSXNJbkp2YkdVaU9pSlFjbTkyYVdSbGNpSXNJa2x6Vm1Gc2FXUWlPaUowY25WbElpd2libUptSWpveE5UZ3lPRGt3TlRBM0xDSmxlSEFpT2pFMk1UYzBORFk1TURjc0ltbGhkQ0k2TVRVNE1qZzVNRFV3Tnl3aWFYTnpJam9pWm1sdVpHRnVaWGh3WlhKMExtNWxkQ0lzSW1GMVpDSTZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlmUS5PbHRPNW1fYlNOeXkta2V3ZjJtQUNlUkJEMmN0aHJYQmM5QzJIMW80XzIw";
    var providerEmail = localStorage.getItem("email");

    const search = window.location.search;
    const params = new URLSearchParams(search);

    const pageNumber = params.get("page");
    console.log(pageNumber);

    if (pageNumber != null) {
      var pageSize = pageNumber;
    } else {
      var pageSize = 1;
    }
    console.log(pageSize);

    fetch(
      App.ApisBaseUrl +
        "/api/Email/getinboxemails?authtoken=" +
        providerAccesstoken +
        "&isCustomer=false&pageNumber=" +
        pageSize +
        "&pageSize=" +
        15
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", data);
        this.setState({ totalPages: data.emaillist });
        this.setState({ allMessages: data.emaillist, loading: false });
      });
  }

  render() {
    if (this.state.allMessages) {
      let contents = this.state.loading ? (
        <div class="spinner-border text-center pt-2" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        this.ProviderInbox(this.state.allMessages)
      );
      return <div>{contents}</div>;
    } else {
      return this.ProviderEmptyInbox();
    }
  }

  ProviderInbox(allMessages) {
    if (this.state.totalPages == "2") {
      var listItems = (
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/customer-bookings/?" +
                "providerEmails=" +
                "inbox" +
                "&page=" +
                1
              }
            >
              1
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/customer-bookings/?" +
                "providerEmails=" +
                "inbox" +
                "&page=" +
                2
              }
            >
              2
            </a>
          </li>
        </ul>
      );
    } else if (this.state.totalPages == "3") {
      var listItems = (
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              href={"/customer-bookings/?" + "providerEmails=" + "inbox"}
            >
              1
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/customer-bookings/?" +
                "providerEmails=" +
                "inbox" +
                "&page=" +
                2
              }
            >
              2
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/customer-bookings/?" +
                "providerEmails=" +
                "inbox" +
                "&page=" +
                3
              }
            >
              3
            </a>
          </li>
        </ul>
      );
    } else if (this.state.totalPages == "4") {
      var listItems = (
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              href={"/customer-bookings/?" + "providerEmails=" + "inbox"}
            >
              1
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/customer-bookings/?" +
                "providerEmails=" +
                "inbox" +
                "&page=" +
                2
              }
            >
              2
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/customer-bookings/?" +
                "providerEmails=" +
                "inbox" +
                "&page=" +
                3
              }
            >
              3
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href={
                "/customer-bookings/?" +
                "providerEmails=" +
                "inbox" +
                "&page=" +
                4
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
      <div className="list-group emails">
        {allMessages &&
          allMessages.map(inbx => (
            <a
              href={
                "/email-details?" +
                btoa(
                  encodeURIComponent(
                    "subject=" +
                      inbx.subject +
                      "&from=" +
                      inbx.from +
                      "&body=" +
                      inbx.body
                  )
                )
              }
              className="list-group-item list-group-item-action flex-column align-items-start"
              key={inbx.emailid}
            >
              <div className="d-flex w-100 justify-content-between">
                <div>
                  <h5 className="mb-2">
                    <strong>From:</strong> <strong>{inbx.from}</strong>
                  </h5>
                  <p className="mb-3">
                    <strong>Subject:</strong> {inbx.subject}
                  </p>
                </div>
                <p className="emailShortDesc">{inbx.body}</p>
                <span>
                  <p className="m-0">{inbx.emaildate.split("", 10)}</p>
                  <p>{inbx.emaildate.slice(11).split("", 8)}</p>
                </span>
              </div>
            </a>
          ))}
      </div>
    );
  }

  ProviderEmptyInbox() {
    return (
      <div className="list-group">
        <p class="list-group-item text-center">You have no emails.</p>
      </div>
    );
  }
}
