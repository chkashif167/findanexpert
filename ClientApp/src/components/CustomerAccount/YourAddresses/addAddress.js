import React, { Component } from 'react';
import { AddCustomerAddress } from '../AddCustomerAddress';
import { SidebarLinks } from '../YourAccount/SidebarLinks';


export class addAddress extends Component {
    displayName = addAddress.name

    render() {
        return (

            <div id="MainPageWrapper" >

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Add New Address</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">

                                    <AddCustomerAddress />
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}