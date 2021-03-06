﻿import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import App from '../App';
import toastr from 'toastr';

export class EditCustomerProfile extends Component {
    displayName = EditCustomerProfile.name

    constructor(props) {
        
        if (localStorage.getItem('customerDob') == '0001-01-01') {
            var customerDOB = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        }
        else {
            var customerDOB = localStorage.getItem('customerDob').slice('T', 10);
        }

        console.log("Date of Birth:" + customerDOB);

        super(props);
        this.state = {
            file: null,
            users: [],
            allAddresses: [],
            successupdateprofile: '',
            firstname: localStorage.getItem('firstname'), surname: localStorage.getItem('surname'), mobile: localStorage.getItem('mobile'),
            imagepath: '', base64image: '', genderpreference: localStorage.getItem('customerGenderpreference'), gender: localStorage.getItem('gender'), dob: customerDOB, updated: false
        };

        console.log(this.state.genderpreference);
        console.log(this.state.gender);
        console.log(this.state.dob);

        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);
        this.handleChangeGenderPreference = this.handleChangeGenderPreference.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleChangeDOB = this.handleChangeDOB.bind(this);
        this.handleChangeTestImage = this.handleChangeTestImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    getInitialState = () => {
        const initialState = {
        };
        return initialState;
    }

    resetState = () => {
        this.setState(this.getInitialState());
    }

    UpdateCustomerProfile(firstname, surname, mobile, imagepath, base64image, genderpreference, gender, dob) {

        var customeraccesstoken = localStorage.getItem('customeraccesstoken');
        var customerId = localStorage.getItem("customerid");
        var customerImagePath = localStorage.getItem('customerprofileImage');

        if (this.state.imagePreviewUrl == null) {
            var imagepath = customerImagePath;
            var base64image = null;
        }
        else {
            var imagepath = '';
            var base64image = this.state.imagePreviewUrl.slice(22);
            console.log(base64image);
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname: firstname,
                surname: surname,
                mobile: mobile,
                imagepath: imagepath,
                base64image: base64image,
                genderpreference: genderpreference,
                gender: gender,
                dob: dob,
                customerid: customerId,
                serviceproviderid: '0',
                authtoken: customeraccesstoken
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/CustomerProfile/updatecustomerprofile', requestOptions)
            .then(response => {
                console.log(response);
                this.setState({ successupdateprofile: response.status })
                if (response.status == '200') {
                    return response.json();
                }
                else {
                    toastr["error"]("Incorrect Values!");
                }
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                    this.setState({ updateCustomer: response, updated: true });

                    localStorage.setItem('firstname', response.firstname);
                    localStorage.setItem('surname', response.surname);
                    localStorage.setItem('mobile', response.mobile);
                    localStorage.setItem('gender', response.gender);
                    localStorage.setItem('customerGenderpreference', response.genderpreference);
                    localStorage.setItem('customerDob', response.dob);
                    localStorage.setItem('customerprofileImage', response.imagepath);


                    // Toasting message here
                    if (this.state.successupdateprofile == 200) {
                        toastr["success"]("You account details are Updated Successfully!");
                        //console.log(response.message);
                    }


                }

            });
    }

