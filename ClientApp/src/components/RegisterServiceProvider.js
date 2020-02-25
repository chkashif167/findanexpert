import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, withRouter } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import App from "../App";
import toastr from "toastr";

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
      serviceproviderid: "0",
      image: "",
      privacyPolicyContent: "",
      termsandConditionContent: "",
      registered: false,
      modalMessage: "",
      showModal: "hide"
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
    serviceproviderid,
    image,
    privacypolicyaccepted,
    termsandconditionaccepted
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
        ServiceProviderId: serviceproviderid,
        Image: image,
        deviceid: "id123",
        macaddress: "123",
        devicename: "web",
        istermsaccepted: true,
        isprivacyaccepted: true
      })
    };
    console.log("requestOptions", requestOptions);
    return fetch(App.ApisBaseUrl + "/api/SignUp/providersignup", requestOptions)
      .then(response => {
        localStorage.setItem("providerRegisterStatus", response.status);
        if (response.status == "409") {
          toastr["error"](
            "This email address is already registered. If you're a returning customer, sign in to your account or reset your password."
          );
        } else if (response.status == "400") {
          toastr["error"]("Your Password should contain minimum 8 characters.");
        } else if (response.status == "404") {
          toastr["error"]("Invalid postal code");
        } else {
          window.scrollTo(0, 0);
          return response.json();
        }
      })
      .then(response => {
        console.log("response..", response);
        if (response != null) {
          if (
            response.password ==
            "Your password must include at least Mimimum of 8 Characters 1 Upper case 1 Lower case"
          ) {
            toastr["error"](
              "Your password must include at least Mimimum of 8 Characters 1 Upper case 1 Lower case"
            ); 
          } 
          else if (response.message=="The Gender field is required.") {
            toastr["error"]("The Gender field is required.");
          }
          else if (
            response.message == "Password minimum length should be 4 characters"
          ) {
            toastr["error"]("Password minimum length should be 4 characters");
          } else if (
            response.message == "Email already exists. Please sign in"
          ) {
            toastr["error"]("Email already exists. Please sign in");
          } else if (response.message == "Please enter a valid e-mail adress") {
            toastr["error"]("Please enter a valid e-mail adress");
          } else if (localStorage.getItem("providerRegisterStatus") == "200") {
            this.setState({ registeredProvider: response, registered: true });
            this.props.history.push({
              pathname:"/provider-code-confirmation",
              state: response.message
            });
            // this.setState({
            //   modalMessage: response.message,
            //   showModal: "show"
            // });
          }
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
        e.target.value,
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
    const {
      firstname,
      lastname,
      email,
      password,
      mobile,
      postalcode,
      address,
      gender,
      serviceproviderid,
      image,
      privacyPolicyContent,
      termsandConditionContent
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
      serviceproviderid,
      image,
      privacyPolicyContent,
      termsandConditionContent
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
          <div className="form-row pb-3">
            <div class="col">
              <select
                className="form-control"
                value={this.state.address}
                onChange={this.handleChangeAddress}
                name="address"
                required
              >
                <option value="" selected>
                  Select an address
                </option>
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
          </div>

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
              id="txtPassword"
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
