import React, { Component } from 'react';
import App from '../App';
//import { AutoComplete } from '@progress/kendo-dropdowns-react-wrapper';
import toastr from 'toastr';

export class ProviderSelectServices extends Component {
    displayName = ProviderSelectServices.name

    constructor() {
        super();

        this.state = {
            allservices: '', updated: false,
            allServices: [],
            servicestypes: [],
            listServiceTypes: []
        };

        this.handleChangeAllServices = this.handleChangeAllServices.bind(this);
        this.handleChangeServiceTypes = this.handleChangeServiceTypes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        fetch(App.ApisBaseUrl + '/api/Service/getserviceonly')
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                //this.setState({ allServices: response });
                var newArray = this.state.allServices.slice();
                for (var i = 0; i < response.services.length; i++) {
                    var service = response.services[i];
                    newArray.push([service.serviceID, service.serviceName]);
                }
                this.setState({ allServices: newArray });
            });
    }

    getInitialState = () => {
        const initialState = {
        };
        return initialState;
    }

    resetState = () => {
        this.setState(this.getInitialState());
    }


    AddServices(servicestypes) {

        var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        var serviceproviderid = localStorage.getItem("serviceproviderid");
        var serviceid = localStorage.getItem('serviceid');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serviceproviderid: serviceproviderid,
                serviceid: serviceid,
                servicetypelist: this.state.listServiceTypes,
                authtoken: providerAccesstoken
            })
        };

        //console.log(this.state.listServiceTypes);
        return fetch(App.ApisBaseUrl + '/api/ServiceProvider/addserviceproviderservices', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ updateProviderService: response, updated: true });
                    toastr['success']('Your selected services are added successfully!');
                    setTimeout(function () {
                        window.location = '/provider-services';
                    }, 3000);
                }
                

            });
    }

    handleChangeAllServices(e) {
        this.setState({ allservices: e.target.value });
        localStorage.setItem('serviceid', e.target.value);

        //const requestOptions = {
        //    method: 'POST',
        //    headers: { 'Content-Type': 'application/json' },
        //    body: JSON.stringify({ serviceid: e.target.value })
        //};
        //console.log(requestOptions);
        return fetch(App.ApisBaseUrl + '/api/ServiceType/getallservicetypes?serviceid=' + localStorage.getItem('serviceid') + '&pagenumber=1&pagesize=150')
            .then(response => {
                //console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                this.setState({ serviceTypes: response.data, found: true });
                //console.log(response);
            });
    }

    handleChangeServiceTypes(e) {
        //
        this.setState({ servicestypes: e.target.id });
        console.log(e.target.value);
        this.state.listServiceTypes.push(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { servicestypes } = this.state;
        this.AddServices(servicestypes);
    }

    render() {

        let contents = this.state.found
            ? this.UpdatedProviderServices(this.state.updateProviderService)
            : this.ProviderServices();
        return <div>
            {contents}
        </div>;
    }

    ProviderServices() {
        return (

            <div className="Register profileBox p-5">
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">

                    <div className="md-form pb-3">
                        <select className="form-control frm-field" value={this.state.allservices}
                            onChange={this.handleChangeAllServices} required>
                            <option value="" selected>Select an option</option>
                            {this.state.allServices.map(srv =>
                                <option value={srv[0]}>{srv[1]}</option>
                            )};
                        </select>
                    </div>

                    <div className="text-center mb-5">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Add Your Services</button>
                    </div>
                </form>
            </div>
        );
    }

    UpdatedProviderServices(updateProviderService) {
        return (
            <div className="profileBox p-5">
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data" className="pb-5">

                    <div className="md-form pb-3">
                        <select className="form-control frm-field" value={this.state.allservices}
                            onChange={this.handleChangeAllServices} required>
                            <option value="" selected>Select an option</option>
                            {this.state.allServices.map(srv =>
                                <option value={srv[0]}>{srv[1]}</option>
                            )};
                        </select>
                    </div>

                    <p><strong>Service Types</strong></p>

                    <div className="md-form pb-3">

                        {this.state.serviceTypes.map(srvtype =>
                            <div class="form-check">
                                <input class="form-check-input frm-field" type="checkbox" value={srvtype.servicetypeid} id={srvtype.servicetypeid}
                                    onChange={this.handleChangeServiceTypes} />
                                <label class="form-check-label" for={srvtype.servicetypeid}>
                                    {srvtype.servicetypename}
                                </label>
                            </div>
                        )}
                        
                    </div>

                    

                    <div className="text-center">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Add Your Services</button>
                    </div>
                </form>
            </div>

            //<Redirect to='/profile' />
        );
    }

}


