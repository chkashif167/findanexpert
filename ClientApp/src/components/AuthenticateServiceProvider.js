import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import App from "../App";
import toastr from "toastr";

class AuthenticateServiceProvider extends Component {
  //displayName = AuthenticateServiceProvider.name;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      serviceProviderAddresses: [],
      addressesList: [],
      submitted: false,
      isAuthenticated: null,
      showModal: "hide",
      modalMessage: ""
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
  }

  login(username, password, sEmail) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: username,
        password: password
      })
    };
    return fetch(App.ApisBaseUrl + "/api/SignIn/providersignin", requestOptions)
      .then(response => {
        return response.json();
      })

      .then(response => {
        console.log("loginnnnnn", response);
        // if (response.message == "Incorrect password, please try again.") {
        //   toastr["error"]("Incorrect password, please try again.");
        // } else if (
        //   response.message == "Email does not exist. Please sign up."
        // ) {
        //   toastr["error"]("Email does not exist. Please sign up.");
        // } else if (response.message == "Please enter a valid e-mail adress") {
        //   toastr["error"]("Please enter a valid e-mail adress");
        // } else if (
        //   response.message ==
        //   "Your email is not confirmed, Please confirm it first."
        // ) {
        //   this.props.history.push({
        //     pathname: "/provider-code-confirmation",
        //     state: response.message
        //   });
        // } else if (response.message == "Success") {
        //   console.log("Response", response);
        //   localStorage.setItem("provideraccesstoken", response.authtoken);
        //   localStorage.setItem("serviceproviderid", response.serviceproviderid);
        //   localStorage.setItem("firstname", response.firstname);
        //   localStorage.setItem("lastname", response.lastname);
        //   localStorage.setItem("email", sEmail);
        //   localStorage.setItem(
        //     "isaccountconfirmed",
        //     response.isaccountconfirmed
        //   );
        //   localStorage.setItem("mobile", response.mobile);
        //   localStorage.setItem("gender", response.gender);
        //   localStorage.setItem("genderpreference", response.genderpreference);
        //   localStorage.setItem("dob", response.dob);
        //   localStorage.setItem("imagepath", response.imagepath);
        //   localStorage.setItem("isapproved", response.isapproved);
        //   localStorage.setItem("postalcode", response.postalcode);
        //   localStorage.setItem("inhouse", response.inhouse);
        //   localStorage.setItem("inclinic", response.inclinic);
        //   localStorage.setItem("address", response.address);

        //   this.props.history.push("/jobs");
        // }


        if (response.message == "Success") {
          console.log("Response", response);
          localStorage.setItem("provideraccesstoken", response.authtoken);
          localStorage.setItem("serviceproviderid", response.serviceproviderid);
          localStorage.setItem("firstname", response.firstname);
          localStorage.setItem("lastname", response.lastname);
          localStorage.setItem("email", sEmail);
          localStorage.setItem(
            "isaccountconfirmed",
            response.isaccountconfirmed
          );
          localStorage.setItem("mobile", response.mobile);
          localStorage.setItem("gender", response.gender);
          localStorage.setItem("genderpreference", response.genderpreference);
          localStorage.setItem("dob", response.dob);
          localStorage.setItem("imagepath", response.imagepath);
          localStorage.setItem("isapproved", response.isapproved);
          localStorage.setItem("postalcode", response.postalcode);
          localStorage.setItem("inhouse", response.inhouse);
          localStorage.setItem("inclinic", response.inclinic);
          localStorage.setItem("address", response.address);

          this.props.history.push("/jobs");
        } else {
          toastr["error"](response.message);
        }
      });
  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    //////////////////////////////////////passwordField
    var passwordField = document.getElementById("passwordField");
    if (passwordField.value.length < 8) {
      toastr["error"]("Please enter at least 8 characters");
      return false;
    }
    const { username, password } = this.state;
    const sEmail = this.state.username;
    this.login(username, password, sEmail);
  }

  render() {
    return (
      <div className="Login">
        <div className="loginRegisterTopText">
          <h3>Already have an Account?</h3>
          <p>Welcome back! please sign in</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="md-form pb-3">
            <input
              type="text"
              className="form-control validate"
              name="username"
              values={this.state.username}
              onChange={this.handleChangeUsername}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="md-form pb-3">
            <input
              id="passwordField"
              type="password"
              className="form-control validate"
              name="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
              placeholder="Password"
              required
            />
          </div>

          <div className="md-form pb-3">
            <p className="font-small blue-text d-flex justify-content-end">
              Forgot{" "}
              <a href="/provider-forgot-password" className="blue-text ml-1">
                Password?
              </a>
            </p>
          </div>

          <div className="text-center mb-3">
            <button
              type="submit"
              className="btn bg-orange btn-block text-white"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AuthenticateServiceProvider);
