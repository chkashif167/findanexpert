import React, { Component } from "react";
import { ProviderSidebarLinks } from "../Profile/SidebarLinks";
import { BreadCrumbs } from "../../BreadCrumbs/BreadCrumbs";
import App from "../../../App";
import { date } from "yup";
import { Redirect } from "react-router-dom";

export class ProviderReviews extends Component {
  displayName = ProviderReviews.name;

  constructor() {
    super();
    this.state = {
      allReviews: [],
      reviewList: [],
      totalPoints: "",
      averageRating: "",
      loading: true,

      ratingsaverage: "",
      totaljobs: ""
    };

    // var providerAccesstoken =
    //   "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSTRNaUlzSW1WdFlXbHNJam9pWm1GeWNuVnJhRUJ0WVdsc2FXNWhkRzl5TG1OdmJTSXNJbkp2YkdVaU9pSlFjbTkyYVdSbGNpSXNJa2x6Vm1Gc2FXUWlPaUowY25WbElpd2libUptSWpveE5UZ3lPRGt3TlRBM0xDSmxlSEFpT2pFMk1UYzBORFk1TURjc0ltbGhkQ0k2TVRVNE1qZzVNRFV3Tnl3aWFYTnpJam9pWm1sdVpHRnVaWGh3WlhKMExtNWxkQ0lzSW1GMVpDSTZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlmUS5PbHRPNW1fYlNOeXkta2V3ZjJtQUNlUkJEMmN0aHJYQmM5QzJIMW80XzIw";
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");
    var providerId = localStorage.getItem("serviceproviderid");

    fetch(
      App.ApisBaseUrl +
      "/api/Provider/getratings?authToken=" +
      providerAccesstoken +
      "&pagenumber=" +
      1 +
      "&pagesize=" +
      10
    )
      .then(response => {
        console.log(
          App.ApisBaseUrl +
          "/api/Provider/getratings?pagenumber=" +
          1 +
          "&pagesize=" +
          10 +
          "&authToken=" +
          providerAccesstoken
        );
        return response.json();
      })
      .then(data => {
        if (data.statuscode == 200) {
          this.setState({
            allReviews: data.ratinglist,
            ratingsaverage: data.ratingsaverage,
            totaljobs: data.totaljobs,
            loading: false
          });
        } else {
          this.setState({
            allReviews: [],
            ratingsaverage: data.ratingsaverage,
            totaljobs: data.totaljobs,
            loading: false
          });
        }

        if (localStorage.getItem("providerReviewsNotFound") == "200") {
          var newArray = this.state.reviewList.slice();
          var initailSum = 0;
          for (var i = 0; i < this.state.allReviews.length; i++) {
            newArray.push(this.state.allReviews[i]);
            this.setState({ reviewList: newArray });
            localStorage.setItem(
              "reviewPoints",
              this.state.reviewList[i].reviewpoints
            );
            console.log(localStorage.getItem("reviewPoints"));

            var allPoints = this.state.allReviews[i];

            initailSum = initailSum + allPoints.reviewpoints;
            console.log(initailSum);
            var pointSum = initailSum;
          }
          this.setState({ totalPoints: pointSum });
          console.log(this.state.totalPoints);
          var averageFormula =
            this.state.totalPoints / this.state.allReviews.length;
          this.setState({ averageRating: averageFormula });
        }
      });
  }

  render() {
    if (!localStorage.getItem("provideraccesstoken")) {
      return <Redirect to={"/provider-authentication"} />;
    }
    if (this.state.allReviews > 0) {
      return this.ProviderAllreviews(this.state.allReviews);
    } else {
      return this.ProviderNoreviews();
    }
  }

