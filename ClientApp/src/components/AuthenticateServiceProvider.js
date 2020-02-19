import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, withRouter } from "react-router-dom";
import App from "../App";
import toastr from "toastr";

export class AuthenticateServiceProvider extends Component {
  displayName = AuthenticateServiceProvider.name;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      serviceProviderAddresses: [],
      addressesList: [],
      submitted: false,
      isAuthenticated: null,
      showModal : "hide",
      modalMessage: ""
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
  }

  login(username, password, addressesList) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: username,
        password: password,
        devicetype: "None",
        devicetoken: ""
      })
    };
    return fetch(App.ApisBaseUrl + "/api/SignIn/providersignin", requestOptions)
      .then(response => {
        if (response.status == "404") {
          toastr["error"]("Email or password is incorrect");
        } else if (response.status == "409") {
          toastr["error"](
            "Please check your email and follow the link to activate your account."
          );
        } else if (response.status == "400") {
          toastr["error"]("Wrong Login Details!");
        } else {
          return response.json();
        }
      })
      .then(response => {
        console.log("response.message",response.message);
        if(response.message == "Incorrect password, please try again." ) {
            toastr["error"]("Incorrect password, please try again.");
        }
        else if(response.message == "Your email is not confirmed, Please confirm it first.") {
            this.setState({
                showModal : "show",
                modalMessage: response.message
            })
        }

        if (response != null) {
          console.log(response);
          this.setState({ authenticatedCustomer: response, submitted: true });
          localStorage.setItem("provideraccesstoken", response.authtoken);
          localStorage.setItem("serviceproviderid", response.serviceproviderid);
          localStorage.setItem("firstname", response.firstname);
          localStorage.setItem("surname", response.surname);
          localStorage.setItem("email", response.email);
          localStorage.setItem("phone", response.phone);
          localStorage.setItem("mobile", response.mobile);
          localStorage.setItem("gender", response.gender);
          localStorage.setItem("genderpreference", response.genderpreference);
          localStorage.setItem("providerDob", response.dob);
          localStorage.setItem("providerprofileImage", response.imagepath);
          localStorage.setItem("providerPostalCode", response.postalcode);
          localStorage.setItem("providerAddress", response.address);

          this.setState({
            serviceProviderAddresses: response.serviceProviderAddresses,
            submitted: true
          });
          var newArray = this.state.addressesList.slice();
            // for (var i = 0; i < this.state.serviceProviderAddresses.length; i++) {
            //   newArray.push(this.state.serviceProviderAddresses[i]);
            //   this.setState({ addressesList: newArray });
            //   //localStorage.setItem('addressList', addressesList);
            //   console.log(this.state.addressesList[i].address);
            //   localStorage.setItem(
            //     "providerAddress",
            //     this.state.addressesList[i].address
            //   );
            //   localStorage.setItem(
            //     "providerPostalCode",
            //     this.state.addressesList[i].postalCode
            //   );
            // }

          //window.location = "/provider-profile";
        } else {
          //toastr["error"]("Please activate your account.");
        }
      });
  }

  handleModal () {
    this.setState({
        showModal : "hide",
        })
    // console.log(this.props.history.push)
    //this.props.history.push("/provider-code-confirmation");
    window.location.replace("/provider-code-confirmation");
  }

  handleChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.login(username, password);
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

        <div class={"modal fade " + this.state.showModal} id="referralModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-body">

                                <div className="row">
                                    <div className="col-md-12 d-flex">
                                        <div>
                                            {/* <img src={headerporfileicon} style={iconstyle} className="change-to-white" /> */}
                                        </div>
                                        <h3 className="p-0 m-0 pl-3 text-dark font-weight-bold">Expert</h3>
                                    </div>
                                    <div className="col-md-12 text-center fs-18 p-5">
                                        {this.state.modalMessage}
                                    </div>
                                    <div className="col-md-12 text-right">
                                        <div className="w-100">
                                            <a id="okBtn" class="btn bg-black text-white float-right ml-3" onClick={this.handleModal.bind(this)}>OK</a>
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



const AuthenticateServiceProvider2 = withRouter(AuthenticateServiceProvider);
export { AuthenticateServiceProvider2};
