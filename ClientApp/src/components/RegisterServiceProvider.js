import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import App from '../App';
import toastr from 'toastr';

export class RegisterServiceProvider extends Component {
    displayName = RegisterServiceProvider.name

    constructor(props) {
        super(props);

        this.state = {
            registeredCustomer: new RegisteredCustomer(),
            allAddresses: [],
            firstname: '', surname: '', email: '', password: '', mobile: '', postalcode: '', address: '',
            genderpreference: 'male', gender: 'male', customerid: '0', serviceproviderid: '0',
            image: '', privacyPolicyContent: '', termsandConditionContent: '', registered: false
        };

        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeGenderPreference = this.handleChangeGenderPreference.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // fetch(App.ApisBaseUrl + '/api/Policy/getserviceprovidertermsandconditioncontent')
        //     .then(response => {
        //         console.log(response);
        //         return response.json();
        //     })
        //     .then(response => {
        //         console.log(response);
        //         if (response != null) {
        //             this.setState({ termsandConditionContent: response });
        //         }
        //     });

        // fetch(App.ApisBaseUrl + '/api/Policy/getserviceproviderprivacypolicycontent')
        //     .then(response => {
        //         console.log(response);
        //         return response.json();
        //     })
        //     .then(response => {
        //         console.log(response);
        //         if (response != null) {
        //             this.setState({ privacyPolicyContent: response });
        //         }
        //     });
    }

    getInitialState = () => {
        const initialState = {
        };
        return initialState;
    }

    resetState = () => {
        this.setState(this.getInitialState());
    }

