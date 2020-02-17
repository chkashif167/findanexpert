import React, { Component } from 'react';
import App from '../../App';
import toastr from 'toastr';

export class ContactUs extends Component {
    displayName = ContactUs.name

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            sendEmail: '',
            submitted: false,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeSubject = this.handleChangeSubject.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    sendContactEmail(name, email, subject, message) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message,
            })
        };

        return fetch(App.ApisBaseUrl + '/api/Email/sendcontactusemail', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);

                if (response.statuscode == 200) {
                    toastr['success']('Thank you for your message!');

                    this.setState({ name: '', email: '', subject: '', message: '' })

                }

                this.setState({ sendEmail: response, submitted: true });
            });
    }

    handleChangeName(e) {
        this.setState({ name: e.target.value });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleChangeSubject(e) {
        this.setState({ subject: e.target.value });
    }

    handleChangeMessage(e) {
        this.setState({ message: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { name, email, subject, message} = this.state;
        this.sendContactEmail( name, email, subject, message );
    }

    render() {
        if (this.state.submitted) {
            var successMessage = (<div className="alert alert-success" role="alert">
                <p>Thank you! Your message has been sent successfully!</p>
            </div>);
        }

        document.getElementsByTagName("META")[2].content = 'Our clinics offer relaxing, welcoming and comfortable environment. Find an Expert is a services provider that uses the aid of technology to connect service providers with customers.';
        document.getElementsByTagName("TITLE")[0].text = 'Contact Us - Find an Expert';

        return (
            <div className="container">
                <section className="mt-5 pt-5 pb-5 mt-5 contactPage">
                    <div className="container">

                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="text-center font-weight-bolder pageTitle">Contact <span className="text-red">Us</span></h2>
                            </div>
                        </div>

                        <div className="row text-center pt-5 pb-5">
                            <div className="col-md-4 col-xs-4">
                                <a href="tel:+442070997738" className="contact_call_icon">
                                    <span>
                                        <i class="fas fa-phone"></i>
                                    </span>
                                    <h4 className="pt-5 text-center text-dark">Call</h4>
                                </a>
                            </div>
                            <div className="col-md-4 col-xs-4">
                                <a href="mailto:contact@findanexpert.net" className="contact_email_icon">
                                    <span>
                                        <i class="far fa-envelope"></i>
                                    </span>
                                    <h4 className="pt-5 text-center text-dark">Email</h4>
                                </a>
                            </div>
                            <div className="col-md-4 col-xs-4">
                                <a href="sms:+442070997738" className="contact_message_icon">
                                    <span>
                                        <i class="far fa-comment-alt"></i>
                                    </span>
                                    <h4 className="pt-5 text-center text-dark">Message</h4>
                                </a>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <div className="p-5 shadow">
                                    <h2 className="pb-5 font-weight-bolder text-center">Get In <span className="text-red">Touch!</span></h2>
                                    <form onSubmit={this.handleSubmit}>

                                        <div className="form-group">
                                            <input type="text" name="name" placeholder="Your Name" className="form-control"
                                                value={this.state.name} onChange={this.handleChangeName} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" name="email" placeholder="Your Email" className="form-control"
                                                value={this.state.email} onChange={this.handleChangeEmail} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="subject" placeholder="Your Subject" className="form-control"
                                                value={this.state.subject} onChange={this.handleChangeSubject} required />
                                        </div>
                                        <div className="form-group">
                                            <textarea name="message" className="form-control" placeholder="Your Message..." cols="5" rows="5"
                                                value={this.state.message} onChange={this.handleChangeMessage} required />
                                        </div>
                                        <div className="form-group text-right">
                                            <button type="submit" className="btn bg-orange text-white btnround">Send Message</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        );
    }
}