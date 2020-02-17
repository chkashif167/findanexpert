import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../../components/Payment/CheckoutForm';

class CheckOutPayment extends Component {
    displayName = CheckOutPayment.name

    render() {
        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">
                            <div className="col-md-12">

                                <StripeProvider apiKey="pk_test_lhIaSp0229prDqabMlBYAUMP00xtcyWIY2">
                                    <div className="example">
                                        <h1>React Stripe Elements Example</h1>
                                        <Elements>
                                            <CheckoutForm />
                                        </Elements>
                                    </div>
                                </StripeProvider>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        );
    }
}

export default CheckOutPayment;