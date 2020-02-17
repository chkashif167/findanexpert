import React, { Component } from 'react';
import App from '../../App';
import toastr from 'toastr';

export class AddCustomerAddress extends Component {
    displayName = AddCustomerAddress.name

    constructor(props) {
        super(props);

        this.state = {
            allAddresses: [],
            postalcode: '', address: '', add: false
        };

        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addAddress(postalcode, address) {

        var customeraccesstoken = localStorage.getItem('customeraccesstoken');
        var customerId = localStorage.getItem("customerid");

        var lastVisitedUrl = document.referrer;
        console.log(lastVisitedUrl);
        var lastVisitPage = lastVisitedUrl.slice(0, 52);
        console.log(lastVisitPage);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                PostalCode: postalcode,
                Address: address,
                customerid: customerId,
                authtoken: customeraccesstoken
            })
        };
        console.log(requestOptions);

        if (this.state.address == '') {
            //alert('Please select an Address');
            toastr["error"]("Please Select an Address!");
        }
        else {
            return fetch(App.ApisBaseUrl + '/api/CustomerProfile/addcustomeraddress', requestOptions)
                .then(response => {
                    console.log(response);
                    if (response.status == 200) {
                        toastr["success"]("Your address added Successfully!");
                    }
                    return response.json();
                })
                .then(response => {
                    console.log(response);
                    if (response != null) {
                        localStorage.setItem('addressid', response);
                        this.setState({ addAddress: response, add: true });
                        if (lastVisitPage == 'http://www.findanexpert.net/booking/') {
                            window.location = lastVisitedUrl;
                        }
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
        this.addAddress(postalcode, address);

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
            <div className="Register">
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">

                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value={this.state.postalcode}
                                onChange={this.handleChangePostalCode} />
                        </div>
                        <div class="col">
                            <select className="form-control" value={this.state.address}
                                onChange={this.handleChangeAddress}>
                                <option value="">Please select an address</option>
                                {this.state.allAddresses.map((adr) =>
                                    <option value={adr.replace("{", "").replace("}", "")}>{adr.replace("{", "").replace("}", "")}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-black text-white float-right">Add New Address</button>
                    </div>
                </form>
            </div>
        );
    }

    addressDetails(addAddress) {
        return (
            <div className="Register">
                {/*<div className="alert alert-success" role="alert">
                    <p>Your address added Successfully!</p>
                </div>*/}
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">

                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value={this.state.postalcode}
                                onChange={this.handleChangePostalCode} />
                        </div>
                        <div class="col">
                            <select className="form-control" value={this.state.address}
                                onChange={this.handleChangeAddress}>
                                <option value="">Please select an address</option>
                                {this.state.allAddresses.map((adr) =>
                                    <option value={adr.replace("{", "").replace("}", "")}>{adr.replace("{", "").replace("}", "")}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-black text-white float-right">Add New Address</button>
                    </div>
                </form>
            </div>
        );
    }
}