import React, { Component } from 'react';
import App from '../../../App';
import { error } from 'util';

export class ProviderCompletedAppointments extends Component {
    displayName = ProviderCompletedAppointments.name

    constructor(props) {
        super(props);
        this.state = { totalCompletedPages: '', completedList: [], loading: true };

        var providerAccesstoken = "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSXhNRE1pTENKbGJXRnBiQ0k2SW5OaGNtRkFiV0ZwYkdsdVlYUnZjaTVqYjIwaUxDSnliMnhsSWpvaVEzVnpkRzl0WlhJaUxDSkpjMVpoYkdsa0lqb2lkSEoxWlNJc0ltNWlaaUk2TVRVNE16RTFNRFl6TkN3aVpYaHdJam94TmpFM056QTNNRE0wTENKcFlYUWlPakUxT0RNeE5UQTJNelFzSW1semN5STZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlMQ0poZFdRaU9pSm1hVzVrWVc1bGVIQmxjblF1Ym1WMEluMC5WMkdGQVlNS00xa3JScWIwVkRuVll2dWlsSVk0Q3NPUGhGRm43R2J3WWdn";
        //var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        var providerId = localStorage.getItem("serviceproviderid");
        var providerEmail = localStorage.getItem("email");

        const search = window.location.search;
        //var decodedString = window.atob(search.replace('?', ''));
        //const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(search);

        const completedpageNumber = params.get('page');
        console.log(completedpageNumber);

        if (completedpageNumber != null) {
            var completedPageSize = completedpageNumber;
        }
        else {
            var completedPageSize = 1;
        }
        console.log(completedPageSize);

        fetch(App.ApisBaseUrl + '/api/Provider/getcompletedappointments?serviceProviderId=' +  '&pageNumber=' + completedPageSize + '&pageSize=' + 15 + '&authToken=' + providerAccesstoken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log("datadatadatadatadatadatadatadatadatadatadata",data);
                this.setState({ totalCompletedPages: data.appointmentlist, loading: false });
                var newArray = this.state.completedList.slice();

                for (var i = 0; i < this.state.totalCompletedPages.length; i++) {

                    newArray.push(this.state.totalCompletedPages[i]);
                    this.setState({ completedList: newArray });
                }
              
            })
            .catch((error) => {
                this.state.completedList = [];
            });
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

        var pageItem = '';

        for (var i = 0; i < this.state.totalCompletedPages; i++) {

            pageItem += (<li class="page-item"><a class="page-link" href="/provider-profile">{i}</a></li>);

        }
        console.log(pageItem);

        if (this.state.totalCompletedPages == '2') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'completed'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'completed' + '&page=' + 2}>2</a></li>
            </ul>
            );
        }
        else if (this.state.totalCompletedPages == '3') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'completed'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'completed' + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'completed' + '&page=' + 3}>3</a></li>
            </ul>
            );
        }
        else if (this.state.totalCompletedPages == '4') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'completed'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'completed' + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'completed' + '&page=' + 3}>3</a></li>
                <li class="page-item"><a class="page-link" href={"/provider-profile/?" + 'booking=' + 'completed' + '&page=' + 4}>4</a></li>
            </ul>
            );
        }
        else {
            var listItems = (<div></div>);
        }

        return (

            <div id="MainPageWrapper">

                <div className="list-group">
                    {this.state.completedList.map(apts =>
                        <a href={'/provider-booking-detail/?' + btoa(encodeURIComponent('servicename=' + apts.servicetypename + '&customername=' + apts.customername + '&serviceduration=' + apts.bookingduration + '&customeraddress=' +
                            apts.bookingaddress + '&bookingnotes=' + apts.notes + '&bookingdate=' + apts.bookingdate + '&bookingtime=' + apts.bookingtime))} className="list-group-item list-group-item-action flex-column align-items-start" key={apts.bookingid}>
                            <div className="d-flex w-100 justify-content-between">
                                <div>
                                    <h5 className="mb-2"><strong>Service:</strong> {apts.servicetypename}</h5>
                                    <p className="mb-3"><strong>Customer:</strong> {apts.customername}</p>
                                </div>
                                <p className="emailShortDesc pt-2">{apts.notes}</p>
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

    noCompletedBookings() {
        return (

            <div>

                <p className="text-center pt-5">You have no completed bookings right now</p>

            </div>
        );
    }
}
