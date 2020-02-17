import React, { Component } from 'react';
import App from '../../App';
import loader from '../../assets/img/loader.gif';

export class PaymentSuccessfull extends Component {
    displayName = PaymentSuccessfull.name

    constructor(props) {
        super(props);
        this.state = { allCards: [], loading: true };

        var customerEmail = localStorage.getItem("email");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        console.log(localStorage.getItem('isrebooking'));

        if (localStorage.getItem('isrebooking') == null) {
            var isreBooking = false;
        }
        else {
            var isreBooking = true;
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bookingid: localStorage.getItem('bookingid'),
                customeremail: customerEmail,
                authtoken: customerAccesstoken,
                isrebooking: isreBooking,
                serviceproviderid: localStorage.getItem('bookingProviderId')
            })
        };

        console.log(requestOptions);

        fetch(App.ApisBaseUrl + '/api/JobAllocator/saveserviceproviderinbooking', requestOptions)
            .then(response => {
                console.log(response);
                //localStorage.setItem('saveserviceproviderinbookingStatus', response.status);
                if (response.status == '200') {
                    return response.json();
                    localStorage.removeItem('isrebooking');
                }
            })
            .then(data => {
                console.log(data);
                this.setState({ allCards: data, loading: false });
            });

        //if (localStorage.getItem('IsgenericValue') == 'false') {

        //    fetch(App.ApisBaseUrl + '/api/JobAllocator/saveserviceproviderinbooking', requestOptions)
        //        .then(response => {
        //            console.log(response);
        //            //localStorage.setItem('saveserviceproviderinbookingStatus', response.status);
        //            if (response.status == '200') {
        //                return response.json();
        //                localStorage.removeItem('isrebooking');
        //            }
        //        })
        //        .then(data => {
        //            console.log(data);
        //            this.setState({ allCards: data, loading: false });
        //        });
        //}
        //else if (localStorage.getItem('IsgenericValue') == 'true') {

        //    fetch(App.ApisBaseUrl + '/api/JobAllocator/savegenericbookingserviceprovider', requestOptions)
        //        .then(response => {
        //            console.log(response);
        //            //localStorage.setItem('saveserviceproviderinbookingStatus', response.status);
        //            if (response.status == '200') {
        //                return response.json();
        //                localStorage.removeItem('isrebooking');
        //            }
        //        })
        //        .then(data => {
        //            console.log(data);
        //            this.setState({ allCards: data, loading: false });
        //        });
        //}
        
    }

    render() {
        let contents = this.state.loading
            ? <div className="bookingLoader"><img src={loader} /></div>
            : this.bookingSuccessMessage();
        return (
            <div>
                {contents}
            </div>
        );
    }

    bookingSuccessMessage() {
        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">
                            <div className="col-md-12" id="payment_page">
                                <div class="alert alert-success" role="alert">
                                    <h2>Thank You!</h2>
                                    <p>Your payment has been processed successfully and you booking is confirmed.</p>
                                    <p>Thanks in advance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
