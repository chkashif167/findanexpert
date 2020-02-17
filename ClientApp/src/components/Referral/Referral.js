import React, { Component } from 'react';
import App from '../../App';
import toastr from 'toastr';

export class Referral extends Component {
    displayName = Referral.name

    constructor() {
        super();

        this.state = {
            referrar_email: '',
            referree_email: '',
            send: false,
        };

        this.handleChangeReferreeEmail = this.handleChangeReferreeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getInitialState = () => {
        const initialState = {
        };
        return initialState;
    }

    resetState = () => {
        this.setState(this.getInitialState());
    }


    sendReferrel(referrar_email, referree_email) {
        var referrar_email = localStorage.getItem("email");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                referrar_email: referrar_email,
                referree_email: referree_email,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Referral/sendreferralcode', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                toastr["success"](response.referral_message);
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-bottom-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                if (response != null) {
                    this.setState({ referralSent: response, send: true });

                }

            });
    }

    handleChangeReferreeEmail(e) {
        this.setState({ referree_email: e.target.value });

    }

    handleSubmit(e) {
        e.preventDefault();
        const { referrar_email, referree_email } = this.state;
        this.sendReferrel(referrar_email, referree_email);
    }

    render() {


        let contents = this.state.send
            ? this.ReferrelSent(this.state.referralSent)
            : this.Referrel();
        return <div>
            {contents}
        </div>;
    }

    Referrel() {
        return (

          <section id="referral" className="account-details section-padding">
              <div className="services-wrapper">
                  <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-6 offset-md-3">

                                <div className="row card p-5">

                                    <div className="col-md-12">
                                        <h1 className="section-title pb-5"><strong>Refer Friends. <span className="text-red">Get Rewards!</span></strong></h1>
                                    </div>

                                    <div className="col-md-12">

                                        <form onSubmit={this.handleSubmit}>

                                            <div className="form-group">
                                                {/*<label for="exampleForm2">Add email address</label>*/}
                                                <input type="text" id="exampleForm2" className="form-control" placeholder="Email Address" value={this.state.referree_email}
                                                    onChange={this.handleChangeReferreeEmail} required />
                                            </div>

                                            <button type="submit" className="btn bg-orange btn-block text-white btn-lg">Invite Friends</button>
                                        </form>

                                    </div>

                                </div>

                            </div>

                      </div>

                  </div>
              </div>
          </section>
        );
    }

    ReferrelSent(referralSent) {
        return (

            <section className="account-details section-padding">
                <div className="services-wrapper">
                    <div className="container">
                        <div className="row pb-4">

                            <div className="col-md-6 offset-md-3">

                                <div className="row card p-5">

                                    <div className="col-md-12">
                                        <h1 className="section-title pb-5"><strong>Refer Friends. <span className="text-red">Get Rewards!</span></strong></h1>
                                    </div>

                                    <div className="col-md-12">

                                        <form onSubmit={this.handleSubmit}>

                                            <div className="form-group">
                                                {/*<label for="exampleForm2">Add email address</label>*/}
                                                <input type="text" id="exampleForm2" className="form-control" placeholder="Email Address" value={this.state.referree_email}
                                                    onChange={this.handleChangeReferreeEmail} required />
                                            </div>

                                            <button type="submit" className="btn bg-orange btn-block text-white btn-lg">Invite Friends</button>
                                        </form>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>
        );
    }
}
