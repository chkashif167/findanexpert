import React, { Component } from "react";
import App from "../App";
//import { AutoComplete } from '@progress/kendo-dropdowns-react-wrapper';
import toastr from "toastr";

export class ProviderSelectServices extends Component {
  displayName = ProviderSelectServices.name;

  constructor() {
    super();

    this.state = {
      // allservices: "",
      updated: false,
      allServices: [],
      servicestypes: [],
      listServiceTypes: [],
      selectedServiceTypes: []
    };

    this.handleChangeAllServices = this.handleChangeAllServices.bind(this);
    this.handleChangeServiceTypes = this.handleChangeServiceTypes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    var providerAccesstoken =
      "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSTRNaUlzSW1WdFlXbHNJam9pWm1GeWNuVnJhRUJ0WVdsc2FXNWhkRzl5TG1OdmJTSXNJbkp2YkdVaU9pSlFjbTkyYVdSbGNpSXNJa2x6Vm1Gc2FXUWlPaUowY25WbElpd2libUptSWpveE5UZ3lPRGt3TlRBM0xDSmxlSEFpT2pFMk1UYzBORFk1TURjc0ltbGhkQ0k2TVRVNE1qZzVNRFV3Tnl3aWFYTnpJam9pWm1sdVpHRnVaWGh3WlhKMExtNWxkQ0lzSW1GMVpDSTZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlmUS5PbHRPNW1fYlNOeXkta2V3ZjJtQUNlUkJEMmN0aHJYQmM5QzJIMW80XzIw";
    //var providerAccesstoken = localStorage.getItem('provideraccesstoken');

    fetch(
      App.ApisBaseUrl +
        "/api/Categories/getcategorieswithtypes?authToken=" +
        providerAccesstoken
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ allServices: response.categorieslist });

        var newArray = [];

        for (var i = 0; i < this.state.allServices.length; i++) {
          newArray.push(this.state.allServices[i].typeslist);
          this.setState({ listServiceTypes: newArray });
        }
      });
  }

  getInitialState = () => {
    const initialState = {};
    return initialState;
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  AddServices(servicestypes) {


    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryid: "",
        servicetypeidlist: "",
        authtoken: providerAccesstoken
      })
    };

    var providerAccesstoken =
    "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSTRNaUlzSW1WdFlXbHNJam9pWm1GeWNuVnJhRUJ0WVdsc2FXNWhkRzl5TG1OdmJTSXNJbkp2YkdVaU9pSlFjbTkyYVdSbGNpSXNJa2x6Vm1Gc2FXUWlPaUowY25WbElpd2libUptSWpveE5UZ3lPRGt3TlRBM0xDSmxlSEFpT2pFMk1UYzBORFk1TURjc0ltbGhkQ0k2TVRVNE1qZzVNRFV3Tnl3aWFYTnpJam9pWm1sdVpHRnVaWGh3WlhKMExtNWxkQ0lzSW1GMVpDSTZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlmUS5PbHRPNW1fYlNOeXkta2V3ZjJtQUNlUkJEMmN0aHJYQmM5QzJIMW80XzIw";
  //var providerAccesstoken = localStorage.getItem('provideraccesstoken');
    return fetch(
      App.ApisBaseUrl + "/api/Provider/addservices",
      requestOptions
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(response => {
        console.log(response);
        // if (response != null) {
        //   this.setState({ updateProviderService: response, updated: true });
        //   toastr["success"]("Your selected services are added successfully!");
        //   setTimeout(function() {
        //     window.location = "/provider-services";
        //   }, 3000);
        // }
      });
  }

  handleChangeAllServices(e) {
    this.setState({ categoryname: e.target.value });
    this.state.selectedServiceTypes = [];
    for (var i = 0; i <= this.state.listServiceTypes.length; i++) {
      if (i == e.target.value) {
        this.setState({ selectedServiceTypes: this.state.listServiceTypes[i] });
      }
    }

    // var x = document.getElementsByClassName("checkboxx");
    // for (var g = 0; g <= x.length; g++) {
    //   x[g].checked = false;
    // }
  }

  handleChangeServiceTypes(e) {
    //
    this.setState({ servicestypes: e.target.id });
    console.log(e.target.value);
    this.state.listServiceTypes.push(e.target.value);
  }

  handleChangeType(e) {
    
    

  }

  handleSubmit(e) {
    e.preventDefault();
    const { servicestypes } = this.state;
    this.AddServices(servicestypes);
  }

  render() {
    return this.ProviderServices();
  }

  ProviderServices() {
    return (
      <div className="Register profileBox p-5">
        <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
          <div className="md-form pb-3">
            <select
              className="form-control frm-field"
              value={this.state.allservices}
              onChange={this.handleChangeAllServices}
              required
            >
              <option value="" selected>
                Select an option
              </option>
              {this.state.allServices.map((srv, index) => (
                <option value={index}>{srv.categoryname}</option>
              ))}
            </select>
            {this.state.selectedServiceTypes.map(type => (
              <>
                <label>
                  <input onChange={this.handleChangeType}
                    className="checkboxx"
                    value={type.servicetypeid}
                    name={type.servicetypename}
                    type="checkbox"
                  />
                  {type.servicetypename}
                </label>
                <p></p>
              </>
            ))}
          </div>

          <div className="text-center mb-5">
            <button
              type="submit"
              className="btn bg-black btn-block text-white z-depth-1a w-auto float-right"
            >
              Add Your Services
            </button>
          </div>
        </form>
      </div>
    );
  }
}
