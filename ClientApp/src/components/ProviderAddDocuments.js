import React, { Component } from 'react';
import App from '../App';
import toastr from 'toastr';

export class ProviderAddDocuments extends Component {
    displayName = ProviderAddDocuments.name

    constructor() {
        super();

        this.state = {
            serviceproviderid: '',
            doctype: '',
            file: '',
            base64Image: '',
            imagePreviewUrl: '',
            upload: false,
        };

        this.handleChangeDoctype = this.handleChangeDoctype.bind(this);
        this.handleChangeImage = this.handleChangeImage.bind(this);
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


    UploadDocument(serviceproviderid, doctype, imagePreviewUrl) {

        var providerAccesstoken =
        "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnVZVzFsYVdRaU9pSXhNRE1pTENKbGJXRnBiQ0k2SW5OaGNtRkFiV0ZwYkdsdVlYUnZjaTVqYjIwaUxDSnliMnhsSWpvaVEzVnpkRzl0WlhJaUxDSkpjMVpoYkdsa0lqb2lkSEoxWlNJc0ltNWlaaUk2TVRVNE16RTFNRFl6TkN3aVpYaHdJam94TmpFM056QTNNRE0wTENKcFlYUWlPakUxT0RNeE5UQTJNelFzSW1semN5STZJbVpwYm1SaGJtVjRjR1Z5ZEM1dVpYUWlMQ0poZFdRaU9pSm1hVzVrWVc1bGVIQmxjblF1Ym1WMEluMC5WMkdGQVlNS00xa3JScWIwVkRuVll2dWlsSVk0Q3NPUGhGRm43R2J3WWdn";
      //var providerAccesstoken = localStorage.getItem('provideraccesstoken');
        var serviceproviderid = localStorage.getItem("serviceproviderid");
        var bse64String = this.state.imagePreviewUrl.slice(22);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                serviceproviderid: serviceproviderid,
                doctype: doctype,
                base64Image: bse64String,
                authtoken: providerAccesstoken
            })
        };
        console.log(requestOptions);
        return fetch(App.ApisBaseUrl + '/api/Provider/uploaddocument', requestOptions)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(response => {
                console.log(response);
                if (response != null) {
                   
                    
                    toastr['success']('Document has been uploaded!');
                    // setTimeout(function () {
                    //     window.location = '/provider-documents';
                    // }, 3000);

                }

            });
    }

    handleChangeDoctype(e) {
        this.setState({ doctype: e.target.value });

    }

    handleChangeImage(e) {
        //this.setState({ image: e.target.value });

        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
        }

        reader.readAsDataURL(file);
        this.state.imagePreviewUrl = this.state.imagePreviewUrl.replace('data:image/png;base64,','');
    }

    handleSubmit(e) {
        e.preventDefault();
        const { serviceproviderid, doctype, imagePreviewUrl } = this.state;
        this.UploadDocument(serviceproviderid, doctype, imagePreviewUrl);
    }

    render() {
        let contents = this.state.upload
            ? this.UpdatedProviderDocument(this.state.uploadedDocument)
            : this.ProviderDocument();
        return <div>
            {contents}
        </div>;
    }

    ProviderDocument() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        console.log(this.state.imagePreviewUrl.slice(23));

        return (

            <div className="Register coloredBox">
                <p className="font-weight-bold mb-5">Add your <span className="text-red">Documents</span></p>
                <form onSubmit={this.handleSubmit}>

                    <div className="md-form pb-3">
                        <select className="form-control frm-field" value={this.state.doctype}
                            onChange={this.handleChangeDoctype} required >
                            <option value="" selected>Please Select an Image</option>
                            <option value="degree">Degree</option>
                            <option value="certificate">Certificate</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div class="form-group pb-3">
                        <label for="exampleFormControlFile1">Upload Document (PNG Format)</label>
                        <input type="file" class="form-control-file frm-field" name="image"
                            onChange={this.handleChangeImage} required />
                    </div>

                    <div className="text-center mb-5">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Upload Your Documents</button>
                    </div>

                </form>

                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        );
    }

    UpdatedProviderDocument(uploadedDocument) {
        return (
            <div>
                <div class="spinner-border text-center pt-3 pb-3" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                
                <form onSubmit={this.handleSubmit} enctype="multipart/form-data">

                    <div className="md-form pb-3">
                        <select className="form-control frm-field" value={this.state.doctype}
                            onChange={this.handleChangeDoctype} required >
                            <option value="" selected>Please Select</option>
                            <option value="degree">Degree</option>
                            <option value="certificate">Certificate</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div class="form-group pb-3">
                        <label for="exampleFormControlFile1">Upload Document</label>
                        <input type="file" class="form-control-file frm-field" name="image"
                            onChange={this.handleChangeImage} required />
                    </div>

                    <div className="text-center mb-5">
                        <button type="submit" className="btn bg-black btn-block text-white z-depth-1a w-auto float-right">Upload Your Documents</button>
                    </div>

                </form>
            </div>

            //<Redirect to='/profile' />
        );
    }

}


