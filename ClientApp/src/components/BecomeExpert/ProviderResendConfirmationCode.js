import React, { Component } from "react";
import AuthenticateServiceProvider from "../AuthenticateServiceProvider";
import { RegisterServiceProvider } from "../RegisterServiceProvider";
import { Redirect, withRouter } from "react-router-dom";
import App from "../../App";
import toastr from "toastr";

class ProviderResendConfirmationCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };

    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  resendCode(email) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email
      })
    };
    return fetch(
      App.ApisBaseUrl + "/api/Confirmation/resendconfirmationcodeV2",
      requestOptions
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.message === "No data found") {
          toastr["error"]("No data found");
        } else if (response.message === "Please enter a valid e-mail adress") {
          toastr["error"]("Please enter a valid e-mail adress");
        } else if (response.statuscode === 200) {
          this.props.history.push({
            pathname: "/provider-authentication",
            state: response.message
          });
        }
      });
  }

  changeEmailHandler(e) {
    this.setState({ email: e.target.value });
  }
  submitHandler(e) {
    e.preventDefault();
    this.resendCode(this.state.email);
  }

  render() {
    return (
      <div id="MainPageWrapper">
        <section className="section-padding">
          <div className="container">
            <div className="row pb-4 mb-5 pt-5">
              <div className="col-md-12 resendConfirmationCode  mt-5 mb-5">
                <form onSubmit={this.submitHandler}>
                  <div className="md-form pb-3">
                    <input
                      type="text"
                      className="form-control validate"
                      name="confirmationcode"
                      values={this.state.email}
                      onChange={this.changeEmailHandler}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="text-center mb-3">
                    <button
                      type="submit"
                      className="btn bg-orange btn-block text-white"
                    >
                      Resend Code
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(ProviderResendConfirmationCode);
