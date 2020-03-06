import React, { Component } from "react";
import ModernDatepicker from "react-modern-datepicker";
import App from "../App";
import toastr from "toastr";

export class EditProviderProfile extends Component {
  displayName = EditProviderProfile.name;

  constructor(props) {
    super(props);

    if (localStorage.getItem("dob") == "0001-01-01") {
      var providerDOB = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, "/");
    } else {
      var providerDOB = localStorage.getItem("dob").slice("T", 10);
    }

    this.state = {
      allAddresses: [],
      firstname: localStorage.getItem("firstname"),
      lastname: localStorage.getItem("lastname"),
      // phone: localStorage.getItem('phone'),
      mobile: localStorage.getItem("mobile"),
      genderpreference: localStorage.getItem("genderpreference"),
      gender: localStorage.getItem("gender"),
      file: "",
      imagepath: "",
      base64image: "",
      imagePreviewUrl: "",
      postalcode: localStorage.getItem("postalcode"),
      address: localStorage.getItem("address"),
      customerid: "0",
      serviceproviderid: "",
      dob: providerDOB
    };

    this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeGenderPreference = this.handleChangeGenderPreference.bind(
      this
    );
    this.handleChangeGender = this.handleChangeGender.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeDOB = this.handleChangeDOB.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState = () => {
    const initialState = {};
    return initialState;
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  UpdateProfile(
    firstname,
    lastname,
    mobile,
    genderpreference,
    gender,
    postalcode,
    address,
    dob
  ) {
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");

    console.log(this.state.imagePreviewUrl);

    if (this.state.genderpreference == "Others") {
      var genderPreference = "na";
    } else {
      var genderPreference = this.state.genderpreference;
    }

    if (this.state.gender == "Others") {
      var gender = "na";
    } else {
      var gender = this.state.gender;
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        gender: gender,
        genderpreference: genderpreference,
        postalcode: postalcode,
        address: address,
        dob: dob,
        authtoken: providerAccesstoken
      })
    };
    console.log(requestOptions);

