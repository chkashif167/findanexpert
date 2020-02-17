import React, { Component } from 'react';

export class NotFound extends Component {
    displayName = NotFound.name

    render() {
        return (

            <section className="account-details section-padding bg-half-white">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-12">
                                <div className="notFoundText text-center">
                                    <p>OOPS! PAGE NOT FOUND</p>
                                    <h3>404</h3>
                                    <p>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS<br /> NOT FOUND</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
