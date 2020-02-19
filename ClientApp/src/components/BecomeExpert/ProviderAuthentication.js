import React, { Component } from "react";
import { AuthenticateServiceProvider } from "../AuthenticateServiceProvider";
import { RegisterServiceProvider } from "../RegisterServiceProvider";
import { Redirect } from "react-router-dom";

export class ProviderAuthentication extends Component {
  displayName = ProviderAuthentication.name;

  state = {
    redirect: false,
    activeTab: "signIn"
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (localStorage.getItem("serviceproviderid")) {
      return <Redirect to="/provider-profile" />;
    }
  };
  handleActiveTabChange = activeTab => {
    this.setState({
      activeTab
    });
  };
  render() {
    document.getElementsByTagName("META")[2].content =
      "Find an expert provides a fair opportunity to beauticians, handyman, IT personnel, and many others to register on for free and earn money online without any investment.";
    document.getElementsByTagName("TITLE")[0].text =
      "Provider Login or Create an Account | Find an Expert";

    if (localStorage.getItem("serviceproviderid") != null) {
    }
    const { activeTab } = this.state;

    return (
      <div id="MainPageWrapper">
        {this.renderRedirect()}
        <section className="section-padding">
          <div className="container">
            <div className="row pb-4 mb-5 pt-5">
              <div className="col-md-12 signinRegisterWrap mt-5 mb-5">
                <ul
                  class="nav nav-tabs nav-justified signinRegister"
                  role="tablist"
                >
                  <li class="nav-item">
                    <a
                      class={`nav-link ${activeTab === "signIn" && "active"}`}
                      data-toggle="tab"
                      //   href="#signIn"
                      role="tab"
                      onClick={() => this.handleActiveTabChange("signIn")}
                    >
                      Sign In
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class={`nav-link ${activeTab === "createAccount" &&
                        "active"}`}
                      data-toggle="tab"
                      //   href="#createAccount"
                      role="tab"
                      onClick={() =>
                        this.handleActiveTabChange("createAccount")
                      }
                    >
                      Sign Up
                    </a>
                  </li>
                </ul>

                <div class="tab-content mb-5">
                  <div
                    className={
                      "tab-pane fade in " +
                      (activeTab === "signIn" && "show active")
                    }
                    // id="signIn"
                    role="tabpanel"
                  >
                    {activeTab === "signIn" && <AuthenticateServiceProvider />}
                  </div>

                  <div
                    className={
                      "tab-pane fade in " +
                      (activeTab === "createAccount" && "show active")
                    }
                    // id="createAccount"
                    role="tabpanel"
                  >
                    {activeTab === "createAccount" && (
                      <RegisterServiceProvider
                        onFinish={this.handleActiveTabChange}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
