import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profile from '../../../assets/img/profile/profile.png';
import bannerProfile from '../../../assets/img/profile/banner.png';
import App from '../../../App';

export class ProviderSidebarLinks extends Component {
    displayName = ProviderSidebarLinks.name

    render() {
        var styles = {
            display: 'none'
        }
        var profileImage = localStorage.getItem('providerprofileImage');
        console.log(profileImage);

        var bg = {
            background: 'url(' + bannerProfile + ')'
        }

        if (profileImage == 'IMAGE NOT AVAILABLE' || profileImage == '') {
            var imgUrl = 'https://www.integraconference.info/wp-content/uploads/2018/03/placeholder-face-big-300x300.png';
            var imagePreview = (<img src={imgUrl} class="img-fluid providerProfileImg"
                alt="Responsive image" />);
        } else {
            console.log(App.ApisBaseUrl + profileImage);
            var imagePreview = (<img src={App.ApisBaseUrl + profileImage} class="img-fluid providerProfileImg"
                alt="Responsive image one" />);
        }
        
        return (

            <section class="customerProfile">
                <div class="services-wrapper">
                    <div class="hero-image" style={bg}></div>
                    <div class="container-fluid shadow">
                        <div class="row">

                            <div class="banner_profile_picture">
                                {imagePreview}
                                <div class="profileName text-center">
                                    <h3 class="text-white">{localStorage.getItem("firstname")} {localStorage.getItem("surname")}</h3>
                                    {/*<h4 class="text-white">Your Credit : £ 200</h4>*/}
                                </div>
                            </div>

                            <div class="topnav" id="myTopnav">
                                <Link to="/provider-profile" class="custom_column">
                                    <div class="text-center profile_box_1">
                                        <div>
                                            <i class="fas fa-user-tie"></i>
                                        </div>
                                        <div class="text-center">
                                            <p className="text-white"> Profile</p>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/provider-services" class="custom_column">
                                    <div class="text-center profile_box_2">
                                        <div>
                                            <i class="fas fa-cogs"></i>
                                        </div>
                                        <div class="text-center">
                                            <p className="text-white">Your Services</p>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/jobs" class="custom_column">
                                    <div class="text-center profile_box_7">
                                        <div>
                                            <i class="fas fa-user-md"></i>
                                        </div>
                                        <div class="text-center">
                                            <p className="text-white">Jobs</p>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/provider-schedular" class="custom_column">
                                    <div class="text-center profile_box_3">
                                        <div>
                                            <i class="fas fa-list-ul"></i>
                                        </div>
                                        <div class="text-center">
                                            <p className="text-white"> Your Availibility</p>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/provider-documents" class="custom_column">
                                    <div class="text-center  profile_box_4">
                                        <div>
                                            <i class="fas fa-file-alt"></i>
                                        </div>
                                        <div class="text-center">
                                            <p className="text-white"> Your Documents</p>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/provider-mailbox" class="custom_column">
                                    <div class="text-center profile_box_5">
                                        <div>
                                            <i class="fas fa-mail-bulk"></i>
                                        </div>
                                        <div class="text-center">
                                            <p className="text-white">Your Emails</p>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/provider-reviews" class="custom_column">
                                    <div class="text-center profile_box_6">
                                        <div>
                                            <i class="far fa-comments"></i>
                                        </div>
                                        <div class="text-center">
                                            <p className="text-white">Your Reviews</p>
                                        </div>
                                    </div>
                                </Link>

                                <Link to="/provider-earnings" class="custom_column">
                                    <div class="text-center profile_box_0">
                                        <div>
                                            <i class="fas fa-pound-sign"></i>
                                        </div>
                                        <div class="text-center">
                                            <p className="text-white">Your Earnings</p>
                                        </div>
                                    </div>
                                </Link>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

        );
    }
}