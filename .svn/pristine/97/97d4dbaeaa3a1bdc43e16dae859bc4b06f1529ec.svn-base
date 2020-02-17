import React, { Component } from 'react';
import { CustomerPendingBookings } from './CustomerPendingBookings';
import { CustomerCompletedBookings } from './CustomerCompletedBookings';
import { CustomerCancelledBookings } from './CustomerCancelledBookings';
import { SidebarLinks } from '../CustomerAccount/YourAccount/SidebarLinks';
import { CustomerCartBookings } from './CustomerCartBookings';

export class CustomerBookings extends Component {
    displayName = CustomerBookings.name

    render() {
        var styles = {
            width: '132px',
        };
        var tabBorder = {
            border: '1px solid',
        };
        
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const customerBooking = params.get('booking');
        
        if(customerBooking == 'pending'){
            var bookingTab = (
                <ul class="nav nav-tabs booking-tabs nav-justified booking-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#pending" role="tab">
                            <i class="fas fa-hourglass pr-2"></i>Pending Bookings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#cart" role="tab">
                            <i class="fas fa-clipboard-check pr-2"></i>Cart Bookings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#completed" role="tab">
                            <i class="fas fa-clipboard-check pr-2"></i>Completed Bookings
                        </a>
                    </li>
                </ul>
            );
        }
        else {
            var bookingTab = (
                <ul class="nav nav-tabs booking-tabs nav-justified booking-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#pending" role="tab">
                            <i class="fas fa-hourglass pr-2"></i>Pending Bookings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#cart" role="tab">
                            <i class="fas fa-clipboard-check pr-2"></i>Cart Bookings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#completed" role="tab">
                            <i class="fas fa-clipboard-check pr-2"></i>Completed Bookings
                        </a>
                    </li>
                </ul>
            );
        }

        if(customerBooking == 'pending'){
            var bookingTabContent = (
                <div class="tab-content">
                    <div class="tab-pane fade in show active" id="pending" role="tabpanel">
                        <CustomerPendingBookings />
                    </div>

                    <div class="tab-pane fade in" id="cart" role="tabpanel">
                        <CustomerCartBookings />
                    </div>

                    <div class="tab-pane fade in" id="completed" role="tabpanel">
                        <CustomerCompletedBookings />
                    </div>
                </div>
            );
        }
        else {
           var bookingTabContent = (
                <div class="tab-content">
                    <div class="tab-pane fade in show active" id="pending" role="tabpanel">
                       <CustomerPendingBookings />
                    </div>

                    <div class="tab-pane fade in" id="cart" role="tabpanel">
                        <CustomerCartBookings />
                    </div>

                    <div class="tab-pane fade in" id="completed" role="tabpanel">
                        <CustomerCompletedBookings />
                    </div>
                </div>
            ); 
        }
        
        return (

            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Your Bookings</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row ">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">
                                
                                    <div className="row pb-4">
                                        <div className="col-md-12">
                                            {bookingTab}
                                        </div>
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
