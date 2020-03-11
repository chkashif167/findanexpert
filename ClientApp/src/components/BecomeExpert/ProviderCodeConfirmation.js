import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import App from "../../App";
import toastr from "toastr";

class ProviderCodeConfirmation extends Component {
  //displayName = ProviderCodeConfirmation.name;
  constructor(props) {
    super(props);
    this.state = {
      confirmationcode: "",
      redirectMessage: this.props.location.state
    };
    this.confirmationcode = this.confirmationcode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  confirmationCodeCall(confirmationcode) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: confirmationcode
      })
    };

    return fetch(App.ApisBaseUrl + "/api/Confirmation/provider", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.message === "Invalid code") {
          toastr["error"]("Invalid code");
        } else if (
          response.message ===
          "Activation code invalid/expired. Please try with valid code!"
        ) {
          toastr["error"](
            "Activation code invalid/expired. Please try with valid code!"
          );
        } else if (response.statuscode === 200) {
          this.props.history.push({
            pathname: "/provider-authentication",
            state: response.message
          });
        }
      });
  }

  confirmationcode(e) {
    this.setState({ confirmationcode: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { confirmationcode } = this.state;
    this.confirmationCodeCall(confirmationcode);
  }

  render() {
    return (
      <div id="MainPageWrapper">
        <section className="section-padding">
          <div className="container">
            {this.state.redirectMessage && (
              <p className="alert alert-success">
                {this.state.redirectMessage}
              </p>
            )}
            <div className="row pb-4 mb-5 pt-5">
              <div className="col-md-12  confirmCodeWrapper mt-5 mb-5">
                <form onSubmit={this.handleSubmit}>
                  <div className="md-form pb-3">
                    <input
                      type="text"
                      className="form-control validate"
                      name="confirmationcode"
                      values={this.state.confirmationcode}
                      onChange={this.confirmationcode}
                      placeholder="Confirmation Code"
                      required
                    />
                  </div>

                  <div className="md-form pb-3">
                    <p className="font-small blue-text d-flex justify-content-end">
                      <a
                        href="/provider-resend-confirmation-code"
                        className="blue-text ml-1"
                      >
                        Resend Code
                      </a>
                    </p>
                  </div>

                  <div className="text-center mb-3">
                    <button
                      type="submit"
                      className="btn bg-orange btn-block text-white"
                    >
                      Confirm Code
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

export default withRouter(ProviderCodeConfirmation);
