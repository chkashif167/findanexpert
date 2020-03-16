import React, { Component } from "react";
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

    var providerAccesstoken = localStorage.getItem("provideraccesstoken");

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
        return response.json();
      })
      .then(data => {
        this.setState({
          allServices: data.serviceslist,
          loading: false,
          found: true
        });
      });
  }

  showOffline(e) {
    e.preventDefault();
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryid: parseInt(e.target.getAttribute("name")),
        servicetypeid: parseInt(e.target.id),
        authtoken: providerAccesstoken
      })
    };

    return fetch(
      App.ApisBaseUrl + "/api/Provider/deleteservice",
      requestOptions
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.statuscode == 200) {
          toastr["success"]("Service has been removed.");
          setTimeout(function() {
            window.location = "/provider-services";
          }, 1000);
        } else {
          toastr["error"](response.message);
        }
      });
  }

  render() {
    if (localStorage.getItem("isapproved") == "true") {
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
                      {this.state.allServices &&
                        this.state.allServices.map(srv => (
                          <li className="d-flex justify-content-between align-items-center profileBox info p-4 mb-4">
                            <p className="mb-0">{srv.servicetypename}</p>
                            <form>
                              <input
                                type="button"
                                className="btn bg-orange text-white"
                                name={srv.categoryid}
                                id={srv.servicetypeid}
                                onClick={this.showOffline}
                                value="Remove"
                              />
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
                    <h5 className="section-title pb-2">
                      <strong>
                        Your Services will not show untill admin approve your
                        account
                      </strong>
                    </h5>
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
