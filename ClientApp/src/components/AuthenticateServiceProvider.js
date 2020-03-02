import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, withRouter } from "react-router-dom";
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
        else if(response.message == "Email does not exist. Please sign up." ) {
          toastr["error"]("Email does not exist. Please sign up.");
      }
      else if(response.message == "Please enter a valid e-mail adress" ) {
        toastr["error"]("Please enter a valid e-mail adress");
    }
        else if(response.message == "Your email is not confirmed, Please confirm it first.") {
            this.props.history.push({
            pathname:"/provider-code-confirmation",
            state: response.message
             
           });
        }
        else if(response.message == "Success") {
          console.log("Response",response)
          localStorage.setItem("provideraccesstoken", response.authtoken);
          localStorage.setItem("serviceproviderid", response.serviceproviderid);
          localStorage.setItem("firstname", response.firstname);
          localStorage.setItem("lastname", response.lastname);
          localStorage.setItem("email", response.email);
          localStorage.setItem("isaccountconfirmed", response.isaccountconfirmed);
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
       
          this.props.history.push("/jobs")
        }

        // if (response.message == null) {
        //   console.log(response);
        //   this.setState({ authenticatedCustomer: response, submitted: true });
        //   localStorage.setItem("provideraccesstoken", response.authtoken);
        //   localStorage.setItem("serviceproviderid", response.serviceproviderid);
        //   localStorage.setItem("firstname", response.firstname);
        //   localStorage.setItem("surname", response.surname);
        //   localStorage.setItem("email", response.email);
        //   localStorage.setItem("phone", response.phone);
        //   localStorage.setItem("mobile", response.mobile);
        //   localStorage.setItem("gender", response.gender);
        //   localStorage.setItem("genderpreference", response.genderpreference);
        //   localStorage.setItem("providerDob", response.dob);
        //   localStorage.setItem("providerprofileImage", response.imagepath);
        //   localStorage.setItem("providerPostalCode", response.postalcode);
        //   localStorage.setItem("providerAddress", response.address);

        //   this.setState({
        //     serviceProviderAddresses: response.serviceProviderAddresses,
        //     submitted: true
        //   });
        //   var newArray = this.state.addressesList.slice();
        //     // for (var i = 0; i < this.state.serviceProviderAddresses.length; i++) {
        //     //   newArray.push(this.state.serviceProviderAddresses[i]);
        //     //   this.setState({ addressesList: newArray });
        //     //   //localStorage.setItem('addressList', addressesList);
        //     //   console.log(this.state.addressesList[i].address);
        //     //   localStorage.setItem(
        //     //     "providerAddress",
        //     //     this.state.addressesList[i].address
        //     //   );
        //     //   localStorage.setItem(
        //     //     "providerPostalCode",
        //     //     this.state.addressesList[i].postalCode
        //     //   );
        //     // }

        //   //window.location = "/provider-profile";
        // } else {
        //   //toastr["error"]("Please activate your account.");
        // }
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

      </div>
    );
  }
}



export default withRouter(AuthenticateServiceProvider);

