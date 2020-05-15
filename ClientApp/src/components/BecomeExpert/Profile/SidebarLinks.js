import React, { Component } from "react";
import { Link } from "react-router-dom";
import profile from "../../../assets/img/profile/profile.png";
import bannerProfile from "../../../assets/img/profile/banner.png";
import App from "../../../App";
import toastr from "toastr";

export class ProviderSidebarLinks extends Component {
  displayName = ProviderSidebarLinks.name;

  constructor() {
    super();

    this.state = {
      doctype: "",
      file: "",
      imagePreviewUrl: ""
    };

    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  uploadPhoto() {
    var providerAccesstoken = localStorage.getItem("provideraccesstoken");

    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("authToken", providerAccesstoken);

    const requestOptions = {
      method: "POST",
      body: formData
    };

    return fetch(
      App.ApisBaseUrl + "/api/Image/updateproviderprofileimage",
      requestOptions
    )
      .then(response => {
        return response.json();
      })
      .then(response => {
        if (response.statuscode == 200) {
          localStorage.setItem("imagepath", response.imagepath);
          toastr["success"]("Photo has been uploaded!");
          setTimeout(function () {
            window.location = "/provider-profile";
          }, 1000);
        } else {
          toastr["error"](response.message);
        }
      });
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
  handleSubmit(e) {
    e.preventDefault();

    this.uploadPhoto();
  }

  render() {
    var profileImage = localStorage.getItem("imagepath");

    var bg = {
      background: "url(" + bannerProfile + ")"
    };

    if (!profileImage) {
      var imgUrl = "https://via.placeholder.com/300";
      var imagePreview = (
        <img
          src={imgUrl}
          class="img-fluid providerProfileImg"
          alt="Responsive image"
        />
      );
    } else {
      var imagePreview = (
        <img
          src={App.ApisBaseUrl + profileImage}
          class="img-fluid providerProfileImg"
          alt="Responsive image one"
        />
      );
    }

    return (
      <section class="customerProfile">
        <div class="services-wrapper">
          <div class="hero-image" style={bg}></div>
          <div class="container-fluid shadow">
            <div class="row">
              <div class="banner_profile_picture">
                <div className="imagePreview">
                  <div className="PlusButton"> <span data-toggle="modal" data-target="#exampleModal">
                    +
                  </span></div>
                  {imagePreview}</div>

                <div class="profileName text-center">
                  <h3 class="text-white">
                    {localStorage.getItem("firstname")}{" "}
                    {localStorage.getItem("lastname")}
                  </h3>


                  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog profilePic" role="document">
                      <div class="modal-content">
                        <div class="modal-body">
                          <div className="uploadPhotoArea">
                            <form onSubmit={this.handleSubmit}>
                              <div class="form-group pb-3">
                                <div className="imagePreview"> <img src={this.state.imagePreviewUrl ? this.state.imagePreviewUrl : App.ApisBaseUrl + profileImage} /></div>
                                <input
                                  id="img"
                                  type="file"
                                  class="form-control-file frm-field ml-10 mt-2 profileImageBrowseButton"
                                  name="image"
                                  onChange={this.handleChangeImage}
                                  required
                                />
                                {/* <label for="img">Click here to upload image</label> */}
                              </div>

                              <div className="text-center">
                                <button
                                  type="submit"
                                  className="btn bg-black btn-block text-white z-depth-1a w-auto float-right"
                                >
                                  Upload Your Photo
                        </button>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* <div className="imgPreview">{imagePreview}</div> */}

              <div class="topnav" id="myTopnav">
                <Link to="/provider-profile" class="custom_column">
                  <div class="text-center profile_box_1">
                    <div>
                      <i class="fas fa-user-tie"></i>
                    </div>
                    <div class="text-center">
                      <p className="text-white"> Profile</p>
                    </div>
                  </div>
                </Link>

                <Link to="/provider-services" class="custom_column">
                  <div class="text-center profile_box_2">
                    <div>
                      <i class="fas fa-cogs"></i>
                    </div>
                    <div class="text-center">
                      <p className="text-white">Your Services</p>
                    </div>
                  </div>
                </Link>

                <Link to="/jobs" class="custom_column">
                  <div class="text-center profile_box_7">
                    <div>
                      <i class="fas fa-user-md"></i>
                    </div>
                    <div class="text-center">
                      <p className="text-white">Jobs</p>
                    </div>
                  </div>
                </Link>

                <Link to="/provider-schedular" class="custom_column">
                  <div class="text-center profile_box_3">
                    <div>
                      <i class="fas fa-list-ul"></i>
                    </div>
                    <div class="text-center">
                      <p className="text-white"> Your Availibility</p>
                    </div>
                  </div>
                </Link>

                <Link to="/provider-documents" class="custom_column">
                  <div class="text-center  profile_box_4">
                    <div>
                      <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="text-center">
                      <p className="text-white"> Your Documents</p>
                    </div>
                  </div>
                </Link>

                <Link to="/provider-mailbox" class="custom_column">
                  <div class="text-center profile_box_5">
                    <div>
                      <i class="fas fa-mail-bulk"></i>
                    </div>
                    <div class="text-center">
                      <p className="text-white">Your Emails</p>
                    </div>
                  </div>
                </Link>

                <Link to="/provider-reviews" class="custom_column">
                  <div class="text-center profile_box_6">
                    <div>
                      <i class="far fa-comments"></i>
                    </div>
                    <div class="text-center">
                      <p className="text-white">Your Reviews</p>
                    </div>
                  </div>
                </Link>

                <Link to="/provider-earnings" class="custom_column">
                  <div class="text-center profile_box_0">
                    <div>
                      <i class="fas fa-pound-sign"></i>
                    </div>
                    <div class="text-center">
                      <p className="text-white">Your Earnings</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
