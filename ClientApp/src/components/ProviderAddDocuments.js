import React, { Component } from "react";

import App from "../App";
import toastr from "toastr";
import jsonToFormData from "json-form-data";

export class ProviderAddDocuments extends Component {
  displayName = ProviderAddDocuments.name;

  constructor(props) {
    super(props);

    this.state = {
      documentsCode: [
        {
          requestdocid: 1,
          doctype: "Qualification",
          expirydate: "",
        },
        {
          requestdocid: 2,
          doctype: "Insurance Certificate",
          expirydate: "",
        },
        {
          requestdocid: 3,
          doctype: "Criminal Clearance Certificate",
          expirydate: "",
        },
      ],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");
    fetch(
      App.ApisBaseUrl +
        "/api/Provider/getrequestdocuments?authToken=" +
        providerAccesstoken
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const requestDocuments = data.requestdocuments.map((value) => {
          return {
            requestdocid: value.requestdocid,
            doctype: value.documentname,
            expirydate: "",
          };
        });
        this.setState((state) => ({
          documentsCode: [...state.documentsCode, ...requestDocuments],
        }));
      });
  }

  UploadDocument() {
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");
    const { documentsCode } = this.state;
    formData = {
      providerdocuments: documentsCode,
      authtoken: providerAccesstoken,
    };

    var formData = jsonToFormData(formData);

    const requestOptions = {
      method: "POST",
      body: formData,
    };
    return fetch(
      App.ApisBaseUrl + "/api/Provider/uploaddocument",
      requestOptions
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => {
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
    // this.setState({ [e.target.name]: e.target.value });
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      var docs = this.state.documentsCode;
      const currentIndex = docs.findIndex((value) => {
        return value.requestdocid === doc.requestdocid;
      });
      let newDoc = docs.find((value) => {
        return value.requestdocid === doc.requestdocid;
      });
      if (newDoc) {
        newDoc = {
          ...newDoc,
          image: reader.result,
        };
      }
      docs[currentIndex] = newDoc;
      this.setState({ documentsCode: docs });
      // var docs = this.state.documentsCode.map((code) => {
      //   if (code.requestdocid === doc.requestdocid) {
      //     return {
      //       ...code,
      //       image: reader.result,
      //     };
      //   }
      //   return code;
      // });
      // this.setState({ documentsCode: docs });
    };

    reader.readAsDataURL(file);
  };

  handleChangeExpiry(e) {
    e.preventDefault();
    this.setState({ expirydate: this });
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
    return this.ProviderDocument();
  }

  ProviderDocument() {
    console.log(this.state);
    return (
      <div className="Register coloredBox uploadDocss">
        <p className="font-weight-bold mb-5">
          Add your <span className="text-red">Documents</span>
        </p>
        <form onSubmit={this.handleSubmit}>
          {this.state.documentsCode.map((doc) => (
            <div className="docBlock">
              <div class="form-group pb-3">
                <div className="pull-left blockLeft">
                  <h5 style={{ fontWeight: "bold" }}>Upload {doc.doctype}</h5>
                  <label
                    style={{ fontSize: "11px" }}
                    for="exampleFormControlFile1"
                  ></label>
                  <input
                    type="file"
                    class="form-control-file frm-field"
                    name="image"
                    onChange={(e) => this.handleChangeFileUpload(e, doc)}
                    required
                  />
                </div>
                <div className="imgPreview pull-right">
                  {doc.image ? (
                    <img src={doc.image} />
                  ) : (
                    <div className="previewText">Image Preview</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <p className="font-weight-bold mb-5">
            Other <span className="text-red">Documents</span>
          </p>
          <div className="text-center mb-5">
            <button
              type="submit"
              className="btn bg-black btn-block text-white z-depth-1a w-auto float-right"
            >
              Upload Your Documents
            </button>
          </div>
          <br />
        </form>
      </div>
    );
  }
}
