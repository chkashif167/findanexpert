import React, { Component } from 'react';
import { BookingPage } from './Booking/BookingPage';
import App from '../App';
import { Link } from 'react-router-dom';

export class SearchServiceTypeFromFooter extends Component {
    displayName = SearchServiceTypeFromFooter.name


    constructor(props) {
        super(props);
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const serviceID = params.get('ID');
        console.log(serviceID);

        const pageNumber = params.get('page');
        console.log(pageNumber);

        if (pageNumber != null) {
            var pageSize = pageNumber;
        }
        else {
            var pageSize = 1;
        }
        console.log(pageSize);

        this.state = { totalPages: '', allServiceTypes: [], found: false };

        fetch(App.ApisBaseUrl + '/api/ServiceType/getallservicetypes?serviceid=' + serviceID + '&pagenumber=' + pageSize + '&pagesize=' + 15)
            .then(response => {
                console.log(response);
                if (response.status == '404') {
                    alert("No result match your search! Please try something else.");
                    console.log(response.json());
                }
                else if (response.status == '400') {
                    alert('No result match your search! Please try something else.');
                }
                else {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                this.setState({ totalPages: response.pages.totalpages });
                this.setState({ allServiceTypes: response.data, found: true });
            })
            .catch ((error) => {

                this.state.allServiceTypes = [];
            });
    }

    getServiceTypeID(e) {
        console.log(e.target.id);
        localStorage.setItem('searchedServiceTypeId', e.target.id);
        localStorage.setItem('searchedServiceIndex', e.target.className);
    }

    render() {

        if (this.state.allServiceTypes != '') {

            let contents = this.state.found
                ? this.renderAvailableServices(this.state.allServiceTypes)
                : <p><em>Loading......</em></p>;
            return <div>
                {contents}
            </div>;
        }
        else {

            return (
                this.noservicesFound()
            );
        }
        
    }

    renderAvailableServices(allServiceTypes) {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const keyWord = params.get('search');

        const listItems = allServiceTypes.map((srvtype, index) => (

            <div class="col-md-4 pb-4">
                <a href={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') +
                    '/'} >
                    <div class="card booking-card serviceBox">

                        <div class="serviceImage">
                            <img className={index} src={'https://admin.findanexpert.net/' + srvtype.servicetypeimagepath}
                                alt={srvtype.servicetypename} id={srvtype.servicetypeid} onClick={this.getServiceTypeID} />
                            <div className="serviceTitle">
                                <h4 className={index} id={srvtype.servicetypeid} onClick={this.getServiceTypeID}>
                                    {srvtype.servicetypename}</h4>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        ));

        return (
            <section className="section-padding" id="search-results">
                <div className="container-fluid">
                    <div className="row pb-4">

                        <div>
                            {listItems}
                        </div>

                    </div>
                </div>
            </section>
        );

    }

    noservicesFound() {
        return (
            <section className="section-padding" id="search-results">
                <div className="container-fluid">
                    <div className="row pb-4">

                        <div className="col-md-12 fullHeight">
                            <h3>No data found!</h3>
                        </div>

                    </div>
                </div>
            </section>
        );

    }

}
