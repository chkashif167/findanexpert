import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import App from '../App';
import loader from '../assets/img/loader.gif';
import { Link } from 'react-router-dom';
import toastr from 'toastr';

export interface AuthenticateUserDataState {
    authenticatedCustomer: AuthenticatedCustomer;
    username: string;
    password: string;
    submitted: boolean;
    children?: React.ReactNode;
}

export class AuthenticateCustomer extends Component {
  displayName = AuthenticateCustomer.name

    constructor(props) {

        var lastVisitedUrl = document.referrer;
        console.log(lastVisitedUrl);
        var lastVisitPage = lastVisitedUrl.slice(0, 38);
        console.log(lastVisitPage);

        super(props);
        this.state = {
            authenticatedCustomer: new AuthenticatedCustomer(), username: '', password: '',
            submitted: false, isAuthenticated: null, returnURL: lastVisitPage
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    login(username, password) {

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const keyWord = params.get('searchedservice');
        const index = params.get('index');
        const serviceid = params.get('serviceid');

        const servicename = params.get('servicename');
        const servicetypeid = params.get('servicetypeid');
        const srvtypename = params.get('srvtypename');

        const inclinic = params.get('inclinic');
        const inhouse = params.get('inhouse');
        const switchonpeakhours = params.get('switchonpeakhours');

        const isgeneric = params.get('isgeneric');
        const peakhours = params.get('peakhours');
        const end_peakhours = params.get('end_peakhours');
        const hasarea = params.get('hasarea');
        const free_treatment_offer = params.get('free_treatment_offer');

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ Username: username, Password: password })
        };

        return fetch(App.ApisBaseUrl + '/api/SignIn/authenticatecustomer', requestOptions)
          .then(response => {
              //console.log(response.json().message);
              if (response.status == '404') {

                  //alert("Username or password is incorrect");
                  toastr["error"]("Username or password is incorrect!");
                  console.log(response.json());
              }
              else if (response.status == '400') {
                  //alert("Wrong login details!");
                  toastr["error"]("Wrong login details!");
              }
              else {
                  return response.json();
              }
              
          })
          .then(response => {
              console.log(response);

            if (response != null) {
                this.setState({ authenticatedCustomer: response, submitted: true });
                localStorage.setItem("customeraccesstoken", response.authtoken);
                localStorage.setItem("customerid", response.customerid);
                localStorage.setItem("firstname", response.firstname);
                localStorage.setItem("surname", response.surname);
                localStorage.setItem("email", response.email);
                localStorage.setItem("phone", response.phone);
                localStorage.setItem("mobile", response.mobile);
                localStorage.setItem("postalcode", response.postalCode);
                localStorage.setItem("addressid", response.addressID);
                localStorage.setItem("customerprofileImage", response.imagepath);
                localStorage.setItem("gender", response.gender);
                localStorage.setItem("customerGenderpreference", response.genderpreference);
                localStorage.setItem("customerDob", response.dob);
                localStorage.setItem("hasFreeTreatment", response.has_free_treatment);

                if (this.state.returnURL == 'http://www.findanexpert.net/services/') {
                    window.location = '/booking?' + btoa(encodeURIComponent('searchedservice=' + keyWord + '&index=' + index + '&serviceid=' +
                        serviceid + '&servicename=' + servicename + '&servicetypeid=' + servicetypeid + '&srvtypename=' + srvtypename +
                        '&isgenericservice=' + isgeneric + '&inclinic=' + inclinic + '&inhouse=' + inhouse + '&isgeneric=' +
                        isgeneric + '&peakhours=' + peakhours + '&end_peakhours=' + end_peakhours + '&switchonpeakhours=' + switchonpeakhours
                        + '&hasarea=' + hasarea + '&free_treatment_offer=' + free_treatment_offer));
                }
                else {
                    window.location = '/';
                }
            }
            //else {
            //    //console.log("response null");
            //    alert("Please activate your account.");
            //}
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
      let contents = this.state.submitted
          ? <div className="loginLoader"><img src={loader} /></div>
          : this.renderSignInScreen();
      return <div>
          {contents}
      </div>;
  }

    renderSignInScreen() {
        if (!this.state.isAuthenticated) {
            if (this.state.submitted) {
                return (

                    <div className="Login">
                        <div className="alert alert-danger" role="alert">
                            <p>Wrong sign in details.</p>
                        </div>
                        <div className="loginRegisterTopText">
                            <h3>Already have an Account?</h3>
                            <p>Welcome back! please sign in</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>

                            <div className="md-form pb-3">
                                <input type="text" className="form-control validate" name="username" values={this.state.username} onChange={this.handleChangeUsername} placeholder="Email Address" required />
                            </div>

                            <div className="md-form pb-3">
                                <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" required />
                            </div>

                            <div className="md-form pb-3">
                                <p className="font-small blue-text d-flex justify-content-end">
                                    <Link to="/forgot-password-link" className="blue-text">Forgotten <span className="blue-text ml-1">
                                        your Password?</span></Link>
                                </p>
                            </div>

                            <div className="text-center mb-3">
                                <button type="submit" className="btn bg-orange btn-block text-white">Sign In</button>
                            </div>

                        </form>
                    </div>
                );
            }
            else {
                return <div className="Login">
                    <div className="loginRegisterTopText">
                        <h3>Already have an Account?</h3>
                        <p>Welcome back! Please sign in</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>

                        <div className="md-form pb-3">
                            <input type="text" className="form-control validate" name="username" values={this.state.username} onChange={this.handleChangeUsername} placeholder="Email Address" required />
                        </div>

                        <div className="md-form pb-3">
                            <input type="password" className="form-control validate" name="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" required />
                        </div>

                        <div className="md-form pb-3">
                            <p className="font-small blue-text d-flex justify-content-end">
                                <Link to="/forgot-password-link" className="blue-text">Forgotten <span className="blue-text ml-1">
                                    your Password?</span></Link>
                            </p>
                        </div>

                        <div className="text-center mb-3">
                            <button type="submit" className="btn bg-orange btn-block text-white">Sign In</button>
                        </div>

                    </form>
                </div>;
            }
        }
        
  }


  renderCustomerProfile(authenticatedCustomer: AuthenticatedCustomer) {
        
      return window.location = '/';
  }

}

export class AuthenticatedCustomer {
    customerid = 0;
    firstname = "";
    surname = "";
    email = "";
    city = "";
    country = "";
    house = "";
    phone = "";
    mobile = "";
    office = "";
    postalcode = "";
    street = "";
}
