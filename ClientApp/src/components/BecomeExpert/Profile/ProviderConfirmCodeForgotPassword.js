import React, { Component } from "react";
import App from "../../../App";
import toastr from "toastr";
import { withRouter } from "react-router-dom";

class ProviderConfirmCodeForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
        resetcode: "",
       };

    this.handleChangeResetcode = this.handleChangeResetcode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  confirmResetCode(resetcode) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetcode: resetcode, })
    };
    console.log(requestOptions);

    return fetch(App.ApisBaseUrl + "/api/Reset/checkresetpasswordcodeV2", requestOptions)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response == 200) {
          toastr["success"](response.message);
        }
        else {
            toastr["error"](response.message); 
        }
      });
  }

  handleChangeResetcode(e) {
    this.setState({ resetcode: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { resetcode } = this.state;
    this.confirmResetCode(resetcode);
  }

  render() {
    return this.confirmCode();
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
}

export default withRouter(ProviderConfirmCodeForgotPassword);
