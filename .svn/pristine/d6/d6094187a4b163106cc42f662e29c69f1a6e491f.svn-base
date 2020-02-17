import React, { Component } from 'react';
import bookedServiceImage from '../../assets/img/watchlist_img.png';
import App from '../../App';
import { Link } from 'react-router-dom';

export class CustomerPendingBookings extends Component {
    displayName = CustomerPendingBookings.name

    constructor(props) {
        super(props);
        var customerId = localStorage.getItem("customerid");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        const search = window.location.search;
        //var decodedString = window.atob(search.replace('?', ''));
        //const decodeParams = decodeURIComponent(decodedString);
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

        //const bookingid = params.get('bookingid');
        //const bookingDate = params.get('bookingdate');
        //const bookingTime = params.get('bookingtime');
        //const serviceproviderid = params.get('serviceproviderid');

        this.state = {
            totalPages: '', pendingBookingResponse: [], apiResponse: '', bookinglist: [], loading: true
        };

        if (localStorage.getItem("customerid") != null) {
            fetch(App.ApisBaseUrl + '/api/Booking/getpendingbookingbycustomerid?customerid=' + customerId + '&pageNumber=' + pageSize + '&pageSize=' + 15 + '&authToken=' + customerAccesstoken)
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then(data => {
                    //console.log(data);
                    this.setState({ totalPages: data.pages.totalpages });
                    this.setState({ bookinglist: data.pending_bookings, loading: false });
                    console.log(this.state.bookinglist);
                })

                .catch((error) => {

                    this.state.bookinglist = [];
                });
        }
    }

    render() {
        if (this.state.bookinglist != '') {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.pendingBookings();
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.noPendingBookings()
            );
        }
    }

    pendingBookings() {
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

        var pageItem = '';
        console.log("Page Size Cheeji bhootni key:");
        console.log(this.state.totalPages);
        for (var i = 0; i < this.state.totalPages; i++) {
            
            pageItem += (<li class="page-item"><a class="page-link" href="/customer-bookings">{i}</a></li>);
            
        }
        console.log(pageItem);

        if (this.state.totalPages == '2') {
            var listItems = (<ul class="pagination">
                    <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'  + '&page=' + 1}>1</a></li>
                    <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'  + '&page=' + 2}>2</a></li>
                </ul>
            );
        }
        else if (this.state.totalPages == '3') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'  + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'  + '&page=' + 3}>3</a></li>
            </ul>
            );
        }
        else if (this.state.totalPages == '4') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'  + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'  + '&page=' + 3}>3</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'  + '&page=' + 4}>4</a></li>
            </ul>
            );
        }
        else {
            var listItems = (<div></div>);
        }

        return (
            <div>

                <div className="no-mobile">
                    {this.state.bookinglist.map(bookings =>
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="media booking-bx">

                                    <img className="d-flex mr-5 img-responsive" src={App.ApisImageBaseUrl + bookings.servicetypeimagepath} alt="service image" style={styles} />
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
                                                    <a className="pr-2" href={'/edit-customer-booking/?' + btoa(encodeURIComponent('serviceproviderid=' + bookings.serviceproviderid + '&isgeneric=' + bookings.isgeneric + '&serviceid=' +
                                                        bookings.serviceid + '&servicetypeid=' + bookings.servicetypeid + '&servicetypeids=' + bookings.servicetypeids + '&serviceType=' + bookings.servicetypename +
                                                        '&bookingid=' + bookings.bookingid + '&bookingdate=' + bookings.bookingdate + '&bookingtime=' + bookings.bookingtime + '&servicetypeduration=' + bookings.servicetypeduration + '&bookingNotes=' + bookings.bookingnotes
                                                        + '&postalcode=' + bookings.postalcode + '&addressid=' + bookings.addressid + '&genderpreference=' + bookings.genderpreference
                                                        + '&serviceprovideremail=' + bookings.serviceprovideremail + '&serviceprovidername=' + bookings.serviceprovidername))}>Edit</a>
                                                    <a href={'/booking-detail/?' + btoa(encodeURIComponent('bookingid=' + bookings.bookingid + '&bookingdate=' + bookings.bookingdate + '&bookingtime=' +
                                                        bookings.bookingtime + '&servicetype=' + bookings.servicetypename + '&bookingnotes=' + bookings.bookingnotes + '&servicename=' + bookings.servicename +
                                                        '&serviceprovider=' + bookings.serviceprovidername +
                                                        '&serviceproviderid=' + bookings.serviceproviderid))}>View Details</a>
                                                    <a href={'/chat/?' + btoa(encodeURIComponent('serviceproviderid=' + bookings.serviceproviderid + '&bookingid=' + bookings.bookingid))} class="pl-3">
                                                        <i class="fas fa-comment-alt"></i>
                                                    </a>
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

                    <div className="row pb-4">
                        <div className="col-md-12">
                            <nav aria-label="Page navigation" className="text-center">
                                {listItems}
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="yes-mobile">
                    {this.state.bookinglist.map(bookings =>
                        <div className="row pb-4">
                            <div className="col-md-12">

                                <div class="booking-bx">
                                    <img class="serviceImage img-responsive" src={App.ApisImageBaseUrl + bookings.servicetypeimagepath} alt="Service Image" />
                                    <div class="media-body">
                                        <h5 class="service-name m-0 pb-4 font-weight-bold pt-4 pl-4">{bookings.servicetypename} <span class="small-text font-weight-normal">({bookings.servicetypeduration} hours)</span></h5>
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
                                            <span class="date-time float-right m-auto ml-4 mt-3 pr-4">
                                                <div className="links pb-2">
                                                    <a className="pr-2" href={'/edit-customer-booking/?' + btoa(encodeURIComponent('serviceid' + bookings.serviceid + '&serviceType=' + bookings.servicetypename +
                                                        '&bookingid=' + bookings.bookingid + '&bookingdate=' + bookings.bookingdate + '&bookingtime=' + bookings.bookingtime + '&bookingNotes=' + bookings.bookingnotes))}>Edit</a>
                                                    <a href={'/booking-detail/?' + btoa(encodeURIComponent('bookingid=' + bookings.bookingid + '&bookingdate=' + bookings.bookingdate + '&bookingtime=' +
                                                        bookings.bookingtime + '&servicetype=' + bookings.servicetypename + '&bookingnotes=' + bookings.bookingnotes + '&serviceprovider=' + bookings.serviceprovidername +
                                                        '&serviceproviderid=' + bookings.serviceproviderid))}>View Details</a>
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

    noPendingBookings() {
        return (

            <div class="tab-pane fade in show active" id="pending" role="tabpanel">
                <p className="text-center">You have no pending bookings right now</p>
            </div>
        );
    }
}
