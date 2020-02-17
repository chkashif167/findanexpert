import React, { Component } from 'react';
import { SidebarLinks } from './SidebarLinks';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';
import App from '../../../App';

export class Profile extends Component {
    displayName = Profile.name

    render() {
        console.log(localStorage.getItem('customeraccesstoken'));
        console.log(localStorage.getItem('customerid'));

        var profileImage = localStorage.getItem('customerprofileImage');
        console.log(profileImage);

        if (profileImage != 'IMAGE NOT AVAILABLE') {
            var imagePreview = (<img src={App.ApisBaseUrl + profileImage} class="img-fluid z-depth-1 img-profile"
                alt="Responsive image one" />);
        } else {
            var imgUrl = 'https://www.integraconference.info/wp-content/uploads/2018/03/placeholder-face-big-300x300.png';
            var imagePreview = (<img src={imgUrl} class="img-fluid z-depth-1 img-profile"
                alt="Responsive image" />);
        }

        if (localStorage.getItem('gender') == 'na') {
            var customerGender = (<h5 className="card-text"><strong>Other</strong></h5>);
        }
        else {
            var customerGender = (<h5 className="card-text"><strong>{localStorage.getItem('gender')}</strong></h5>);
        }

        var border = {
            borderRight: '1px solid #ddd'
        }

        return (

          <div id="MainPageWrapper">

              <BreadCrumbs />

              <section className="account-details">
                  <div className="services-wrapper">
                      <div className="container-fluid">
                          <div className="row">

                              <SidebarLinks />

                              <div className="col-md-9 pt-4">

                                    <div className="row pt-5 pb-5">
                                        <div className="col-md-3 text-center ml-auto mr-auto">
                                            {imagePreview}
                                            <div class="profileLinks pt-5">
                                                <a class="btn btn-primary bg-black mr-4" href="/edit-profile"
                                                    style={border}>Edit Profile</a>
                                                <a class="btn btn-primary bg-black" href="/change-password">Change Password</a>
                                            </div>
                                        </div>
                                    </div>

                                  <div className="row">
                                      <div className="col-md-6 pb-4">
                                          <div className="card colored-card">
                                              <div className="card-body">
                                                  <h5 className="card-title">Full Name</h5>
                                                  <h5 className="card-text"><strong>{localStorage.getItem("firstname")} {localStorage.getItem("surname")}</strong></h5>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="col-md-6 pb-4">
                                          <div className="card colored-card">
                                              <div className="card-body">
                                                    <h5 className="card-title">Email Address</h5>
                                                    <h5 className="card-text"><strong>{localStorage.getItem("email")}</strong></h5>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="row">

                                      <div className="col-md-6 pb-4">
                                          <div className="card colored-card">
                                              <div className="card-body">
                                                    <h5 className="card-title">Mobile Number</h5>
                                                    <h5 className="card-text"><strong>{localStorage.getItem("mobile")}</strong></h5>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="col-md-6 pb-4">
                                          <div className="card colored-card">
                                              <div className="card-body">
                                                    <h5 className="card-title">Gender</h5>
                                                    {customerGender}
                                              </div>
                                          </div>
                                      </div>

                                        <div className="col-md-6 pb-4">
                                            <div className="card colored-card">
                                                <div className="card-body">
                                                    <h5 className="card-title">Date of Birth</h5>
                                                    <h5 className="card-text"><strong>{localStorage.getItem('customerDob').split('', 10)}</strong></h5>
                                                </div>
                                            </div>
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
