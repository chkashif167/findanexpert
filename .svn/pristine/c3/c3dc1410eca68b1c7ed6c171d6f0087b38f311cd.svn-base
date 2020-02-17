import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CheckLogin extends Component {
    displayName = CheckLogin.name

    render() {
            return (
                <div>
                    <li className="nav-item"><Link to="/contact-us"><i class="fas fa-phone text-white pr-4"></i></Link></li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle text-white font-weight-lighter" to="#" id="accountDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hello, <span className="text-uppercase font-weight-lighter">{localStorage.getItem("firstname")}</span></Link>
                        <div className="dropdown-menu accountDropdown" aria-labelledby="accountDropdown">
                            <Link className="dropdown-item" to="/provider-profile">
                                <i class="fas fa-user text-dark pr-2"></i>Your Profile
                            </Link>
                            <Link className="dropdown-item" to="/provider-services">
                                <i class="fas fa-user-tie text-dark pr-2"></i>Your Services
                            </Link>
                            <Link className="dropdown-item" to="/jobs">
                                <i class="fas fa-user-md text-dark pr-2"></i>Jobs
                            </Link>
                            <Link className="dropdown-item" to="/provider-schedular">
                                <i class="fas fa-address-card text-dark pr-2"></i>Your Availability
                            </Link>
                            <Link className="dropdown-item" to="/provider-documents">
                                <i class="fas fa-envelope text-dark pr-2"></i>Your Documents
                            </Link>
                            <Link className="dropdown-item" to="/provider-mailbox">
                                <i class="far fa-credit-card text-dark pr-2"></i>Your Emails
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="/provider-reviews">
                                <i class="fas fa-heart text-dark pr-2"></i>Your Reviews
                            </Link>
                            <Link className="dropdown-item" to="/provider-earnings">
                                <i class="fas fa-user-friends text-dark pr-2"></i>Your Earnings
                            </Link>
                            <Link className="dropdown-item btn bg-black text-white" to="/provider-signout">
                                <i class="fas fa-sign-out-alt text-white pr-2"></i>Signout
                            </Link>
                        </div>
                    </li>
                </div>
            );
    }
}

export default CheckLogin;