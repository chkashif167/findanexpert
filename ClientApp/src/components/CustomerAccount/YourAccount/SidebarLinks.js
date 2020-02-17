import React, { Component } from 'react';
import App from '../../../App';

export class SidebarLinks extends Component {
    displayName = SidebarLinks.name

    constructor(props) {
        super(props);
        this.state = {
            customerVoucherCredit: []
        };
        
        fetch(App.ApisBaseUrl + '/api/GiftVoucher/customergiftvouchercredits?authtoken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ customerVoucherCredit: response });

            });
    }

    render() {
        localStorage.setItem('genderpreference', 'male');
        return (
            <div className="sidebarWrap">

                <button class="navbar-toggler sidebarToggler" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <nav className="collapse" id="sidebar">

                    <div className="customerCredits">
                        <div className="content">
                            <h4><strong>Your Credit:</strong> <span>200$</span></h4>
                        </div>
                    </div>
                    
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">
                                    <i class="fas fa-user text-red"></i>
                                    <strong><a href="/profile">Profile</a></strong>
                                </h6>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">
                                    <i class="fas fa-calendar-alt text-red"></i>
                                    <strong><a href="/customer-bookings">Your Bookings</a></strong>
                                </h6>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">
                                    <i class="fas fa-user-tie text-red"></i>
                                    <strong><a href="/your-experts">Your Experts</a></strong>
                                </h6>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">
                                    <i class="fas fa-address-card text-red"></i>
                                    <strong><a href="/your-addresses">Your Addresses</a></strong>
                                </h6>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">
                                    <i class="fas fa-envelope text-red"></i>
                                    <strong><a href="/your-emails">Your Emails</a></strong>
                                </h6>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">
                                    <i class="far fa-credit-card text-red"></i>
                                    <strong><a href="/your-payment-details">Payment Details</a></strong>
                                </h6>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">
                                    <i class="fas fa-heart text-red"></i>
                                    <strong><a href="/watchlist">Watch List</a></strong>
                                </h6>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                            <div>
                                <h6 className="my-0">
                                    <i class="fas fa-sign-out-alt text-red"></i>
                                    <strong><a href="/signout">Signout</a></strong>
                                </h6>
                            </div>
                        </li>
                    </ul>

                </nav>

            </div>
        );
    }
}