import React, { Component } from "react";

import App from "../App";
import toastr from "toastr";
import jsonToFormData from "json-form-data"

export class ProviderAddDocuments extends Component {
  displayName = ProviderAddDocuments.name;

  constructor() {
    super();

    this.state = {
      serviceproviderid: "",
      doctype: "",

      qualificationFile: "",
      insuranceFile: "",
      clearanceFile: "",
      otherFile: "",

      qualificationFileUrl: "",
      insuranceFileUrl: "",
      clearanceFileUrl: "",
      otherFileUrl: "",

      qualificationFileUri: "",
      insuranceFileUri: "",
      clearanceFileUri: "",
      otherFileUri: "",

      expirydate: "",

      requestedDocuments: "",

      upload: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");
    fetch(
      App.ApisBaseUrl +
      "/api/Provider/getrequestdocuments?authToken=" +
      providerAccesstoken
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log("hhhhhhhhhhhhhhhhhhhh", data)
        this.setState({ requestedDocuments: data.requestdocuments, loading: false });
      });


  }

  getInitialState = () => {
    const initialState = {};
    return initialState;
  };

  resetState = () => {
    this.setState(this.getInitialState());
  };

  UploadDocument() {
    // var providerAccesstoken =

    //   "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSXhNRFFpTENKbGJXRnBiQ0k2SW10aGMyaHBaa0J0WVdsc2FXNWhkRzl5TG1OdmJTSXNJbkp2YkdVaU9pSlFjbTkyYVdSbGNpSXNJa2x6Vm1Gc2FXUWlPaUowY25WbElpd2libUptSWpveE5UZ3pNelEzTmpZNExDSmxlSEFpT2pFMk1UYzVNRFF3Tmpnc0ltbGhkQ0k2TVRVNE16TTBOelkyT0N3aWFYTnpJam9pWm1sdVpHRnVaWGh3WlhKMExtNWxkQ0lzSW1GMVpDSTZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlmUS5nc04wTm4ySjY5WEVvT19sVnVEZ1pyT3NKZ3dXMklXUFBaem9NbVFYUVc0";
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");
    // var serviceproviderid = localStorage.getItem("serviceproviderid");
    // var bse64String = this.state.imagePreviewUrl.slice(22);
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     serviceproviderid: serviceproviderid,
    //     doctype: doctype,
    //     base64Image: bse64String,
    //     authtoken: providerAccesstoken
    //   })
    // };
    formData = {
      providerdocuments: [
        {
          doctype: "Qualifcation",
          image: this.state.qualificationFile,
          expirydate: "",
          requestdocid: "1"
        },
        {
          doctype: "Insurance",
          image: this.state.insuranceFile,
          expirydate: "",
          requestdocid: "2"
        },

        {
          doctype: "Clearnce",
          image: this.state.clearanceFile,
          expirydate: "",
          requestdocid: "4"
        }
      ],
      authtoken: providerAccesstoken


    }

    var formData = jsonToFormData(formData)
    // const formData = new FormData();
    //formData.append("image", this.state.file);
    // formData.append("providerdocuments",
    //formData.append("authtoken", providerAccesstoken);

    const requestOptions = {
      method: "POST",
      body: formData
    };

    console.log(requestOptions);
    return fetch(
      App.ApisBaseUrl + "/api/Provider/uploaddocument",
      requestOptions
    )
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.statuscode == 200) {
          toastr["success"]("Document has been uploaded!");
          // setTimeout(function () {
          //   window.location = "/provider-documents";
          // }, 1000);
        } else {
          toastr["error"](response.message);
        }
      });
  }



  handleChangeFileUpload(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        insuranceFile: file,
        insuranceFileUrl: reader.result,

      });
    };
    reader.readAsDataURL(file);
  }

  // handleChangeQualification(e) {
  //   //this.setState({ image: e.target.value });
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];
  //   reader.onloadend = () => {
  //     this.setState({
  //       qualificationFile: file,
  //       qualificationFileUrl: reader.result,
  //       qualificationFileUri: URL.createObjectURL(file)
  //     });
  //     console.log(reader);
  //   };
  //   reader.readAsDataURL(file);



  // }

  // handleChangeInsurance(e) {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];
  //   reader.onloadend = () => {
  //     this.setState({
  //       insuranceFile: file,
  //       insuranceFileUrl: reader.result,

  //     });
  //   };
  //   reader.readAsDataURL(file);
  // }

  // handleChangeClearance(e) {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];
  //   reader.onloadend = () => {
  //     this.setState({
  //       clearanceFile: file,
  //       clearanceFileUrl: reader.result
  //     });
  //   };
  //   reader.readAsDataURL(file);

  // }

  // handleChangeOther(e) {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];
  //   reader.onloadend = () => {
  //     this.setState({
  //       otherFile: file,
  //       otherFileUrl: reader.result
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // }

  handleChangeExpiry(e) {
    e.preventDefault();
    this.setState({ expirydate: this })
  }


  handleSubmit(e) {
    e.preventDefault();
    this.UploadDocument();
  }

  render() {
    // let contents = this.state.upload
    //   ? this.UpdatedProviderDocument(this.state.uploadedDocument)
    //   : this.ProviderDocument();
    // return <div>{contents}</div>;
    return this.ProviderDocument()
  }

  ProviderDocument() {
    let { qualificationFileUrl, insuranceFileUrl, clearanceFileUrl, otherFileUrl } = this.state;
    let $qualificationFilePreview = null;
    let $insuranceFilePreview = null;
    let $clearanceFilePreview = null;
    let $otherFilePreview = null;

    if (qualificationFileUrl) {
      $qualificationFilePreview = <img src={qualificationFileUrl} />;
    } else {
      $qualificationFilePreview = (
        <div className="previewText">Image Preview</div>
      );
    }

    if (insuranceFileUrl) {
      $insuranceFilePreview = <img src={insuranceFileUrl} />;
    } else {
      $insuranceFilePreview = (
        <div className="previewText">Image Preview</div>
      );
    }

    if (clearanceFileUrl) {
      $clearanceFilePreview = <img src={clearanceFileUrl} />;
    } else {
      $clearanceFilePreview = (
        <div className="previewText">Image Preview</div>
      );
    }

    if (otherFileUrl) {
      $otherFilePreview = <img src={otherFileUrl} />;
    } else {
      $otherFilePreview = (
        <div className="previewText">Image Preview</div>
      );
    }




    return (
      <div className="Register coloredBox uploadDocss">
        <p className="font-weight-bold mb-5">
          Add your <span className="text-red">Documents</span>
        </p>
        <form onSubmit={this.handleSubmit}>
          {/* <div className="md-form pb-3">
            <select
              className="form-control frm-field"
              value={this.state.doctype}
              onChange={this.handleChangeDoctype}
              required
            >
              <option value="" selected>
                Please Select an Image
              </option>
              <option value="degree">Degree</option>
              <option value="certificate">Certificate</option>
              <option value="other">Other</option>
            </select>
          </div> */}
          <div className="docBlock">

            <div class="form-group pb-3">

              <div className="pull-left blockLeft">
                <h5 style={{ fontWeight: "bold" }}> <span> * </span> Upload Qualification </h5>
                <label style={{ fontSize: "11px" }} for="exampleFormControlFile1">

                </label>
                <input
                  type="file"
                  class="form-control-file frm-field"
                  name="image"
                  onChange={this.handleChangeFileUpload.bind(this)}
                  required
                />
              </div>
              <div className="imgPreview pull-right">{$qualificationFilePreview}</div>
            </div>

          </div>

          <div className="docBlock">

            <div class="form-group pb-3">

              <div className="pull-left blockLeft">
                <h5 style={{ fontWeight: "bold" }}> <span> * </span> Upload Insurance Certificate</h5>
                <label style={{ fontSize: "11px" }} for="exampleFormControlFile1">

                </label>
                <input
                  type="file"
                  class="form-control-file frm-field"
                  name="image"
                  onChange={this.handleChangeFileUpload.bind(this)}
                  required
                />
                <br />
                <label for="birthday"> <span> * </span>   Enter Expiry</label> <br />
                <input type="date" id="expirydate" name="expirydate" onChange={this.handleChangeExpiry.bind(this)} />
              </div>
              <div className="imgPreview pull-right">{$insuranceFilePreview}</div>
            </div>

          </div>

          <div className="docBlock">

            <div class="form-group pb-3">
              <div className="pull-left blockLeft">
                <h5 style={{ fontWeight: "bold" }}> <span> * </span> Upload Criminal Clearance Certificate</h5>
                <label style={{ fontSize: "11px" }} for="exampleFormControlFile1">

                </label>
                <input
                  type="file"
                  class="form-control-file frm-field"
                  name="image"
                  onChange={this.handleChangeFileUpload.bind(this)}
                  required
                />

              </div>
              <div className="imgPreview pull-right">{$clearanceFilePreview}</div>
            </div>

          </div>

          <p className="font-weight-bold mb-5">
            Other <span className="text-red">Documents</span>
          </p>
          {/* 
          {this.state.requestedDocuments &&
            this.state.requestedDocuments.map(recdocs => (
              <div className="docBlock">

                <div class="form-group pb-3">
                  <div className="pull-left blockLeft">
                    <h5 style={{ fontWeight: "bold" }}> Upload {recdocs.documentname} </h5>
                    <label style={{ fontSize: "11px" }} for="exampleFormControlFile1">

                    </label>
                    <input
                      type="file"
                      class="form-control-file frm-field"
                      name="image"
                      onChange={this.handleChangeFileUpload.bind(this)}
                      required
                    />

                  </div>
                  <div className="imgPreview pull-right">{$otherFilePreview}</div>
                </div>

              </div>
            ))} */}




          < div className="text-center mb-5" >
            <button
              type="submit"
              className="btn bg-black btn-block text-white z-depth-1a w-auto float-right"
            >
              Upload Your Documents
            </button>
          </div>
          <br />
        </form>


      </div >
    );
  }


}