    fileUpload(file) {

        //const url = App.ApisBaseUrl + '/api/Image/uploadimagetest';
        //const formData = new FormData();
        //formData.append('custimage', file)
        //const config = {
        //    headers: {
        //        'content-type': 'multipart/form-data'
        //    }
        //}
        //console.log(url);
        //console.log(formData);
        //console.log(config);

        //return fetch(url, formData, config)
        //    .then(response => {
        //        return response.json();
        //    })
        //    .then(response => {
        //        console.log(response);
        //    });

        //return post(url, formData, config)

        let File = this.state.file
        console.log(File.name);

        let formdata = new FormData()
        formdata.append('custimage', this.state.file, this.state.file.name)
        console.log(formdata);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            body: JSON.stringify({
                userId: '10',
                name: 'cheeji',
                uploadImage: formdata
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Image/uploadimagetest1', requestOptions)
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);
            });
    }

    handleChangeFirstname(e) {
        this.setState({ firstname: e.target.value });
    }

    handleChangeSurname(e) {
        this.setState({ surname: e.target.value });
    }

    handleChangeMobile(e) {
        this.setState({ mobile: e.target.value });
    }

    handleChangeGenderPreference(e) {
        this.setState({ genderpreference: e.target.value });
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
                imagePreviewUrl: reader.result,
                
            });

            console.log(reader.result);
        }

        reader.readAsDataURL(file);
    }

    handleChangeDOB(date) {
        this.setState({
            dob: date
        });
        //this.setState({ dob: e.target.value });
        //alert(e.target.value);
    }

    handleChangeTestImage(e) {

        let file = e.target.files[0];
        this.setState({ file: file });
        console.log(this.state.file);
    }

    handleSubmit(e) {
        e.preventDefault();

        const { firstname, surname, mobile, imagepath, base64image, genderpreference, gender, dob } = this.state;
        this.UpdateCustomerProfile(firstname, surname, mobile, imagepath, base64image, genderpreference, gender, dob );
    }

    render() {
        let contents = this.state.updated
            ? this.customerProfileUpdate(this.state.updateCustomer)
            : this.customerProfile();
        return <div>
            {contents}
        </div>;
    }

    customerProfile() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;

        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        
        }
        console.log(this.state.imagePreviewUrl);
        //console.log(this.state.imagePreviewUrl.slice(23));

        if (localStorage.getItem('customerGenderpreference') == 'na') {
            var customerGenderPreference = 'Others';
        }
        else {
            var customerGenderPreference = (localStorage.getItem('customerGenderpreference'));
        }

        if (localStorage.getItem('gender') == 'na') {
            var customerGender = 'Others';
        }
        else {
            var customerGender = (localStorage.getItem('gender'));
        }

        return (

            <div className="Register p-5">

                <div className="border p-5">

                    <form onSubmit={this.handleSubmit} enctype="multipart/form-data" className="p-5">
                        <div className="form-row pb-3">
                            <div class="col">
                                <input type="text" name="firstname" className="form-control validate frm-field" placeholder="First Name" value={this.state.firstname}
                                    onChange={this.handleChangeFirstname} />
                            </div>
                            <div class="col">
                                <input type="text" name="surname" className="form-control validate frm-field" placeholder="Last Name" value={this.state.surname}
                                    onChange={this.handleChangeSurname} />
                            </div>
                        </div>

                        <div className="form-row pb-3">
                            <div class="col">
                                <input type="number" name="mobile" className="form-control validate frm-field" placeholder="Mobile" value={this.state.mobile}
                                    onChange={this.handleChangeMobile} />
                            </div>
                        </div>

                        <hr />

                        <h5>Gender Preference</h5>

                        <div className="md-form pb-3">
                            <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.genderpreference}
                                onChange={this.handleChangeGenderPreference} >
                                <option value={localStorage.getItem('customerGenderpreference')}>{customerGenderPreference}</option>
                                <option value="">-----------------</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="na">Others</option>
                            </select>
                        </div>

                        <hr />

                        <h5>Gender</h5>

                        <div className="md-form pb-3">
                            <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.gender}
                                onChange={this.handleChangeGender} >
                                <option value={localStorage.getItem('gender')}>{customerGender}</option>
                                <option value="">-----------------</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="na">Others</option>
                            </select>
                        </div>

                        <h5>Date of birth</h5>
                        <div className="md-form pb-3">
                            <ModernDatepicker
                                date={this.state.dob}
                                format={'YYYY-MM-DD'}
                                showBorder
                                onChange={(date) => this.handleChangeDOB(date)}
                                placeholder={'Select a date'} />
                        </div>

                        <div class="form-group pb-3">
                            <label for="exampleFormControlFile1">Upload Profile Image</label>
                            <input type="file" class="form-control-file frm-field" name="image"
                                onChange={this.handleChangeImage} />
                        </div>

                        <div class="form-group pb-3">
                            <label for="exampleFormControlFile2">Upload Image</label>
                            <input type="file" name="file" class="form-control-file frm-field"
                                onChange={this.handleChangeTestImage} />
                        </div>

                        <div className="text-center mb-3">
                            <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Save Changes</button>
                        </div>

                        <div className="imgPreview">
                            {$imagePreview}
                        </div>


                    </form>


                </div>

            </div>
        );
    }

    customerProfileUpdate() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }

        if (localStorage.getItem('customerGenderpreference') == 'na') {
            var customerGenderPreference = 'Others';
        }
        else {
            var customerGenderPreference = (localStorage.getItem('customerGenderpreference'));
        }

        if (localStorage.getItem('gender') == 'na') {
            var customerGender = 'Others';
        }
        else {
            var customerGender = (localStorage.getItem('gender'));
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="text" name="firstname" className="form-control validate frm-field" placeholder="First Name" value={this.state.firstname}
                                onChange={this.handleChangeFirstname} />
                        </div>
                        <div class="col">
                            <input type="text" name="surname" className="form-control validate frm-field" placeholder="Last Name" value={this.state.surname}
                                onChange={this.handleChangeSurname} />
                        </div>
                    </div>

                    <div className="form-row pb-3">
                        <div class="col">
                            <input type="number" name="mobile" className="form-control validate frm-field" placeholder="Mobile" value={this.state.mobile}
                                onChange={this.handleChangeMobile} />
                        </div>
                    </div>

                    <h5>Gender Preference</h5>

                    <div className="md-form pb-3">
                        <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.genderpreference}
                            onChange={this.handleChangeGenderPreference} >
                            <option value={localStorage.getItem('genderpreference')}>{customerGenderPreference}</option>
                            <option value="">-----------------</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="na">Others</option>
                        </select>
                    </div>

                    <hr />

                    <h5>Gender</h5>

                    <div className="md-form pb-3">
                        <select className="form-control my-1 mr-sm-2 frm-field" value={this.state.gender}
                            onChange={this.handleChangeGender} >
                            <option value={localStorage.getItem('gender')}>{customerGender}</option>
                            <option value="">-----------------</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="na">Others</option>
                        </select>
                    </div>

                    <h5>Date of birth</h5>
                    <div className="md-form pb-3">
                        <ModernDatepicker
                            date={this.state.dob}
                            format={'YYYY-MM-DD'}
                            showBorder
                            onChange={this.handleChangeDOB}
                            placeholder={'Select a date'} />
                    </div>

                    <div class="form-group pb-3">
                        <label for="exampleFormControlFile1">Upload Profile Image</label>
                        <input type="file" class="form-control-file frm-field" name="image"
                            onChange={this.handleChangeImage} />
                    </div>

                    <div className="text-center mb-3">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Save Changes</button>
                    </div>

                    <div className="imgPreview">
                        {$imagePreview}
                    </div>

                </form>
            </div>
        );
    }

}