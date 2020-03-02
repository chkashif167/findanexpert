﻿import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ProviderSidebarLinks } from "../Profile/SidebarLinks";
import { ProviderSelectServices } from "../../ProviderSelectServices";
import { BreadCrumbs } from "../../BreadCrumbs/BreadCrumbs";
import App from "../../../App";
import toastr from "toastr";

export class ProviderAllServices extends Component {
  displayName = ProviderAllServices.name;

  constructor(props) {
    super(props);
    this.state = {
      allServices: [],
      serviceproviderserviceID: "",
      found: false,
      loading: true
    };

    var providerAccesstoken =
      "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSTRNaUlzSW1WdFlXbHNJam9pWm1GeWNuVnJhRUJ0WVdsc2FXNWhkRzl5TG1OdmJTSXNJbkp2YkdVaU9pSlFjbTkyYVdSbGNpSXNJa2x6Vm1Gc2FXUWlPaUowY25WbElpd2libUptSWpveE5UZ3lPRGt3TlRBM0xDSmxlSEFpT2pFMk1UYzBORFk1TURjc0ltbGhkQ0k2TVRVNE1qZzVNRFV3Tnl3aWFYTnpJam9pWm1sdVpHRnVaWGh3WlhKMExtNWxkQ0lzSW1GMVpDSTZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlmUS5PbHRPNW1fYlNOeXkta2V3ZjJtQUNlUkJEMmN0aHJYQmM5QzJIMW80XzIw";
    //var providerAccesstoken = localStorage.getItem('provideraccesstoken');
    console.log(providerAccesstoken);
    var providerId = localStorage.getItem("serviceproviderid");

    this.handleSubmit = this.handleSubmit.bind(this);

    fetch(
      App.ApisBaseUrl +
        "/api/Provider/getservices?serviceProviderId=" +
        "&pagenumber=" +
        1 +
        "&pagesize=" +
        15 +
        "&authToken=" +
        providerAccesstoken
    )
      .then(response => {
        if (response.status == "404") {
          this.setState({ noServices: response.status, found: true });
          localStorage.setItem("providerServicesNotFound", response.status);
        } else {
          localStorage.removeItem("providerServicesNotFound");
          return response.json();
        }
      })
      .then(data => {
        console.log("=======================", data);
        this.setState({ allServices: data.serviceslist, loading: false });
      });
  }

  showOffline(e) {
    console.log(e.target.id);
    localStorage.setItem("serviceproviderserviceid", e.target.id);
    //this.props.offline()
  }

  handleSubmit(e) {
    e.preventDefault();
    //alert(localStorage.getItem("serviceproviderserviceid"));

    var providerAccesstoken = localStorage.getItem("provideraccesstoken");
    var providerId = localStorage.getItem("serviceproviderid");
    var serviceproviderserviceID = localStorage.getItem(
      "serviceproviderserviceid"
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceproviderid: providerId,
        serviceproviderserviceid: serviceproviderserviceID,
        servicetypelist: null,
        authtoken: providerAccesstoken
      })
    };
    console.log(requestOptions);

    return fetch(
      App.ApisBaseUrl + "/api/ServiceProvider/removeserviceproviderservice",
      requestOptions
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response != null) {
          this.setState({ serviceRemoveMsg: response.message });
          //alert('Service removed!');
          toastr["success"]("Service has been removed.");
          setTimeout(function() {
            window.location = "/provider-services";
          }, 3000);
        }
      });
  }

  render() {
    if (localStorage.getItem("providerServicesNotFound") != "404") {
      let contents = this.state.loading ? (
        <p>
          <em>Loading...</em>
        </p>
      ) : (
        this.ProviderAllServices(this.state.allServices)
      );
      return <div>{contents}</div>;
    } else {
      let contents = this.state.found ? (
        this.ProviderNoServices(this.state.noServices)
      ) : (
        <p>
          <em>Loading...</em>
        </p>
      );
      return <div>{contents}</div>;
    }
  }

  ProviderAllServices(allServices) {
    return (
      <div id="MainPageWrapper">
        <ProviderSidebarLinks />

        <section class="section-padding customerProfile">
          <div class="services-wrapper">
            <div class="container">
              <div class="row">
                <div className="col-md-12 pt-5">
                  <div className="providerServicesWrap coloredBox">
                    <p className="font-weight-bold mb-5">
                      Your <span className="text-red">Services</span>
                    </p>
                    <ul className="list-group">
                      {this.state.allServices.map(srv => (
                        <li className="d-flex justify-content-between align-items-center profileBox info p-4 mb-4">
                          <p className="mb-0">{srv.servicetypename}</p>
                          <form onSubmit={this.handleSubmit}>
                            <button
                              type="submit"
                              className="btn bg-orange text-white"
                              name="remove"
                              id={srv.serviceproviderserviceid}
                              onClick={this.showOffline}
                            >
                              Remove
                            </button>
                          </form>
                        </li>
                      ))}
                    </ul>

                    <ProviderSelectServices />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  ProviderNoServices() {
    return (
      <div id="MainPageWrapper">
        <ProviderSidebarLinks />

        <section class="section-padding customerProfile">
          <div class="services-wrapper">
            <div class="container">
              <div class="row">
                <div className="col-md-12">
                  <div className="pb-5">
                    <h3 className="section-title pb-2">
                      <strong>No Services</strong>
                    </h3>
                  </div>

                  <ProviderSelectServices />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ProviderAllServices.defaultProps = {
  allServices: []
};
