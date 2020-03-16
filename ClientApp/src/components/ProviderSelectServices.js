import React, { Component } from "react";
import App from "../App";
//import { AutoComplete } from '@progress/kendo-dropdowns-react-wrapper';
import toastr from "toastr";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import get from "lodash/get";

export class ProviderSelectServices extends Component {
  displayName = ProviderSelectServices.name;

  constructor() {
    super();
    this.array = [];

    this.state = {
      // allservices: "",
      updated: false,
      allServices: [],
      servicestypes: [],
      listServiceTypes: [],
      selectedServiceTypes: [],
      selectedService: null,
      cateId: "",
      list: []
    };

    this.handleChangeAllServices = this.handleChangeAllServices.bind(this);
    // this.handleChangeServiceTypes = this.handleChangeServiceTypes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");

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
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoryid: this.state.cateId,
        servicetypeidlist: this.state.list,
        authtoken: providerAccesstoken
      })
    };

    console.log(requestOptions);

    return fetch(App.ApisBaseUrl + "/api/Provider/addservices", requestOptions)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.statuscode == 200) {
          toastr["success"]("Your selected services are added successfully!");
          setTimeout(function() {
            window.location = "/provider-services";
          }, 1000);
        } else {
          toastr["error"](response.message);
        }
      });
  }

  handleChangeAllServices({ target: { value } }) {
    const { allServices } = this.state;
    const categoryid = parseInt(value, 10);
    const selectedService = find(allServices, { categoryid });

    this.setState({ selectedService });
  }

  // handleChangeServiceTypes(e) {
  //   //
  //   this.setState({ servicestypes: e.target.id });
  //   console.log(e.target.value);
  //   this.state.listServiceTypes.push(e.target.value);
  // }

  handleChangeTypeCheckboxes(value) {
    const { selectedService } = this.state;
    const index = findIndex(this.array, v => {
      return value.servicetypeid === v;
    });
    if (index === -1) {
      this.array.push(value.servicetypeid);
    } else {
      this.array.splice(index, 1);
    }
    const obj = {
      cateId: selectedService.categoryid,
      list: this.array
    };

    this.setState({ cateId: obj.cateId, list: obj.list });
    //console.log(obj);
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
    const { selectedService } = this.state;
    const typeslist = get(selectedService, "typeslist", []);
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
                <option key={index} value={srv.categoryid}>
                  {srv.categoryname}
                </option>
              ))}
            </select>
            {typeslist.map(type => (
              <div>
                <label>
                  <input
                    onChange={() => this.handleChangeTypeCheckboxes(type)}
                    className="checkboxx"
                    value={type.servicetypeid}
                    type="checkbox"
                    checked={type.checked}
                  />
                  {type.servicetypename}
                </label>
              </div>
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
