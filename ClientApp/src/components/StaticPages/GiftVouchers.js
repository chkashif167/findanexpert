import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import banner from '../../assets/img/giftmain.png';
import gift1 from '../../assets/img/gift1.png';
import gift2 from '../../assets/img/gift2.png';
import gift3 from '../../assets/img/gift3.png';
import gift4 from '../../assets/img/gift4.png';
import gift5 from '../../assets/img/gift5.png';
import gift6 from '../../assets/img/gift6.png';
import App from '../../App';

export class GiftVouchers extends Component {
    displayName = GiftVouchers.name

    constructor(props) {
        super(props);
        this.state = {
            voucherCode: '',
            reedemVoucher: '',
            allGiftVouchers: [],
            loading: false,
            checkoutGiftVoucherResponse: []
        };

        this.handleChangeVoucherCode = this.handleChangeVoucherCode.bind(this);

        if (localStorage.getItem('checkoutGiftVoucherResponse') != null) {
            localStorage.removeItem('checkoutGiftVoucherResponse');
        }
        
        this.handleChangeReceiverEmail = this.handleChangeReceiverEmail.bind(this);

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        fetch(App.ApisBaseUrl + '/api/GiftVoucher/displaygiftvouchers?authToken=' + customerAccesstoken)
            .then(response => {
                console.log(response);

                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);

                this.setState({ allGiftVouchers: response.giftvouchers, loading: true });
                console.log(this.state.allGiftVouchers);
            })
            .catch((error) => {

                this.state.allGiftVouchers = [];
            });
    }

    handleChangeVoucherCode(e) {

        this.setState({ voucherCode: e.target.value });
        localStorage.setItem('voucherCode', e.target.value);
    }

    handleReedemVoucher(e) {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                voucher_code: localStorage.getItem('voucherCode'),
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/GiftVoucher/redeemvoucher', requestOptions)
            .then(response => {
                console.log(response);
                return response.json()
            })
            .then(response => {
                console.log(response);
                //this.setState({ reedemVoucher: response, loading: true });
            });
    }

    handleChangeReceiverEmail(e) {

        this.setState({ receiver_email: e.target.value });
        localStorage.setItem('receiver_email', e.target.value);
    }

    getDetails(e) {

        localStorage.setItem('giftid', e.target.name);
        localStorage.setItem('paymentamount', e.target.id);
        localStorage.setItem('voucher_code', e.target.value);

        if (localStorage.getItem("customercardtokenmakedefault") == null) {
            window.location = '/payment';
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Firstname: localStorage.getItem('firstname'),
                    Surname: localStorage.getItem('surname'),
                    PaymentAmount: localStorage.getItem('paymentamount'),
                    paymentmethodid: localStorage.getItem("customercardtokenmakedefault"),
                    sender_email: localStorage.getItem('email'),
                    receiver_email: localStorage.getItem('receiver_email'),
                    voucher_code: localStorage.getItem('paymentamount'),
                    AuthToken: localStorage.getItem('customeraccesstoken'),
                    stripecurrency: 'gbp'
                })
            };

            console.log(requestOptions);

            return fetch(App.ApisBaseUrl + '/api/Payment/stripegiftvoucherholdpayments', requestOptions)
                .then(response => {
                    console.log(response);
                    if (response.status == 200) {
                        localStorage.setItem('checkoutGiftVoucherResponse', response.status);
                        return response.json()
                    }
                    else {
                        localStorage.removeItem('checkoutGiftVoucherResponse');
                    }
                    
                })
                .then(response => {
                    console.log(response);
                    if (localStorage.getItem('checkoutGiftVoucherResponse') == '200') {

                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                gifteremail: localStorage.getItem('email'),
                                gifteeemail: localStorage.getItem('receiver_email'),
                                voucherid: localStorage.getItem('giftid'),
                                hasemailed: true,
                                authtoken: localStorage.getItem('customeraccesstoken')
                            })
                        };

                        console.log(requestOptions);

                        return fetch(App.ApisBaseUrl + '/api/GiftVoucher/savegiftvoucherpurchase', requestOptions)
                            .then(response => {
                                console.log(response);
                                if (response.status == 200) {
                                    localStorage.setItem('savegiftvoucherpurchase', response.status);
                                    return response.json()
                                    alert('Gift voucher purchased successfully!');
                                }
                                else {
                                    localStorage.removeItem('savegiftvoucherpurchase');
                                }
                            })
                            .then(response => {
                                console.log(response);
                            });
                    }
                });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {

        if (this.state.submitted) {
            if (localStorage.getItem('checkoutGiftVoucherResponse') == '200') {
                var displayMessage = (<div className="alert alert-success">Purchased Successfully!</div>);
            }
            else {
                var displayMessage = (<div className="alert alert-success">Payment Error!</div>);
            }
        }
        
        document.getElementsByTagName("META")[2].content = 'Nobody knows you quite like you do! Ensure that your buddy, or family member gets precisely what their heart desires with a Lavish gift card.';
        document.getElementsByTagName("TITLE")[0].text = 'Gift Vouchers UK, Gift Vouchers Online, Holiday Gift Vouchers, Gift Vouchers for Men';

        return (
            <div>

                <section class="giftvoucher section-padding">
                    <div class="services-wrapper">
                        <div class="container">
                            <div class="row">

                                <div class="col-md-6 text-center">
                                    <img src={banner} class="img-fluid" alt="gift-voucher" />
                                </div>
                                <div class="col-md-6 ">
                                    <div class="gift-card">
                                        <h3 class="font-weight-bold"><span class="text-danger">Gift</span> Card</h3>
                                        <p>
                                            Take the stress out of choosing the perfect gift. Send an Instant Expert gift card to <strong> 
                                            anyone, anytime for any service</strong>. Gifts can be personalised with a message and sent 
                                            instantly by email or text. Don't worry about last minute forgetfulness,<strong>the birthday,
                                            the anniversary, mothers day........</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="giftVoucherIdeas section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">
                                <div class="col-md-12">
                                    <h1 class="text-center text-red font-weight-bold mb-4"> The Gift ideas:</h1>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 mb-4">
                                    <form class="form-inline" onSubmit={this.handleReedemVoucher}>
                                        <div class="form-group mb-2">
                                            <input type="text" className="form-control" placeholder="Reedem your gift voucher"
                                                value={this.state.voucherCode} onChange={this.handleChangeVoucherCode} required />
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <button type="submit" class="btn btn-primary">Reedem Voucher</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="row">
                                {this.state.allGiftVouchers.map(gifts =>
                                    <div class="col-md-6 mb-4">
                                    
                                        <div class="card giftsCard">
                                            <div class="card-body">

                                                <h4 class="card-title">Voucher Code:: <span className="code">{gifts.voucherCode}</span></h4>
                                                <div class="d-flex flex-row">
                                                    <p class="card-text mb-0 amount">Voucher Amount:: <span>{gifts.voucherAmount}</span></p>
                                                    <div className="btnWrap">
                                                        <button className="btn btn-default" data-toggle="modal"
                                                            data-target="#giftsVoucherModal">Purchase Now</button>
                                                    </div>

                                                    <div class="modal fade" id="giftsVoucherModal" tabindex="-1" role="dialog" aria-labelledby="giftsVoucherModalLabel" aria-hidden="true">
                                                        <div class="modal-dialog" role="document">
                                                            <div class="modal-content">
                                                                <div class="modal-header">
                                                                    {displayMessage}
                                                                    <h2 class="modal-title">Voucher</h2>
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                                <form onSubmit={this.handleSubmit} >
                                                                    <div class="modal-body">
                                                                        <div className="form-row">
                                                                            <div className="col pb-3">
                                                                                <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                                                                <label class="custom-control-label text-red" for="customCheck1" >Voucher for myself</label>
                                                                            </div>
                                                                            <div className="col">
                                                                                <p className="text-red">{gifts.voucherAmount}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="md-form pb-3">
                                                                            <input type="text" className="form-control validate" name="sender_email"
                                                                                values={this.state.receiver_email} onChange={this.handleChangeReceiverEmail}
                                                                                placeholder="Enter Email of referee..." required />
                                                                        </div>
                                                                    
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                        <button type="submit" class="btn btn-primary" name={gifts.id}
                                                                            value={gifts.voucherCode} id={gifts.voucherAmount}
                                                                            onClick={this.getDetails}>Save changes</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </section>

                <section class="giftVoucherCantFind section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <p class="text-center">can't find your perfect gift then why not!</p>
                            <div class="row">
                                <div class="col-md-12 text-center">

                                    <button class="btn bg-red text-white">Have a gift card made for <br />
                                        any denomination</button>
                                    <p class="or">OR</p>
                                    <button class="btn bg-red text-white">Create your own gift</button>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section class="giftVoucherJustDecide section-padding">
                    <div class="services-wrapper">
                        <div class="container-fluid">

                            <div class="col-md-12">
                                <h3 class="text-center"> Just decide:</h3>
                                <ul class="text-center">
                                    <li>
                                        How much you want to spend
                                    </li>
                                    <li>
                                        When you want the lucky person to get it
                                    </li>
                                    <li>
                                        Who you want to send it to
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>

                <section class="giftvoucherjustdecide bg-pink section-padding">
                    <div class="services-wrapper">
                        <div class="container-fluid">

                            <div class="row">
                                <div class="col-md-12 text-center">
                                    <p>
                                        With our services your special person will have an experience to remember forever.
                                        Let us take care of everything and<br />
                                        provide an amazing service for your loved one.
                                        You can choose from a massive range of services.
                                    </p>
                                    <span> Buying online is</span>
                                    <p class="text-danger">
                                        <strong>Quick, Easy, Safe and Convenient.</strong>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
