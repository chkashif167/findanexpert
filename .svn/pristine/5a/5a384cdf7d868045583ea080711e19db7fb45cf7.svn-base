import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import App from '../App';
import loader from '../assets/img/loader.gif';
import toastr from 'toastr';

export interface RegisteredCustomerDataState {
    registeredCustomer: RegisteredCustomer;
    firstname: string;
    surname: string;
    phone: string;
    mobile: string;
    email: string;
    password: string;
    postalcode: string;
    address: string;
    registered: boolean;
}

export class RegisterCustomer extends Component {
    displayName = RegisterCustomer.name

    constructor(props) {
        super(props);

        this.state = {
            registeredCustomer: new RegisteredCustomer(),
            allAddresses: [],
            firstname: '', surname: '', email: '', password: '', mobile: '', postalcode: '', address: '',
            gender: 'Male', privacyPolicyContent: '', termsandConditionContent: '', registered: false
        };

        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        fetch(App.ApisBaseUrl + '/api/Policy/getcustomertermsandconditioncontent')
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ termsandConditionContent: response });
                }
            });

        fetch(App.ApisBaseUrl + '/api/Policy/getcustomerprivacypolicycontent')
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ privacyPolicyContent: response });
                }
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

    Register(firstname, surname, email, password, mobile, postalcode, address, gender) {

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const referralToken = params.get('referraltoken');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Firstname: firstname,
                Surname: surname,
                Email: email,
                Password: password,
                Mobile: mobile,
                PostalCode: postalcode,
                Address: address,
                Gender: gender,
                privacypolicyaccepted: true,
                termsandconditionaccepted: true,
                deviceid: 0,
                devicename: "",
                macaddress: ""
            })
        };

        console.log(requestOptions);

        if (this.state.address == '') {
            toastr["error"]("Please Select an Address!");
        }
        else {
            return fetch(App.ApisBaseUrl + '/api/Registration/customerregistration', requestOptions)
                .then(response => {
                    console.log(response);
                    localStorage.setItem('customerRegisterStatus', response.status);
                    if (response.status == '409') {
                        toastr["error"]("This email is already registered. Please choose another one!");
                        
                    } else {
                        return response.json();
                    }
                })
                .then(response => {
                    console.log(response);
                    if (response != null) {
                        if (localStorage.getItem('customerRegisterStatus') == '400') {
                            if (response.password != '') {
                                toastr["error"]("Your password must include at least Mimimum of 8 Characters 1 Upper case 1 Lower case!");
                            }
                        }
                        else {
                            this.setState({ registeredCustomer: response, registered: true });

                            if (referralToken != '') {
                                fetch(App.ApisBaseUrl + '/api/Referral/savereference?referraltoken=referralToken')
                                    .then(response => {
                                        console.log(response);
                                        return response.json();
                                    })
                                    .then(response => {
                                        console.log(response);
                                    });
                            }
                        }
                    }
                });
        }

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

        return fetch(App.ApisBaseUrl + '/api/BaseApi/getaddresses', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
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

    handleChangeGender(e) {
        this.setState({ gender: e.target.value });
        localStorage.setItem('gender', e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { firstname, surname, email, password, mobile, postalcode, address, gender } = this.state;
        this.Register(firstname, surname, email, password, mobile, postalcode, address, gender);
    }

    render() {
        let contents = this.state.registered
            ? this.renderCustomerProfile(this.state.registeredCustomer)
            : this.renderRegisterCustomerScreen();
        return <div>
            {contents}
        </div>;
    }

    renderRegisterCustomerScreen() {

        return (
            <div className="Register">
                <div className="loginRegisterTopText">
                    <h3>New to Findanexpert.net?</h3>
                    <p>Create an account now</p>
                </div>

                {this.state.termsNotCheck}
                <form onSubmit={this.handleSubmit}>

                    <div className="md-form pb-3">
                        <input type="text" name="firstname" className="form-control validate" placeholder="First Name" value={this.state.firstname}
                                onChange={this.handleChangeFirstname} required />
                    </div>

                    <div className="md-form pb-3">
                        <input type="text" name="surname" className="form-control validate" placeholder="Last Name" value={this.state.surname}
                            onChange={this.handleChangeSurname} required></input>
                    </div>


                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="number" name="mobile" className="form-control validate" placeholder="Mobile" value={this.state.mobile}
                                onChange={this.handleChangeMobile} required></input>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div className="col">
                            <input type="radio" name="gender" className="genderCheckBox" value={this.state.gender}
                                onChange={this.handleChangeGender} />
                            <label className="ml-2">Male</label>
                        </div>
                        <div className="col">
                            <input type="radio" name="gender" className="genderCheckBox" value={this.state.gender}
                                onChange={this.handleChangeGender} />
                            <label className="ml-2">Female</label>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div className="col">
                            <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value={this.state.postalcode}
                                onChange={this.handleChangePostalCode} />
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div className="col">
                            <select className="form-control" value={this.state.address}
                                onChange={this.handleChangeAddress}>
                                <option value="na" selected>Please Select Address</option>
                                {this.state.allAddresses.map((adr) =>
                                    <option value={adr.replace("{", "").replace("}", "")}>{adr.replace("{", "").replace("}", "")}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="md-form pb-3">
                        <input type="email" name="email" className="form-control validate" placeholder="Email Address" value={this.state.email}
                            onChange={this.handleChangeEmail} required></input>
                    </div>

                    <div className="md-form pb-3">
                        <input type="password" name="password" className="form-control validate" placeholder="Password" value={this.state.password}
                            onChange={this.handleChangePassword} required></input>
                    </div>

                    <div className="form-row termsConditionsWrap pb-3">
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

    renderCustomerProfile() {
        return (
            <div>
                <div className="alert alert-success" role="alert">
                    <p>Welcome to Find an Expert. Please check your registered email and confirm your account.</p>
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
                            <input type="number" name="mobile" className="form-control validate" placeholder="Mobile" value=""
                                onChange={this.handleChangeMobile} required></input>
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div className="col">
                            <input type="text" name="postalcode" className="form-control validate" placeholder="Postalcode" value={this.state.postalcode}
                                onChange={this.handleChangePostalCode} />
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div className="col">
                            <select className="form-control" value={this.state.address}
                            onChange={this.handleChangeAddress}>
                                <option value="na" selected>Please Select Address</option>
                                {this.state.allAddresses.map((adr) =>
                                    <option value={adr.replace("{", "").replace("}", "")}>{adr.replace("{", "").replace("}", "")}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="md-form pb-3">
                        <select className="form-control my-1 mr-sm-2" value=""
                            onChange={this.handleChangeGender} >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="md-form pb-3">
                        <input type="email" name="email" className="form-control validate" placeholder="Email Address" value=""
                            onChange={this.handleChangeEmail} required></input>
                    </div>

                    <div className="form-row pb-3">
                        <div className="col">
                            <input type="password" name="password" className="form-control validate" placeholder="Password" value=""
                                onChange={this.handleChangePassword} required></input>
                        </div>
                    </div>

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
