import React, { Component } from 'react';
import { ProviderSidebarLinks } from '../Profile/SidebarLinks';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';
import App from '../../../App';

export class ProviderReviews extends Component {
    displayName = ProviderReviews.name

    constructor() {
        super();
        this.state = { allReviews: [], reviewList: [], totalPoints: '', averageRating: '', loading: true };

        var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        var providerId = localStorage.getItem("serviceproviderid");
        var providerEmail = localStorage.getItem("email");

        fetch(App.ApisBaseUrl + '/api/ServiceProvider/getserviceproviderratings?serviceProviderId=' + providerId + '&email=' + providerEmail + '&authToken=' + providerAccesstoken)
            .then(response => {
                localStorage.setItem('providerReviewsNotFound', response.status);
                console.log(localStorage.getItem('providerReviewsNotFound'));
                if (response.status == '200') {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data);
                if (localStorage.getItem('providerReviewsNotFound') == '200') {
                    this.setState({ allReviews: data, loading: false });

                    var newArray = this.state.reviewList.slice();
                    var initailSum = 0;
                    for (var i = 0; i < this.state.allReviews.length; i++) {

                        newArray.push(this.state.allReviews[i]);
                        this.setState({ reviewList: newArray });
                        localStorage.setItem('reviewPoints', this.state.reviewList[i].reviewpoints);
                        console.log(localStorage.getItem('reviewPoints'));

                        var allPoints = this.state.allReviews[i];

                        initailSum = initailSum + allPoints.reviewpoints;
                        console.log(initailSum);
                        var pointSum = initailSum;
                    }
                    this.setState({ totalPoints: pointSum });
                    console.log(this.state.totalPoints);
                    var averageFormula = this.state.totalPoints / this.state.allReviews.length;
                    this.setState({ averageRating: averageFormula });
                }
            });
    }

    render() {
        if (localStorage.getItem('providerReviewsNotFound') == '200') {
            return (
                this.ProviderAllreviews(this.state.allReviews)
            );
        }
        else {
            return (
                this.ProviderNoreviews()
            );
        }
    }

    ProviderAllreviews(allReviews) {

        if (this.state.averageRating == '5') {
            var startRating = (<div><li className="list-inline-item mr-0"><i className="fas fa-star amber-text"> </i></li>
                <li className="list-inline-item mr-0"><i className="fas fa-star amber-text"></i></li>
                <li className="list-inline-item mr-0"><i className="fas fa-star amber-text"></i></li>
                <li className="list-inline-item mr-0"><i className="fas fa-star amber-text"></i></li>
                <li className="list-inline-item"><i className="fas fa-star amber-text"></i></li>
                <li className="list-inline-item"><p className="text-muted">{this.state.averageRating} ({this.state.allReviews.length})</p></li>
            </div>);
        }
        else if (this.state.averageRating == '4') {
            var startRating = (<div><li className="list-inline-item mr-0"><i className="fas fa-star amber-text"> </i></li>
                <li className="list-inline-item mr-0"><i className="fas fa-star amber-text"></i></li>
                <li className="list-inline-item mr-0"><i className="fas fa-star amber-text"></i></li>
                <li className="list-inline-item"><i className="fas fa-star amber-text"></i></li>
                <li className="list-inline-item"><p className="text-muted">{this.state.averageRating} ({this.state.allReviews.length})</p></li>
            </div>);
        }
        else if (this.state.averageRating == '3') {
            var startRating = (<div><li className="list-inline-item mr-0"><i className="fas fa-star amber-text"> </i></li>
                <li className="list-inline-item mr-0"><i className="fas fa-star amber-text"></i></li>
                <li className="list-inline-item"><i className="fas fa-star amber-text"></i></li>
                <li className="list-inline-item"><p className="text-muted">{this.state.averageRating} ({this.state.allReviews.length})</p></li>
            </div>);
        }
        else if (this.state.averageRating == '2') {
            var startRating = (<div><li className="list-inline-item mr-0"><i className="fas fa-star amber-text"> </i></li>
                <li className="list-inline-item"><i className="fas fa-star amber-text"></i></li>
                <li className="list-inline-item"><p className="text-muted">{this.state.averageRating} ({this.state.allReviews.length})</p></li>
            </div>);
        }
        else if (this.state.averageRating == '1') {
            var startRating = (<div><li className="list-inline-item"><i className="fas fa-star amber-text"> </i></li>
                <li className="list-inline-item"><p className="text-muted">{this.state.averageRating} ({this.state.allReviews.length})</p></li>
            </div>);
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
                                                    <li className="list-inline-item mr-0"><i className="fas fa-star amber-text"> </i></li>
                                                    <li className="list-inline-item mr-0"><i className="fas fa-star amber-text"></i></li>
                                                    <li className="list-inline-item mr-0"><i className="fas fa-star amber-text"></i></li>
                                                    <li className="list-inline-item mr-0"><i className="fas fa-star amber-text"></i></li>
                                                    <li className="list-inline-item"><i className="fas fa-star amber-text"></i></li>
                                                    <li className="list-inline-item"><p className="text-muted">{this.state.averageRating} ({this.state.allReviews.length})</p></li>
                                                </ul>
                                            </div>

                                            {allReviews.map(ratngs =>

                                                <div className="card booking-card mb-3 border-0">

                                                    <div className="card-body d-flex justify-content-between align-items-center providerReviews">
                                                        <div>
                                                            <p class="mb-2"><strong>{ratngs.servicetype}</strong></p>
                                                            <p className="card-text">{ratngs.reviewcomments}</p>
                                                            <small>{ratngs.bookingdate}</small>
                                                        </div>
                                                        <ul className="list-unstyled list-inline rating mb-0">
                                                            <li className="list-inline-item mr-0"><i className="fas fa-star amber-text coloreOrange"> </i></li>
                                                            <li className="list-inline-item mr-0"><i className="fas fa-star amber-text coloreOrange"></i></li>
                                                            <li className="list-inline-item mr-0"><i className="fas fa-star amber-text coloreOrange"></i></li>
                                                            <li className="list-inline-item mr-0"><i className="fas fa-star amber-text coloreOrange"></i></li>
                                                            <li className="list-inline-item"><i className="fas fa-star amber-text coloreOrange"></i></li>
                                                            <li className="list-inline-item"><p className="text-muted">{ratngs.reviewpoints}</p></li>
                                                        </ul>
                                                    </div>

                                                </div>

                                            )}
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
                                            <h4 className="pb-2" />You have no Reviews Yet!
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
