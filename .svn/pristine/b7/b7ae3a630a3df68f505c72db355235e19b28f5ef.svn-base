import React, { Component } from 'react';
import App from '../../../App';

export class CustomerEmailReply extends Component {
    displayName = CustomerEmailReply.name

    constructor(props) {
        var customerEmail = localStorage.getItem('email');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const getSubject = params.get('subject');
        const getFrom = params.get('from');

        super(props);
        this.state = {
            emailid: '0',
            from: customerEmail,
            to: getFrom,
            subject: getSubject,
            body: '',
            sent: false
        };


        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    SendEmail(emailid, from, to, subject, body) {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                emailid: emailid,
                from: from,
                to: to,
                subject: subject,
                body: body,
                iscustomer: true,
                authtoken: localStorage.getItem('customeraccesstoken')
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Email/addemail', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    //console.log(response);
                    this.setState({ sentEmail: response, sent: true });

                }

            });
    }


    handleChangeBody(e) {
        this.setState({ body: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { emailid, from, to, subject, body } = this.state;
        this.SendEmail(emailid, from, to, subject, body);
    }

    render() {
        let contents = this.state.sent
            ? this.EmailSent(this.state.sentEmail)
            : this.ComposeEmail(this.state.allMessages);
        return (
            <div>
                {contents}
            </div>
        );
    }

    ComposeEmail() {
        return (

            <form onSubmit={this.handleSubmit}>

                <div className="pb-3">
                    <textarea type="text" id="body" name="body" rows="5" class="form-control md-textarea frm-field" placeholder="Your Message" value={this.state.body}
                        onChange={this.handleChangeBody} required />
                </div>
                <div className="text-center mb-3">
                    <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Send Email</button>
                </div>
            </form>
        );
    }

    EmailSent(sentEmail) {

        return (
            <div>
                <div className="alert alert-success" role="alert">
                    <p>Your email sent Successfully!</p>
                </div>
                <form onSubmit={this.handleSubmit}>

                    <div className="pb-3">
                        <textarea type="text" id="body" name="body" rows="5" class="form-control md-textarea frm-field" placeholder="Your Message" value={this.state.body}
                            onChange={this.handleChangeBody} required />
                    </div>
                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Send Email</button>
                    </div>
                </form>
            </div>
        );
    }
}
