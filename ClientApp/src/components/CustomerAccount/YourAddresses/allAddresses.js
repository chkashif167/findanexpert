import React, { Component } from 'react';
import { AllCustomerAddresses } from '../AllCustomerAddresses';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
//import { addCustomerAddress } from '../addCustomerAddress';


export class allAddress extends Component {
    displayName = allAddress.name

    render() {
        return (

            <div id="MainPageWrapper" >

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Your Addresses</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">

                                    <AllCustomerAddresses />

                                    <div className="row">
                                        <div className="col-md-12">
                                            <button type="button" className="btn btn-primary bg-black float-right"><a className="text-white" href="/add-address">Add New Address</a></button>
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