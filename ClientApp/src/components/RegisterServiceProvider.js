import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import App from "../App";
import toastr from "toastr";
import { myConfig } from '../config'

class RegisterService extends Component {
  displayName = RegisterService.name;

  constructor(props) {
    super(props);

    this.state = {
      registeredCustomer: new RegisteredCustomer(),
      allAddresses: [],
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      cpassword: "",
      mobile: "",
      postalcode: "",
      address: "",
      gender: "",
      // serviceproviderid: "0",
      // image: "",
      privacyPolicyContent: "",
      termsandConditionContent: "",
      // registered: false,
      // modalMessage: "",
      // showModal: "hide"
      deviceid: "",
      macaddress: "",
      devicename: "",
      inclinic: false,
      inhouse: true,
      istermsaccepted: true,
      isprivacyaccepted: true
    };

    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeGenderPreference = this.handleChangeGenderPreference.bind(
      this
    );
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    fetch(App.ApisBaseUrl + "/api/Policy/getprovidertermsandconditioncontent")
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(response => {
        if (response.statuscode == 200) {
          this.setState({ termsandConditionContent: response });
        }
      });

    fetch(App.ApisBaseUrl + "/api/Policy/getproviderprivacypolicycontent")
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(response => {
        if (response.statuscode == 200) {
          this.setState({ privacyPolicyContent: response });
        }
      });
  }

  getInitialState = () => {
    const initialState = {};
    return initialState;
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  Register(
    firstname,
    lastname,
    email,
    password,
    mobile,
    postalcode,
    address,
    gender,
    // serviceproviderid,
    // image,
    // privacypolicyaccepted,
    // termsandconditionaccepted
    inclinic,
    inhouse,
    istermsaccepted,
    isprivacyaccepted
  ) {
    if (this.state.password !== this.state.cpassword) {
      toastr["error"]("Password and Confirm Password not matching");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        Firstname: firstname,
        lastname: lastname,
        Email: email,
        Password: password,
        Mobile: mobile,
        PostalCode: postalcode,
        Address: address,
        Gender: gender,
        // ServiceProviderId: serviceproviderid,
        // Image: image,
        deviceid: "deviceid123",
        macaddress: "macaddress123",
        devicename: "devicenameweb",
        inclinic: inclinic,
        inhouse: inhouse,
        istermsaccepted: istermsaccepted,
        isprivacyaccepted: isprivacyaccepted
      })
    };
    console.log("requestOptions", requestOptions);
    return fetch(App.ApisBaseUrl + "/api/SignUp/providersignup", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(response => {

        if (response.statuscode == 200) {
          this.props.history.push({
            pathname: "/provider-code-confirmation",
            state: response.message
          });
        } else {
          toastr["error"](response.message);
        }
      });
  }

  handleChangeFirstname(e) {
    this.setState({ firstname: e.target.value });
  }

  handleChangeLastname(e) {
    this.setState({ lastname: e.target.value });
  }

  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleChangecPassword = e => {
    this.setState({ cpassword: e.target.value });
  };
  handleChangeMobile(e) {
    this.setState({ mobile: e.target.value });
  }

