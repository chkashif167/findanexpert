import React, { Component } from "react";
import App from "../../../App";
import toastr from "toastr";
import { withRouter } from "react-router-dom";

class ProviderConfirmCodeForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resetcode: "",
      codeConfirmed: false,
      ccode: "",
      password: "",
      cpassword: ""
    };

    this.handleChangeResetcode = this.handleChangeResetcode.bind(this);
    this.handleChangeResetPassword = this.handleChangeResetPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitReset = this.handleSubmitReset.bind(this);
  }

  confirmResetCode(resetcode) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetcode: resetcode })
    };
    console.log(requestOptions);

    return fetch(
      App.ApisBaseUrl + "/api/Reset/checkresetpasswordcodeV2",
      requestOptions
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.statuscode == 200) {
          toastr["success"](response.message);
          this.setState({ codeConfirmed: true });
        } else {
          toastr["error"](response.message);
        }
      });
  }
  resetPasswored(ccode, password) {
    if (this.state.password != this.state.cpassword) {
      toastr["error"]("Passwords do not match");
      return false;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetcode: ccode, newpassword: password })
    };
    console.log(requestOptions);

    return fetch(App.ApisBaseUrl + "/api/Reset/resetpasswordV2", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.statuscode == 200) {
          toastr["success"](response.message);
          this.props.history.push({
            pathname: "/provider-authentication"
          });
        } else {
          toastr["error"](response.message);
        }
      });
  }

  handleChangeResetcode(e) {
    this.setState({ resetcode: e.target.value });
  }
  handleChangeResetPassword(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { resetcode } = this.state;
    this.confirmResetCode(resetcode);
    this.setState({ ccode: e.target.value });
  }

  handleSubmitReset(e) {
    e.preventDefault();
    const { ccode, password, resetcode } = this.state;
    this.resetPasswored(resetcode, password);
  }

  render() {
    if (this.state.codeConfirmed) {
      return this.resetPassword();
      //return this.confirmCode();
    } else {
      return this.confirmCode();
      //return this.resetPassword();
    }
  }

  confirmCode() {
    return (
      <div id="MainPageWrapper">
        <section className="account-details section-padding">
          <div className="services-wrapper">
            <div className="container">
              <div className="row pb-4">
                <div className="col-md-12">
                  <form
                    onSubmit={this.handleSubmit}
                    className="signinRegisterWrap p-5"
                  >
                    <div className="md-form pb-3 text-center">
                      <h3>Confirm Code</h3>
                    </div>

                    <div className="md-form pb-4">
                      <input
                        type="text"
                        className="form-control validate"
                        name="email"
                        values={this.state.resetcode}
                        onChange={this.handleChangeResetcode}
                        placeholder="Confirm Code"
                        required
                      />
                      <p className="font-small blue-text d-flex justify-content-end">
                        <a
                          href="/provider-forgot-password"
                          className="blue-text ml-1"
                        >
                          Resend Code
                        </a>
                      </p>
                    </div>

                    <div className="text-right pb-4">
                      <button
                        type="submit"
                        className="btn bg-orange text-white"
                      >
                        Confirm
                      </button>
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

  resetPassword() {
    return (
      <div id="MainPageWrapper">
        <section className="account-details section-padding">
          <div className="services-wrapper">
            <div className="container">
              <div className="row pb-4">
                <div className="col-md-12">
                  <form
                    onSubmit={this.handleSubmitReset}
                    className="signinRegisterWrap p-5"
                  >
                    <div className="md-form pb-3 text-center">
                      <h3>Reset Password</h3>
                    </div>

                    <div className="md-form pb-4">
                      <input
                        type="text"
                        className="form-control validate"
                        name="ccode"
                        value={this.state.ccode}
                        onChange={this.handleChangeResetPassword}
                        placeholder="Confirm Code"
                        required
                      />
                    </div>

                    <div className="md-form pb-4">
                      <input
                        type="password"
                        className="form-control validate"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChangeResetPassword}
                        placeholder="Password"
                        required
                      />
                    </div>

                    <div className="md-form pb-4">
                      <input
                        type="password"
                        className="form-control validate"
                        name="cpassword"
                        value={this.state.cpassword}
                        onChange={this.handleChangeResetPassword}
                        placeholder="Confirm Password"
                        required
                      />
                    </div>

                    <div className="text-right pb-4">
                      <button
                        type="submit"
                        className="btn bg-orange text-white"
                      >
                        Reset
                      </button>
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

export default withRouter(ProviderConfirmCodeForgotPassword);
