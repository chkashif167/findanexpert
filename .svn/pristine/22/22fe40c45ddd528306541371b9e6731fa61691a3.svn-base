import React, { Component } from 'react';
import { Home } from '../Home';
import App from '../../App';
import { Link } from 'react-router-dom';
import freeServiceLabel from '../../assets/img/free-service-label.png';

export class RecommendedServices extends Component {
    displayName = RecommendedServices.name

    constructor(props) {
        super(props);
        this.state = { allServices: [], servicesList: [], loading: true };

        if (localStorage.getItem("customerid") != null) {
            var customerId = localStorage.getItem("customerid");
        } else {
            var customerId = "0";
        }

        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        console.log(customerId);

        fetch(App.ApisBaseUrl + '/api/ServiceType/getcustomerpreference?authToken=' + customerAccesstoken + '&pagenumber=1&pagesize=8')
            .then(response => {
                console.log(response);

                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                var newArray = this.state.allServices.slice();
                newArray.push(response.data);

                var newArray1 = this.state.servicesList.slice();
                for (var i = 0; i < newArray[0].length; i++) {

                    this.state.allServices.push(newArray[0][i]);
                }

                this.setState({ servicesList: this.state.allServices, loading: false });
                console.log(this.state.servicesList);
                console.log(this.state.servicesList.length);
            })

            .catch ((error) => {

                this.state.servicesList = [];
            });
    }

    getServiceTypeID(e) {
        console.log(e.target.id);
        localStorage.setItem('searchedServiceTypeId', e.target.id);
        localStorage.setItem('searchedServiceIndex', e.target.className);
    }

    render() {
        const hasFreeTreatment = localStorage.getItem("hasFreeTreatment");
        if (this.state.servicesList != '') {
            if (this.state.allServices != '') {
                if (hasFreeTreatment == true) {
                    return (
                        this.whenFreeTreatmentTrue()
                    );
                }
                else {
                    let contents = this.state.loading
                        ? <p><em>Loading...</em></p>
                        : this.recommendedServices();
                    return (
                        <div>
                            {contents}
                        </div>
                    );
                }
            }
        }
        else {
            return (
                this.noRecommendedServices()
            );
        }
    }

    recommendedServices() {

        console.log(this.state.servicesList);

        return (
            <ul>
                
                {this.state.servicesList.map((srvtype, index) =>
                    <li>
                        <div className="onlyForYou">
                            <Link to={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') + 
                                '/'} >
                                <img className="card-img-top" src={App.ApisImageBaseUrl + srvtype.servicetypeimagepath}
                                    alt={srvtype.servicetypename} />
                                <h5 className="text-center">{srvtype.servicetypename}</h5>
                            </Link>
                        </div>
                    </li>
                )}
            </ul>
        );
    }

    hasFreeTreatment() {

        return (
            <ul>

                {this.state.servicesList.map((srvtype, index) =>
                    <li>
                        <div className="onlyForYou">
                            <Link to={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') +
                                '/'} >
                                {(srvtype.free_treatment_offer == true) ?
                                    <img className="freeLabel" src={freeServiceLabel} alt="free Label" />
                                    : ''
                                }
                                <img className="card-img-top" src={App.ApisImageBaseUrl + srvtype.servicetypeimagepath}
                                    alt={srvtype.servicetypename} />
                                <h5 className="text-center">{srvtype.servicetypename}</h5>
                            </Link>
                        </div>
                    </li>
                )}
            </ul>
        );
    }

    noRecommendedServices() {
        return (
            <p></p>
        );
    }

}
