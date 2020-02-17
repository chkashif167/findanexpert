import React, { Component } from 'react';

export class BecomeExpert extends Component {
    displayName = BecomeExpert.name

  render() {
      return (

          <div id="MainPageWrapper">

              <section className="account-details section-padding">
                  <div className="services-wrapper">
                      <div className="container">
                          <div className="row pb-4">

                              <div className="col-md-8">
                                  <h3 className="section-title pb-2"><strong>Features & Benefits</strong></h3>
                                  <p>See how we can help you to grow your business.</p>
                              </div>

                              <div className="col-md-4">
                                  <button type="button" className="btn btn-primary float-right"><a href="/provider-authentication" className="text-white">Start Here</a></button>
                              </div>

                          </div>

                          <div className="row">

                              <div className="col-12  col-md-4 col-sm-6 pb-4">
                                  <div className="media">
                                      <i className="fas fa-users d-flex mr-3"></i>
                                      <div className="media-body">
                                          <h5 className="mt-0 font-weight-bold">Millions of customers</h5>
                                          <p className="mb-0">Cras sit amet nibh libero, in gravida nulla amet nibh.</p>
                                      </div>
                                  </div>
                              </div>

                              <div className="col-12 col-sm-6 col-md-4 pb-4">
                                  <div className="media">
                                      <i className="fas fa-th-list icon-grey d-flex mr-3"></i>
                                      <div className="media-body">
                                          <h5 className="mt-0 font-weight-bold">Pay when you sell, no listing fee</h5>
                                          <p className="mb-0">Cras sit amet nibh libero, in gravida nulla.</p>
                                      </div>
                                  </div>
                              </div>

                              <div className="col-12 col-sm-6 col-md-4 pb-4">
                                  <div className="media">
                                      <i className="fas fa-shipping-fast icon-blue d-flex mr-3"></i>
                                      <div className="media-body">
                                          <h5 className="mt-0 font-weight-bold">Fast & Reliable</h5>
                                          <p className="mb-0">Cras sit amet nibh libero, in gravida nulla.</p>
                                      </div>
                                  </div>
                              </div>

                          </div>

                          <div className="row">

                              <div className="col-md-4 pb-4">
                                  <div className="media">
                                      <i className="fas fa-shield-alt icon-green d-flex mr-3"></i>
                                      <div className="media-body">
                                          <h5 className="mt-0 font-weight-bold">Secure & Timely Payments</h5>
                                          <p className="mb-0">Cras sit amet nibh libero, in gravida nulla.</p>
                                      </div>
                                  </div>
                              </div>

                              <div className="col-md-4 pb-4">
                                  <div className="media">
                                      <i className="fas fa-chalkboard-teacher icon-yellow d-flex mr-3"></i>
                                      <div className="media-body">
                                          <h5 className="mt-0 font-weight-bold">Professional Services to help you</h5>
                                          <p className="mb-0">Cras sit amet nibh libero, in gravida nulla.</p>
                                      </div>
                                  </div>
                              </div>

                              <div className="col-md-4 pb-4">
                                  <div className="media">
                                      <i className="fas fa-plus-circle icon-lightBlue d-flex mr-3"></i>
                                      <div className="media-body">
                                          <h5 className="mt-0 font-weight-bold">and much more</h5>
                                          <p className="mb-0">Cras sit amet nibh libero, in gravida nulla.</p>
                                      </div>
                                  </div>
                              </div>

                          </div>
                      </div>
                  </div>
              </section>

              <section className="account-details section-padding section-bg-light pb-0 no-mobile">
                  <div className="account-wrapper">
                      <div className="container">
                          <div className="row">

                              <div className="col-md-12 pb-4">
                                  <h3 className="section-title pb-2"><strong>Steps to Become Expert</strong></h3>
                                  <p>Just like this, simply done!</p>
                              </div>

                          </div>

                          <div className="row steps-become-expert">

                              <div className="col-md-8">
                                  <div className="how-it-work clearfix">

                                      <div className="main-how-it">
                                          <h4> Follow <span className="bg-theme"> Steps</span> </h4>
                                      </div>
                                      <div className="panel panel-default col-sm-10">
                                          <div className="panel-body">
                                              <span> 1 </span> <h3 className="step-heading"> Register </h3>
                                              Select your category and ask any question related to it.
							                </div>
                                      </div>

                                      <div className="panel panel-default col-sm-10">
                                          <div className="panel-body">
                                              <span> 2 </span> <h3 className="step-heading"> Get Booked </h3>
                                              Select your category and ask any question related to it.
							                </div>
                                      </div>

                                      <div className="panel panel-default col-sm-10">
                                          <div className="panel-body">
                                              <span> 3 </span> <h3 className="step-heading"> Get Job Done! </h3>
                                              Select your category and ask any question related to it.
							                </div>
                                      </div>

                                      <div className="panel panel-default col-sm-10">
                                          <div className="panel-body">
                                              <span> 4 </span> <h3 className="step-heading"> Get Paid  </h3>
                                              Select your category and ask any question related to it.
							                </div>
                                      </div>

                                  </div>
                              </div>

                              <div className="col-md-4">
                                  <img className="man" src="http://www.stickpng.com/assets/images/580b585b2edbce24c47b29ea.png" width="100%"></img>
                              </div>

                          </div>
                      </div>
                  </div>
              </section>

          </div>
    );
  }
}
