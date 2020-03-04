﻿import React, { Component } from 'react';
import { ProviderSidebarLinks } from '../Profile/SidebarLinks';
import { ProviderAddDocuments } from '../../ProviderAddDocuments';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';
import App from '../../../App';
import toastr from 'toastr';

export class ProviderDocuments extends Component {
    displayName = ProviderDocuments.name

    constructor() {
        super();
        this.state = { allDocuments: [], found: false, loading: true };

         var providerAccesstoken =
        "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSXhNRE1pTENKbGJXRnBiQ0k2SW5OaGNtRkFiV0ZwYkdsdVlYUnZjaTVqYjIwaUxDSnliMnhsSWpvaVEzVnpkRzl0WlhJaUxDSkpjMVpoYkdsa0lqb2lkSEoxWlNJc0ltNWlaaUk2TVRVNE16RTFNRFl6TkN3aVpYaHdJam94TmpFM056QTNNRE0wTENKcFlYUWlPakUxT0RNeE5UQTJNelFzSW1semN5STZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlMQ0poZFdRaU9pSm1hVzVrWVc1bGVIQmxjblF1Ym1WMEluMC5WMkdGQVlNS00xa3JScWIwVkRuVll2dWlsSVk0Q3NPUGhGRm43R2J3WWdn";
      //var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        var providerId = localStorage.getItem("serviceproviderid");
        var providerEmail = localStorage.getItem("email");

        this.handleSubmit = this.handleSubmit.bind(this);

        fetch(App.ApisBaseUrl + '/api/Provider/getdocuments?authToken=' + providerAccesstoken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log("=-=-=-=-=-=-=-=-=-=-=-=-",data);
                
                var newArray = [];
                  for (var i = 0; i < data.documentlist.length; i++) {
                  newArray.push(data.documentlist[i].documentid);
                  this.setState({ allDocuments: newArray, loading: false });
                  console.log("=======================",this.state.allDocuments);
                  }
                  
            });
    }

    getDocumentId(e) {
        console.log(e.target.id)
        localStorage.setItem('documentid', e.target.id)
        //this.props.offline()
    }

    handleSubmit(e) {
        e.preventDefault();
        var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        var providerId = localStorage.getItem("serviceproviderid");
        var providerEmail = localStorage.getItem("email");
        var documentId = localStorage.getItem("documentid");
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ serviceProviderId: providerId, email: providerEmail, documentId: documentId })
        };

        return fetch(App.ApisBaseUrl + '/api/ServiceProvider/deletedocument?serviceProviderId=' + providerId + '&email=' + providerEmail + '&documentId=' + documentId + '&authToken=' + providerAccesstoken)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                if (response != null) {
                    this.setState({ serviceRemoveMsg: response.message });
                    console.log(this.state.serviceRemoveMsg);
                    
                    toastr['error']('Document has been removed!');
                    setTimeout(function () {
                        window.location = '/provider-documents';
                    }, 3000);

                }

            });
    }

    render() {
        if (localStorage.getItem('providerDocumentNotFound') != '404') {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.ProviderAlldocuments(this.state.allDocuments);
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            let contents = this.state.found
                ? this.ProviderNoDocuments(this.state.noDocuments)
                : <p><em>Loading...</em></p>;
            return (
                <div>
                    {contents}
                </div>
            );
        }
    }

    ProviderAlldocuments(allDocuments) {
        return (

            <div id="MainPageWrapper">

                <ProviderSidebarLinks />

                <section class="customerProfile">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div className="col-md-12 mt-5 mb-5">

                                    <div className="row pb-4">
                                        <div className="col-md-12 pb-4">
                                            <ProviderAddDocuments />
                                        </div>
                                    </div>

                                    <div className="row pb-4">

                                        <div className="col-md-12 pb-2">
                                            
                                            <div class="card providerDocuments coloredBox">
                                                <div class="card-header profileBox mb-4">
                                                    <p className="font-weight-bold mb-5">Your <span className="text-red">Files</span></p>
                                                </div>
                                                <ul class="list-group-flush mb-0 p-0">
                                                    {allDocuments.map(docs =>
                                                        <li class="list-group-item d-flex justify-content-between align-items-center profileBox mb-3">
                                                            <div>
                                                                <img class="card-img-top providerDocuments shadow" src={App.ApisBaseUrl + docs.docpath} alt="Card image cap" />
                                                                <div className="d-flex justify-content-between pt-3">
                                                                    <p class="card-text"><i class="far fa-file"></i> {docs.documenttype}</p>
                                                                    {/* <p class="card-text"><i class="far fa-clock pr-1"></i> {docs.createddatetime.split('', 10)}</p> */}
                                                                </div>
                                                            </div>
                                                            <form onSubmit={this.handleSubmit}>
                                                                <button type="submit" className="btn bg-orange text-white" id={docs.documentid}
                                                                    onClick={this.getDocumentId} >Remove</button>
                                                            </form>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>

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

    ProviderNoDocuments(noDocuments) {
        return (

            <div id="MainPageWrapper">

                <ProviderSidebarLinks />

                <section class="customerProfile">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div className="col-md-12">

                                    <div className="row pb-4">
                                        <div className="col-md-12">
                                            <h4 className="pb-2" />You have not uploaded any Documents Yet!
                                        </div>
                                    </div>

                                    <ProviderAddDocuments />

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
