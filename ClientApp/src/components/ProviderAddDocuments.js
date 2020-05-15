import React, { Component } from "react";

import App from "../App";
import toastr from "toastr";
import jsonToFormData from "json-form-data";
import find from "lodash/find";

export class ProviderAddDocuments extends Component {
  displayName = ProviderAddDocuments.name;

  constructor(props) {
    super(props);

    this.state = {
      documentsCode: [
        {
          requestdocid: 1,
          doctype: "Qualification",
          type: "main",
        },
        {
          requestdocid: 2,
          doctype: "Insurance Certificate",
          expirydate: "",
          type: "main",
        },
        {
          requestdocid: 3,
          doctype: "Criminal Clearance Certificate",
          type: "main",
        },
      ],
      file: "",
      files: [],
      allDocuments: "",
      errrorMsg: false
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
            type: "other",
          };
        });
        this.setState((state) => ({
          documentsCode: [...state.documentsCode, ...requestDocuments],
        }));
      });


    ///////////////// get all documents
    fetch(
      App.ApisBaseUrl +
      "/api/Provider/getdocuments?authToken=" +
      providerAccesstoken
    )
      .then(response => {
        return response.json();
      })
      .then(data => {

        this.setState({ allDocuments: data.documentlist, });
      });
  }

  UploadDocument() {
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");

    //console.log(this.state.files);
    this.state.files.map((el, index) => {
      const formData = {

        doctype: this.state.documentsCode[index].doctype,
        // providerdocuments: documentsCode,
        image: el,
        requestdocid: this.state.documentsCode[index].requestdocid,
        expirydate: this.state.documentsCode[index].expirydate,
        authtoken: providerAccesstoken,
      };
      console.log('form data.....', formData)
      const requestOptions = {
        method: "POST",
        body: jsonToFormData(formData),
      };

      return fetch(
        App.ApisBaseUrl + "/api/Provider/uploaddocumentsingle",
        requestOptions
      )
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.statuscode == 200) {
            this.setState({ errrorMsg: true })

            setTimeout(function () {
              window.location = "/provider-documents";
            }, 1000);
          } else {
            toastr["error"](response.message);
          }
        });


    });


    toastr["success"]("Document has been uploaded!");


  }

  handleChangeFileUpload = (e, doc) => {
    e.preventDefault();
    // this.setState({ [e.target.name]: e.target.value });
    const { files } = this.state;
    let reader = new FileReader();
    let file = e.target.files[0];
    files.push(file);
    this.setState({ file, files });

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
          preview: reader.result,
          image: file,
        };
      }
      docs[currentIndex] = newDoc;
      this.setState({ documentsCode: docs });
    };

    reader.readAsDataURL(file);
  };

  handleChangeExpiry(e, doc) {
    e.preventDefault();
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
        expirydate: e.target.value,
      };
    }
    docs[currentIndex] = newDoc;
    this.setState({ documentsCode: docs });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.UploadDocument();
  }



  renderHighlightedClassRed = (doc) => {
    const { allDocuments } = this.state;
    const hasDoc = find(allDocuments, { 'doctype': doc.doctype })
    if (!hasDoc) return 'uploadDocRed'
    return 'uploadDocBlack';

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
                  <h5 style={{ fontWeight: "bold" }} className={this.renderHighlightedClassRed(doc)}>Upload {doc.doctype}</h5>
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
                  {doc.expirydate !== undefined && (
                    <div> <br /> <label> Expiry Date</label> <br />
                      <input
                        type="date"
                        onChange={(e) => this.handleChangeExpiry(e, doc)} required
                      />
                    </div>
                  )}
                </div>
                <div className="imgPreview pull-right">
                  {doc.preview ? (
                    <img src={doc.preview} />
                  ) : (
                      <div className="previewText">Image Preview</div>
                    )}
                </div>
              </div>
            </div>
          ))}
          {/* <p className="font-weight-bold mb-5">
            Other <span className="text-red">Documents</span>
          </p> */}
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