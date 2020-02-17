import React, { Component } from 'react';
import App from '../../../App';

export class CustomerOutbox extends Component {
    displayName = CustomerOutbox.name

    constructor(props) {
        super(props);
        this.state = { allMessages: [], loading: true };

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customerEmail = localStorage.getItem("email");

        fetch(App.ApisBaseUrl + '/api/Email/getoutboxemails?email=' + customerEmail + '&authToken=' + customerAccesstoken + '&iscustomer=true')
            .then(response => {
                console.log(response);
                localStorage.setItem('customerOutboxStatus', response.status);
                if (response.status == '200') {
                    return response.json();
                }
            })
            .then(data => {
                console.log(data);
                this.setState({ allMessages: data, loading: false });
            });
    }

    render() {
        if (localStorage.getItem('customerOutboxStatus') == '200') {
            let contents = this.state.loading
                ? <div class="spinner-border text-center pt-2" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                : this.CustomerOutbox(this.state.allMessages);
            return (
                <div>
                    {contents}
                </div>
            );
        }
        else {
            return (
                this.CustomerEmptyOutbox()
            );
        }

    }

    CustomerOutbox(allMessages) {
        return (

            <div className="list-group emails">
                {allMessages.map(outbx =>
                    <a href={'/outbox-email-details?' + btoa(encodeURIComponent('subject=' + outbx.subject + '&from=' + outbx.from + '&body=' + outbx.body))} className="list-group-item list-group-item-action flex-column align-items-start" key={outbx.emailid}>
                        <div className="d-flex w-100 justify-content-between">
                            <div>
                                <h5 className="mb-2"><strong>From:</strong> <strong>{outbx.from}</strong></h5>
                                <p className="mb-3"><strong>Subject:</strong> {outbx.subject}</p>
                            </div>
                            <p className="emailShortDesc">{outbx.body}</p>
                            <span>
                                <p className="m-0">{outbx.emaildate.split('', 10)}</p>
                                <p>{outbx.emaildate.slice(11).split('', 8)}</p>
                            </span>
                        </div>
                    </a>
                )}
            </div>
        );
    }

    CustomerEmptyOutbox() {
        return (

            <div className="list-group emails">
                <p class="list-group-item text-center">You have no emails.</p>
            </div>
        );
    }
}
 