    Register(firstname, surname, email, password, mobile, postalcode, address, genderpreference, gender, customerid, serviceproviderid, image) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                Firstname: firstname,
                Surname: surname,
                Email: email,
                Password: password,
                Mobile: mobile,
                PostalCode: postalcode,
                Address: address,
                GenderPreference: 'N/A',
                Gender: 'N/A',
                CustomerId: customerid,
                ServiceProviderId: serviceproviderid,
                Image: image,
                privacypolicyaccepted: true,
                termsandconditionaccepted: true
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Registration/serviceproviderregistration', requestOptions)
            .then(response => {
                console.log(response);
                localStorage.setItem('providerRegisterStatus', response.status);
                if (response.status == '409') {
                    toastr["error"]("This email address is already registered. If you're a returning customer, sign in to your account or reset your password.");
                    
                } else if (response.status == '400') {
                    toastr['error']('Your Password should contain minimum 8 characters.');
                } else if (response.status == '404') {
                    toastr['error']('Invalid postal code');
                }
                else {
                    window.scrollTo(0, 0);
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    if (response.password == 'Your password must include at least Mimimum of 8 Characters 1 Upper case 1 Lower case') {
                        toastr["error"]("Your password must include at least Mimimum of 8 Characters 1 Upper case 1 Lower case");
                    }
                    else if(localStorage.getItem('providerRegisterStatus') == '200') {
                        this.setState({ registeredProvider: response, registered: true });
                    }
                }

            });
    }

    handleChangeFirstname(e) {
        this.setState({ firstname: e.target.value });
    }

    handleChangeSurname(e) {
        this.setState({ surname: e.target.value });
    }

    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    handleChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleChangeMobile(e) {
        this.setState({ mobile: e.target.value });
    }

    handleChangePostalCode(e) {
        this.setState({ postalcode: e.target.value });
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postalcode: e.target.value })
        };
        console.log(requestOptions)
        return fetch(App.ApisBaseUrl + '/api/Address/getaddresses', requestOptions)
            .then(response => {
                console.log("dttttttttttttttttttttttttttttttttt",response);
              //return response.json();
            })
            .then(response => {
                if (response != null) {
                    this.setState({ allAddresses: response.get_address });
                    console.log(this.state.allAddresses);
                }

            });

    }

    handleChangeAddress(e) {
        this.setState({ address: e.target.value });
    }

    handleChangeGenderPreference(e) {
        this.setState({ genderpreference: e.target.value });
        //alert(e.target.value);
    }

    handleChangeGender(e) {
        this.setState({ gender: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { firstname, surname, email, password, mobile, postalcode, address, genderpreference, gender, customerid, serviceproviderid, image, privacyPolicyContent, termsandConditionContent } = this.state;
        this.Register(firstname, surname, email, password, mobile, postalcode, address, genderpreference, gender, customerid, serviceproviderid, image, privacyPolicyContent, termsandConditionContent);
    }

    render() {
        let contents = this.state.registered
            ? this.ProviderLoginDetails(this.state.registeredProvider)
            : this.ProviderLogin();
        return <div>
            {contents}
        </div>;
    }

    ProviderLogin() {
        return <div className="Register">
            <div className="loginRegisterTopText">
                <h3>New to Findanexpert.net?</h3>
                <p>Create an account now</p>
            </div>
            <form onSubmit={this.handleSubmit}>
                <div className="form-row pb-3">
                    <div class="col">
                        <input type="text" name="firstname" className="form-control validate" placeholder="First Name" value={this.state.firstname}
                            onChange={this.handleChangeFirstname} required />
                    </div>
                    <div class="col">
                        <input type="text" name="surname" className="form-control validate" placeholder="Last Name" value={this.state.surname}
                            onChange={this.handleChangeSurname} required></input>
                    </div>
                </div>

                <div className="form-row pb-3">
                    <div class="col">
                        <input type="number" name="mobile" className="form-control validate" placeholder="Mobile" value={this.state.mobile}
                            onChange={this.handleChangeMobile} required></input>
                    </div>
                </div>

                <div className="form-row pb-3">
                    <div class="col">
                        <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value={this.state.postalcode}
                            onChange={this.handleChangePostalCode} />
                    </div>
                    <div class="col">
                        <select className="form-control" value={this.state.address}
                            onChange={this.handleChangeAddress}>
                            <option values="" selected>Select an address</option>
                            {this.state.allAddresses.map((adr) =>
                                <option value={adr.replace("{", "").replace("}", "")}>{adr.replace("{", "").replace("}", "")}</option>
                            )}
                        </select>
                    </div>
                </div>

                <hr />

                <div className="md-form pb-3">
                    <input type="email" name="email" className="form-control validate" placeholder="Email Address" value={this.state.email}
                        onChange={this.handleChangeEmail} required></input>
                </div>

                <div className="md-form pb-3">
                    <input type="password" name="password" className="form-control validate" placeholder="Password" value={this.state.password}
                        onChange={this.handleChangePassword} required></input>
                </div>

                <hr />

                <div className="form-row pb-3">
                    <div className="col">
                        <input type="checkbox" id="customerTermsCheck" required />
                        <label class="form-check-label" for="customerTermsCheck">
                            <p className="font-small blue-text d-flex justify-content-end">Accept <a href="!#"
                                className="blue-text ml-2" data-toggle="modal" data-target="#terms">
                                Terms & Condition</a>
                            </p>
                        </label>

                        <div class="modal fade" id="terms" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Terms & Condition</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div dangerouslySetInnerHTML={{ __html: this.state.termsandConditionContent.termscontent }} />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">I Agree</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <input type="checkbox" id="customerPrivacyCheck" required />
                        <label class="form-check-label" for="customerPrivacyCheck">
                            <p className="font-small blue-text d-flex justify-content-end">Accept <a href="!#"
                                className="blue-text ml-2" data-toggle="modal" data-target="#privacy">
                                Privacy & Policy</a>
                            </p>
                        </label>
                        <div class="modal fade" id="privacy" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Privacy Policy</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <div dangerouslySetInnerHTML={{ __html: this.state.privacyPolicyContent.policycontent }} />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">I Agree</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-3">
                    <button type="submit" className="btn bg-black btn-block text-white z-depth-1a">Sign Up</button>
                </div>
            </form>
        </div>;
    }

    ProviderLoginDetails(registeredProvider) {
        return (
            <div className="pt-5">

                <div className="alert alert-success mt-5 mb-5 registerWelcome" role="alert">
                    <p>Welcome to Register as service Provider. Please check your registered email and confirm your account.</p>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="text" name="firstname" className="form-control validate" placeholder="First Name" value=""
                                onChange={this.handleChangeFirstname} required />
                        </div>
                        <div class="col">
                            <input type="text" name="surname" className="form-control validate" placeholder="Last Name" value=""
                                onChange={this.handleChangeSurname} required></input>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="number" name="phone" className="form-control validate" placeholder="Phone" value=""
                                onChange={this.handleChangePhone} required />
                        </div>
                        <div class="col">
                            <input type="number" name="mobile" className="form-control validate" placeholder="Mobile" value=""
                                onChange={this.handleChangeMobile} required></input>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value=""
                                onChange={this.handleChangePostalCode} />
                        </div>
                        <div class="col">
                            <select className="form-control" value={this.state.address}
                                onChange={this.handleChangeAddress}>
                                {this.state.allAddresses.map((adr) =>
                                    <option value={adr.replace("{", "").replace("}", "")}>{adr.replace("{", "").replace("}", "")}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <hr />

                    <div className="md-form pb-3">
                        <input type="email" name="email" className="form-control validate" placeholder="Email Address" value=""
                            onChange={this.handleChangeEmail} required></input>
                    </div>

                    <div className="md-form pb-3">
                        <input type="password" name="password" className="form-control validate" placeholder="Password" value=""
                            onChange={this.handleChangePassword} required></input>
                    </div>

                    <hr />

                    <div className="form-row pb-3">
                        <div className="col">
                            <input type="checkbox" id="customerTermsCheck" required />
                            <label class="form-check-label" for="customerTermsCheck">
                                <p className="font-small blue-text d-flex justify-content-end">Accept <a href="!#"
                                    className="blue-text ml-2" data-toggle="modal" data-target="#terms">
                                    Terms & Condition</a>
                                </p>
                            </label>

                            <div class="modal fade" id="terms" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Terms & Condition</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div dangerouslySetInnerHTML={{ __html: this.state.termsandConditionContent.termscontent }} />
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">I Agree</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <input type="checkbox" id="customerPrivacyCheck" required />
                            <label class="form-check-label" for="customerPrivacyCheck">
                                <p className="font-small blue-text d-flex justify-content-end">Accept <a href="!#"
                                    className="blue-text ml-2" data-toggle="modal" data-target="#privacy">
                                    Privacy & Policy</a>
                                </p>
                            </label>
                            <div class="modal fade" id="privacy" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Privacy Policy</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div dangerouslySetInnerHTML={{ __html: this.state.privacyPolicyContent.policycontent }} />
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">I Agree</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }

}

export class RegisteredCustomer {
    Message: string = "";
}
