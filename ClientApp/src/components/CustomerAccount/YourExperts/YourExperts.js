import React, { Component } from 'react';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
import App from '../../../App';

export class YourExperts extends Component {
    displayName = YourExperts.name

    constructor(props) {
        super(props);
        this.state = { totalPages: '', bookinglist: [], starRatingList: [], loading: true };

        var customerId = localStorage.getItem("customerid");
        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        const search = window.location.search;
        const params = new URLSearchParams(search);

        const pageNumber = params.get('page');
        console.log(pageNumber);

        if (pageNumber != null) {
            var pageSize = pageNumber;
        }
        else {
            var pageSize = 1;
        }
        console.log(pageSize);

        if (localStorage.getItem("customerid") != null) {
            fetch(App.ApisBaseUrl + '/api/CustomerProfile/getcustomerexperts?customerid=' + customerId + '&pageNumber=' + pageSize + '&pageSize=' + 15 + '&authToken=' + customerAccesstoken)
                .then(response => {
                    console.log(response);
                    localStorage.setItem('yourExpertsStatusCode', response.status);
                    //if (response.status == '200') {
                        return response.json();
                    //}
                })
                .then(data => {
                    console.log(data);
                    if (localStorage.getItem('yourExpertsStatusCode') == '200') {
                        this.setState({ totalPages: data.pages.totalpages });
                        this.setState({ bookinglist: data.experts, loading: false });

                        var availableArray = this.state.starRatingList.slice();
                        for (var i = 0; i < this.state.bookinglist.length; i++) {

                            availableArray.push(this.state.bookinglist[i]);
                            this.setState({ starRatingList: availableArray });
                            localStorage.setItem('reviewPoints', this.state.starRatingList[i].reviewPoints);
                            console.log(localStorage.getItem('reviewPoints'));
                        }
                    }
                });
        }
    }

    render() {
        if (localStorage.getItem('yourExpertsStatusCode') == '200') {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.getExperts(this.state.allAddress);
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.noExperts()
            );
        }
    }

    getExperts(fiveStars) {
        var styles = {
            width: '132px',
        };

        if (this.state.totalPages == '2') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/your-experts">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 2))}>2</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            );
        }
        else if (this.state.totalPages == '3') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/your-experts">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 2))}>2</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 3))}>3</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            );
        }
        else if (this.state.totalPages == '4') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/your-experts">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 2))}>2</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 3))}>3</a></li>
                            <li class="page-item"><a class="page-link" href={"/your-experts/?" + btoa(encodeURIComponent('page=' + 4))}>4</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            );
        }
        else {
            var listItems = (<div></div>);
        }

        return (

            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Your Experts</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-10 pt-4 pb-4">
                                    
                                    <div className="row pb-4">

                                        {this.state.bookinglist.map((experts, index) =>
                                            <div className="col-md-6 pb-4">
                                                <div className="media watchlist-bx bg-half-white p-4">
                                                    <a href="#">
                                                        <img className="d-flex pr-4" src={App.ApisImageBaseUrl + experts.servicetypeimagepath} className="mr-3" height="130" width="" alt="avatar" />
                                                    </a>
                                                    <div className="media-body pl-4 pb-4">
                                                        <h4 className="mt-0 font-weight-bold">{experts.firstname} {experts.surname}</h4>
                                                        <ul className="list-unstyled list-inline rating mb-0" id="rating_stars">
                                                            <li className="list-inline-item mr-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                            <li className="list-inline-item mr-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                            <li className="list-inline-item mr-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                                            <li className="list-inline-item mr-0 4th" ><i className="fas fa-star amber-text"></i></li>
                                                            <li className="list-inline-item mr-0 5th" ><i className="fas fa-star amber-text"></i></li>
                                                        </ul>
                                                        <h5>{experts.servicetypename}</h5>
                                                        <p className="card-text pb-5">{experts.bookingdate.slice(0, 10)} - {experts.bookingtime}</p>
                                                       
                                                        <div className="mt-5">
                                                            <a className="btn bg-orange text-white float-right" href={'/booking/?' + btoa(encodeURIComponent(
                                                                'searchedservice=' + experts.servicetypename + '&index=' + index + '&serviceid=' + experts.serviceid +
                                                                '&servicename=' + experts.servicename + '&servicetypeid=' + experts.servicetypeid + '&srvtypename=' +
                                                                experts.servicetypename + '&inclinic=' + experts.inclinic + '&inhouse=' + experts.inhouse + '&isgeneric=' +
                                                                experts.isgeneric + '&switchonpeakhours=' + experts.switchonpeakhours + '&peakhours=' + experts.peakhours +
                                                                '&end_peakhours=' + experts.end_peakhours + '&hasarea=' + experts.hasarea + '&serviceProvider=' + experts.firstname + ' ' +
                                                                    experts.surname + '&serviceproviderid=' + experts.serviceproviderid  ))}>Book Now</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    

                                    <div>
                                        {listItems}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    noExperts() {
        var styles = {
            width: '132px',
        };

        return (

            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Your Experts</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">

                                    <p>You have not book any Expert yet.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
