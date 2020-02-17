import React, { Component } from 'react';
import Logo from '../../assets/img/company-logo.png';
import { CheckLogin } from '../CheckLogin';
import App from '../../App';
import { Link } from 'react-router-dom';
import authicon from '../../assets/img/icons/sticon.png';
import phoneicon from '../../assets/img/icons/phone.png';
import hamberger from '../../assets/img/icons/hamberger.png';
import logout from '../../assets/img/icons/st_sp_logouts.png';

var iconstyle = {
    width: '20px',
    height: '20px'
}

export class NavMenu extends Component {
    displayName = NavMenu.name

    constructor(props) {
        super(props);

        this.state = {
            allServices: [], found: false
        };

        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChangeSearch(e) {
        this.setState({ search: e.target.value });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                SearchService: e.target.value
            })
        };
        console.log(requestOptions);

        fetch(App.ApisBaseUrl + '/api/ServiceType/findservicetype?searchService=' + e.target.value, requestOptions)
            .then(response => {
                console.log(response);
                if (response.status == '404') {
                    alert("No result match your search! Please try something else.");
                    console.log(response.json());
                }
                else if (response.status == '400') {
                    alert('No result match your search! Please try something else.');
                }
                else {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                this.setState({ allServices: response, found: true });
            });
    }

    handleClick(e) {
        //e.preventDefault();
        //this.setState({ clicked: e.target.id })
        //alert(this.state.clicked);

        this.setState({ addClass: true });
    }

    onBlur() {
        this.setState({ focused: false })
    }
    onFocus() {
        this.setState({ focused: true })
    }

    render() {

        var signedOut = (
            <div>
                <Link to="/contact-us" className="pl-5"><img src={phoneicon} style={iconstyle} /></Link>
                <Link to="/provider-authentication" className="pl-5"><img src={authicon} style={iconstyle} /></Link>
            </div>
        );

        var signedIn = (
            <div className="no-tab">
                <Link to="/contact-us" className="pl-5"><img src={phoneicon} style={iconstyle} /></Link>
                <Link to="/provider-profile" className="pl-5"><img src={authicon} style={iconstyle} /></Link>
                <Link to="#" className="pl-5"><img src={logout} style={iconstyle} data-toggle="modal" data-target="#logoutModal" /></Link>
            </div>
            );

        var loggedin = (
                <div>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">
                                <i class="fas fa-user-tie text-dark"></i>
                                <strong><Link to="provider-profile">Profile</Link></strong>
                            </h6>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">
                                <i class="fas fa-cogs text-dark"></i>
                                <strong><Link to="/provider-services">Your Services</Link></strong>
                            </h6>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">
                                <i class="fas fa-user-md text-dark"></i>
                                <strong><Link to="/jobs">Jobs</Link></strong>
                            </h6>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">
                                <i class="fas fa-list-ul text-dark"></i>
                                <strong><Link to="/provider-schedular"> Your Availibility</Link></strong>
                            </h6>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">
                                <i class="fas fa-file-alt text-dark"></i>
                                <strong><Link to="/provider-documents">Your Documents</Link></strong>
                            </h6>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">
                                <i class="fas fa-mail-bulk text-dark"></i>
                                <strong><Link to="/provider-mailbox">Your Emails</Link></strong>
                            </h6>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">
                                <i class="far fa-comments text-dark"></i>
                                <strong><Link to="/provider-reviews">Your Reviews</Link></strong>
                            </h6>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">
                                <i class="fas fa-pound-sign text-dark"></i>
                                <strong><Link to="/provider-earnings">Your Earnings</Link></strong>
                            </h6>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">
                                <i class="fas fa-sign-out-alt text-dark"></i>
                                <strong><Link to="/provider-signout">Sign Out</Link></strong>
                            </h6>
                        </div>
                    </li>
                </div>
        );
        var loggedout = (
            <div>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 className="my-0">
                            <i class="fas fa-user-tie text-dark"></i>
                            <strong><Link to="/provider-authentication">SignIn</Link></strong>
                        </h6>
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 className="my-0">
                            <i class="fas fa-user-tie text-dark"></i>
                            <strong><Link to="/provider-authentication">Register</Link></strong>
                        </h6>
                    </div>
                </li>
            </div>
            );

        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-dark bg-black mb-0">
                    <Link className="navbar-brand mr-auto st_md_rs_code" to="/">
                        <img className="selteqLogo" src={Logo} alt="Company Logo" width="auto" />
                    </Link>
                    {/*<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>*/}
                    <button class="navbar-toggler sidebarToggler st_ham_self" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                        <img src={hamberger} style={iconstyle} />
                    </button>
                    <button class="navbar-toggler sidebarToggler yes-mobile text-white st_ham_self_2" type="button" data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars fs-16"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav float-right">
                            {localStorage.getItem("serviceproviderid") ? signedIn : signedOut}
                        </ul>
                    </div>
                </nav>

                <nav className="collapse" id="sidebar">

                    <ul className="list-group mb-3">
                        {localStorage.getItem("serviceproviderid") ? loggedin : loggedout}
                    </ul>

                </nav>
                <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog st-mw-30" role="document">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div className="row">
                                    <div className="col-md-12 d-flex">
                                        <div>
                                            <img src={authicon} style={iconstyle} className="change-to-white" />
                                        </div>
                                        <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">Expert</h3>
                                    </div>
                                    <div className="col-md-12 text-center fs-18 p-5">
                                        Are you sure you want to Log out?
                                    </div>
                                    <div className="col-md-12 text-right">
                                        <Link to="" className="text-dark text-decoration-none pr-5" data-dismiss="modal">Cancel</Link>
                                        <Link to="/provider-signout" className="text-red text-decoration-none st_sp_l_btn">Logout</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
