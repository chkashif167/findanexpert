import React, { Component } from 'react';
import App from '../../../App';

export class CustomerInbox extends Component {
    displayName = CustomerInbox.name

    constructor(props) {
        super(props);
        this.state = { allMessages: [], loading: true };

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customerEmail = localStorage.getItem("email");

        fetch(App.ApisBaseUrl + '/api/Email/getinboxemails?email=' + customerEmail + '&authToken=' + customerAccesstoken + '&iscustomer=true')
            .then(response => {
                console.log(response);
                localStorage.setItem('customerInboxStatus', response.status);
                if (response.status == '200') {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({ allMessages: data, loading: false });
            });
    }

    render() {
        if (localStorage.getItem('customerInboxStatus') == '200') {
            let contents = this.state.loading
                ? <div class="spinner-border text-center pt-2" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                : this.CustomerInbox(this.state.allMessages);
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.CustomerEmptyInbox()
            );
        }
        
    }

    CustomerInbox(allMessages) {
        return (

            <div className="list-group emails">
                {allMessages.map(inbx =>
                    <a href={'/inbox-email-details?' + btoa(encodeURIComponent('subject=' + inbx.subject + '&from=' + inbx.from + '&body=' + inbx.body))} className="list-group-item list-group-item-action flex-column align-items-start" key={inbx.emailid}>
                        

                        <div className="d-flex w-100 justify-content-between">
                            <div>
                                <h5 className="mb-2"><strong>From:</strong> <strong>{inbx.from}</strong></h5>
                                <p className="mb-3"><strong>Subject:</strong> {inbx.subject}</p>
                            </div>
                            <p className="emailShortDesc">{inbx.body}</p>
                            <span>
                                <p className="m-0">{inbx.emaildate.split('', 10)}</p>
                                <p>{inbx.emaildate.slice(11).split('', 8)}</p>
                            </span>
                        </div>
                    </a>
                )}
            </div>
        );
    }

    CustomerEmptyInbox() {
        return (

            <div className="list-group emails">
                <p class="list-group-item text-center">You have no emails.</p>
            </div>
        );
    }
}