  ProviderAllreviews(allReviews) {
    if (this.state.averageRating == "5") {
      var startRating = (
        <div>
          <li className="list-inline-item mr-0">
            <i className="fas fa-star amber-text"> </i>
          </li>
          <li className="list-inline-item mr-0">
            <i className="fas fa-star amber-text"></i>
          </li>
          <li className="list-inline-item mr-0">
            <i className="fas fa-star amber-text"></i>
          </li>
          <li className="list-inline-item mr-0">
            <i className="fas fa-star amber-text"></i>
          </li>
          <li className="list-inline-item">
            <i className="fas fa-star amber-text"></i>
          </li>
          <li className="list-inline-item">
            <p className="text-muted">
              {this.state.averageRating} ({this.state.allReviews.length})
            </p>
          </li>
        </div>
      );
    } else if (this.state.averageRating == "4") {
      var startRating = (
        <div>
          <li className="list-inline-item mr-0">
            <i className="fas fa-star amber-text"> </i>
          </li>
          <li className="list-inline-item mr-0">
            <i className="fas fa-star amber-text"></i>
          </li>
          <li className="list-inline-item mr-0">
            <i className="fas fa-star amber-text"></i>
          </li>
          <li className="list-inline-item">
            <i className="fas fa-star amber-text"></i>
          </li>
          <li className="list-inline-item">
            <p className="text-muted">
              {this.state.averageRating} ({this.state.allReviews.length})
            </p>
          </li>
        </div>
      );
    } else if (this.state.averageRating == "3") {
      var startRating = (
        <div>
          <li className="list-inline-item mr-0">
            <i className="fas fa-star amber-text"> </i>
          </li>
          <li className="list-inline-item mr-0">
            <i className="fas fa-star amber-text"></i>
          </li>
          <li className="list-inline-item">
            <i className="fas fa-star amber-text"></i>
          </li>
          <li className="list-inline-item">
            <p className="text-muted">
              {this.state.averageRating} ({this.state.allReviews.length})
            </p>
          </li>
        </div>
      );
    } else if (this.state.averageRating == "2") {
      var startRating = (
        <div>
          <li className="list-inline-item mr-0">
            <i className="fas fa-star amber-text"> </i>
          </li>
          <li className="list-inline-item">
            <i className="fas fa-star amber-text"></i>
          </li>
          <li className="list-inline-item">
            <p className="text-muted">
              {this.state.averageRating} ({this.state.allReviews.length})
            </p>
          </li>
        </div>
      );
    } else if (this.state.averageRating == "1") {
      var startRating = (
        <div>
          <li className="list-inline-item">
            <i className="fas fa-star amber-text"> </i>
          </li>
          <li className="list-inline-item">
            <p className="text-muted">
              {this.state.averageRating} ({this.state.allReviews.length})
            </p>
          </li>
        </div>
      );
    }
    return (
      <div id="MainPageWrapper">
        <ProviderSidebarLinks />

        <section class="customerProfile">
          <div class="services-wrapper">
            <div class="container">
              <div class="row">
                <div className="col-md-9">
                  <div className="row pb-4">
                    <div className="col-md-12">
                      <div className="card-body">
                        <ul className="list-unstyled list-inline rating mb-0">
                          <li className="list-inline-item mr-0">
                            <i className="fas fa-star amber-text"> </i>
                          </li>
                          <li className="list-inline-item mr-0">
                            <i className="fas fa-star amber-text"></i>
                          </li>
                          <li className="list-inline-item mr-0">
                            <i className="fas fa-star amber-text"></i>
                          </li>
                          <li className="list-inline-item mr-0">
                            <i className="fas fa-star amber-text"></i>
                          </li>
                          <li className="list-inline-item">
                            <i className="fas fa-star amber-text"></i>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted">
                              {this.state.ratingsaverage &&
                                this.state.ratingsaverage}
                              (
                              {this.state.totaljobs &&
                                this.state.totaljobs.length}
                              )
                            </p>
                          </li>
                        </ul>
                      </div>

                      {allReviews &&
                        allReviews.map(ratngs => (
                          <div className="card booking-card mb-3 border-0">
                            <div className="card-body d-flex justify-content-between align-items-center providerReviews">
                              <div>
                                <p class="mb-2">
                                  <strong>{ratngs.servicetype}</strong>
                                </p>
                                <p className="card-text">
                                  {ratngs.reviewcomments}
                                </p>
                                <small>{ratngs.bookingdate}</small>
                              </div>
                              <ul className="list-unstyled list-inline rating mb-0">
                                <li className="list-inline-item mr-0">
                                  <i className="fas fa-star amber-text coloreOrange">
                                    {" "}
                                  </i>
                                </li>
                                <li className="list-inline-item mr-0">
                                  <i className="fas fa-star amber-text coloreOrange"></i>
                                </li>
                                <li className="list-inline-item mr-0">
                                  <i className="fas fa-star amber-text coloreOrange"></i>
                                </li>
                                <li className="list-inline-item mr-0">
                                  <i className="fas fa-star amber-text coloreOrange"></i>
                                </li>
                                <li className="list-inline-item">
                                  <i className="fas fa-star amber-text coloreOrange"></i>
                                </li>
                                <li className="list-inline-item">
                                  <p className="text-muted">
                                    {ratngs.reviewpoints}
                                  </p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ))}
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

  ProviderNoreviews(noReviews) {
    return (
      <div id="MainPageWrapper">
        <ProviderSidebarLinks />

        <section class="customerProfile">
          <div class="services-wrapper">
            <div class="container">
              <div class="row">
                <div className="col-md-9">
                  <div className="row pb-4">
                    <div className="col-md-12">
                      <h4 className="pb-2" />
                      You have no Reviews Yet!
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
