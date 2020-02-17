import React, { Component } from 'react';
import { ProviderSidebarLinks } from '../Profile/SidebarLinks';
import { ProviderAddDocuments } from '../../ProviderAddDocuments';

export class AddDocuments extends Component {
    displayName = AddDocuments.name

    render() {
        return (

            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Upload Your Documents</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <ProviderSidebarLinks />

                                <div className="col-md-9">
                                    <h3 className="section-title pb-3"><strong>Upload Your Documents</strong></h3>

                                    <ProviderAddDocuments />
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
