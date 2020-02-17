import React, { Component } from 'react';
import { ProviderSidebarLinks } from '../Profile/SidebarLinks';
import App from '../../../App';

export class ProviderPendingAppointments extends Component {
    displayName = ProviderPendingAppointments.name

    constructor(props) {
        super(props);
        this.state = { totalPendingPages: '', pendingList: [], loading: true };

        var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        var providerId = localStorage.getItem("serviceproviderid");
        var providerEmail = localStorage.getItem("email");

        const search = window.location.search;
        //var decodedString = window.atob(search.replace('?', ''));
        //const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(search);

        const pendingpageNumber = params.get('page');
        console.log(pendingpageNumber);

        if (pendingpageNumber != null) {
            var pendingPageSize = pendingpageNumber;
        }
        else {
            var pendingPageSize = 1;
        }
        console.log(pendingPageSize);

        fetch(App.ApisBaseUrl + '/api/ServiceProvider/getpendingappointments?serviceProviderId=' + providerId + '&email=' + providerEmail + '&pageNumber=' + pendingPageSize + '&pageSize=' + 15 + '&authToken=' + providerAccesstoken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ totalPendingPages: data.pages.totalpages });
                this.setState({ pendingList: data.lstAppointments, loading: false });
                console.log(this.state.pendingList);
            })
            .catch((error) => {
                this.state.pendingList= [];
            });
    }

    render() {
        if (this.state.pendingList != '') {
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

        var pageItem = '';
        console.log("Page Size Cheeji bhootni key:");
        console.log(this.state.totalPendingPages);
        for (var i = 0; i < this.state.totalPendingPages; i++) {

            pageItem += (<li class="page-item"><a class="page-link" href="/provider-profile">{i}</a></li>);

        }
        console.log(pageItem);

        if (this.state.totalPendingPages == '2') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
            </ul>
            );
        }
        else if (this.state.totalPendingPages == '3') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'pending' + '&page=' + 3}>3</a></li>
            </ul>
            );
        }
        else if (this.state.totalPendingPages == '4') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'pending' + '&page=' + 3}>3</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'pending' + '&page=' + 4}>4</a></li>
            </ul>
            );
        }
        else {
            var listItems = (<div></div>);
        }

        return (

            <div id="MainPageWrapper">

                <div className="list-group providerPendingList">
                    {this.state.pendingList.map(apts =>
                        <a href={'/provider-booking-detail/?' + btoa(encodeURIComponent('servicename=' + apts.servicetype + '&customername=' + apts.firstname + ' ' + apts.surname + '&serviceduration=' + apts.servicetypeduration + '&customeraddress=' +
                            apts.customeraddress + '&bookingnotes=' + apts.bookingnotes + '&bookingdate=' + apts.bookingdate + '&bookingtime=' + apts.bookingtime))} className="list-group-item list-group-item-action flex-column align-items-start" key={apts.bookingid}>
                            <div className="d-flex w-100 justify-content-between">
                                <div>
                                    <h5 className="mb-2"><strong>Service:</strong> {apts.servicetype}</h5>
                                    <p className="mb-3"><strong>Customer:</strong> {apts.firstname} {apts.surname}</p>
                                    <p className="small">
                                        <a href={'/chat/?' + btoa(encodeURIComponent('customerid=' + apts.customerid +
                                            '&bookingid=' + apts.bookingid))}>Chat with customer</a>
                                    </p>
                                </div>
                                <p className="emailShortDesc pt-2">{apts.bookingnotes}</p>
                                <span>
                                    <p className="m-0">{apts.bookingdate.split('', 10)}</p>
                                    <p>{apts.bookingtime.split('', 8)}</p>
                                </span>
                            </div>
                        </a>
                    )}
                </div>

                <div className="row pb-4">
                    <div className="col-md-12">
                        <nav aria-label="Page navigation" className="text-center">
                            {listItems}
                        </nav>
                    </div>
                </div>
                
            </div>
        );
    }

    noPendingBookings() {
        return (

            <div>
                <p className="text-center pt-5">You have no pending bookings right now</p>
            </div>
        );
    }
}
