import React, { Component } from 'react';
import App from '../../App';
import playStore from '../../assets/img/googleStore.png';
import appleStore from '../../assets/img/appleStore.png';
import topBg from '../../assets/img/serviceDetailBg.png';
import { Link } from 'react-router-dom';
import toastr from 'toastr';

export class ServiceSingle extends Component {
    displayName = ServiceSingle.name


    constructor(props) {
        super(props);

        if (localStorage.getItem("customerid") != null) {
            var customerid = localStorage.getItem("customerid");
            var customerEmail = localStorage.getItem("email");
        }
        else {
            var customerid = 0;
            var customerEmail = '';
        }

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const ServicetypeId = params.get('ID');

        //console.log(localStorage.getItem('searchedServiceIndex'));
        //const ServicetypeId = localStorage.getItem('searchedServiceTypeId');

        var currentServicePageUrl = window.location;
        console.log(currentServicePageUrl);
        var pathname = new URL(currentServicePageUrl).pathname;

        console.log(pathname);

        var urlArray = [];
        var urlArray = pathname.split('/');
        //console.log(urlArray);
        var first = urlArray[0];
        var serviceName = urlArray[2];
        var serviceTypeName = serviceName.replace(/-/g, ' ');
        serviceTypeName = serviceTypeName.replace(/&/g, '%26');
        console.log(serviceTypeName);
        // the api is changed. Now you need to send this variable with -
        // Okay ??
        //var serviceTypeName = second.replace(/-/g, ' ');
        //console.log(serviceTypeName)

        this.state = {
            serviceDetails: [],
            watchlistid: '0',
            customerid: customerid,
            //serviceid: ServiceId,
            servicetypeid: ServicetypeId,
            iswatchlist: true,
            added: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        fetch(App.ApisBaseUrl + '/api/ServiceType/getservicetypedetail?servicetypename=' + serviceTypeName)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                const tempArr = this.state.serviceDetails;
                tempArr.push(response);
                this.setState({ serviceDetails: tempArr });

            });

