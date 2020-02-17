import React, { Component } from 'react';
import App from '../../../App';

export class ProviderComposer extends Component {
    displayName = ProviderComposer.name

    constructor(props) {
        super(props);
        var ProviderEmail = localStorage.getItem('email');
        this.state = {
            emailid: '0',
            from: ProviderEmail,
            to: 'support@selteq.net',
            subject: '',
            body: '',
            sent: false
        };

        this.handleChangeTo = this.handleChangeTo.bind(this);
        this.handleChangeSubject = this.handleChangeSubject.bind(this);
        this.handleChangeBody = this.handleChangeBody.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    SendEmail(emailid, from, to, subject, body) {

        var providerAccesstoken = localStorage.getItem('provideraccesstoken');
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
                authtoken: providerAccesstoken,
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

    handleChangeTo(e) {
        this.setState({ to: e.target.value });
    }

    handleChangeSubject(e) {
        this.setState({ subject: e.target.value });
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
                    <input type="hidden" name="to" className="form-control validate frm-field" placeholder="To" value={this.state.to}
                        required />
                </div>
                <div className="pb-0">
                    <input type="text" name="subject" className="form-control validate frm-field" placeholder="Subject" value={this.state.subject}
                        onChange={this.handleChangeSubject} required />
                </div>
                <div className="pb-3">
                    <textarea type="text" id="body" name="body" rows="5" class="form-control md-textarea frm-field" placeholder="Your Message" value={this.state.body}
                        onChange={this.handleChangeBody} required />
                </div>
                <div className="text-center mb-3">
                    <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Send Your Email</button>
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
                        <input type="hidden" name="to" className="form-control validate frm-field" placeholder="To" value=""
                            required />
                    </div>
                    <div className="pb-0">
                        <input type="text" name="subject" className="form-control validate frm-field" placeholder="Subject" value=""
                            onChange={this.handleChangeSubject} required />
                    </div>
                    <div className="pb-3">
                        <textarea type="text" id="body" name="body" rows="5" class="form-control md-textarea frm-field" placeholder="Your Message" value=""
                            onChange={this.handleChangeBody} required />
                    </div>
                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Send Your Email</button>
                    </div>
                </form>
            </div>
        );
    }
}
