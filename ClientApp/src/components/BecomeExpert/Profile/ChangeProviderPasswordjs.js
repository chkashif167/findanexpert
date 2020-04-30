import React, { Component } from "react";
import { ProviderSidebarLinks } from "./SidebarLinks";
// import { BreadCrumbs } from "../../BreadCrumbs/BreadCrumbs";
import App from "../../../App";
import toastr from "toastr";
import { withRouter, Redirect } from "react-router-dom";


class ChangeProviderPassword extends Component {
  displayName = ChangeProviderPassword.name;

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newpassword: "",
      confirmpassword: "",
      update: false
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  UpdatePassword(password, newpassword, confirmpassword) {
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        oldpassword: password,
        newpassword: confirmpassword,
        authtoken: providerAccesstoken
      })
    };

    console.log(requestOptions);

    return fetch(
      App.ApisBaseUrl + "/api/Provider/changepassword",
      requestOptions
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.statuscode == 200) {
          this.setState({ Updated: response, update: true });
          toastr["success"]("Password Changed Successfully");
          this.props.history.push("/provider-profile");
        } else {
          toastr["error"](response.message);
        }
      });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleChangeNewPassword(e) {
    this.setState({ newpassword: e.target.value });
  }

  handleChangeConfirmPassword(e) {
    this.setState({ confirmpassword: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { password, newpassword, confirmpassword } = this.state;
    //this.UpdatePassword(email, password, newpassword, confirmpassword);
    //////////////////////////////////////passwordField
    var passwordField = document.getElementById("passwordField");
    if (passwordField.value.length < 8) {
      toastr["error"]("Please enter at least 8 characters new password");
      return false;
    }

    if (this.state.newpassword != this.state.confirmpassword) {
      toastr["error"]("Passowrd and confirm password does not match!");
    } else {
      this.UpdatePassword(password, newpassword, confirmpassword);
    }
  }

  render() {
    if (!localStorage.getItem("provideraccesstoken")) {
      return <Redirect to={"/provider-authentication"} />;
    }
    if (localStorage.getItem("providerPasswordUpdateStatus") == "200") {
      let contents = this.state.update
        ? this.PasswordUpdated(this.state.Updated)
        : this.PasswordUpdate();
      return <div>{contents}</div>;
    } else {
      let contents = this.state.update
        ? this.wrongePassword()
        : this.PasswordUpdate();
      return <div>{contents}</div>;
    }
  }

  PasswordUpdate() {
    return (
      <div id="MainPageWrapper">
        <ProviderSidebarLinks />

        <section class="section-padding customerProfile">
          <div class="services-wrapper">
            <div class="container">
              <div class="row">
                <div className="col-md-12 pt-5 pb-5 coloredBox">
                  <p class="font-weight-bold">
                    Change <span class="text-red">Password</span>
                  </p>
                  <form onSubmit={this.handleSubmit}>
                    <div className="md-form pb-3">
                      <input
                        type="password"
                        className="form-control validate frm-field"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        placeholder="Old Password"
                        required
                      />
                    </div>
                    <div className="md-form pb-3">
                      <input
                        id="passwordField"
                        type="password"
                        className="form-control validate frm-field"
                        name="password"
                        value={this.state.newpassword}
                        onChange={this.handleChangeNewPassword}
                        placeholder="New Password"
                        required
                      />
                    </div>
                    <div className="md-form pb-3">
                      <input
                        type="password"
                        className="form-control validate frm-field"
                        name="password"
                        value={this.state.confirmpassword}
                        onChange={this.handleChangeConfirmPassword}
                        placeholder="Confrim Password"
                        required
                      />
                    </div>
                    <div className="text-center mb-3">
                      <button
                        type="submit"
                        className="btn bg-black text-white float-right"
                      >
                        Change Password
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

  wrongePassword() {
    return (
      <div id="MainPageWrapper">
        <ProviderSidebarLinks />

        <section class="section-padding customerProfile">
          <div class="services-wrapper">
            <div class="container pt-5">
              <div class="row">
                <div className="col-md-12 pb-5 coloredBox">
                  <form onSubmit={this.handleSubmit}>
                    <div className="md-form pb-3">
                      <input
                        type="password"
                        className="form-control validate"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        placeholder="Old Password"
                        required
                      />
                    </div>
                    <div className="md-form pb-3">
                      <input
                        type="password"
                        className="form-control validate"
                        name="password"
                        value={this.state.newpassword}
                        onChange={this.handleChangeNewPassword}
                        placeholder="New Password"
                        required
                      />
                    </div>
                    <div className="md-form pb-3">
                      <input
                        id="passwordField"
                        type="password"
                        className="form-control validate"
                        name="password"
                        value={this.state.confirmpassword}
                        onChange={this.handleChangeConfirmPassword}
                        placeholder="Confrim Password"
                        required
                      />
                    </div>
                    <div className="text-center mb-3">
                      <button
                        type="submit"
                        className="btn bg-black text-white float-right"
                      >
                        Change Password
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

  PasswordUpdated(Updated) {
    return (
      <div id="MainPageWrapper">
        <ProviderSidebarLinks />

        <section class="section-padding customerProfile">
          <div class="services-wrapper">
            <div class="container pt-5">
              <div class="row">
                <div className="col-md-12 pt-5 pb-5 coloredBox">
                  <form onSubmit={this.handleSubmit}>
                    <div className="md-form pb-3">
                      <input
                        type="password"
                        className="form-control validate frm-field"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        placeholder="Old Password"
                        required
                      />
                    </div>
                    <div className="md-form pb-3">
                      <input
                        type="password"
                        className="form-control validate frm-field"
                        name="password"
                        value={this.state.newpassword}
                        onChange={this.handleChangeNewPassword}
                        placeholder="New Password"
                        required
                      />
                    </div>
                    <div className="md-form pb-3">
                      <input
                        type="password"
                        className="form-control validate frm-field"
                        name="password"
                        value={this.state.confirmpassword}
                        onChange={this.handleChangeConfirmPassword}
                        placeholder="Confrim Password"
                        required
                      />
                    </div>
                    <div className="text-center mb-3">
                      <button
                        type="submit"
                        className="btn bg-black text-white float-right"
                      >
                        Change Password
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

export default withRouter(ChangeProviderPassword);
