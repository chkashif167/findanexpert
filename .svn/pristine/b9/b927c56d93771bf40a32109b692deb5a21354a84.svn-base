import React, { Component } from 'react';
import { SidebarLinks } from '../YourAccount/SidebarLinks';
import App from '../../../App';

export class UpdateCustomerAddress extends Component {
    displayName = UpdateCustomerAddress.name

    constructor(props) {
        super(props);

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const postalCode = params.get('postalcode');
        const Address = params.get('address');

        this.state = {
            allAddresses: [],
            postalcode: postalCode, address: Address, add: false
        };

        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateAddress(postalcode, address) {

        var customeraccesstoken = localStorage.getItem('customeraccesstoken');
        var customerId = localStorage.getItem("customerid");
        var customerEmail = localStorage.getItem("email");
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const postalCode = params.get('postalcode');
        const addressId = params.get('addressid');

        var lastVisitedUrl = document.referrer;
        console.log(lastVisitedUrl);
        var lastVisitPage = lastVisitedUrl.slice(0, 52);
        console.log(lastVisitPage);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerid: customerId,
                email: customerEmail,
                addressid: addressId,
                postalcode: postalcode,
                newaddress: address,
                authtoken: customeraccesstoken,
                isdeleted: false
            })
        };
        console.log(requestOptions);

        if (this.state.address == '') {
            alert('Please select an Address');
        }
        else {
            return fetch(App.ApisBaseUrl + '/api/CustomerProfile/editremoveaddress', requestOptions)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(response => {
                    console.log(response);
                    if (response != null) {
                        localStorage.setItem('addressid', response);
                        this.setState({ addAddress: response, add: true });
                        window.location = '/your-addresses';
                    }

                });
        }
    }

    handleChangePostalCode(e) {
        this.setState({ postalcode: e.target.value });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postalcode: e.target.value })
        };

        return fetch(App.ApisBaseUrl + '/api/BaseApi/getaddresses', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                if (response != null) {
                    localStorage.setItem('get_address', response.get_address);
                    console.log(localStorage.getItem('get_address'));
                    this.setState({ allAddresses: response.get_address });
                    console.log(this.state.allAddresses);
                }

            });

    }

    handleChangeAddress(e) {
        this.setState({ address: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { postalcode, address } = this.state;
        this.updateAddress(postalcode, address);

    }

    render() {

        let contents = this.state.add
            ? this.addressDetails()
            : this.addAddressForm(this.state.addAddress);
        return (
            <div>
                {contents}
            </div>
        );
    }

    addAddressForm() {

        return (
            <div id="MainPageWrapper" >

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Update Your Address</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">

                                    <div className="Register">
                                        <form onSubmit={this.handleSubmit} enctype="multipart/form-data">

                                            <div className="form-row pb-3">
                                                <div class="col">
                                                    <input type="text" name="postalcode" className="form-control validate postalCode" placeholder="Postalcode" value={this.state.postalcode}
                                                         required />
                                                </div>
                                                <div class="col">
                                                    <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value={this.state.address}
                                                        onChange={this.handleChangeAddress} required />
                                                    
                                                </div>
                                            </div>

                                            <div className="text-center mb-3">
                                                <button type="submit" className="btn bg-black text-white float-right">Update Address</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
            
        );
    }

    addressDetails(addAddress) {

        return (
            <div id="MainPageWrapper" >

                <section class="sub-header p-1">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item left-side"><h4><strong>Manage Your Account</strong></h4></li>
                            <li class="breadcrumb-item right-side"><h4><strong>Update Your Address</strong></h4></li>
                        </ol>
                    </nav>
                </section>

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <SidebarLinks />

                                <div className="col-md-9 pt-4 pb-4">
                                    <div className="alert alert-success" role="alert">
                                        <p>Your address upded Successfully!</p>
                                    </div>

                                    <div className="Register">
                                        <form onSubmit={this.handleSubmit} enctype="multipart/form-data">

                                            <div className="form-row pb-3">
                                                <div class="col">
                                                    <input type="text" name="postalcode" className="form-control validate postalCode" placeholder="Postalcode" value={this.state.postalcode}
                                                        required />
                                                </div>
                                                <div class="col">
                                                    <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value={this.state.address}
                                                        onChange={this.handleChangeAddress} required />

                                                </div>
                                            </div>

                                            <div className="text-center mb-3">
                                                <button type="submit" className="btn bg-black text-white float-right">Update Address</button>
                                            </div>
                                        </form>
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