    return fetch(
      App.ApisBaseUrl + "/api/Provider/updateprofile",
      requestOptions
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.statuscode == 200) {
          localStorage.setItem("firstname", firstname);
          localStorage.setItem("lastname", lastname);
          localStorage.setItem("mobile", mobile);
          localStorage.setItem("genderpreference", genderpreference);
          localStorage.setItem("gender", gender);
          localStorage.setItem("postalcode", postalcode);
          localStorage.setItem("address", address);
          localStorage.setItem("providerDob", dob);

          toastr["success"]("Profile Updated Successfully!");
        } else {
          toastr["error"](response.message);
        }
      });
  }

  handleChangeFirstname(e) {
    this.setState({ firstname: e.target.value });
  }

  handleChangeLastname(e) {
    this.setState({ lastname: e.target.value });
  }

  handleChangePhone(e) {
    this.setState({ phone: e.target.value });
  }

  handleChangeMobile(e) {
    this.setState({ mobile: e.target.value });
  }

  handleChangeGenderPreference(e) {
    this.setState({ genderpreference: e.target.value });
  }

  handleChangePostalCode(e) {
    this.setState({ postalcode: e.target.value });

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
      // body: JSON.stringify({ postalcode: e.target.value })
    };

    return fetch(
      App.ApisBaseUrl +
        "/api/Address/getaddresses?postalcode=" +
        e.target.value,
      requestOptions
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.statuscode == 200) {
          console.log(response);
          this.setState({ allAddresses: response.get_address });
          console.log(this.state.allAddresses);
        }
      });
  }

  handleChangeAddress(e) {
    this.setState({ address: e.target.value });
  }

  handleChangeGender(e) {
    this.setState({ gender: e.target.value });
  }

  handleChangeImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  handleChangeDOB(date) {
    this.setState({
      dob: date
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      firstname,
      lastname,
      mobile,
      genderpreference,
      gender,
      postalcode,
      address,
      dob
    } = this.state;
    this.UpdateProfile(
      firstname,
      lastname,
      mobile,
      genderpreference,
      gender,
      postalcode,
      address,

      dob
    );
  }

  render() {
    return this.ProviderProfile();
  }

  ProviderProfile() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} />;
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }
    console.log(this.state.imagePreviewUrl.slice(23));

    if (localStorage.getItem("genderpreference") == "na") {
      var providerGenderPreference = "Others";
    } else {
      var providerGenderPreference = localStorage.getItem("genderpreference");
    }

    if (localStorage.getItem("gender") == "na") {
      var providerGender = "Others";
    } else {
      var providerGender = localStorage.getItem("gender");
    }

    return (
      <div className="Register pb-5 coloredBox">
        <p class="font-weight-bold">
          Update <span className="text-red">Profile</span>
        </p>
        <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
          <div className="form-row pb-3">
            <div class="col">
              <input
                type="text"
                name="firstname"
                className="form-control validate frm-field"
                placeholder="First Name"
                value={this.state.firstname}
                onChange={this.handleChangeFirstname}
              />
            </div>
            <div class="col">
              <input
                type="text"
                name="lastname"
                className="form-control validate frm-field"
                placeholder="Last Name"
                value={this.state.lastname}
                onChange={this.handleChangeLastname}
              />
            </div>
          </div>

          <div className="form-row pb-3">
            <div class="col">
              <input
                type="number"
                name="mobile"
                className="form-control validate frm-field"
                placeholder="Mobile"
                value={this.state.mobile}
                onChange={this.handleChangeMobile}
              />
            </div>
          </div>

          <div className="form-row pb-3">
            <div class="col">
              <input
                type="text"
                name="postalcode"
                className="form-control validate frm-field"
                placeholder="Postalcode"
                value={this.state.postalcode}
                onChange={this.handleChangePostalCode}
              />
            </div>
            <div class="col">
              <select
                className="form-control"
                value={this.state.address}
                onChange={this.handleChangeAddress}
              >
                <option values={localStorage.getItem("address")} selected>
                  {localStorage.getItem("address")}
                </option>
                {this.state.allAddresses &&
                  this.state.allAddresses.map(adr => (
                    <option value={adr.replace("{", "").replace("}", "")}>
                      {adr.replace("{", "").replace("}", "")}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <hr />

          <h5>Gender Preference</h5>

          <div className="md-form pb-3">
            <select
              className="form-control my-1 mr-sm-2 frm-field"
              value={this.state.genderpreference}
              onChange={this.handleChangeGenderPreference}
            >
              <option value={localStorage.getItem("genderpreference")}>
                {providerGenderPreference}
              </option>
              <option value="">-----------------</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <hr />

          <h5>Gender</h5>

          <div className="md-form pb-3">
            <select
              className="form-control my-1 mr-sm-2 frm-field"
              value={this.state.gender}
              onChange={this.handleChangeGender}
            >
              <option value={localStorage.getItem("gender")}>
                {providerGender}
              </option>
              <option value="">-----------------</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <h5>Date of birth</h5>
          <div className="md-form pb-3">
            <ModernDatepicker
              date={this.state.dob}
              format={"YYYY-MM-DD"}
              showBorder
              onChange={date => this.handleChangeDOB(date)}
              placeholder={"Select a date"}
            />
          </div>
          {/* 
          <div class="form-group pb-3">
            <label for="exampleFormControlFile1">Upload Profile Image</label>
            <input
              type="file"
              class="form-control-file frm-field"
              name="image"
              onChange={this.handleChangeImage}
            />
          </div> */}

          <div className="text-center mb-3">
            <button
              type="submit"
              className="btn bg-black btn-block text-white z-depth-1a w-auto float-right"
            >
              Change Your Profile
            </button>
          </div>

          {/* <div className="imgPreview">{$imagePreview}</div> */}
        </form>
      </div>
    );
  }

  // UpdatedProviderProfile(updateCustomer) {
  //   let { imagePreviewUrl } = this.state;
  //   let $imagePreview = null;
  //   if (imagePreviewUrl) {
  //     $imagePreview = <img src={imagePreviewUrl} />;
  //     localStorage.setItem("providerprofileImage", imagePreviewUrl);
  //     var profileImage = localStorage.getItem("providerprofileImage");
  //     console.log(profileImage);
  //   } else {
  //     $imagePreview = (
  //       <div className="previewText">Please select an Image for Preview</div>
  //     );
  //   }
  //   console.log(this.state.imagePreviewUrl.slice(23));

  //   if (localStorage.getItem("genderpreference") == "na") {
  //     var providerGenderPreference = "Others";
  //   } else {
  //     var providerGenderPreference = localStorage.getItem("genderpreference");
  //   }

  //   if (localStorage.getItem("gender") == "na") {
  //     var providerGender = "Others";
  //   } else {
  //     var providerGender = localStorage.getItem("gender");
  //   }

  //   return (
  //     <div className="pb-5">
  //       <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
  //         <div className="form-row pb-3">
  //           <div class="col">
  //             <input
  //               type="text"
  //               name="firstname"
  //               className="form-control validate frm-field"
  //               placeholder="First Name"
  //               value={this.state.firstname}
  //               onChange={this.handleChangeFirstname}
  //             />
  //           </div>
  //           <div class="col">
  //             <input
  //               type="text"
  //               name="lastname"
  //               className="form-control validate frm-field"
  //               placeholder="Last Name"
  //               value={this.state.lastname}
  //               onChange={this.handleChangeLastname}
  //             />
  //           </div>
  //         </div>

  //         <div className="form-row pb-3">
  //           <div class="col">
  //             <input
  //               type="number"
  //               name="phone"
  //               className="form-control validate frm-field"
  //               placeholder="Phone"
  //               value={this.state.phone}
  //               onChange={this.handleChangePhone}
  //             />
  //           </div>
  //           <div class="col">
  //             <input
  //               type="number"
  //               name="mobile"
  //               className="form-control validate frm-field"
  //               placeholder="Mobile"
  //               value={this.state.mobile}
  //               onChange={this.handleChangeMobile}
  //             />
  //           </div>
  //         </div>

  //         <div className="form-row pb-3">
  //           <div class="col">
  //             <input
  //               type="text"
  //               name="postalcode"
  //               className="form-control validate frm-field"
  //               placeholder="Postalcode"
  //               value={this.state.postalcode}
  //               onChange={this.handleChangePostalCode}
  //             />
  //           </div>
  //           <div class="col">
  //             <select
  //               className="form-control frm-field"
  //               value={this.state.address}
  //               onChange={this.handleChangeAddress}
  //             >
  //               <option
  //                 values={localStorage.getItem("providerAddress")}
  //                 selected
  //               >
  //                 {localStorage.getItem("providerAddress")}
  //               </option>
  //               {this.state.allAddresses.map(adr => (
  //                 <option value={adr.replace("{", "").replace("}", "")}>
  //                   {adr.replace("{", "").replace("}", "")}
  //                 </option>
  //               ))}
  //             </select>
  //           </div>
  //         </div>

  //         <hr />

  //         <h5>Gender Preference</h5>

  //         <div className="md-form pb-3">
  //           <select
  //             className="form-control my-1 mr-sm-2 frm-field"
  //             value={this.state.genderpreference}
  //             onChange={this.handleChangeGenderPreference}
  //           >
  //             <option value={localStorage.getItem("genderpreference")}>
  //               {providerGenderPreference}
  //             </option>
  //             <option value="">-----------------</option>
  //             <option value="Male">Male</option>
  //             <option value="Female">Female</option>
  //             <option value="na">Others</option>
  //           </select>
  //         </div>

  //         <hr />

  //         <h5>Gender</h5>

  //         <div className="md-form pb-3">
  //           <select
  //             className="form-control my-1 mr-sm-2 frm-field"
  //             value={this.state.gender}
  //             onChange={this.handleChangeGender}
  //           >
  //             <option value={localStorage.getItem("gender")}>
  //               {providerGender}
  //             </option>
  //             <option value="">-----------------</option>
  //             <option value="Male">Male</option>
  //             <option value="Female">Female</option>
  //             <option value="na">Others</option>
  //           </select>
  //         </div>

  //         <h5>Date of birth</h5>
  //         <div className="md-form pb-3">
  //           <ModernDatepicker
  //             date={this.state.dob}
  //             format={"YYYY-MM-DD"}
  //             showBorder
  //             onChange={date => this.handleChangeDOB(date)}
  //             placeholder={"Select a date"}
  //           />
  //         </div>

  //         <div class="form-group pb-3">
  //           <label for="exampleFormControlFile1">Upload Profile Image</label>
  //           <input
  //             type="file"
  //             class="form-control-file frm-field"
  //             name="image"
  //             onChange={this.handleChangeImage}
  //           />
  //         </div>

  //         <div className="text-center mb-3">
  //           <button
  //             type="submit"
  //             className="btn bg-black btn-block text-white z-depth-1a w-auto float-right"
  //           >
  //             Change Your Profile
  //           </button>
  //         </div>

  //         <div className="imgPreview">{$imagePreview}</div>
  //       </form>
  //     </div>

  //     //<Redirect to='/profile' />
  //   );
  // }
}
