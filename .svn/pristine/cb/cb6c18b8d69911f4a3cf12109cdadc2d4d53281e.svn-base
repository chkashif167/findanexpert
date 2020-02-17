import React, { Component } from 'react';
import { CustomerCancelledBookings } from './CustomerCancelledBookings';
import bookedServiceImage from '../../assets/img/watchlist_img.png';
import App from '../../App';

export class CustomerCompletedBookings extends Component {
    displayName = CustomerCompletedBookings.name

    constructor(props) {
        super(props);
        var customerId = localStorage.getItem("customerid");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        const search = window.location.search;
        //var decodedString = window.atob(search.replace('?', ''));
        //const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(search);

        const pageNumber1 = params.get('page1');
        console.log(pageNumber1);

        if (pageNumber1 != null) {
            var pageSize1 = pageNumber1;
        }
        else {
            var pageSize1 = 1;
        }

        this.state = {
            totalPages1: '', completedList: [], loading: true
        };

        if (localStorage.getItem("customerid") != null) {
            fetch(App.ApisBaseUrl + '/api/Booking/getcompletedbookingsbycustomerid?customerid=' + customerId + '&pageNumber=' + pageSize1 + '&pageSize=' + 15 + '&authToken=' + customerAccesstoken)
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then(data => {
                    console.log(data);
                    this.setState({ totalPages1: data.pages.totalpages });
                    this.setState({ completedList: data.completedbookings, loading: false });
                })

                .catch((error) => {

                    this.state.completedList = [];
                });
        }
    }

    render() {
        if (this.state.completedList != '') {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.completedBookings();
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.noCompletedBookings()
            );
        }
    }

    completedBookings() {
        var styles = {
            width: '132px',
        };
        var style = {
            width: '80px',
            height: '80px'
        };
        var tabBorder = {
            border: '1px solid',
        };

        if (this.state.totalPages1 == '2') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/customer-bookings">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 2))}>2</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            );
        }
        else if (this.state.totalPages1 == '3') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/customer-bookings">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 2))}>2</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 3))}>3</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            );
        }
        else if (this.state.totalPages1 == '4') {
            var listItems = (<div className="row pb-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation" className="text-center">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="/customer-bookings">1</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 2))}>2</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 3))}>3</a></li>
                            <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + btoa(encodeURIComponent('page1=' + 4))}>4</a></li>
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

            <div>

                <div className="no-mobile">
                    {this.state.completedList.map((bookings, index) =>
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="media booking-bx">

                                    <img className="d-flex mr-5" src={App.ApisImageBaseUrl + bookings.servicetypeimagepath} alt="service image" style={styles} />
                                    <div className="media-body">
                                        <h5 className="service-name mt-3 font-weight-bold">{bookings.servicetypename} <span className="small-text font-weight-normal">({bookings.servicetypeduration} hours)</span></h5>
                                        <span className="inline-items">
                                            <div className="float-left ml-4 mt-5">
                                                <h5 className="mt-0">{bookings.serviceprovidername}</h5>
                                                <ul className="list-unstyled list-inline ratings mb-0 pl-2">
                                                    <li className="list-inline-item m-0 p-0 1st" ><i className="fas fa-star amber-text"> </i></li>
                                                    <li className="list-inline-item m-0 p-0 2nd" ><i className="fas fa-star amber-text"></i></li>
                                                    <li className="list-inline-item m-0 p-0 3rd" ><i className="fas fa-star amber-text"></i></li>
                                                    <li className="list-inline-item m-0 p-0 4th" ><i className="fas fa-star amber-text"></i></li>
                                                    <li className="list-inline-item m-0 p-0 5th" ><i className="fas fa-star amber-text"></i></li>
                                                </ul>
                                            </div>
                                            <span className="date-time ml-5 float-right">
                                                <div className="links">
                                                    <a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + bookings.servicetypename +
                                                        '&index=' + index + '&serviceid=' + bookings.serviceid + '&servicename=' +
                                                        bookings.servicename + '&servicetypeid=' + bookings.servicetypeid + '&srvtypename=' +
                                                        bookings.servicetypename + '&inclinic=' + bookings.inclinic + '&inhouse=' +
                                                        bookings.inhouse + '&isgeneric=' + bookings.isgeneric + '&peakhours='
                                                        + bookings.peakhours + '&end_peakhours=' + bookings.endpeakhours
                                                        + '&hasarea=' + bookings.hasarea))}>Book Now</a>
                                                </div>
                                                <p className="mb-0">{bookings.bookingdate.slice('0', 10)}</p>
                                                <p className="mb-0">{bookings.bookingtime}</p>
                                            </span>
                                        </span>
                                    </div>
                                
                                </div>
                            </div>

                        </div>
                    )}

                    <div>
                        {listItems}
                    </div>

                    <CustomerCancelledBookings />
                </div>

                <div className="yes-mobile">
                    {this.state.completedList.map((bookings, index) =>
                        <div className="row pb-4">
                            <div className="col-md-12">

                                <div class="booking-bx">
                                    <img class="serviceImage" src={App.ApisImageBaseUrl + bookings.servicetypeimagepath} alt="Service Image" />
                                    <div class="media-body">
                                        <h5 class="service-name m-0 pb-4 font-weight-bold">{bookings.servicetypename} <span class="small-text font-weight-normal">({bookings.servicetypeduration} hours)</span></h5>
                                        <span class="inline-items">
                                            <div class="float-left ml-4 mt-0">
                                                <h5 class="mt-0">{bookings.serviceprovidername}</h5>
                                                <ul class="list-unstyled list-inline ratings mb-0 pl-2">
                                                    <li class="list-inline-item m-0 p-0 1st"><i class="fas fa-star amber-text"> </i></li>
                                                    <li class="list-inline-item m-0 p-0 2nd"><i class="fas fa-star amber-text"></i></li>
                                                    <li class="list-inline-item m-0 p-0 3rd"><i class="fas fa-star amber-text"></i></li>
                                                    <li class="list-inline-item m-0 p-0 4th"><i class="fas fa-star amber-text"></i></li>
                                                    <li class="list-inline-item m-0 p-0 5th"><i class="fas fa-star amber-text"></i></li>
                                                </ul>
                                            </div>
                                            <span class="date-time mt-3 ml-4 float-left">
                                                <div className="links pb-2">
                                                    <a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + bookings.servicetypename +
                                                        '&index=' + index + '&serviceid=' + bookings.serviceid + '&servicename=' +
                                                        bookings.servicename + '&servicetypeid=' + bookings.servicetypeid + '&srvtypename=' +
                                                        bookings.servicetypename + '&inclinic=' + bookings.inclinic + '&inhouse=' +
                                                        bookings.inhouse + '&isgeneric=' + bookings.isgeneric + '&peakhours='
                                                        + bookings.peakhours + '&end_peakhours=' + bookings.endpeakhours))}>Book Now</a>
                                                </div>
                                                <p className="mb-0">{bookings.bookingdate.slice('0', 10)}</p>
                                                <p className="mb-0">{bookings.bookingtime}</p>
                                            </span>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>

            </div>
        );
    }

    noCompletedBookings() {
        return (

            <div class="tab-pane fade in show active" id="pending" role="tabpanel">

                <p className="text-center">You have no completed bookings right now</p>
                <CustomerCancelledBookings />

            </div>
        );
    }
}
