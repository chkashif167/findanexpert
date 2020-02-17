import React, { Component } from 'react';
import App from '../../App';
//import { Home } from '../Home';

export class AllCustomerAddresses extends Component {
    displayName = AllCustomerAddresses.name

    constructor(props) {
        super(props);
        this.state = { allAddress: [], loading: true };
        var customerId = localStorage.getItem("customerid");
        var customerAccesstoken = localStorage.getItem('customeraccesstoken');

        this.handleSubmit = this.handleSubmit.bind(this);

        if (localStorage.getItem("customerid") != null) {
            fetch(App.ApisBaseUrl + '/api/CustomerProfile/getallcustomeraddress?customerId=' + customerId + '&authToken=' + customerAccesstoken)
                .then(response => {
                    console.log(response);
                    //localStorage.setItem('yourExpertsStatusCode', response.status);
                    //if (response.status == '200') {
                        return response.json();
                    //}
                })
                .then(data => {
                    console.log(data.address);
                    localStorage.setItem('yourAddressesStatusCode', data.address);
                    console.log(localStorage.getItem('yourAddressesStatusCode'));
                    if (data.address != null) {
                        this.setState({ allAddress: data.address, loading: false });
                        console.log(this.state.allAddress);
                    }
                });
        }
    }

    showAddressId(e) {
        console.log(e.target.id)
        localStorage.setItem('addressid', e.target.id)
        localStorage.setItem('postalcode', e.target.name)
    }

    handleSubmit(e) {
        e.preventDefault();
        //alert(localStorage.getItem("serviceproviderserviceid"));

        var customeraccesstoken = localStorage.getItem('customeraccesstoken');
        var customerId = localStorage.getItem("customerid");
        var customerEmail = localStorage.getItem("email");
        var addressId = localStorage.getItem('addressid');
        var postalCode = localStorage.getItem('postalcode');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerid: customerId,
                email: customerEmail,
                addressid: addressId,
                postalcode: postalCode,
                newaddress: "",
                authtoken: customeraccesstoken,
                isdeleted: true
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/CustomerProfile/editremoveaddress', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    window.location = '/your-addresses';
                }

            });
    }

    render() {

        if (localStorage.getItem('yourAddressesStatusCode') != 'null') {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.getAddresses(this.state.allAddress);
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.noAddresses()
            );
        }
    }

    getAddresses(allAddress) {
        return (
            <div>
                <div className="row mb-4 pb-0">
                    {allAddress.map(adr =>
                        
                        <div className="col-md-6 pb-4" key={adr.addressID}>
                            <div class="card colored-card addressCard">
                                <div class="card-body">
                                    <div class="d-block d-md-flex">
                                        <div class="p-3 flex-1">
                                            <h5 class="card-title">{adr.address}</h5>
                                        </div>
                                        <div class="p-3 flex-1 button">
                                            <a className="btn bg-orange text-white float-left mr-2" href={'/update-address?' + btoa(encodeURIComponent('&postalcode=' + adr.postalCode + '&addressid='
                                                + adr.addressID + '&address=' + adr.address))}>Update</a>
                                            
                                        </div>
                                        <div class="p-3 flex-1 button">
                                            <form onSubmit={this.handleSubmit}>
                                                <button type="submit" className="btn bg-orange text-white" name={adr.postalCode} id={adr.addressID}
                                                    onClick={this.showAddressId}  >Remove</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    )}
                </div>
            </div>
        );
    }

    noAddresses() {
        return (
            <div>
                <div className="row mb-4 pb-4">
                    <div className="col-md-6">
                        <p className="card-text">You have not added any address.</p>
                    </div>
                </div>
            </div>
        );
    }

    
}

AllCustomerAddresses.defaultProps = {
    allAddress: []
}

//export allCustomerAddresses;
