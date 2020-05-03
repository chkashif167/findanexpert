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

      upload: false,

      documentsCode:
        [
          {
            "requestdocid": 1,
            "documentname": "Qualification"
          },
          {
            "requestdocid": 2,
            "documentname": "Insurance Certificate"
          },
          {
            "requestdocid": 3,
            "documentname": "Criminal Clearance Certificate"
          }
        ]

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

        this.setState({ requestedDocuments: data.requestdocuments });
      });


  }

  // getInitialState = () => {
  //   const initialState = {};
  //   return initialState;
  // };

  // resetState = () => {
  //   this.setState(this.getInitialState());
  // };

  UploadDocument() {
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");

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



  handleChangeFileUpload = (e, doc) => {

    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
    console.log(e.target.name);
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(e.target.files[0])
    reader.onloadend = () => {
      var docs = this.state.documentsCode.map(code => {
        if (code.requestdocid === doc.requestdocid) {
          return {
            ...code, image: reader.result
          }
        }
        return code;
      })
      this.setState({ documentsCode: docs })
    };

    reader.readAsDataURL(file);

  }

  handleChangeRequestedFileUpload = (e, recdoc) => {

    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value })
    console.log(e.target.name);
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(e.target.files[0])
    reader.onloadend = () => {
      var reddocs = this.state.requestedDocuments.map(code => {
        if (code.requestdocid === recdoc.requestdocid) {
          return {
            ...code, image: reader.result
          }
        }
        return code;
      })
      this.setState({ requestedDocuments: reddocs })
    };

    reader.readAsDataURL(file);

  }


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

    return (
      <div className="Register coloredBox uploadDocss">
        <p className="font-weight-bold mb-5">
          Add your <span className="text-red">Documents</span>
        </p>
        <form onSubmit={this.handleSubmit}>

          {this.state.documentsCode &&
            this.state.documentsCode.map(doc => (
              <div className="docBlock">

                <div class="form-group pb-3">
                  <div className="pull-left blockLeft">
                    <h5 style={{ fontWeight: "bold" }}> Upload {doc.documentname} </h5>
                    <label style={{ fontSize: "11px" }} for="exampleFormControlFile1">

                    </label>
                    <input
                      type="file"
                      class="form-control-file frm-field"
                      name="image"
                      onChange={(e) => this.handleChangeFileUpload(e, doc)}
                      required
                    />

                  </div>
                  <div className="imgPreview pull-right">{doc.image ? <img src={doc.image} /> :
                    <div className="previewText">Image Preview</div>}</div>
                </div>

              </div>
            ))}




          <p className="font-weight-bold mb-5">
            Other <span className="text-red">Documents</span>
          </p>

          {this.state.requestedDocuments &&
            this.state.requestedDocuments.map(recdoc => (
              <div className="docBlock">

                <div class="form-group pb-3">
                  <div className="pull-left blockLeft">
                    <h5 style={{ fontWeight: "bold" }}> Upload {recdoc.documentname} </h5>
                    <label style={{ fontSize: "11px" }} for="exampleFormControlFile1">

                    </label>
                    <input
                      type="file"
                      class="form-control-file frm-field"
                      name="image"
                      onChange={(e) => this.handleChangeRequestedFileUpload(e, recdoc)}
                      required
                    />

                  </div>
                  <div className="imgPreview pull-right">{recdoc.image ? <img src={recdoc.image} /> :
                    <div className="previewText">Image Preview</div>}</div>
                </div>

              </div>
            ))}




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
