﻿import React, { Component } from "react";
import { ProviderSidebarLinks } from "./SidebarLinks";
import EditProviderProfile from "../../EditProviderProfile";
import { BreadCrumbs } from "../../BreadCrumbs/BreadCrumbs";
import { Redirect } from "react-router-dom";

export class ProviderEditProfile extends Component {
  displayName = ProviderEditProfile.name;

  render() {
    if (!localStorage.getItem("provideraccesstoken")) {
      return <Redirect to={"/provider-authentication"} />;
    }
    return (
      <div id="MainPageWrapper">
        <ProviderSidebarLinks />

        <section class="section-padding customerProfile">
          <div class="services-wrapper">
            <div class="container">
              <div class="row">
                <div className="col-md-12 pt-5 pb-5">
                  <EditProviderProfile />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
