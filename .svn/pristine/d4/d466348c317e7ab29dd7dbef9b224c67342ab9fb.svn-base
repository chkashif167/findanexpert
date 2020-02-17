import React, { Component } from 'react';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
import { CustomerEmailReply } from './CustomerEmailReply';

export class CustomerOutboxEmailDetails extends Component {
    displayName = CustomerOutboxEmailDetails.name

    render() {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const getSubject = params.get('subject');
        const getFrom = params.get('from');
        const getBody = params.get('body');

        return (

            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Profile</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 mb-5">
                                    <div className="emailDetailTop">
                                        <div className="iconWrap">
                                            <i class="fas fa-user-alt"></i>
                                        </div>
                                        <div className="textWrap">
                                            <p className="lead mb-0"><strong>{getSubject}</strong></p>
                                            <p className="lead mb-0">Findandexpert ({getFrom})</p>
                                        </div>
                                    </div>
                                    <div className="email-body pt-3 pb-5">
                                        <p>{getBody}</p>
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
