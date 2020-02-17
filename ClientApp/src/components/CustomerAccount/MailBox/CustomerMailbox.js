import React, { Component } from 'react';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
import { CustomerInbox } from './CustomerInbox';
import { CustomerOutbox } from './CustomerOutbox';
import { CustomerComposer } from './CustomerComposeEmail';

export class CustomerMailbox extends Component {
    displayName = CustomerMailbox.name

    render() {
        return (

            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Your Emails</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">

                                    <ul class="nav nav-tabs booking-tabs nav-justified primary-color" id="tablist" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="tab" href="#inbox" role="tab">
                                                <i class="fas fa-inbox pr-2" />Inbox
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#outbox" role="tab">
                                                <i class="fas fa-sign-out-alt pr-2" />Outbox
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" data-toggle="tab" href="#compose" role="tab">
                                                <i class="fas fa-plus-square pr-2" />Compose
                                            </a>
                                        </li>
                                    </ul>

                                    <div class="tab-content">

                                        <div class="tab-pane fade in show active" id="inbox" role="tabpanel">

                                            <CustomerInbox />

                                        </div>

                                        <div class="tab-pane fade in" id="outbox" role="tabpanel">

                                            <CustomerOutbox />

                                        </div>

                                        <div class="tab-pane fade in" id="compose" role="tabpanel">

                                            <CustomerComposer />

                                        </div>

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
