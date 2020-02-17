import React, { Component } from 'react';
import { BookingPage } from './Booking/BookingPage';
import App from '../App';
import { Link } from 'react-router-dom';
import freeServiceLabel from '../assets/img/free-service-label.png';

export class SearchService extends Component {
    displayName = SearchService.name
    

    constructor(props) {
        super(props);
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const keyWord = params.get('search');

        console.log(keyWord);

        this.state = { search: keyWord, allServices: [], serviceDurations: [], found: false };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                SearchService: keyWord
            })
        };
        console.log(requestOptions);

        fetch(App.ApisBaseUrl + '/api/ServiceType/findservicetype?searchService=' + keyWord, requestOptions)
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
                console.log('Chejji Sabbb');
                console.log(response);
                this.setState({ allServices: response, found: true });
                console.log(this.state.allServices);
                
                //this.setState({ serviceDurations: this.state.allServices.duration });

                //this.setState({ serviceDurations: response.duration});
                //var newArray = this.state.serviceDurations.slice();
                //for (var i = 0; i < this.state.allServices.length; i++) {

                    //newArray.push(this.state.allServices[i].duration);
                    //this.setState({ serviceDurations: newArray });
                    //console.log(this.state.serviceDurations[i]);
                    //this.setState({ durationList: this.state.serviceDurations[i] });
                    
         
                //}
                //console.log(newArray);
                //this.setState({ serviceDurations: newArray });
                //console.log(this.state.serviceDurations);
                //console.log(this.state.serviceDurations);
                //console.log(this.state.durationList);
            });
    }

    //FindService(search) {

        
    //    //localStorage.setItem("available_services", this.state.allServices);
    //}

    getServiceTypeID(e) {
        console.log(e.target.id);
        localStorage.setItem('searchedServiceTypeId', e.target.id);
        localStorage.setItem('searchedServiceIndex', e.target.className);
    }

    render() {
        const hasFreeTreatment = localStorage.getItem("hasFreeTreatment");
        console.log(hasFreeTreatment);

        if (this.state.allServices != '') {
            if (localStorage.getItem('customerid') != null) {
                if (hasFreeTreatment == true) {
                    return (
                        this.whenFreeTreatmentTrue()
                    );
                }
                else {
                    let contents = this.state.found
                        ? this.renderAvailableServices(this.state.allServices)
                        : <p><em>Loading......</em></p>;
                    return <div>
                        {contents}
                    </div>;
                }
            }
            else {
                let contents = this.state.found
                    ? this.renderAvailableServices(this.state.allServices)
                    : <p><em>Loading......</em></p>;
                return <div>
                    {contents}
                </div>;
            }    
        }
        else {
            let contents = this.state.found
                ? this.ServicesWithNotLogin(this.state.allServices)
                : <p>Loading....</p>;
            return <div>
                {contents}
            </div>;
        }
    }

    renderAvailableServices(allServices) {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const keyWord = params.get('search');

        console.log("free treatement is false");

        const listItems = allServices.map((srvtype, index) => (
                
                <li class="searchItem">
                    <a href={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') + 
                        '/'} >
                        <div class="card booking-card serviceBox">

                            <div class="serviceImage">
                                <img className={index} src={'https://admin.findanexpert.net/' + srvtype.servicetypeimagepath} alt={srvtype.servicetypename}
                                    id={srvtype.servicetypeid} onClick={this.getServiceTypeID} />
                                <div className="serviceTitle">
                                <h4 className={index} id={srvtype.servicetypeid} onClick={this.getServiceTypeID}>
                                    {srvtype.servicetypename}</h4>
                                </div>
                            </div>

                        </div>
                    </a>
                </li>
            ));

        return (
            <section className="section-padding" id="search-results">
                <div className="container-fluid">
                    <div className="row pb-4">

                        <ul>
                            {listItems}
                        </ul>

                    </div>
                </div>
            </section>
        );
        
    }

    whenFreeTreatmentTrue(allServices) {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const keyWord = params.get('search');

        const listItems = allServices.map((srvtype, index) => (

            <div class="col-md-4 pb-4">
                <a href={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') +
                    '/'} >
                    <div class="card booking-card serviceBox">

                        <div class="serviceImage">
                            {(srvtype.free_treatment_offer == true) ?
                                <img className="freeLabel" src={freeServiceLabel} alt="free Label" />
                                : ''
                            }
                            <img className={index} src={'https://admin.findanexpert.net/' + srvtype.servicetypeimagepath} alt={srvtype.servicetypename}
                                id={srvtype.servicetypeid} onClick={this.getServiceTypeID} />
                            <div className="serviceTitle">
                                <h4 className={index} id={srvtype.servicetypeid} onClick={this.getServiceTypeID}>
                                    {srvtype.servicetypename}</h4>
                            </div>
                        </div>

                        <div class="d-none rounded-bottom mdb-color lighten-3 text-center pt-3">
                            <a href={'/service-single/?' + btoa(encodeURIComponent('index=' + index + '&serviceid=' + srvtype.serviceid +
                                '&servicename=' + srvtype.servicename + '&servicetypeid=' +
                                srvtype.servicetypeid + '&srvtypeimg=' + srvtype.servicetypeimagepath + '&srvtypename=' +
                                srvtype.servicetypename + '&inclinic=' + srvtype.inclinic + '&inhouse=' + srvtype.inhouse +
                                '&isgeneric=' + srvtype.isgeneric))}
                                class="btn bg-dark text-white services-card-footer-btn" >Get Details</a>
                            <a href={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + keyWord + '&index=' + index + '&serviceid=' + srvtype.serviceid + '&servicename=' + srvtype.servicename +
                                '&servicetypeid=' + srvtype.servicetypeid + '&srvtypename=' + srvtype.servicetypename + '&isgenericservice=' + srvtype.isgenericservice +
                                '&inclinic=' + srvtype.inclinic + '&inhouse=' + srvtype.inhouse + '&isgeneric=' + srvtype.isgeneric + '&peakhours='
                                + srvtype.peakhours + '&end_peakhours=' + srvtype.end_peakhours))}
                                class="btn bg-orange text-white services-card-footer-btn">Book Now</a>
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

    ServicesWithNotLogin(allServices) {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const keyWord = params.get('search');

        const hasFreeTreatment = localStorage.getItem("hasFreeTreatment");

        return (
            <section className="section-padding" id="search-results">
                <div className="container-fluid">
                    <div className="row pb-4">

                        {allServices.map((srvtype, index) =>
                            <div class="col-md-4 pb-4">
                                <a href={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') + 
                                    '/'} >
                                    <div class="card serviceBox">

                                        <div class="serviceImage">
                                            {(hasFreeTreatment == true && srvtype.free_treatment_offer == true) ?
                                                <img className="freeLabel" src={freeServiceLabel} alt="free Label" />
                                                : ''
                                            }
                                            <img class="card-img-top service-img" src={'https://admin.findanexpert.net/' + srvtype.servicetypeimagepath} alt={srvtype.servicetypename}
                                                id={srvtype.servicetypeid} onClick={this.getServiceTypeID}/>
                                            <div className="serviceTitle">
                                                <h4 class="text-white font-weight-bold m-0" id={srvtype.servicetypeid}
                                                    class={srvtype.index} onClick={this.getServiceTypeID}>
                                                    {srvtype.servicetypename}</h4>
                                            </div>
                                        </div>

                                        <div class="d-none rounded-bottom mdb-color lighten-3 text-center pt-3">
                                            <a href={'/service-single/?' + btoa(encodeURIComponent('index=' + index + '&serviceid=' + srvtype.serviceid +
                                                '&servicename=' + srvtype.servicename + '&servicetypeid=' +
                                                srvtype.servicetypeid + '&srvtypeimg=' + srvtype.servicetypeimagepath + '&srvtypename=' +
                                                srvtype.servicetypename + '&inclinic=' + srvtype.inclinic + '&inhouse=' + srvtype.inhouse +
                                                '&isgeneric=' + srvtype.isgeneric))}
                                                class="btn bg-dark text-white services-card-footer-btn">Get Details</a>
                                            <a href={'/customer-authentication/?' + btoa(encodeURIComponent('searchedservice=' + keyWord + '&index=' + index + '&serviceid=' +
                                                srvtype.serviceid + '&servicename=' + srvtype.servicename +
                                                '&servicetypeid=' + srvtype.servicetypeid + '&srvtypename=' + srvtype.servicetypename + '&isgenericservice=' + srvtype.isgenericservice +
                                                '&inclinic=' + srvtype.inclinic + '&inhouse=' + srvtype.inhouse + '&isgeneric=' + srvtype.isgeneric + '&peakhours='
                                                + srvtype.peakhours + '&end_peakhours=' + srvtype.end_peakhours))}
                                                class="btn bg-orange text-white services-card-footer-btn">Book Now</a>
                                        </div>

                                    </div>
                                </a>
                            </div>
                        )}

                    </div>
                </div>
            </section>
        );
    }

}
