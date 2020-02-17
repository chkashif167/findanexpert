import React, { Component } from 'react';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
import App from '../../../App';

export class CustomerPaymentDetails extends Component {
    displayName = CustomerPaymentDetails.name

    constructor(props) {
        super(props);
        this.state = { allCards: [], cardsList: [], loading: true };

        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        console.log(localStorage.getItem("customercardtokenmakedefault"));

        if (localStorage.getItem("customerid") != null) {
            fetch(App.ApisBaseUrl + '/api/Payment/striperequestpaymentmethod?authToken=' + localStorage.getItem('customeraccesstoken'))
                .then(response => {
                    console.log(response);
                    localStorage.setItem('requestcardinfoStatus', response.status);
                    if (response.status == '200') {
                        return response.json();
                    }
                })
                .then(data => {
                    console.log(data);
                    
                    if (localStorage.getItem('requestcardinfoStatus') == '404') {
                        localStorage.removeItem('customercardtokenmakedefault');
                    }
                    else if (localStorage.getItem('requestcardinfoStatus') == '200') {
                        this.setState({ allCards: data.paymentmethodid, loading: false });
                        console.log(this.state.allCards.length);
                        console.log(this.state.allCards[0].id);
                        localStorage.setItem('customercardtokenmakedefault', this.state.allCards[0].id);
                    }

                    console.log(localStorage.getItem("customercardtokenmakedefault"));
                });
        }
    }

    getCardToken(e) {
        console.log(e.target.id)
        localStorage.setItem('customercardtoken', e.target.id)
        //alert(e.target.id);
    }

    handleSubmit(e) {
        e.preventDefault();
        //alert(localStorage.getItem("serviceproviderserviceid"));
        
        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customercardtoken = localStorage.getItem("customercardtoken");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                paymentmethodid: customercardtoken,
                authtoken: customerAccesstoken
            })
        };
        console.log("response" + requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Payment/striperemovepaymentmethod', requestOptions)
            .then(response => {
                console.log('then');
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                //    //this.setState({ cardRemoveMsg: response.message });
                //    //console.log(this.state.cardRemoveMsg);
                //    //alert('Card details removed!');
                   window.location = '/your-payment-details';
                }

            });
    }

    getCardToken4Default(e) {
        console.log(e.target.id)
        localStorage.setItem('customercardtokenmakedefault', e.target.id)
        alert(localStorage.getItem("customercardtokenmakedefault"));
    }

    handleMakeDefault(e) {
        e.preventDefault();
        //alert(localStorage.getItem("serviceproviderserviceid"));

        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customercardtoken = localStorage.getItem("customercardtokenmakedefault");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: customerEmail,
                authtoken: customerAccesstoken,
                cardtoken: customercardtoken,
                paymentmethodnonce: "fake-valid-nonce",
                makedefault: true
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Payment/addpaymentmethod', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    //this.setState({ cardRemoveMsg: response.message });
                    //console.log(this.state.cardRemoveMsg);
                    //alert('You just made this Card default!');
                    window.location = '/your-payment-details';
                }
            });
    }

    render() {
        if (localStorage.getItem('requestcardinfoStatus') == '200') {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.getCustomerCards(this.state.allCards);
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.noCustomerCards()
            );
        }
    }

    getCustomerCards(allCards) {
        return (

            <div id="MainPageWrapper">

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Payment Details</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">

                                    <div className="row pb-4">
                                        {allCards.map(cards =>
                                            <div className="col-md-6 mb-3">
                                                <div className="card colored-card">
                                                    <div className="card-body d-flex flex-row">
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="mr-5">
                                                                        <h5 className="card-title"><strong>Card Name:</strong> {cards.card.last4}</h5>
                                                                        <p className="card-text"><strong>Expiry Date:</strong> {cards.card.exp_month} / {cards.card.exp_year}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 text-right">
                                                                    <form className="pt-3" onSubmit={this.handleSubmit}>
                                                                        <button type="submit" className="btn bg-orange text-white" name="remove" id={cards.id}
                                                                            onClick={this.getCardToken} >Remove</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <button type="submit" className="btn bg-black text-white float-right"><a href="/payment" className="text-white">Add New Card Details</a></button>
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

    noCustomerCards() {
        localStorage.removeItem('customercardtokenmakedefault');
        console.log(localStorage.getItem("customercardtokenmakedefault"));
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

                                    <div className="row pb-4">
                                        <div className="col-md-12">
                                            <p>No card details to show.</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <button type="submit" className="btn bg-black text-white float-right">
                                                <a href="/payment" className="text-white">Add New Card Details</a>
                                            </button>
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
}