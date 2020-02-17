import React, { Component } from 'react';
import App from '../../App';

export class DisplayCustomerConsent extends Component {
    displayName = DisplayCustomerConsent.name


    constructor(props) {
        super(props);

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customerid = localStorage.getItem("customerid");
        var customeremail = localStorage.getItem("email");

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicename = params.get('servicename');
        const srvtypename = params.get('srvtypename');
        const bookingid = params.get('bookingid');
        console.log(bookingid);

        var Key = localStorage.getItem('key');
        console.log(Key);

        this.state = {
            loading: true,
            id: customerid,
            email: customeremail,
            accepted: true,
            policykey: Key,
            bookingid: bookingid,
            authtoken: customerAccesstoken,
            added: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        fetch(App.ApisBaseUrl + '/api/Policy/getconsentform?isgeneric=false&serviceTypeName=' + srvtypename + '&servicename=' + servicename + '&authToken=' + customerAccesstoken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ consentContent: data, loading: false });
                localStorage.setItem('key', this.state.consentContent.key);
                console.log(localStorage.getItem('key'));
            });
    }

    

    acceptConsent(id, email, accepted, policykey, bookingid) {

        var lastVisitedUrl = document.referrer;
        console.log(lastVisitedUrl);
        var lastVisitPage = lastVisitedUrl.slice(0, 59);
        console.log(lastVisitPage);

        var customerAccesstoken = localStorage.getItem('customeraccesstoken')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
                email: email,
                accepted: accepted,
                policykey: policykey,
                bookingid: bookingid,
                authtoken: customerAccesstoken
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Policy/addcustomerconsent', requestOptions)
            .then(response => {
                if (response.status == '409') {
                    alert("This consent is already accepted.");
                } else {
                    return response.json();
                }
            })
            .then(response => {
                if (response != null) {
                    this.setState({ response, added: true });
                    console.log(response);
                    alert("Succefully accepted!");
                    if (lastVisitPage == 'http://www.findanexpert.net/booking-detail/') {
                        window.location = '/customer-bookings';
                    }
                }

            });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, email, accepted, policykey, bookingid } = this.state;
        this.acceptConsent(id, email, accepted, policykey, bookingid );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.customerConsent(this.state.consentContent);
        return (
            <div>
                {contents}
            </div>
        );
    }

    customerConsent(consentContent) {

        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="service-decription">
                                    <h3 className="section-title pb-2"><strong>Consent Form</strong></h3>
                                    <div class="serviceDec" dangerouslySetInnerHTML={{ __html: consentContent.content }} />
                                    <hr class="my-4" />
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="text-center mb-3">
                                            <button type="submit" className="btn bg-black btn-block text-white z-depth-1a">I Accept</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