        if (localStorage.getItem("customerid") != null) {
            console.log(window.location.href);
            //var currentPageUrl = document.referrer;
            var currentPageUrl = window.location.href;
            var urlArray = [];
            var urlArray = currentPageUrl.split("/");
            var serviceTypeNameFromUrl = urlArray[4];
            var getServiceTypeName = serviceTypeNameFromUrl.replace(/-/g, ' ');

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerid: customerid,
                    customeremail: customerEmail,
                    servicetypename: getServiceTypeName,
                    authtoken: localStorage.getItem('customeraccesstoken')
                })
            };

            fetch(App.ApisBaseUrl + '/api/ServiceType/savecustomerpreference', requestOptions)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    //console.log(response);
                    //this.setState({ allServices: response, found: true });
                });
        }
    }

    getServiceID(e) {
        localStorage.setItem('serviceID', e.target.id);
    }

    addWatchlist(watchlistid, customerid, servicetypeid, iswatchlist) {

        if (localStorage.getItem("customerid") != null) {
            var customerId = localStorage.getItem("customerid");
        }
        else {
            var customerId = 0;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                watchlistid: watchlistid,
                customerid: customerId,
                serviceid: localStorage.getItem('serviceID'),
                servicetypeid: localStorage.getItem('searchedServiceTypeId'),
                iswatchlist: iswatchlist,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/ServiceType/addtowatchlist', requestOptions)
            .then(response => {
                console.log(response);
                if (response.status == '409') {
                    //alert("This service is already added to your watchlist.");
                    toastr["error"]("This service is already added to your watchlist.");
                }
                if (response.status == '400') {
                    //alert("Please login to add this service to your watchlist.");
                    toastr["error"]("Please login to add this service to your watchlist.");
                }
                else if (response.status == '200') {
                    toastr["success"]("Added Watch List!");
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ addWatchList: response, added: true });
                    //alert("Succefully added to watchlist!");
                }

            });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { watchlistid, customerid, servicetypeid, iswatchlist } = this.state;
        this.addWatchlist(watchlistid, customerid, servicetypeid, iswatchlist);
    }

    render() {

        //console.log(this.state.serviceDetails);
        //var NewArray;
        //for (var i = 0; i <= 0; i++) {

            //NewArray.push(this.state.serviceDetails[0].servicetypename);
            //const tempArr = this.state.serviceDetails;
            //tempArr.push(response);
            //this.setState({ serviceDetails: tempArr });
            //console.log("Service Details:");
            //console.log(this.state.serviceDetails[0].servicetypename);
        //}

        var metaTitle = this.state.serviceDetails.map(obj => obj.metatitle);
        var metaDescription = this.state.serviceDetails.map(obj => obj.metadescription);
        var twitterCard = '<meta name="twitter:card" content="summary" /><meta name="twitter:site" content="@findanexpert" /><meta name="twitter:title" content="Small Island Developing States Photo Submission" /><meta name="twitter:description" content="View the album on Flickr." /><meta name="twitter:image" content="https://farm6.staticflickr.com/5510/14338202952_93595258ff_z.jpg" />';
        document.getElementsByTagName("META")[2].content = metaDescription[0];
        document.getElementsByTagName("TITLE")[0].text = metaTitle;
        
        document.getElementsByTagName("head")[0].append(twitterCard);
        var serviceIndex = localStorage.getItem('searchedServiceIndex');

        if (localStorage.getItem("customerid") != null) {
            var serviceContent = (
                <div>
                    {this.state.serviceDetails.map((obj, index) =>
                        <div>
                            <section className="serviceDetail section-padding serviceDetailTpWrap" >
                                <div className="overlay"></div>
                                <div className="services-wrapper">
                                    <div className="container">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <div className="serviceTitle yes-mobile">
                                                    <h1 className="section-title m-0 m-0"><strong>{obj.servicetypename}</strong></h1>
                                                    <p><span class="price pr-3">From </span>£<span class="pl-1">{obj.lowestprice}</span></p>
                                                </div>
                                                <a href={App.ApisBaseUrl + obj.imagepath}>
                                                    <img className="img-fluid rounded" src={'https://admin.findanexpert.net/' + obj.imagepath} alt={obj.servicetypename}></img>
                                                </a>
                                            </div>

                                            <div className="col-md-6 pr-0">
                                                <div className="serviceDetailTpRight">
                                                    <div className="no-mobile">
                                                        <div className="serviceTitle">
                                                            <h1 className="section-title m-0"><strong>{obj.servicetypename}</strong></h1>
                                                            <p><span class="price pr-3">From </span>£<span class="pl-1">{obj.lowestprice}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="buttonWrap">
                                                        <div className="bookNow">
                                                            <Link to={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + obj.servicetypename + '&index=' +
                                                                serviceIndex + '&serviceid=' + obj.serviceid + '&servicename=' + obj.servicename +
                                                                '&servicetypeid=' + obj.servicetypeid + '&srvtypename=' + obj.servicetypename +
                                                                '&inclinic=' + obj.inclinic + '&inhouse=' + obj.inhouse + '&isgeneric=' + obj.isgeneric
                                                                + '&switchonpeakhours=' + obj.switchonpeakhours + '&peakhours=' + obj.peakhours +
                                                                '&end_peakhours=' + obj.end_peakhours + '&hasarea=' + obj.hasarea
                                                                + '&free_treatment_offer=' + obj.free_treatment_offer))}
                                                                class="btn bg-orange text-white services-card-footer-btn">Book Now</Link>
                                                        </div>
                                                        <form onSubmit={this.handleSubmit} className="no-mobile">
                                                            <div className="text-center ">
                                                                <button type="submit" className="btn bg-transparent text-white pr-0" id={obj.serviceid}
                                                                    onClick={this.getServiceID}>
                                                                    <i class="fas fa-heart"></i> Add to watchlist
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="btmImages no-mobile">
                                                        <img src={playStore} alt="" />
                                                        <img src={appleStore} alt="" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="serviceDetail section-padding p-0">
                                <div className="services-wrapper">
                                    <div className="container">
                                        <div className="row pb-4">

                                            <div className="col-md-12">
                                                <div className="service-decription">
                                                    <div dangerouslySetInnerHTML={{ __html: obj.description }} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="serviceDetail section-padding ">
                                <div className="overlay"></div>
                                <div className="services-wrapper serviceSingleBottom bg-black pt-5 pb-5">
                                    <div className="container">
                                        <div className="row">

                                            <div className="col-md-12">
                                                <div className="bookNowBottom text-center">
                                                    <Link to={'/booking/?' + btoa(encodeURIComponent('searchedservice=' + obj.servicetypename + '&index=' +
                                                        serviceIndex + '&serviceid=' + obj.serviceid + '&servicename=' + obj.servicename +
                                                        '&servicetypeid=' + obj.servicetypeid + '&srvtypename=' + obj.servicetypename +
                                                        '&inclinic=' + obj.inclinic +
                                                        '&inhouse=' + obj.inhouse + '&isgeneric=' + obj.isgeneric + '&peakhours=' + obj.peakHours +
                                                        '&end_peakhours=' + obj.endpeakhours + '&hasarea=' + obj.hasarea
                                                        + '&free_treatment_offer=' + obj.free_treatment_offer))}
                                                        class="btn bg-orange text-white services-card-footer-btn">Book Now</Link>
                                                    <div className="yes-mobile text-white">
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className="text-center ">
                                                                <button type="submit" className="btn bg-transparent text-white pr-0">
                                                                    <i class="fas fa-heart"></i> Add to watchlist
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    <section class="pb-4">
                        <div class="services-wrapper">
                            <div class="container-fluid">
                                <div class="row">

                                    <div class="col-md-2 info-col pr-0 noMobile">
                                        <div class="info-box section-bg-light" id="col_1">
                                            <a href="#">
                                                <img class="" src="/static/media/info_1.850da65e.png" alt="" width="auto" />
                                            </a>
                                        </div>
                                    </div>

                                    <div class="col-md-6 info-col noMobile">
                                        <div class="info-box section-bg-light" id="col_2">
                                            <p class="lead text">Want all the <strong>Services </strong>
                                                at your fingertips ? <strong>Download</strong> the Expert app <strong>Now</strong>
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-md-4 info-col pl-0">
                                        <div class="info-box section-bg-light" id="col_3">
                                            <a href="">
                                                <img class="appleImage" src="/static/media/appleStore.ca3e2863.png" alt="" width="100%" />
                                            </a>
                                            <a href="">
                                                <img class="gooleImage" src="/static/media/googleStore.2ee612c2.png" alt="" width="100%" />
                                            </a>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            );
        }
        else {
            var serviceContent = (
                <div>
                    {this.state.serviceDetails.map((obj, index) =>
                        <div>
                            <section className="serviceDetail section-padding serviceDetailTpWrap" >
                                <div className="overlay"></div>
                                <div className="services-wrapper">
                                    <div className="container">
                                        <div className="row">

                                            <div className="col-md-6">
                                                <div className="serviceTitle yes-mobile">
                                                    <h1 className="section-title m-0 m-0"><strong>{obj.servicetypename}</strong></h1>
                                                    <p><span class="price pr-3">From </span>£<span class="pl-1">{obj.lowestprice}</span></p>
                                                </div>
                                                <a href={App.ApisBaseUrl + obj.imagepath}>
                                                    <img className="img-fluid rounded" src={'https://admin.findanexpert.net/' + obj.imagepath} alt={obj.servicetypename}></img>
                                                </a>
                                            </div>

                                            <div className="col-md-6 pr-0">
                                                <div className="serviceDetailTpRight">
                                                    <div className="no-mobile">
                                                        <div className="serviceTitle">
                                                            <h1 className="section-title m-0"><strong>{obj.servicetypename}</strong></h1>
                                                            <p><span class="price pr-3">From </span>£<span class="pl-1">{obj.lowestprice}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="buttonWrap">
                                                        <div className="bookNow">
                                                            <a href={'/customer-authentication/?' + btoa(encodeURIComponent('searchedservice=' + obj.servicetypename + '&index=' +
                                                                serviceIndex + '&serviceid=' + obj.serviceid + '&servicename=' + obj.servicename +
                                                                '&servicetypeid=' + obj.servicetypeid + '&srvtypename=' + obj.servicetypename +
                                                                '&inclinic=' + obj.inclinic + '&inhouse=' + obj.inhouse + '&isgeneric=' + obj.isgeneric
                                                                + '&switchonpeakhours=' + obj.switchonpeakhours + '&peakhours=' + obj.peakhours +
                                                                '&end_peakhours=' + obj.end_peakhours + '&hasarea=' + obj.hasarea
                                                                + '&free_treatment_offer=' + obj.free_treatment_offer))}
                                                                class="btn bg-orange text-white services-card-footer-btn">Book Now</a>
                                                        </div>
                                                        <form onSubmit={this.handleSubmit} className="no-mobile">
                                                            <div className="text-center ">
                                                                <button type="submit" className="btn bg-transparent text-white pr-0">
                                                                    <i class="fas fa-heart"></i> Add to watchlist
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="btmImages no-mobile">
                                                        <img src={playStore} alt="" />
                                                        <img src={appleStore} alt="" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="serviceDetail section-padding p-0">
                                <div className="services-wrapper">
                                    <div className="container">
                                        <div className="row pb-4">

                                            <div className="col-md-12">
                                                <div className="service-decription">
                                                    <div dangerouslySetInnerHTML={{ __html: obj.description }} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="serviceDetail section-padding ">
                                <div className="overlay"></div>
                                <div className="services-wrapper serviceSingleBottom bg-black pt-5 pb-5">
                                    <div className="container">
                                        <div className="row">

                                            <div className="col-md-12">
                                                <div className="bookNowBottom text-center">
                                                    <Link to={'/customer-authentication'}
                                                        class="btn bg-orange text-white services-card-footer-btn">Book Now</Link>
                                                    <div className="yes-mobile">
                                                        <form onSubmit={this.handleSubmit}>
                                                            <div className="text-center ">
                                                                <button type="submit" className="btn bg-transparent text-white">
                                                                    <i class="fas fa-heart"></i> Add to watchlist
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    <section class="pb-4">
                        <div class="services-wrapper">
                            <div class="container-fluid">
                                <div class="row">

                                    <div class="col-md-2 info-col pr-0 noMobile">
                                        <div class="info-box section-bg-light" id="col_1">
                                            <a href="#">
                                                <img class="" src="/static/media/info_1.850da65e.png" alt="" width="auto" />
                                            </a>
                                        </div>
                                    </div>

                                    <div class="col-md-6 info-col noMobile">
                                        <div class="info-box section-bg-light" id="col_2">
                                            <p class="lead text">Want all the <strong>Service</strong>
                                                at your fingertips ? <strong>Download</strong> the Expert app <strong>Now</strong>
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-md-4 info-col pl-0">
                                        <div class="info-box section-bg-light no-mobile" id="col_3">
                                            <div className="content">
                                                <a href="">
                                                    <img className="appleImage" src={appleStore} alt="" width="100%" />
                                                </a>
                                                <a href="">
                                                    <img className="gooleImage" src={playStore} alt="" width="100%" />
                                                </a>
                                            </div>
                                        </div>
                                        <div class="info-box serviceSingle section-bg-light yes-mobile" id="col_3">
                                            <h3>Download the expert app now</h3>
                                            <div>
                                                <a href="">
                                                    <img className="appleImage" src={appleStore} alt="" width="100%" />
                                                </a>
                                                <a href="">
                                                    <img className="gooleImage" src={playStore} alt="" width="100%" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            );
        }

        return (

            <div>
                {serviceContent}
            </div>
        );
    }
}

export default ServiceSingle;
