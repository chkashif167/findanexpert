import React, { Component } from 'react';
import { SidebarLinks } from '../CustomerAccount/YourAccount/SidebarLinks';
import watchlistIMG from '../../assets/img/watchlist_img.png';
import App from '../../App';

export class Watchlist extends Component {
    displayName = Watchlist.name

    constructor(props) {
        super(props);

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

        this.state = { totalPages: '', watchList: [], loading: true, removed: false };

        fetch(App.ApisBaseUrl + '/api/ServiceType/getwatchlist?customerId=' + localStorage.getItem("customerid") + '&pageNumber=' + pageSize + '&pageSize=' + 15 + '&authToken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                console.log(response);
                this.setState({ watchListStatusCode: response.status });
                console.log(this.state.watchListStatusCode);
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (this.state.watchListStatusCode == '200') {
                    this.setState({ totalPages: data.pages.totalpages });
                    this.setState({ watchList: data.watchlist, loading: false });
                    console.log(this.state.watchList);
                }
            });
    }

    showWatchlistID(e) {
        console.log(e.target.id)
        localStorage.setItem('customerwatchlistid', e.target.id)
        console.log(e.target.name)
        localStorage.setItem('watchlistserviceid', e.target.id)
        console.log(e.target.value)
        localStorage.setItem('watchlistservicetypeid', e.target.id)
    }

    handleSubmit(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                watchlistid: localStorage.getItem('customerwatchlistid'),
                customerid: localStorage.getItem("customerid"),
                serviceid: localStorage.getItem('watchlistserviceid'),
                servicetypeid: localStorage.getItem('watchlistservicetypeid'),
                iswatchlist: false,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/ServiceType/addtowatchlist', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    //this.setState({ removeWatchList: response, removed: true });
                    window.location = '/watchlist';
                }
            });
    }

    render() {
        if (this.state.watchListStatusCode != '200') {
            return (
                this.emptyWatchList()
            );
        }
        else {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.WatchList(this.state.watchList);
            return (
                <div>
                    {contents}
                </div>
            );
        }
    }

    WatchList(watchList) {
        var styles = {
            height: '85px',
        };

        if (this.state.totalPages == '2') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 1}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
            </ul>
            );
        }
        else if (this.state.totalPages == '3') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 3}>3</a></li>
            </ul>
            );
        }
        else if (this.state.totalPages == '4') {
            var listItems = (<ul class="pagination">
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending'}>1</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 2}>2</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 3}>3</a></li>
                <li class="page-item"><a class="page-link" href={"/customer-bookings/?" + 'booking=' + 'pending' + '&page=' + 4}>4</a></li>
            </ul>
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
                            <li class="breadcrumb-item right-side"><h4><strong>Watchlist</strong></h4></li>
                        </ol>
                    </nav>
              </section>

              <section className="account-details">
                  <div className="services-wrapper">
                      <div className="container-fluid">
                          <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">
                                    {watchList.map((wtchlst, index) =>

                                      <div className="row pb-4">

                                          <div className="col-md-12">
                                              <div className="media watchlist-bx">
                                                  <a href="#">
                                                      <img className="d-flex pr-4" src={App.ApisImageBaseUrl + wtchlst.servicetypeimagepath} alt="Service image" />
                                                      <div class="overlay">
                                                          <h4 class="overlay-text text-white"><strong>{wtchlst.servicename}</strong></h4>
                                                      </div>
                                                  </a>
                                                  <div className="media-body pl-4">
                                                        <h4 className="mt-0 font-weight-bold">{wtchlst.servicetypename}</h4>
                                                        <p className="text-item pb-2">Duration: <span className="float-right">{wtchlst.servicetypeduration} hours</span></p>
                                                        <p className="text-item pb-2">Price: <span className="float-right">{wtchlst.priceoffpeakhours}</span></p>
                                                        <p className="pb-5"><span className="bg-red p-2 pl-3 pr-3 text-white">{wtchlst.offerdiscount}% OFF</span> <span className="float-right">{wtchlst.offermessage}</span></p>
                                                        <div className="mt-5">
                                                            <form onSubmit={this.handleSubmit}>
                                                                <button type="submit" className="btn text-red p-0" name={wtchlst.serviceid} value={wtchlst.servicetypeid} id={wtchlst.watchlistid}
                                                                    onClick={this.showWatchlistID}  >Delete Item</button>

                                                                <a className="btn bg-orange text-white float-right"
                                                                    href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + wtchlst.servicetypename +
                                                                    '&index=' + index + '&serviceid=' + wtchlst.serviceid + '&servicename=' +
                                                                    wtchlst.servicename + '&servicetypeid=' + wtchlst.servicetypeid + '&srvtypename=' +
                                                                    wtchlst.servicetypename + '&inclinic=' + wtchlst.inclinic + '&inhouse=' +
                                                                        wtchlst.inhouse + '&isgeneric=' + wtchlst.isgeneric + '&peakhours='
                                                                        + wtchlst.peakhours + '&endpeakhours=' + wtchlst.end_peakhours + '&offerdiscount='
                                                                        + wtchlst.offerdiscount + '&hasarea=' + wtchlst.hasarea))}>Book Now</a>
                                                            </form>
                                                        </div>
                                                  </div>
                                              </div>
                                          </div>

                                      </div>
                                    )}
                                </div>

                          </div>

                          <div className="row pb-4">
                            <div className="col-md-12">
                                <nav aria-label="Page navigation" className="text-center">
                                    {listItems}
                                </nav>
                            </div>
                          </div>
                      </div>
                  </div>
              </section>

          </div>
        );
    }

    emptyWatchList(watchList) {
        var styles = {
            height: '85px',
        };
        return (

            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Watchlist</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">
                                    <p>Your watchlist is empty!</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
