import React, { Component } from "react";
import { ProviderInbox } from "./ProviderInbox";
import { ProviderComposer } from "./ProviderComposer";
import { ProviderOutbox } from "./ProviderOutbox";
import { ProviderSidebarLinks } from "../Profile/SidebarLinks";
import { BreadCrumbs } from "../../BreadCrumbs/BreadCrumbs";

export class ProviderMailbox extends Component {
  displayName = ProviderMailbox.name;

  render() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const providerEmails = params.get("providerEmails");

    if (providerEmails == "inbox") {
      var bookingTab = (
        <ul
          class="nav nav-tabs booking-tabs nav-justified primary-color"
          id="tablist"
          role="tablist"
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              data-toggle="tab"
              href="#inbox"
              role="tab"
            >
              <i class="fas fa-inbox pr-2" />
              Inbox
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#outbox" role="tab">
              <i class="fas fa-sign-out-alt pr-2" />
              Outbox
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#compose" role="tab">
              <i class="fas fa-plus-square pr-2" />
              Compose
            </a>
          </li>
        </ul>
      );
    } else {
      var bookingTab = (
        <ul
          class="nav nav-tabs booking-tabs nav-justified primary-color"
          id="tablist"
          role="tablist"
        >
          <li class="nav-item">
            <a
              class="nav-link active"
              data-toggle="tab"
              href="#inbox"
              role="tab"
            >
              <i class="fas fa-inbox pr-2" />
              Inbox
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#outbox" role="tab">
              <i class="fas fa-sign-out-alt pr-2" />
              Outbox
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#compose" role="tab">
              <i class="fas fa-plus-square pr-2" />
              Compose
            </a>
          </li>
        </ul>
      );
    }

    if (providerEmails == "inbox") {
      var bookingTabContent = (
        <div class="tab-content">
          <div class="tab-pane fade in show active" id="inbox" role="tabpanel">
            <ProviderInbox />
          </div>

          <div class="tab-pane fade in" id="outbox" role="tabpanel">
            <ProviderOutbox />
          </div>

          <div class="tab-pane fade in" id="compose" role="tabpanel">
            <ProviderComposer />
          </div>
        </div>
      );
    } else {
      var bookingTabContent = (
        <div class="tab-content">
          <div class="tab-pane fade in show active" id="inbox" role="tabpanel">
            <ProviderInbox />
          </div>

          <div class="tab-pane fade in" id="outbox" role="tabpanel">
            <ProviderOutbox />
          </div>

          <div class="tab-pane fade in" id="compose" role="tabpanel">
            <ProviderComposer />
          </div>
        </div>
      );
    }

    return (
      <div id="MainPageWrapper">
        <ProviderSidebarLinks />

        <section class="customerProfile">
          <div class="services-wrapper">
            <div class="container">
              <div class="row">
                <div className="col-md-12 mt-5 mb-5 coloredBox">
                  <div className="row pb-4">
                    <div className="col-md-12">{bookingTab}</div>
                  </div>

                  {bookingTabContent}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
