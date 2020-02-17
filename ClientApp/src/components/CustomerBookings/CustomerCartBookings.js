import React, { Component } from 'react';
import bookedServiceImage from '../../assets/img/watchlist_img.png';
import App from '../../App';

export class CustomerCartBookings extends Component {
    displayName = CustomerCartBookings.name

    constructor(props) {
        super(props);
        var customerId = localStorage.getItem("customerid");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        const search = window.location.search;
        const params = new URLSearchParams(search);

        const incompletePageNumber = params.get('page');
        console.log(incompletePageNumber);

        if (incompletePageNumber != null) {
            var incompletePageSize = incompletePageNumber;
        }
        else {
            var incompletePageSize = 1;
        }
        console.log(incompletePageSize);


        this.state = {
            totalIncompletedPages: '', cartList: [], loading: true
        };

        if (localStorage.getItem("customerid") != null) {
            fetch(App.ApisBaseUrl + '/api/Booking/getincompletebookings?customerid=' + customerId + '&pageNumber=' + incompletePageSize + '&pageSize=' + 15 + '&authToken=' + customerAccesstoken)
                .then(response => {
                    console.log(response);
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then(data => {
                    console.log(data);
                    this.setState({ totalIncompletedPages: data.pages.totalpages });

                    this.setState({ cartList: data.incompletebookings, loading: false });
                    console.log(this.state.cartList);
                })

                .catch((error) => {

                    this.state.cartList = [];
                });
        }
    }

    render() {
        if (this.state.cartList != '') {
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

        if (this.state.totalIncompletedPages == '2') {
            var listItems = (<ul class="pagination">
                    <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'}>1</a></li>
                    <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 2}>2</a></li>
                </ul>
            );
        }
        else if (this.state.totalIncompletedPages == '3') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 3}>3</a></li>
            </ul>
            );
        }
        else if (this.state.totalIncompletedPages == '4') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 3}>3</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'incomplete'  + '&page=' + 4}>4</a></li>
            </ul>
            );
        }
        else {
            var listItems = (<div></div>);
        }

        return (
            <div>

                <div className="no-mobile">
                    {this.state.cartList.map((bookings, index) =>
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="media booking-bx">

                                    <img className="d-flex mr-5" src={App.ApisImageBaseUrl + bookings.servicetypeimagepath} alt="service image" style={styles} />
                                    <div className="media-body">
                                        <h5 className="service-name mt-3 font-weight-bold">{bookings.servicetypename} <span className="small-text font-weight-normal">({bookings.servicetypeduration} hours)</span></h5>
                                        <span className="inline-items">
                                            <span className="date-time ml-5 float-right">
                                                <div className="links">
                                                    <a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + bookings.servicetypename + '&index=' + index + '&serviceid=' + bookings.serviceid + '&servicename=' + bookings.servicename +
                                                        '&servicetypeid=' + bookings.servicetypeid + '&srvtypename=' + bookings.servicetypename + '&inclinic=' + bookings.inclinic + '&inhouse=' + bookings.inhouse + '&isgeneric=' +
                                                        bookings.isgeneric + '&peakhours=' + bookings.peakhours + '&end_peakhours=' +
                                                        bookings.end_peakhours + '&hasarea=' + bookings.hasarea))}>Book Now</a>
                                                </div>
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
                    {this.state.cartList.map(bookings =>
                        <div className="row pb-4">
                            <div className="col-md-12">

                                <div className="media booking-bx">

                                    <img className="d-flex mr-5" src={App.ApisImageBaseUrl + bookings.servicetypeimagepath} alt="service image" style={styles} />
                                    <div className="media-body">
                                        <h5 className="service-name mt-3 font-weight-bold">{bookings.servicetypename} <span className="small-text font-weight-normal">({bookings.servicetypeduration} hours)</span></h5>
                                        <span className="inline-items">
                                            <span className="date-time ml-5">
                                                <div className="links">
                                                    <a className="pr-2" href={'/edit-customer-booking/?' + btoa(encodeURIComponent('serviceid' + bookings.serviceid + '&serviceType=' + bookings.servicetypename +
                                                        '&bookingid=' + bookings.bookingid + '&bookingdate=' + bookings.bookingdate + '&bookingtime=' + bookings.bookingtime + '&bookingNotes=' + bookings.bookingnotes))}>Edit</a>
                                                    <a href={'/booking-detail/?' + btoa(encodeURIComponent('bookingid=' + bookings.bookingid + '&bookingdate=' + bookings.bookingdate + '&bookingtime=' +
                                                        bookings.bookingtime + '&servicetype=' + bookings.servicetypename + '&bookingnotes=' + bookings.bookingnotes + '&serviceprovider=' + bookings.serviceprovidername +
                                                        '&serviceproviderid=' + bookings.serviceproviderid))}>View Details</a>
                                                </div>
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

                <p className="text-center">You have no cart bookings right now!</p>

            </div>
        );
    }
}