  handleChangePostalCode(e) {
    this.setState({ postalcode: e.target.value });

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
      //body: JSON.stringify({ postalcode: e.target.value })
    };
    console.log(requestOptions);
    return fetch(
      App.ApisBaseUrl +
      "/api/Address/getaddresses?postalcode=" +
      e.target.value + "&apikey=" + myConfig.ADDRESSES_API_KEY,
      requestOptions
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response != null) {
          this.setState({ allAddresses: response.get_address });
        }
      });
  }

  handleChangeAddress(e) {
    this.setState({ address: e.target.value });
  }

  handleChangeGenderPreference(e) {
    this.setState({ genderpreference: e.target.value });
  }

  handleChangeGender(e) {
    this.setState({ gender: e.target.value });
  }

  handleModal() {
    this.setState({ showModal: "hide" });
    //    window.location.replace("/provider-authentication");
    //    this.props.history.push("/provider-authenticationd");
    //this.props.onFinish("signIn");
  }

  handleSubmit(e) {
    e.preventDefault();
    // const validEmailRegex = RegExp(
    //   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    // );
    /////////////////////////////////
    // var firstNameField = document.getElementById("firstNameField");
    // if (firstNameField.value == "") {
    //   toastr["error"]("First Name Filed Should not empty");
    // } else if (firstNameField.value.match(/\d+/g) != null) {
    //   toastr["error"]("Number is not allow in First Name");
    // }
    //////////////////////////////////////
    // var lastNameField = document.getElementById("lastNameField");
    // if (lastNameField.value == "") {
    //   toastr["error"]("First Name Filed Should not empty");
    // } else if (lastNameField.value.match(/\d+/g) != null) {
    //   toastr["error"]("Number is not allow in First Name");
    // }
    //////////////////////////////////////mobileField
    var mobileField = document.getElementById("mobileField");
    if (mobileField.value.length < 11 || mobileField.value.length > 11) {
      toastr["error"]("Entery 11 digit correct mobile number");
      return false;
    }
    //////////////////////////////////////passwordField
    var passwordField = document.getElementById("passwordField");
    if (passwordField.value.length < 8) {
      toastr["error"]("Please enter at least 8 characters");
      return false;
    }

    const {
      firstname,
      lastname,
      email,
      password,
      mobile,
      postalcode,
      address,
      gender,
      // serviceproviderid,
      // image,
      // privacyPolicyContent,
      // termsandConditionContent,
      inclinic,
      inhouse,
      istermsaccepted,
      isprivacyaccepted
    } = this.state;
    this.Register(
      firstname,
      lastname,
      email,
      password,
      mobile,
      postalcode,
      address,
      gender,
      // serviceproviderid,
      // image,
      // privacyPolicyContent,
      // termsandConditionContent
      inclinic,
      inhouse,
      istermsaccepted,
      isprivacyaccepted
    );
  }

  render() {
    let contents = this.state.registered
      ? // ? this.ProviderLoginDetails(this.state.registeredProvider)
      this.ProviderLogin()
      : this.ProviderLogin();
    return <div>{contents}</div>;
  }

  ProviderLogin() {
    return (
      <div className="Register">
        <div className="loginRegisterTopText">
          <h3>New to Findanexpert.net?</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row pb-3">
            <div class="col">
              <input
                type="text"
                name="firstname"
                className="form-control validate"
                placeholder="First Name"
                value={this.state.firstname}
                onChange={this.handleChangeFirstname}
                required
              />
            </div>
          </div>
          <div className="form-row pb-3">
            <div class="col">
              <input
                type="text"
                name="lastname"
                className="form-control validate"
                placeholder="Last Name"
                value={this.state.lastname}
                onChange={this.handleChangeLastname}
                required
              ></input>
            </div>
          </div>

          <div className="form-row pb-3">
            <div class="col">
              <input
                id="mobileField"
                type="number"
                name="mobile"
                className="form-control validate"
                placeholder="Mobile"
                value={this.state.mobile}
                onChange={this.handleChangeMobile}
                required
              ></input>
            </div>
          </div>

          <div className="form-row pb-3">
            <div className="col">
              <input
                type="radio"
                name="gender"
                className="genderCheckBox"
                required=""
                value="Male"
                onChange={this.handleChangeGender}
                required
              />
              <label className="ml-2">Male</label>
            </div>
            <div className="col">
              <input
                type="radio"
                name="gender"
                className="genderCheckBox"
                required=""
                value="Female"
                onChange={this.handleChangeGender}
                required
              />
              <label className="ml-2">Female</label>
            </div>
          </div>

          <div className="form-row pb-3">
            <div class="col">
              <input
                type="text"
                name="postalcode"
                className="form-control validate"
                placeholder="Postalcode"
                value={this.state.postalcode}
                onChange={this.handleChangePostalCode}
              />
            </div>
          </div>


          <div className="addressAccordion" id="accordion">

            <div class="heading" id="headingOne">
              <h5 class="mb-0">
                <a class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Find your address
        </a>
              </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div className="form-row pb-3">
                <div class="col">
                  <select className="form-control" value={this.state.address}
                    onChange={this.handleChangeAddress.bind(this)}>
                    <option value="">Please select an address</option>
                    {this.state.allAddresses &&
                      <option value="" selected> {this.state.noAddressFound} </option>
                    }

                    {this.state.allAddresses.map((adr) =>
                      <option value={adr.replace("{", " ").replace("}", " ")}>{adr.replace("{", " ").replace("}", " ")}</option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            <div class="heading" id="headingTwo">
              <h5 class="mb-0">
                <a class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Add manual address
        </a>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div className="form-row pb-3">
                <div className="col">
                  <input type="text" name="postalcode" className="form-control validate" placeholder="Your address" value={this.state.address}
                    onChange={this.handleChangeAddress.bind(this)} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="form-row pb-3">
            <div class="col">
              <select
                className="form-control"
                value={this.state.address}
                onChange={this.handleChangeAddress}
                name="address"
              >
                <option value="" selected>
                  Select an address
                </option>
                {!this.state.allAddresses && (
                  <option value="" selected>
                    Invalid Postal Code
                  </option>
                )}
                {this.state.allAddresses &&
                  this.state.allAddresses.map(adr => (
                    <option
                      key={adr}
                      value={adr.replace("{", "").replace("}", "")}
                    >
                      {adr.replace("{", "").replace("}", "")}
                    </option>
                  ))}
              </select>
            </div>
          </div> */}

          {/* {!this.state.allAddresses && (
            <div className="md-form pb-3">
              <input
                type="text"
                name="address"
                className="form-control validate"
                placeholder=" Alternate Address"
                value={this.state.address}
                onChange={this.handleChangeAddress}
              ></input>
            </div>
          )} */}

          <hr />

          <div className="md-form pb-3">
            <input
              type="email"
              name="email"
              className="form-control validate"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.handleChangeEmail}
              required
            ></input>
          </div>

          <div className="md-form pb-3">
            <input
              id="passwordField"
              type="password"
              name="password"
              className="form-control validate"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChangePassword}
              required
            ></input>
          </div>

          <div className="md-form pb-3">
            <input
              id="txtCPassword"
              type="password"
              name="cpassword"
              className="form-control validate"
              placeholder="Confirm Password"
              value={this.state.cpassword}
              onChange={this.handleChangecPassword}
              required
            ></input>
          </div>

          <hr />

          <div className="form-row pb-3">
            <div className="col">
              <input type="checkbox" id="customerTermsCheck" required />
              <label class="form-check-label" for="customerTermsCheck">
                <p className="font-small blue-text d-flex justify-content-end">
                  Accept{" "}
                  <a
                    href="!#"
                    className="blue-text ml-2"
                    data-toggle="modal"
                    data-target="#terms"
                  >
                    Terms & Condition
                  </a>
                </p>
              </label>

              <div
                class="modal fade"
                id="terms"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Terms & Condition</h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.termsandConditionContent
                            .termscontent
                        }}
                      />
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        I Agree
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <input type="checkbox" id="customerPrivacyCheck" required />
              <label class="form-check-label" for="customerPrivacyCheck">
                <p className="font-small blue-text d-flex justify-content-end">
                  Accept{" "}
                  <a
                    href="!#"
                    className="blue-text ml-2"
                    data-toggle="modal"
                    data-target="#privacy"
                  >
                    Privacy & Policy
                  </a>
                </p>
              </label>
              <div
                class="modal fade"
                id="privacy"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Privacy Policy</h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.privacyPolicyContent.policycontent
                        }}
                      />
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        I Agree
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-3">
            <button
              type="submit"
              className="btn bg-black btn-block text-white z-depth-1a"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div
          class={"modal fade " + this.state.showModal}
          id="referralModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="logoutModal"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div></div>
                    <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">
                      Expert
                    </h3>
                  </div>
                  <div className="col-md-12 text-center fs-18 p-5">
                    {this.state.modalMessage}
                  </div>
                  <div className="col-md-12 text-right">
                    <div className="w-100">
                      <a
                        id="okBtn"
                        class="btn bg-black text-white float-right ml-3"
                        onClick={this.handleModal.bind(this)}
                      >
                        OK
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const RegisterServiceProvider = withRouter(RegisterService);
export { RegisterServiceProvider };
export class RegisteredCustomer {
  Message: string = "";
}
