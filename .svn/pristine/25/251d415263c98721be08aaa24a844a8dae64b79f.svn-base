import React, { Component } from 'react';
import App from '../../App';
import { Link } from 'react-router-dom';
import freeServiceLabel from '../../assets/img/free-service-label.png';

export class PopularServices extends Component {
    displayName = PopularServices.name

    constructor(props) {
        super(props);
        this.state = { apiResponse: '', allServices: [], loading: true };

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(App.ApisBaseUrl + '/api/ServiceType/getpromoservicetypes', requestOptions)
            .then(response => {
                this.setState({ apiResponse: response.status });
                if (response.status == '200') {
                    return response.json();
                }
            })
            .then(data => {
                if (this.state.apiResponse == 200) {
                    console.log(data);
                    this.setState({ allServices: data, loading: false });
                }
                else {
                    this.state.allServices = [];
                }
            })
    }

    getServiceTypeID(e) {
        console.log(e.target.id);
        localStorage.setItem('searchedServiceTypeId', e.target.id);
        localStorage.setItem('searchedServiceIndex', e.target.className);
    }

    render() {
        const hasFreeTreatment = localStorage.getItem("hasFreeTreatment");
        if (this.state.allServices != '') {
            if (hasFreeTreatment == true) {
                return (
                    this.whenFreeTreatmentTrue()
                );
            }
            else {
                let contents = this.state.loading
                    ? <p><em>Loading...</em></p>
                    : this.popularServices(this.state.allServices);
                return (
                    <div>
                        {contents}
                    </div>
                );
            }
        }
        else {
            return (
                this.noPopularServices()
            );
        }
    }

    popularServices(allServices) {

        let imgUrl = 'https://selteq.net/findanexperOffersBg/bannerProvideroffers.jpg';
        var bg = {
            background: 'url(' + imgUrl + ')',
            backgroundSize: 'cover',
            padding: '60px 0 150px 0'
        }

        return (
            <ul>
                {allServices.map((srvtype, index) =>
                    <li>
                        <Link to={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') +
                            '/'} >
                            <div className="contentWrapper">
                                <img className="card-img-top" src={App.ApisImageBaseUrl + srvtype.servicetypeimagepath}
                                    alt={srvtype.servicetypename} />
                                <div className="overlay">
                                    <h5>{srvtype.servicetypename}</h5>
                                </div>
                            </div>
                        </Link>
                    </li>
                )}
            </ul>
        );
    }

    whenFreeTreatmentTrue(allServices) {

        let imgUrl = 'https://selteq.net/findanexperOffersBg/bannerProvideroffers.jpg';
        var bg = {
            background: 'url(' + imgUrl + ')',
            backgroundSize: 'cover',
            padding: '60px 0 150px 0'
        }

        return (
            <ul>
                {allServices.map((srvtype, index) =>
                    <li>
                        <a href={'/services/' + encodeURI(srvtype.servicetypename).replace(/%20/g, '-') +
                            '/'} >
                            <div className="contentWrapper">
                                {(srvtype.free_treatment_offer == true) ?
                                    <img className="freeLabel" src={freeServiceLabel} alt="free Label" />
                                    : ''
                                }
                                <img className="card-img-top" src={App.ApisImageBaseUrl + srvtype.servicetypeimagepath}
                                    alt={srvtype.servicetypename} />
                                <div className="overlay">
                                    <h5>{srvtype.servicetypename}</h5>
                                </div>
                            </div>
                        </a>
                    </li>
                )}
            </ul>
        );
    }

    noPopularServices() {
        return (

            <p></p>
        );
    }
}

PopularServices.defaultProps = {
    allServices: []
}

export default PopularServices;
