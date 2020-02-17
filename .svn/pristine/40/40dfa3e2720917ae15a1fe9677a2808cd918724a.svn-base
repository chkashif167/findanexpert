import React, { Component } from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { SearchService } from '../../components/SearchService';
import { locale } from 'moment';
import App from '../../App';
import Loader from '../../assets/img/loader.gif';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

export class BookingPage extends Component {
    displayName = BookingPage.name
     
    constructor() {
        super();
 
        var todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":";

        let current_datetime = new Date()
        let formatted_date = (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + "-" +
            current_datetime.getFullYear()

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var customerID = localStorage.getItem('customerid');
        var customerEmail = localStorage.getItem('email');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const isGeneric = params.get('isgeneric');
        console.log(isGeneric);
        localStorage.setItem('IsgenericValue', isGeneric);

        const serviceArrayIndex = params.get('index');
        const serviceid = params.get('serviceid');
        const servicetypeid = params.get('servicetypeid');

        const servicename = params.get('servicename');
        localStorage.setItem('servicename', servicename);

        const servicetypename = params.get('srvtypename');
        const serviceproviderid = params.get('serviceproviderid');
        const bookinghours = params.get('srvtypeduration');
        const isgeneric = params.get('isgeneric');
        const keyWord = params.get('searchedservice');
        const hasArea = params.get('hasarea');
        console.log(hasArea);

        localStorage.removeItem('isrebooking');

        var currentTime = moment();

        this.state = {
            allServices: [], serviceDurations: [], durationList: [],
            priceInHousePeakHour: [], priceInHouseOffPeakHour: [],
            priceInClinicPeakHour: [], priceInClinicOffPeakHour: [],
            allAddress: [],
            laserServiceTypes: [], serviceTypeList: [], switchOnPeakHours: [], 
            genericServicesPrices: [],
            genericServicesPricesList: [],
            genericPriceInhousePeakHour: 0,
            genericPriceInhouseOffPeakHour: 0,
            genericPriceInClinicPeakHour: 0,
            genericPriceInClinicOffPeakHour: 0,
            price: 0,
            original_price: 0,
            servicePrice: 0,
            referralBonusPrice: 0,
            loading: true,
            shown: true,
            customerid: customerID,
            customeremail: customerEmail,
            serviceid: serviceid,
            servicetypeid: servicetypeid,
            serviceproviderid: serviceproviderid,
            bookingdate: todayDate,
            bookingtime: currentTime,
            displayTimepicker: true,
            displayTimepicker: true,
            postalcode: '',
            addressid: '',
            bookingpreference: '',
            duration: '',
            genderpreference: '',
            notes: '',
            booked: false,
            addresscheck: [],
            submitTime: false,
            cardsList: [],
            inclinic: '',
            inhouse: '',
            genericServices: [],
            genericServicesList: [],
            genericServicesDuration: [],
            genericDurationSumList: [],
            genericDurationSum: [],
            genericServicesPrices: '',
            genericPrices: [],
            genericPricesList: [],
            referralBonus: [],
            availableSlotAvailibility: '',
            availableSlots: [],
            availibilityDates: [],
            availibilityTimeSlots: [],
            currentDate: '',
            currentDateSlot: '',
            totalPrice: 0,
            bookingPageLoader: '',
            //redeemCode: false
            studentDiscountCode: '',
            hasStudentDiscount: '',
            studentDiscountData: []
        };

        this.handleChangeInclinic = this.handleChangeInclinic.bind(this);
        this.handleChangeInhouse = this.handleChangeInhouse.bind(this);
        this.handleChangeBookingTime = this.handleChangeBookingTime.bind(this);
        this.handleChangeAddressCheck = this.handleChangeAddressCheck.bind(this);
        this.handleChangeBookingDate = this.handleChangeBookingDate.bind(this);
        this.handleChangeBookingPreference = this.handleChangeBookingPreference.bind(this);
        this.handleChangeServiceDuration = this.handleChangeServiceDuration.bind(this);
        this.handleChangeGenderPreference = this.handleChangeGenderPreference.bind(this);
        this.handleChangeNotes = this.handleChangeNotes.bind(this);
        this.handleChangeGenericServiceList = this.handleChangeGenericServiceList.bind(this);

        this.handleChangeCurrentDate = this.handleChangeCurrentDate.bind(this);
        this.handleChangeCurrentDateSlot = this.handleChangeCurrentDateSlot.bind(this);
        this.handChangeDiscountCode = this.handChangeDiscountCode.bind(this);
        this.handleDiscountConfirm = this.handleDiscountConfirm.bind(this);

        console.log("Date Selected=" + this.state.bookingdate);

        this.handleSubmit = this.handleSubmit.bind(this);

        //-- Save incompleted booking --//
        const saveincompletePrams = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                authtoken: localStorage.getItem('customeraccesstoken'),
                serviceid: serviceid,
                servicetypeid: servicetypeid
            })
        };

        fetch(App.ApisBaseUrl + '/api/Booking/saveincompletebooking', saveincompletePrams)
            .then(response => {
                return response.json();
            })
            .then(response => {
                //this.setState({ allServices: response, found: true });
            });

        //-- Find Service Durations/Prices --//
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                SearchService: keyWord
            })
        };

        fetch(App.ApisBaseUrl + '/api/ServiceType/findservicetype?searchService=' + keyWord, requestOptions)
            .then(response => {
                if (response.status == '404') {
                    alert("No result match your search! Please try something else.");
                }
                else if (response.status == '400') {
                    alert('No result match your search! Please try something else.');
                }
                else {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response);
                this.setState({ allServices: response, found: true });
                if (isgeneric == 'false') {
                    var newArray = this.state.serviceDurations.slice();
                    for (var i = 0; i < this.state.allServices.length; i++) {

                        if (i == serviceArrayIndex) {
                            newArray.push(this.state.allServices[i].duration);
                        }
                    }

                    this.setState({ serviceDurations: newArray });
                    console.log(newArray);

                    var newArray1 = this.state.durationList.slice();
                    for (var j = 0; j < this.state.serviceDurations.length; j++) {

                        newArray1.push(this.state.serviceDurations[j]);
                        this.setState({ durationList: newArray1 });

                        var newArray3 = this.state.durationList[j];
                        for (var k = 0; k < newArray3.length; k++) {

                            var test = this.state.durationList[j].slice();
                        }
                    }

                    this.setState({ durationList: test });
                }

                if (isgeneric == 'true' && hasArea == 'false') {
                    var newArray = this.state.genericServices.slice();
                    for (var i = 0; i < this.state.allServices.length; i++) {

                        if (i == serviceArrayIndex) {
                            newArray.push(this.state.allServices[i].genericprice);
                        }
                    }

                    this.setState({ genericServices: newArray });
                    console.log(this.state.genericServices);

                    var newArray1 = this.state.genericServicesList.slice();
                    for (var j = 0; j < this.state.genericServices.length; j++) {

                        newArray1.push(this.state.genericServices[j]);
                        this.setState({ genericServicesList: newArray1 });

                        var newArray3 = this.state.genericServicesList[j];
                        for (var k = 0; k < newArray3.length; k++) {

                            var test = this.state.genericServicesList[j].slice();
                        }
                    }

                    this.setState({ genericServicesList: test });
                }
            });

        //-- Customer Address --//
        fetch(App.ApisBaseUrl + '/api/CustomerProfile/getallcustomeraddress?customerId=' + customerID + '&authToken=' + customerAccesstoken)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ allAddress: data.address, loading: false });
            });

        //-- Generic services list --//
        if (isgeneric == 'true' && hasArea == 'true') {
            fetch(App.ApisBaseUrl + '/api/ServiceType/getservicetypeareas?servicetypeid=' + servicetypeid + '&authToken=' + customerAccesstoken)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    this.setState({ laserServiceTypes: response.data, loading: false });
                    //var newArray = this.state.serviceTypeList.slice();
                    //for (var i = 0; i < this.state.laserServiceTypes.length; i++) {

                    //    for (var k = 0; k < this.state.laserServiceTypes[i].genericprice.length; k++) {
                    //        newArray.push(this.state.laserServiceTypes[i].genericprice[k]);
                    //    }
                    //}
                    //this.setState({ serviceTypeList: newArray });
                });
        }

        //-- Request Card Info --//
        const requestCardOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: localStorage.getItem("email"),
                authtoken: customerAccesstoken
            })
        };

        fetch(App.ApisBaseUrl + '/api/Payment/requestcardinfo', requestCardOptions)
            .then(response => {
                localStorage.setItem('requestcardinfoStatus', response.status);
                return response.json();
            })
            .then(data => {
                this.setState({ allCards: data, loading: false });
                if (localStorage.getItem('requestcardinfoStatus') == '404') {
                    localStorage.removeItem('customercardtokenmakedefault');
                }
                else {
                    var newArray = this.state.cardsList.slice();
                    for (var i = 0; i < this.state.allCards.length; i++) {

                        newArray.push(this.state.allCards[i]);
                        this.setState({ cardsList: newArray });
                        localStorage.setItem('customercardtokenmakedefault', this.state.cardsList[0].cardtoken);
                    }
                }
            });
    }

    AddBookingTimeDate(bookingtime) {

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        const isgeneric = params.get('isgeneric');
        const hasArea = params.get('hasarea');
        const inclinic = params.get('inclinic');
        const inhouse = params.get('inhouse');
        const peakHours = params.get('peakhours');
        const endPeakHours = params.get('end_peakhours');
        const switchOnPeakHours = params.get('switchonpeakhours');

        var bookedTime = localStorage.getItem('bookingTime');
        var durationIndex = localStorage.getItem('selectedDurationIndex');

        var totalEndPeakTime = 0;
        var totalStartPeakTime = 0;
        var selectedTime = 0;

        if (peakHours >= endPeakHours) {

            var peakhours = peakHours.slice('0', 2);
            var end_peakhours = parseInt(endPeakHours) + 24;

            if (bookedTime >= peakHours) {
                selectedTime = bookedTime;
            }
            else {
                selectedTime = parseInt(bookedTime) + 24;
            }
        }
        else {
            var peakhours = peakHours.slice('0', 2);
            var end_peakhours = endPeakHours;
            var selectedTime = bookedTime;
        }

        if (isgeneric == 'false') {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.bookingdate != '' && this.state.duration != '') {
                        if (selectedTime <= end_peakhours && selectedTime >= peakhours) {

                            this.setState({ servicePrice: this.state.durationList[durationIndex].priceInClinicPeakHour });
                            localStorage.setItem('servicePrice', this.state.servicePrice);
                            console.log("Peak Price=" + this.state.servicePrice);
                        }
                        else {
                            this.setState({ servicePrice: this.state.durationList[durationIndex].priceInClinicOffPeakHour });
                            localStorage.setItem('servicePrice', this.state.servicePrice);
                            console.log("Non Peak Price=" + this.state.servicePrice);
                        }
                    }
                }
                else {
                    if (this.state.inhouse != '') {
                        if (this.state.addresscheck != '' && this.state.bookingdate != '' && this.state.duration != '') {
                            if (selectedTime >= peakhours && selectedTime <= end_peakhours) {

                                this.setState({ servicePrice: this.state.durationList[durationIndex].priceInHousePeakHour });
                                localStorage.setItem('servicePrice', this.state.servicePrice);
                            }
                            else {
                                this.setState({ servicePrice: this.state.durationList[durationIndex].priceInHouseOffPeakHour });
                                localStorage.setItem('servicePrice', this.state.servicePrice);
                            }
                        }
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic == 'true') {
                    if (this.state.addresscheck != '' && this.state.bookingdate != '' && this.state.duration != '') {
                        if (selectedTime >= peakhours && selectedTime <= end_peakhours) {

                            this.setState({ servicePrice: this.state.durationList[durationIndex].priceInClinicPeakHour });
                            localStorage.setItem('servicePrice', this.state.servicePrice);
                        }
                        else {
                            this.setState({ servicePrice: this.state.durationList[durationIndex].priceInClinicOffPeakHour });
                            localStorage.setItem('servicePrice', this.state.servicePrice);
                        }
                    }
                }
                else {
                    if (inhouse == 'true') {
                        if (this.state.addresscheck != '' && this.state.bookingdate != '' && this.state.duration != '') {
                            if (selectedTime >= peakhours && selectedTime <= end_peakhours) {

                                this.setState({ servicePrice: this.state.durationList[durationIndex].priceInHousePeakHour });
                                localStorage.setItem('servicePrice', this.state.servicePrice);
                            }
                            else {
                                this.setState({ servicePrice: this.state.durationList[durationIndex].priceInHouseOffPeakHour });
                                localStorage.setItem('servicePrice', this.state.servicePrice);
                            }
                        }
                    }
                }
            }
        }
        else if (isgeneric == 'true' && hasArea == 'false') {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.bookingdate != '') {
                        if (switchOnPeakHours == 'true') {
                            if (selectedTime <= end_peakhours && selectedTime >= peakhours) {

                                this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInClinicPeakHours });
                                localStorage.setItem('servicePrice', this.state.servicePrice);
                                console.log("Peak Price=" + this.state.servicePrice);
                            }
                            else {
                                this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInClinicOffPeakHours });
                                localStorage.setItem('servicePrice', this.state.servicePrice);
                                console.log("Non Peak Price=" + this.state.servicePrice);
                            }
                        }
                        else {
                            this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInClinicOffPeakHours });
                            localStorage.setItem('servicePrice', this.state.servicePrice);
                            console.log("Non Peak Price=" + this.state.servicePrice);
                        }
                    }
                }
                else {
                    if (this.state.inhouse != '') {
                        if (this.state.addresscheck != '' && this.state.bookingdate != '') {
                            if (switchOnPeakHours == 'true') {
                                if (selectedTime >= peakhours && selectedTime <= end_peakhours) {

                                    this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInhousePeakHours });
                                    localStorage.setItem('servicePrice', this.state.servicePrice);
                                    console.log("Peak Price=" + this.state.servicePrice);
                                }
                                else {
                                    this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInhouseOffPeakHours });
                                    localStorage.setItem('servicePrice', this.state.servicePrice);
                                    console.log("Non Peak Price=" + this.state.servicePrice);
                                }
                            }
                            else {
                                this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInhouseOffPeakHours });
                                localStorage.setItem('servicePrice', this.state.servicePrice);
                                console.log("Non Peak Price=" + this.state.servicePrice);
                            }
                        }
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic == 'true') {
                    if (this.state.addresscheck != '' && this.state.bookingdate != '') {
                        if (switchOnPeakHours == 'true') {
                            if (selectedTime >= peakhours && selectedTime <= end_peakhours) {

                                this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInClinicPeakHours });
                                localStorage.setItem('servicePrice', this.state.servicePrice);
                                console.log("Peak Price=" + this.state.servicePrice);
                            }
                            else {
                                this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInClinicOffPeakHours });
                                console.log(this.state.genericServicesList[0].genericPriceInClinicOffPeakHours);
                                localStorage.setItem('servicePrice', this.state.servicePrice);
                                console.log("Non Peak Price=" + this.state.servicePrice);
                            }
                        }
                        else {
                            this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInClinicOffPeakHours });
                            console.log(this.state.genericServicesList[0].genericPriceInClinicOffPeakHours);
                            localStorage.setItem('servicePrice', this.state.genericServicesList[0].genericPriceInClinicOffPeakHours);
                            console.log("Non Peak Price=" + this.state.servicePrice);
                        }
                    }
                }
                else {
                    if (inhouse == 'true') {
                        if (this.state.addresscheck != '' && this.state.bookingdate != '') {
                            if (switchOnPeakHours == 'true') {
                                if (selectedTime >= peakhours && selectedTime <= end_peakhours) {

                                    this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInhousePeakHours });
                                    localStorage.setItem('servicePrice', this.state.servicePrice);
                                    console.log("Peak Price=" + this.state.servicePrice);
                                }
                                else {
                                    this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInhouseOffPeakHours });
                                    localStorage.setItem('servicePrice', this.state.servicePrice);
                                    console.log("Non Peak Price=" + this.state.servicePrice);
                                }
                            }
                            else {
                                this.setState({ servicePrice: this.state.genericServicesList[0].genericPriceInhouseOffPeakHours });
                                localStorage.setItem('servicePrice', this.state.servicePrice);
                                console.log("Non Peak Price=" + this.state.servicePrice);
                            }
                        }
                    }
                }
            }
        }

    }

    getReferralBonus() {

        fetch(App.ApisBaseUrl + '/api/CustomerProfile/getreferralbonus?customerId=' + this.state.customerid + '&authToken=' + localStorage.getItem('customeraccesstoken'))
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.setState({ referralBonus: response });
            });
    }

    checkServiceProviderAvailability(customerid) {

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicename = params.get('servicename');
        console.log(servicename);
        const isGeneric = params.get('isgeneric');
        const hasArea = params.get('hasarea');
        const inClinic = params.get('inclinic');
        const inHouse = params.get('inhouse');

        if (inHouse == 'true' && inClinic == 'false' || inHouse == 'false' && inClinic == 'true') {
            if (inHouse == 'true') {
                var inhouseVal = true;
                var inclinicVal = false;
            }
            else if (inClinic == 'true') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }
        else if (inHouse == 'true' && inClinic == 'true') {
            if (this.state.inhouse != '') {
                var inhouseVal = true;
                var inclinicVal = false;
            }
            else if (this.state.inclinic != '') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }

        if (isGeneric == 'true') {
            var servicetypeidsList = this.state.genericServicesList;
        }
        else {
            var servicetypeidsList = null;
        }

        if (this.state.genderpreference == '1') {
            var genderPreference = 'male';
        }
        else if (this.state.genderpreference == '2') {
            var genderPreference = 'female';
        }
        else if (this.state.genderpreference == '3') {
            var genderPreference = 'na';
        }
        else {
            var genderPreference = 'na';
        }

        if (isGeneric == 'false') {
            var duration = this.state.duration;
        }
        else if (isGeneric == 'true' && hasArea == 'true') {
            var duration = this.state.duration;
        }
        else {
            var duration = 30;
        }

        if (this.state.serviceproviderid == null) {
            if (isGeneric == 'false') {
                if (servicename == 'Massage') {

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ServiceID: this.state.serviceid,
                            ServiceTypeID: this.state.servicetypeid,
                            BookingDate: this.state.bookingdate,
                            BookingTime: localStorage.getItem('bookingTime'),
                            duration: duration,
                            inhouse: inhouseVal,
                            inclinic: inclinicVal,
                            PostalCode: localStorage.getItem('postalcode'),
                            genderpreference: genderPreference,
                            isgeneric: false,
                            servicetypeids: servicetypeidsList,
                            authtoken: localStorage.getItem('customeraccesstoken')
                        })
                    };


                    console.log(requestOptions);

                    fetch(App.ApisBaseUrl + '/api/ServiceType/checkserviceprovideravailability', requestOptions)
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            console.log(response);
                            this.setState({ availableSlotAvailibility: response.availability_slot.availability });

                            //if (this.state.availableSlotAvailibility == false) {
                            this.setState({ availableSlots: response.availability_slot.availableslots });
                            console.log(this.state.availableSlots);
                            //}
                        });
                }
                else {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ServiceID: this.state.serviceid,
                            ServiceTypeID: this.state.servicetypeid,
                            BookingDate: this.state.bookingdate,
                            BookingTime: localStorage.getItem('bookingTime'),
                            duration: duration,
                            inhouse: inhouseVal,
                            inclinic: inclinicVal,
                            PostalCode: localStorage.getItem('postalcode'),
                            genderpreference: genderPreference,
                            isgeneric: false,
                            servicetypeids: servicetypeidsList,
                            authtoken: localStorage.getItem('customeraccesstoken')
                        })
                    };

                    fetch(App.ApisBaseUrl + '/api/ServiceType/checkserviceprovideravailability', requestOptions)
                    .then(response => {
                        return response.json();
                    })
                    .then(response => {
                        console.log(response);
                        this.setState({ availableSlotAvailibility: response.availability_slot.availability });

                        if (this.state.availableSlotAvailibility == false) {
                            this.setState({ availableSlots: response.availability_slot.availableslots });
                        }
                    });
                }
            }
            else if (isGeneric == 'true' && hasArea == 'true') {
                if (localStorage.getItem('servicename') == 'Massage') {

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ServiceID: this.state.serviceid,
                            ServiceTypeID: this.state.servicetypeid,
                            BookingDate: this.state.bookingdate,
                            BookingTime: localStorage.getItem('bookingTime'),
                            duration: 0,
                            inhouse: inhouseVal,
                            inclinic: inclinicVal,
                            PostalCode: localStorage.getItem('postalcode'),
                            genderpreference: genderPreference,
                            isgeneric: false,
                            servicetypeids: servicetypeidsList,
                            authtoken: localStorage.getItem('customeraccesstoken')
                        })
                    };

                    fetch(App.ApisBaseUrl + '/api/ServiceType/checkserviceprovideravailability', requestOptions)
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            console.log(response);
                            this.setState({ availableSlotAvailibility: response.availability_slot.availability });

                            if (this.state.availableSlotAvailibility == false) {
                                this.setState({ availableSlots: response.availability_slot.availableslots });
                            }
                        });
                }
                else {

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ServiceID: this.state.serviceid,
                            ServiceTypeID: this.state.servicetypeid,
                            BookingDate: this.state.bookingdate,
                            BookingTime: localStorage.getItem('bookingTime'),
                            duration: this.state.genericDurationSum,
                            inhouse: inhouseVal,
                            inclinic: inclinicVal,
                            PostalCode: localStorage.getItem('postalcode'),
                            genderpreference: genderPreference,
                            isgeneric: false,
                            servicetypeids: servicetypeidsList,
                            authtoken: localStorage.getItem('customeraccesstoken')
                        })
                    };

                    console.log(requestOptions);

                    fetch(App.ApisBaseUrl + '/api/ServiceType/checkserviceprovideravailability', requestOptions)
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            console.log(response);
                            this.setState({ availableSlotAvailibility: response.availability_slot.availability });

                            if (this.state.availableSlotAvailibility == false) {
                                this.setState({ availableSlots: response.availability_slot.availableslots });
                            }
                        });     
                   
                }
            }
            else if (isGeneric == 'true' && hasArea == 'false'){

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ServiceID: this.state.serviceid,
                        ServiceTypeID: this.state.servicetypeid,
                        BookingDate: this.state.bookingdate,
                        BookingTime: localStorage.getItem('bookingTime'),
                        duration: duration,
                        inhouse: inhouseVal,
                        inclinic: inclinicVal,
                        PostalCode: localStorage.getItem('postalcode'),
                        genderpreference: genderPreference,
                        isgeneric: false,
                        servicetypeids: [this.state.servicetypeid],
                        authtoken: localStorage.getItem('customeraccesstoken')
                    })
                };

                console.log(requestOptions);

                fetch(App.ApisBaseUrl + '/api/ServiceType/checkserviceprovideravailability', requestOptions)
                    .then(response => {
                        return response.json();
                    })
                    .then(response => {
                        console.log(response);
                        this.setState({ availableSlotAvailibility: response.availability_slot.availability });

                        if (this.state.availableSlotAvailibility == false) {
                            this.setState({ availableSlots: response.availability_slot.availableslots });
                        }
                    });
            }
        }
        else {
            if (isGeneric == 'false') {
                if (servicename == 'Massage') {

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            serviceproviderid: this.state.serviceproviderid,
                            customerid: customerid,
                            BookingDate: this.state.bookingdate,
                            BookingTime: localStorage.getItem('bookingTime'),
                            duration: duration,
                            authtoken: localStorage.getItem('customeraccesstoken')
                        })
                    };
                    console.log(requestOptions);

                    fetch(App.ApisBaseUrl + '/api/ServiceProvider/getavailabilityslots', requestOptions)
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            console.log(response);
                            this.setState({ availableSlotAvailibility: response.availability_slot.availability });

                            this.setState({ availableSlots: response.availability_slot.availableslots });
                            console.log(this.state.availableSlots);
                        });
                }
                else {

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            serviceproviderid: this.state.serviceproviderid,
                            customerid: customerid,
                            BookingDate: this.state.bookingdate,
                            BookingTime: localStorage.getItem('bookingTime'),
                            duration: duration,
                            authtoken: localStorage.getItem('customeraccesstoken')
                        })
                    };
                    console.log(requestOptions);

                    fetch(App.ApisBaseUrl + '/api/ServiceProvider/getavailabilityslots', requestOptions)
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            console.log(response);
                            this.setState({ availableSlotAvailibility: response.availability_slot.availability });

                            this.setState({ availableSlots: response.availability_slot.availableslots });
                            console.log(this.state.availableSlots);
                        });
                }
            }
            else if (isGeneric == 'true' && hasArea == 'true') {
                if (localStorage.getItem('servicename') == 'Massage') {

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            serviceproviderid: this.state.serviceproviderid,
                            customerid: customerid,
                            BookingDate: this.state.bookingdate,
                            BookingTime: localStorage.getItem('bookingTime'),
                            duration: this.state.genericDurationSum,
                            authtoken: localStorage.getItem('customeraccesstoken')
                        })
                    };
                    console.log(requestOptions);

                    fetch(App.ApisBaseUrl + '/api/ServiceProvider/getavailabilityslots', requestOptions)
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            console.log(response);
                            this.setState({ availableSlotAvailibility: response.availability_slot.availability });

                            this.setState({ availableSlots: response.availability_slot.availableslots });
                            console.log(this.state.availableSlots);
                        });
                }
                else {

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            serviceproviderid: this.state.serviceproviderid,
                            customerid: this.state.customerid,
                            BookingDate: this.state.bookingdate,
                            BookingTime: localStorage.getItem('bookingTime'),
                            duration: this.state.genericDurationSum,
                            authtoken: localStorage.getItem('customeraccesstoken')
                        })
                    };
                    console.log(requestOptions);

                    fetch(App.ApisBaseUrl + '/api/ServiceProvider/getavailabilityslots', requestOptions)
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            console.log(response);
                            this.setState({ availableSlotAvailibility: response.availability_slot.availability });

                            this.setState({ availableSlots: response.availability_slot.availableslots });
                            console.log(this.state.availableSlots);
                        });
                }
            }
            else {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        serviceproviderid: this.state.serviceproviderid,
                        customerid: customerid,
                        BookingDate: this.state.bookingdate,
                        BookingTime: localStorage.getItem('bookingTime'),
                        duration: this.state.genericDurationSum,
                        authtoken: localStorage.getItem('customeraccesstoken')
                    })
                };
                console.log(requestOptions);

                fetch(App.ApisBaseUrl + '/api/ServiceProvider/getavailabilityslots', requestOptions)
                    .then(response => {
                        return response.json();
                    })
                    .then(response => {
                        console.log(response);
                        this.setState({ availableSlotAvailibility: response.availability_slot.availability });

                        this.setState({ availableSlots: response.availability_slot.availableslots });
                        console.log(this.state.availableSlots);
                    });
            }
        }
    }

    handleChangeInclinic(e) {
        this.setState({ inclinic: e.target.id });

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        const hasArea = params.get('hasarea');
        const isgeneric = params.get('isgeneric');

        if (isgeneric == 'false') {
            if (this.state.addresscheck != '' && this.state.duration != '' && this.state.genderpreference != '') {
                this.AddBookingTimeDate();
                this.checkServiceProviderAvailability();
                this.getReferralBonus();
            }
        }
        else if (isgeneric == 'true' && hasArea == 'true') {
            if (this.state.addresscheck != '' && this.state.genericServicesPricesList != '') {
                this.AddBookingTimeDate();
                this.checkServiceProviderAvailability();
                this.getReferralBonus();
            }
        }
        else {
            if (this.state.addresscheck != '') {
                this.AddBookingTimeDate();
                this.checkServiceProviderAvailability();
                this.getReferralBonus();
            }
        }
    }

    handleChangeInhouse(e) {
        this.setState({ inhouse: e.target.id });

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        const hasArea = params.get('hasarea');
        const isgeneric = params.get('isgeneric');

        if (isgeneric == 'false') {
            if (this.state.addresscheck != '' && this.state.duration != '' && this.state.genderpreference != '') {
                this.AddBookingTimeDate();
                this.checkServiceProviderAvailability();
                this.getReferralBonus();
            }
        }
        else if (isgeneric == 'true' && hasArea == 'true') {
            if (this.state.addresscheck != '' && this.state.genericServicesPricesList != '') {
                this.AddBookingTimeDate();
                this.checkServiceProviderAvailability();
                this.getReferralBonus();
            }
        }
        else {
            if (this.state.addresscheck != '') {
                this.AddBookingTimeDate();
                this.checkServiceProviderAvailability();
                this.getReferralBonus();
            }
        }
    }

    DoBooking(customerid, serviceid, servicetypeid, bookingdate, bookingtime, duration, inhouse, inclinic,
        postalcode, addressid, genderpreference, notes) {

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var postalcode = localStorage.getItem('postalcode');
        var addressid = localStorage.getItem('addressid');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicename = params.get('servicename');
        const inClinic = params.get('inclinic');
        const inHouse = params.get('inhouse');
        const hasArea = params.get('hasarea');
        const isgeneric = params.get('isgeneric');
        const free_treatment_offer = params.get('free_treatment_offer');

        if (inHouse == 'true' && inClinic == 'false' || inHouse == 'false' && inClinic == 'true') {
            if (inHouse == 'true') {
                var inhouseVal = true;
                var inclinicVal = false;
            } else if (inClinic == 'true') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }
        else if (inHouse == 'true' && inClinic == 'true') {
            if (this.state.inhouse != '') {
                var inhouseVal = true;
                var inclinicVal = false;
            }
            else if (this.state.inclinic != '') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }

        if (this.state.genderpreference == '1') {
            var genderPreference = 'male';
        }
        else if (this.state.genderpreference == '2') {
            var genderPreference = 'female';
        }
        else if (this.state.genderpreference == '3') {
            var genderPreference = 'na';
        }
        else {
            var genderPreference = 'na';
        }

        //-- If provider is not available --//
        var selectedDate = new Date(localStorage.getItem('bookingdate'));

        if (this.state.availableSlotAvailibility == false && this.state.availableSlots != null) {
            var bookedDate = this.state.currentDate;
            var bookedTime = this.state.currentDateSlot;
        }
        else {
            var bookedDate = this.state.bookingdate;
            var bookedTime = localStorage.getItem('bookingTime');
            
        }

        console.log(this.state.bookingdate);
        console.log(this.state.bookingdate);

        if (isgeneric == 'false') {
            var duration = this.state.duration;
        }
        else if (isgeneric == 'true' && hasArea == 'true') {
            var duration = this.state.duration;
        }
        else {
            var duration = 30;
        } 

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                CustomerID: customerid,
                ServiceID: serviceid,
                ServiceTypeID: servicetypeid,
                bookingconfirmed: false,
                BookingDate: bookedDate,
                BookingTime: bookedTime,
                bookingduration: duration,
                inhouse: inhouseVal,
                inclinic: inclinicVal,
                PostalCode: postalcode,
                AddressId: addressid,
                isgeneric: isgeneric,
                GenderPreference: genderPreference,
                Notes: this.state.notes,
                authtoken: customerAccesstoken
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Booking/dobooking', requestOptions)
            .then(response => {
                localStorage.setItem('dobookingStatus', response.status);
                if (response.status == '200') {
                    return response.json()
                }
            })
            .then(response => {
                if (localStorage.getItem('dobookingStatus') == '200') {
                    localStorage.setItem('bookingid', response.bookingid);
                    localStorage.setItem('bookingProviderId', response.serviceproviderid);
                    localStorage.setItem('bookingdate', bookingdate);
                    localStorage.setItem('paymentmethodnonce', 'fake-valid-nonce');

                    this.setState({ bookings: response, booked: true });

                    //alert(localStorage.getItem('customercardtokenmakedefault'));

                    if ((localStorage.getItem("hasFreeTreatment") == true && free_treatment_offer == true)
                        || this.state.servicePrice == 0) {
                        window.location = '/payment-success-message';
                    }
                    else {

                        if (localStorage.getItem("customercardtokenmakedefault") == null) {
                            window.location = '/payment';
                        } else {
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    servicename: servicename,
                                    stripepaymentmethodid: localStorage.getItem("customercardtokenmakedefault"),
                                    bookingid: localStorage.getItem('bookingid'),
                                    serviceproviderid: localStorage.getItem('bookingProviderId'),
                                    paymentamount: this.state.servicePrice*100,
                                    referral_bonus_used: false,
                                    authtoken: localStorage.getItem('customeraccesstoken'),
                                    stripecurrency: 'gbp'
                                })
                            };

                            console.log(requestOptions);

                            return fetch(App.ApisBaseUrl + '/api/Payment/stripeholdpayments', requestOptions)
                                .then(response => {
                                    console.log(response);
                                    localStorage.setItem('paymentCheckOutStatus', response.status);
                                    return response.json()
                                })
                                .then(response => {
                                    console.log(response);
                                    this.setState({ response, loading: true });
                                    if (localStorage.getItem('paymentCheckOutStatus') == '200') {
                                        window.location = '/payment-success-message';
                                    }
                                });
                        }
                    }
                }
            });
    }

    DoGenericBooking(customerid, serviceid, genericServicesList, bookingdate, bookingtime, duration, inhouse,
        inclinic, postalcode, addressid, notes) {

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var postalcode = localStorage.getItem('postalcode');
        var addressid = localStorage.getItem('addressid');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicename = params.get('servicename');
        const inClinic = params.get('inclinic');
        const inHouse = params.get('inhouse');
        const servicetypeid = params.get('servicetypeid');
        const isgeneric = params.get('isgeneric');
        const free_treatment_offer = params.get('free_treatment_offer');

        if (inHouse == 'true' && inClinic == 'false' || inHouse == 'false' && inClinic == 'true') {
            if (inHouse == 'true') {
                var inhouseVal = true;
                var inclinicVal = false;
            } else if (inClinic == 'true') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }
        else if (inHouse == 'true' && inClinic == 'true') {
            if (this.state.inhouse != '') {
                var inhouseVal = true;
                var inclinicVal = false;
            }
            else if (this.state.inclinic != '') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }

        //-- If provider is not available --//
        var selectedDate = new Date(localStorage.getItem('bookingdate'));

        if (this.state.availableSlotAvailibility == false && this.state.availableSlots != null) {
            var bookedDate = this.state.currentDate;
            var bookedTime = this.state.currentDateSlot;
        }
        else {
            var bookedDate = this.state.bookingdate;
            var bookedTime = localStorage.getItem('bookingTime');

        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                CustomerID: customerid,
                ServiceID: serviceid,
                servicetypeid: servicetypeid,
                areaids : genericServicesList,
                BookingDate: bookedDate,
                BookingTime: bookedTime,
                bookingduration: this.state.genericDurationSum,
                inhouse: inhouseVal,
                inclinic: inclinicVal,
                PostalCode: postalcode,
                AddressId: addressid,
                isgeneric: isgeneric,
                Notes: this.state.notes,
                authtoken: customerAccesstoken
            })
        };

        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Booking/dogenericbooking', requestOptions)
            .then(response => {
                localStorage.setItem('dobookingStatus', response.status);
                if (response.status == '200') {
                    return response.json()
                }
            })
            .then(response => {
                console.log(response);
                if (localStorage.getItem('dobookingStatus') == '200') {
                    localStorage.setItem('bookingid', response.bookingid);
                    localStorage.setItem('bookingProviderId', response.serviceproviderid);
                    localStorage.setItem('bookingdate', bookingdate);
                    localStorage.setItem('paymentmethodnonce', 'fake-valid-nonce');

                    this.setState({ bookings: response, booked: true });

                    //alert(localStorage.getItem('customercardtokenmakedefault'));

                    if ((localStorage.getItem("hasFreeTreatment") == true && free_treatment_offer == true)
                        || this.state.servicePrice == 0) {
                        window.location = '/payment-success-message';
                    }
                    else {

                        if (localStorage.getItem("customercardtokenmakedefault") == null) {
                            window.location = '/payment';
                        } else {
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    servicename: servicename,
                                    stripepaymentmethodid: localStorage.getItem("customercardtokenmakedefault"),
                                    bookingid: localStorage.getItem('bookingid'),
                                    serviceproviderid: localStorage.getItem('bookingProviderId'),
                                    paymentamount: this.state.servicePrice * 100,
                                    referral_bonus_used: false,
                                    authtoken: localStorage.getItem('customeraccesstoken'),
                                    stripecurrency: 'gbp'
                                })
                            };

                            console.log(requestOptions);

                            return fetch(App.ApisBaseUrl + '/api/Payment/stripeholdpayments', requestOptions)
                                .then(response => {
                                    console.log(response);
                                    localStorage.setItem('paymentCheckOutStatus', response.status);
                                    return response.json()
                                })
                                .then(response => {
                                    console.log(response);
                                    this.setState({ response, loading: true });
                                    if (localStorage.getItem('paymentCheckOutStatus') == '200') {
                                        window.location = '/payment-success-message';
                                    }
                                });
                        }
                    }
                }
            });
    }

    saveExpertBooking(customerid, customeremail, serviceid, servicetypeid, bookingdate, bookingtime, duration,
        inhouse, inclinic, addressid,
        bookingpreference, genderpreference, notes, serviceproviderid, authtoken) {

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var postalcode = localStorage.getItem('postalcode');
        var addressid = localStorage.getItem('addressid');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicename = params.get('servicename');
        const inClinic = params.get('inclinic');
        const inHouse = params.get('inhouse');
        const hasArea = params.get('hasarea');
        const isgeneric = params.get('isgeneric');
        const free_treatment_offer = params.get('free_treatment_offer');

        if (inHouse == 'true' && inClinic == 'false' || inHouse == 'false' && inClinic == 'true') {
            if (inHouse == 'true') {
                var inhouseVal = true;
                var inclinicVal = false;
            } else if (inClinic == 'true') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }
        else if (inHouse == 'true' && inClinic == 'true') {
            if (this.state.inhouse != '') {
                var inhouseVal = true;
                var inclinicVal = false;
            }
            else if (this.state.inclinic != '') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }

        if (this.state.genderpreference == '1') {
            var genderPreference = 'male';
        }
        else if (this.state.genderpreference == '2') {
            var genderPreference = 'female';
        }
        else if (this.state.genderpreference == '3') {
            var genderPreference = 'na';
        }
        else {
            var genderPreference = 'na';
        }

        if (isgeneric == 'false') {
            var duration = this.state.duration;
        }
        else if (isgeneric == 'true' && hasArea == 'true') {
            var duration = this.state.duration;
        }
        else {
            var duration = 30;
        }

        //-- If provider is not available --//
        var selectedDate = new Date(localStorage.getItem('bookingdate'));

        if (this.state.availableSlotAvailibility == false && this.state.availableSlots != null) {
            var bookedDate = this.state.currentDate;
            var bookedTime = this.state.currentDateSlot;
        }
        else {
            var bookedDate = this.state.bookingdate;
            var bookedTime = localStorage.getItem('bookingTime');
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                CustomerID: customerid,
                customeremail: customeremail,
                ServiceID: serviceid,
                ServiceTypeID: servicetypeid,
                bookingconfirmed: false,
                BookingDate: bookedDate,
                BookingTime: bookedTime,
                bookingduration: duration,
                inhouse: inhouseVal,
                inclinic: inclinicVal,
                PostalCode: postalcode,
                AddressId: addressid,
                bookingpreference: bookingpreference,
                GenderPreference: genderPreference,
                serviceproviderid: serviceproviderid,
                Notes: this.state.notes,
                authtoken: customerAccesstoken
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Booking/saveexpertbooking', requestOptions)
            .then(response => {
                localStorage.setItem('dobookingStatus', response.status);
                if (response.status == '200') {
                    return response.json()
                }
            })
            .then(response => {
                if (localStorage.getItem('dobookingStatus') == '200') {
                    localStorage.setItem('bookingid', response.bookingid);
                    localStorage.setItem('bookingProviderId', response.serviceproviderid);
                    localStorage.setItem('bookingdate', bookingdate);
                    localStorage.setItem('paymentmethodnonce', 'fake-valid-nonce');

                    this.setState({ bookings: response, booked: true });

                    //alert(localStorage.getItem('customercardtokenmakedefault'));

                    if ((localStorage.getItem("hasFreeTreatment") == true && free_treatment_offer == true)
                        || this.state.servicePrice == 0) {
                        window.location = '/payment-success-message';
                    }
                    else {

                        if (localStorage.getItem("customercardtokenmakedefault") == null) {
                            window.location = '/payment';
                        } else {
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    servicename: servicename,
                                    stripepaymentmethodid: localStorage.getItem("customercardtokenmakedefault"),
                                    bookingid: localStorage.getItem('bookingid'),
                                    serviceproviderid: localStorage.getItem('bookingProviderId'),
                                    paymentamount: this.state.servicePrice * 100,
                                    referral_bonus_used: false,
                                    authtoken: localStorage.getItem('customeraccesstoken'),
                                    stripecurrency: 'gbp'
                                })
                            };

                            console.log(requestOptions);

                            return fetch(App.ApisBaseUrl + '/api/Payment/stripeholdpayments', requestOptions)
                                .then(response => {
                                    console.log(response);
                                    localStorage.setItem('paymentCheckOutStatus', response.status);
                                    return response.json()
                                })
                                .then(response => {
                                    console.log(response);
                                    this.setState({ response, loading: true });
                                    if (localStorage.getItem('paymentCheckOutStatus') == '200') {
                                        window.location = '/payment-success-message';
                                    }
                                });
                        }
                    }
                }
            });
    }

    saveGenericExpertBooking(customerid, serviceid, genericServicesList, bookingdate, bookingtime, duration,
        inhouse, inclinic, addressid,
        notes, serviceproviderid, authtoken) {

        var customerAccesstoken = localStorage.getItem('customeraccesstoken');
        var postalcode = localStorage.getItem('postalcode');
        var addressid = localStorage.getItem('addressid');

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicename = params.get('servicename');
        const inClinic = params.get('inclinic');
        const inHouse = params.get('inhouse');
        const free_treatment_offer = params.get('free_treatment_offer');

        if (inHouse == 'true' && inClinic == 'false' || inHouse == 'false' && inClinic == 'true') {
            if (inHouse == 'true') {
                var inhouseVal = true;
                var inclinicVal = false;
            } else if (inClinic == 'true') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }
        else if (inHouse == 'true' && inClinic == 'true') {
            if (this.state.inhouse != '') {
                var inhouseVal = true;
                var inclinicVal = false;
            }
            else if (this.state.inclinic != '') {
                var inhouseVal = false;
                var inclinicVal = true;
            }
        }

        //-- If provider is not available --//
        var selectedDate = new Date(localStorage.getItem('bookingdate'));

        if (this.state.availableSlotAvailibility == false && this.state.availableSlots != null) {
            var bookedDate = this.state.currentDate;
            var bookedTime = this.state.currentDateSlot;
        }
        else {
            var bookedDate = this.state.bookingdate;
            var bookedTime = localStorage.getItem('bookingTime');

        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                customerid: customerid,
                ServiceID: serviceid,
                servicetypeids: '',
                BookingDate: bookedDate,
                BookingTime: bookedTime,
                bookingduration: this.state.duration,
                inhouse: inhouseVal,
                inclinic: inclinicVal,
                AddressId: addressid,
                serviceproviderid: genericServicesList,
                Notes: this.state.notes,
                authtoken: customerAccesstoken
            })
        };
        console.log(requestOptions);

        return fetch(App.ApisBaseUrl + '/api/Booking/savegenericexpertbooking', requestOptions)
            .then(response => {
                localStorage.setItem('dobookingStatus', response.status);
                if (response.status == '200') {
                    return response.json()
                }
            })
            .then(response => {
                if (localStorage.getItem('dobookingStatus') == '200') {
                    localStorage.setItem('bookingid', response.bookingid);
                    localStorage.setItem('bookingProviderId', response.serviceproviderid);
                    localStorage.setItem('bookingdate', bookingdate);
                    localStorage.setItem('paymentmethodnonce', 'fake-valid-nonce');

                    this.setState({ bookings: response, booked: true });

                    //alert(localStorage.getItem('customercardtokenmakedefault'));

                    if ((localStorage.getItem("hasFreeTreatment") == true && free_treatment_offer == true)
                        || this.state.servicePrice == 0) {
                        window.location = '/payment-success-message';
                    }
                    else {

                        if (localStorage.getItem("customercardtokenmakedefault") == null) {
                            window.location = '/payment';
                        } else {
                            const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    servicename: servicename,
                                    stripepaymentmethodid: localStorage.getItem("customercardtokenmakedefault"),
                                    bookingid: localStorage.getItem('bookingid'),
                                    serviceproviderid: localStorage.getItem('bookingProviderId'),
                                    paymentamount: this.state.servicePrice * 100,
                                    referral_bonus_used: false,
                                    authtoken: localStorage.getItem('customeraccesstoken'),
                                    stripecurrency: 'gbp'
                                })
                            };

                            console.log(requestOptions);

                            return fetch(App.ApisBaseUrl + '/api/Payment/stripeholdpayments', requestOptions)
                                .then(response => {
                                    console.log(response);
                                    localStorage.setItem('paymentCheckOutStatus', response.status);
                                    return response.json()
                                })
                                .then(response => {
                                    console.log(response);
                                    this.setState({ response, loading: true });
                                    if (localStorage.getItem('paymentCheckOutStatus') == '200') {
                                        window.location = '/payment-success-message';
                                    }
                                });
                        }
                    }
                }
            });
    }

    handleChangeAddressCheck(e) {

        this.setState({ addresscheck: e.target.id });
        localStorage.setItem('addressid', e.target.id);
        this.setState({ addresscheck: e.target.className });
        localStorage.setItem('postalcode', e.target.className);

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        const inclinic = params.get('inclinic');
        const inhouse = params.get('inhouse');
        const hasArea = params.get('hasarea');
        const isgeneric = params.get('isgeneric');

        if (isgeneric == 'false') {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    if (this.state.duration != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.inhouse != '' && this.state.genderpreference != '') {
                        if (this.state.duration != '' && this.state.genderpreference != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic == 'true') {
                    if (this.state.duration != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.duration != '' && this.state.genderpreference != '') {
                        if (this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
        }
        else if (isgeneric == 'true' && hasArea == 'true') {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    if (this.state.genericServicesPricesList != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.inhouse != '') {
                        if (this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic == 'true') {
                    if (this.state.genericServicesPricesList != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (inhouse == 'true') {
                        if (this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
        }
        else {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    this.AddBookingTimeDate();
                    this.checkServiceProviderAvailability();
                    this.getReferralBonus();
                    console.log("1");
                }
                else {
                    if (this.state.inhouse != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                        console.log("2");
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic == 'true') {
                    this.AddBookingTimeDate();
                    this.checkServiceProviderAvailability();
                    this.getReferralBonus();
                    console.log("3");
                }
                else {
                    if (inhouse == 'true') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                        console.log("4");
                    }
                }
            }
        }
    }

    handleChangeBookingPreference(e) {
        this.setState({ bookingpreference: e.target.value });
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const isGeneric = params.get('isgeneric');
        const hasArea = params.get('hasarea');
        const inClinic = params.get('inclinic');
        const inHouse = params.get('inhouse');

        if (e.target.value == 'couple' || e.target.value == 'back-to-back') {
            let tst = this.state.original_price;
            this.setState({ price: tst * 2 });
            localStorage.setItem('price', tst * 2);
        } else {
            let tst = this.state.price / 2;
            this.setState({ price: tst });
            localStorage.setItem('price', tst);
        }
    }

    handleChangeServiceDuration(e) {

        this.setState({ duration: e.target.className });
        localStorage.setItem('selectedDurationIndex', e.target.id);

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        const inclinic = params.get('inclinic');
        const inhouse = params.get('inhouse');
        const hasArea = params.get('hasarea');
        const isgeneric = params.get('isgeneric');

        if (isgeneric == 'false') {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.addresscheck != '' && this.state.inhouse != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.inhouse != '' && this.state.addresscheck != '' && this.state.genderpreference != '') {
                        if (this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
        }
    }

    handleChangeGenderPreference(e) {
        this.setState({ genderpreference: e.target.id });

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        const inclinic = params.get('inclinic');
        const inhouse = params.get('inhouse');
        const hasArea = params.get('hasarea');
        const isgeneric = params.get('isgeneric');

        if (isgeneric == 'false') {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.duration != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.addresscheck != '' && this.state.inhouse != '' && this.state.duration != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.duration != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.inhouse != '' && this.state.addresscheck != '' && this.state.duration != '') {
                        if (this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
        }
    }

    handleChangeGenericServiceList(e) {

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const switchOnPeakHours = params.get('switchonpeakhours');
        const inclinic = params.get('inclinic');
        const inhouse = params.get('inhouse');
        const hasArea = params.get('hasarea');
        const isgeneric = params.get('isgeneric');

        var checkBox = document.getElementById(e.target.id);
        console.log(checkBox);

        //if (checkBox.checked == true) {

        //    this.state.genericServicesPricesList.push(e.target.getAttribute('name'));
        //    this.state.genericServicesList.push(e.target.value);
        //    this.state.genericServicesDuration.push(e.target.className);
        //}
        //else if (checkBox.checked == false) {

        //    this.state.genericServicesList.pop(e.target.value);
        //    this.state.genericServicesDuration.pop(e.target.className);
        //    this.state.genericServicesPricesList.pop(e.target.getAttribute('name'));
        //}
       
        if (checkBox.checked == true) {

            this.state.genericServicesList.push(e.target.value);
            this.state.genericServicesPricesList.push(e.target.getAttribute('name'));
            this.state.genericServicesDuration.push(e.target.className);
        }
        else if (checkBox.checked == false) {

            this.state.genericServicesList.pop(e.target.value);
            this.state.genericServicesDuration.pop(e.target.className);
            this.state.genericServicesPricesList.pop(e.target.getAttribute('name'));
        }

        console.log(this.state.genericServicesDuration);
        console.log(this.state.genericServicesPricesList);

        this.state.genericDurationSum = 0;
        for (var i = 0; i < this.state.genericServicesDuration.length; i++) {

            this.state.genericDurationSum += parseInt(this.state.genericServicesDuration[i]);
        }

        console.log(this.state.genericDurationSum);

        this.state.totalPrice = 0;
        for (var i = 0; i < this.state.genericServicesPricesList.length; i++) {

            //this.state.genericServicesPrices += parseInt(this.state.genericServicesPricesList[i]);
            if (checkBox.checked == true) {
                var totalGenericPrice = this.state.genericServicesPricesList[i];
                this.state.totalPrice += parseInt(totalGenericPrice);
            }
            else if (checkBox.checked == false) {
                var totalGenericPrice = this.state.genericServicesPricesList[i];
                this.state.totalPrice -= parseInt(totalGenericPrice);
            }
        }

        console.log(this.state.totalPrice);
        
        if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
            if (this.state.inclinic != '') {
                if (this.state.addresscheck != '') {
                    this.AddBookingTimeDate();
                    this.checkServiceProviderAvailability();
                    this.getReferralBonus();
                }
            }
            else {
                if (this.state.inhouse != '') {
                    if (this.state.addresscheck != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
            }
        }
        else if (inclinic == 'true' || inhouse == 'true') {
            if (inclinic == 'true') {
                if (this.state.addresscheck != '') {
                    this.AddBookingTimeDate();
                    this.checkServiceProviderAvailability();
                    this.getReferralBonus();
                }
            }
            else {
                if (inhouse == 'true') {
                    if (this.state.addresscheck != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
            }
        }

        //var switchOnPeakHours = '';
        //var priceList = [];
        //var peakHours = '';
        //var endPeakHours = '';

        //for (var i = 0; i < this.state.laserServiceTypes.length; i++) {

        //    if (i == e.target.id) {
        //        switchOnPeakHours = this.state.laserServiceTypes[i].switchonpeakhours;
        //        peakHours = this.state.laserServiceTypes[i].peakhours;
        //        endPeakHours = this.state.laserServiceTypes[i].end_peakhours;
        //    }
        //}
        //console.log(switchOnPeakHours);
        //console.log(peakHours);
        //console.log(endPeakHours);

        //for (var s = 0; s < this.state.serviceTypeList.length; s++) {
        //    if (s == e.target.id) {
        //        priceList.push(this.state.serviceTypeList[s]);
        //    }
        //}

        //this.setState({ bookingtime: '' });
    }

    handleChangeBookingDate(date) {
        this.setState({ bookingdate: date });
        localStorage.setItem('bookingdate', date);

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        const inclinic = params.get('inclinic');
        const inhouse = params.get('inhouse');
        const hasArea = params.get('hasarea');
        const isgeneric = params.get('isgeneric');

        if (isgeneric == 'false') {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.duration != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.addresscheck != '' && this.state.inhouse != '' && this.state.duration != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.duration != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.inhouse != '' && this.state.duration != '' && this.state.addresscheck != ''
                        && this.state.genderpreference != '') {
                        if (this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
        }
        else if (isgeneric == 'true' && hasArea == 'true') {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.genericServicesPricesList != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.inhouse != '') {
                        if (this.state.addresscheck != '' && this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic == 'true') {
                    if (this.state.addresscheck != '' && this.state.genericServicesPricesList != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (inhouse == 'true') {
                        if (this.state.addresscheck != '' && this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
        }
        else {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '' && this.state.addresscheck != '') {
                    this.AddBookingTimeDate();
                    this.checkServiceProviderAvailability();
                    this.getReferralBonus();
                    console.log("1");
                }
                else {
                    if (this.state.inhouse != '' && this.state.addresscheck != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                        console.log("2");
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic == 'true' && this.state.addresscheck != '') {
                    this.AddBookingTimeDate();
                    this.checkServiceProviderAvailability();
                    this.getReferralBonus();
                }
                else {
                    if (inhouse == 'true' && this.state.addresscheck != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
            }
        }
    }

    handleChangeBookingTime(e) {

        console.log(this.state.bookingtime);
        const format = 'HH:mm';
        console.log(e.format(format));

        var getHours = new Date("2000-01-01 " + e.format(format)).getHours();
        var getMinutes = new Date("2000-01-01 " + e.format(format)).getMinutes();
        var timeFarmated = getHours + ':' + getMinutes;
        console.log(timeFarmated);

        this.setState({ bookingtime: timeFarmated });
        localStorage.setItem('bookingTime', timeFarmated);
        console.log(localStorage.getItem('bookingTime'));

        this.AddBookingTimeDate(localStorage.getItem('bookingTime'));
        this.checkServiceProviderAvailability();
        this.getReferralBonus();

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const isgeneric = params.get('isgeneric');
        const hasArea = params.get('hasarea');
        const inclinic = params.get('inclinic');
        const inhouse = params.get('inhouse');
        const switchOnPeakHours = params.get('switchonpeakhours');
        const peakHours = params.get('peakhours');
        const endPeakHours = params.get('end_peakhours');

        if (isgeneric == 'false') {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.duration != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.addresscheck != '' && this.state.inhouse != '' && this.state.duration != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.duration != '' && this.state.genderpreference != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.inhouse != '' && this.state.duration != '' && this.state.addresscheck != ''
                        && this.state.genderpreference != '') {
                        if (this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
        }
        else if (isgeneric == 'true' && hasArea == 'true') {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '') {
                    if (this.state.addresscheck != '' && this.state.genericServicesPricesList != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (this.state.inhouse != '') {
                        if (this.state.addresscheck != '' && this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic == 'true') {
                    if (this.state.addresscheck != '' && this.state.genericServicesPricesList != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
                else {
                    if (inhouse == 'true') {
                        if (this.state.addresscheck != '' && this.state.genericServicesPricesList != '') {
                            this.AddBookingTimeDate();
                            this.checkServiceProviderAvailability();
                            this.getReferralBonus();
                        }
                    }
                }
            }
        }
        else {
            if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
                if (this.state.inclinic != '' && this.state.addresscheck != '') {
                    this.AddBookingTimeDate();
                    this.checkServiceProviderAvailability();
                    this.getReferralBonus();
                    console.log("1");
                }
                else {
                    if (this.state.inhouse != '' && this.state.addresscheck != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                        console.log("2");
                    }
                }
            }
            else if (inclinic == 'true' || inhouse == 'true') {
                if (inclinic == 'true' && this.state.addresscheck != '') {
                    this.AddBookingTimeDate();
                    this.checkServiceProviderAvailability();
                    this.getReferralBonus();
                }
                else {
                    if (inhouse == 'true' && this.state.addresscheck != '') {
                        this.AddBookingTimeDate();
                        this.checkServiceProviderAvailability();
                        this.getReferralBonus();
                    }
                }
            }
        }

        //var checkBox = document.getElementById(e.target.id);

        //if (isgeneric == 'true' && hasArea == 'true') {
        //    if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
        //        if (this.state.inclinic != '') {
        //            if (this.state.addresscheck != '' && this.state.bookingdate != '') {
        //                if (switchOnPeakHours == 'true') {
        //                    if (this.state.bookingtime >= peakHours && this.state.bookingtime <= endPeakHours) {

        //                        this.setState({ servicePrice: this.state.laserServiceTypes });
        //                        localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].peakprice);

        //                        this.state.totalPrice = this.state.genericDurationSum;
        //                        console.log(this.state.totalPrice);
        //                    }
        //                    else {
        //                        this.setState({ servicePrice: this.state.genericPriceInClinicOffPeakHours });
        //                        localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].price);

        //                        this.state.totalPrice = this.state.genericDurationSum;
        //                        console.log(this.state.totalPrice);
        //                    }
        //                }
        //                else {

        //                    this.setState({ servicePrice: this.state.genericPriceInClinicOffPeakHours });
        //                    localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].price);

        //                    this.state.totalPrice = this.state.genericDurationSum;
        //                    console.log(this.state.totalPrice);
        //                }
        //            }
        //        }
        //        else {
        //            if (this.state.inhouse != '') {
        //                if (this.state.addresscheck != '' && this.state.bookingdate != '') {
        //                    if (switchOnPeakHours == 'true') {
        //                        if (this.state.bookingtime >= peakHours && this.state.bookingtime <= endPeakHours) {

        //                            this.setState({ servicePrice: this.state.genericPriceInhousePeakHours });
        //                            localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].peakprice);

        //                            this.state.totalPrice = this.state.genericDurationSum;
        //                            console.log(this.state.totalPrice);
        //                        }
        //                        else {
        //                            this.setState({ servicePrice: this.state.genericPriceInhouseOffPeakHours });
        //                            localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].price);

        //                            this.state.totalPrice = this.state.genericDurationSum;
        //                            console.log(this.state.totalPrice);
        //                        }
        //                    }
        //                    else {

        //                        this.setState({ servicePrice: this.state.genericPriceInhouseOffPeakHours });
        //                        localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].price);

        //                        this.state.totalPrice = this.state.genericDurationSum;
        //                        console.log(this.state.totalPrice);
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    else if (inclinic == 'true' || inhouse == 'true') {
        //        if (inclinic == 'true') {
        //            if (this.state.addresscheck != '' && this.state.bookingdate != '') {
        //                if (switchOnPeakHours == 'true') {
        //                    if (this.state.bookingtime >= peakHours && this.state.bookingtime <= endPeakHours) {

        //                        this.setState({ servicePrice: this.state.genericPriceInClinicPeakHours });
        //                        localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].peakprice);

        //                        this.state.totalPrice = this.state.genericDurationSum;
        //                        console.log(this.state.totalPrice);


        //                    }
        //                    else {
        //                        this.setState({ servicePrice: this.state.genericPriceInClinicOffPeakHours });
        //                        localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].price);

        //                        this.state.totalPrice = this.state.genericDurationSum;
        //                        console.log(this.state.totalPrice);
        //                    }
        //                }
        //                else {

        //                    this.setState({ servicePrice: this.state.genericPriceInClinicOffPeakHours });
        //                    localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].price);

        //                    this.state.totalPrice = this.state.genericDurationSum;
        //                    console.log(this.state.totalPrice);
        //                }
        //            }
        //        }
        //        else {
        //            if (inhouse == 'true') {
        //                if (this.state.addresscheck != '' && this.state.bookingdate != '') {
        //                    if (switchOnPeakHours == 'true') {
        //                        if (this.state.bookingtime >= peakHours && this.state.bookingtime <= endPeakHours) {

        //                            this.setState({ servicePrice: this.state.genericPriceInhousePeakHours });
        //                            localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].peakprice);

        //                            this.state.totalPrice = this.state.genericDurationSum;
        //                            console.log(this.state.totalPrice);
        //                        }
        //                        else {
        //                            this.setState({ servicePrice: this.state.genericPriceInhouseOffPeakHour });
        //                            localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].price);

        //                            this.state.totalPrice = this.state.genericDurationSum;
        //                            console.log(this.state.totalPrice);
        //                        }
        //                    }
        //                    else {

        //                        this.setState({ servicePrice: this.state.genericPriceInhouseOffPeakHour });
        //                        localStorage.setItem('servicePrice', this.state.laserServiceTypes[0].price);

        //                        this.state.totalPrice = this.state.genericDurationSum;
        //                        console.log(this.state.totalPrice);
        //                    }
        //                }
        //            }
        //        }
        //    }
        //}
    }

    handleChangeNotes(e) {
        this.setState({ notes: e.target.value });
    }

    handleChangeCurrentDate(e) {
        this.setState({ currentDate: e.target.value });
        var providerAvaialibility = this.state.availableSlots.filter(obj => obj.availableDate == e.target.value);
        if (providerAvaialibility.length > 0) {
            this.setState({ availibilityTimeSlots: providerAvaialibility[0].availableSlots.map(obj => obj.availableFrom) });
        }

        var dateArray = [];
        var dateArray = e.target.value.split("/");
        var month = dateArray[0];
        var date = dateArray[1];
        var year = dateArray[2];

        var dateFormatted = year + '-' + month + '-' + date;

        this.setState({ bookingdate: dateFormatted });
        localStorage.setItem('bookingdate', e.target.value);

        console.log("Date from dropdown=" + this.state.bookingdate);
    }

    handleChangeCurrentDateSlot(e) {
        this.setState({ currentDateSlot: e.target.value });

        var selectedSlot = e.target.value;
        var timeFormatted = selectedSlot.slice(0, 5);

        this.setState({ bookingtime: selectedSlot });
        localStorage.setItem('bookingTime', e.target.value);

        console.log("Time from dropdown=" + localStorage.getItem('bookingTime'));
    }

    redeemDiscountCheckbox(e) {

        var redeemPriceCheck = document.getElementById('redeemDiscount');
        console.log(redeemPriceCheck);

        if (redeemPriceCheck.checked == true) {

            var showDiscountCodeInput = (<input type="text" />);
            localStorage.setItem('redeemCode', true);
            //this.setState({ redeemCode: showDiscountCodeInput });
            console.log(localStorage.getItem('redeemCode'));
        }
        else if (redeemPriceCheck.checked == false) {

            var showDiscountCodeInput = (<input type="text" />);
            localStorage.setItem('redeemCode', false);
            //this.setState({ redeemCode: showDiscountCodeInput });
            console.log(localStorage.getItem('redeemCode'));
        }
    }

    handChangeDiscountCode(e) {

        this.setState({ studentDiscountCode: e.target.value });
    }

    handleDiscountConfirm(e) {
        e.preventDefault();

        fetch(App.ApisBaseUrl + '/api/Discount/getdetail?authtoken=' + localStorage.getItem('customeraccesstoken') + '&discountcode=' + this.state.studentDiscountCode)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({ hasStudentDiscount: data.hasdiscount });
                console.log(this.state.hasStudentDiscount);
                this.setState({ studentDiscountData: data.data });
                console.log(this.state.studentDiscountData);
            });
    }

    handleSubmit(e) {
        e.preventDefault();

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        const isgeneric = params.get('isgeneric');
        const hasArea = params.get('hasarea');

        console.log(this.state.availableSlots);
        console.log(isgeneric);
        console.log(hasArea);

        if (this.state.serviceproviderid == null) {
            if (isgeneric == 'true' && hasArea == 'true') {
                if (this.state.availableSlotAvailibility == false && this.state.availableSlots != null) {
                    if (this.state.currentDate != '' && this.state.currentDateSlot != '') {
                        const { customerid, serviceid, genericServicesList, bookingdate, bookingtime, duration, inhouse, inclinic, postalcode, addressid, notes } = this.state;
                        this.DoGenericBooking(customerid, serviceid, genericServicesList, bookingdate, bookingtime, duration, inhouse, inclinic, postalcode, addressid, notes);

                        var loader = (<div className="bookingPageLoader"><img src={Loader} /></div>);
                        this.setState({ bookingPageLoader: loader });

                        console.log("DoGenericBooking excuted!");
                    }
                    else {
                        alert('Please select Date and Time from available list!');
                    }
                }
                else {
                    const { customerid, serviceid, genericServicesList, bookingdate, bookingtime, duration, inhouse, inclinic, postalcode, addressid, notes } = this.state;
                    this.DoGenericBooking(customerid, serviceid, genericServicesList, bookingdate, bookingtime, duration, inhouse, inclinic, postalcode, addressid, notes);

                    var loader = (<div className="bookingPageLoader"><img src={Loader} /></div>);
                    this.setState({ bookingPageLoader: loader });

                    console.log("DoGenericBooking excuted again!");
                }
            }
            else {
                if (this.state.availableSlotAvailibility == false && this.state.availableSlots != null) {
                    if (this.state.currentDate != '' && this.state.currentDateSlot != '') {
                        const { customerid, serviceid, servicetypeid, bookingdate, bookingtime, duration, inhouse, inclinic, postalcode, addressid, genderpreference, notes } = this.state;
                        this.DoBooking(customerid, serviceid, servicetypeid, bookingdate, bookingtime, duration, inhouse, inclinic, postalcode, addressid, genderpreference, notes);

                        var loader = (<div className="bookingPageLoader"><img src={Loader} /></div>);
                        this.setState({ bookingPageLoader: loader });
                    }
                    else {
                        alert('Please select Date and Time from available list!');
                    }
                }
                else {
                    const { customerid, serviceid, servicetypeid, bookingdate, bookingtime, duration, inhouse, inclinic, postalcode, addressid, genderpreference, notes } = this.state;
                    this.DoBooking(customerid, serviceid, servicetypeid, bookingdate, bookingtime, duration, inhouse, inclinic, postalcode, addressid, genderpreference, notes);

                    var loader = (<div className="bookingPageLoader"><img src={Loader} /></div>);
                    this.setState({ bookingPageLoader: loader });
                }
            }
        }
        else {
            if (isgeneric == 'false') {
                if (this.state.availableSlotAvailibility == false && this.state.availableSlots != null) {
                    if (this.state.currentDate != '' && this.state.currentDateSlot != '') {
                        const { customerid, customeremail, serviceid, servicetypeid, bookingdate, bookingtime, duration, inhouse, inclinic, addressid,
                            bookingpreference, genderpreference, notes, serviceproviderid, authtoken } = this.state;
                        this.saveExpertBooking(customerid, customeremail, serviceid, servicetypeid, bookingdate, bookingtime, duration, inhouse, inclinic, addressid,
                            bookingpreference, genderpreference, notes, serviceproviderid, authtoken );

                        var loader = (<div className="bookingPageLoader"><img src={Loader} /></div>);
                        this.setState({ bookingPageLoader: loader });
                    }
                    else {
                        alert('Please select Date and Time from available list!');
                    }
                }
                else {
                    const { customerid, customeremail, serviceid, servicetypeid, bookingdate, bookingtime, duration, inhouse, inclinic, addressid,
                        bookingpreference, genderpreference, notes, serviceproviderid, authtoken } = this.state;
                    this.saveExpertBooking(customerid, customeremail, serviceid, servicetypeid, bookingdate, bookingtime, duration, inhouse, inclinic, addressid,
                        bookingpreference, genderpreference, notes, serviceproviderid, authtoken);

                    var loader = (<div className="bookingPageLoader"><img src={Loader} /></div>);
                    this.setState({ bookingPageLoader: loader });
                }
            }
            else if (isgeneric == 'true') {
                if (this.state.availableSlotAvailibility == false && this.state.availableSlots != null) {
                    if (this.state.currentDate != '' && this.state.currentDateSlot != '') {
                        const { customerid, serviceid, genericServicesList, bookingdate, bookingtime, duration, inhouse, inclinic, addressid,
                            notes, serviceproviderid, authtoken } = this.state;
                        this.saveGenericExpertBooking(customerid, serviceid, genericServicesList, bookingdate, bookingtime, duration, inhouse, inclinic, addressid,
                            notes, serviceproviderid, authtoken );

                        var loader = (<div className="bookingPageLoader"><img src={Loader} /></div>);
                        this.setState({ bookingPageLoader: loader });
                    }
                    else {
                        alert('Please select Date and Time from available list!');
                    }
                }
                else {
                    const { customerid, serviceid, genericServicesList, bookingdate, bookingtime, duration, inhouse, inclinic, addressid,
                        notes, serviceproviderid, authtoken } = this.state;
                    this.saveGenericExpertBooking(customerid, serviceid, genericServicesList, bookingdate, bookingtime, duration, inhouse, inclinic, addressid,
                        notes, serviceproviderid, authtoken);

                    var loader = (<div className="bookingPageLoader"><img src={Loader} /></div>);
                    this.setState({ bookingPageLoader: loader });
                }
            }
        }
    }

    render() {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);
        const isgeneric = params.get('isgeneric');
        const hasArea = params.get('hasarea');

        if (isgeneric == 'true' && hasArea == 'true') {

            let contents = this.state.submitTime
                ? this.noBookingPreferencesValues(this.state.addDatetime)
                : this.genericServices();
            return <div>
                {contents}
            </div>;
        } else {

            let contents = this.state.submitTime
                ? this.yesBookingPreferencesValues(this.state.addDatetime)
                : this.nonGenericServices();
            return <div>
                {contents}
            </div>;
        }
    }

    nonGenericServices() {

        var todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-');

        const format = 'h:mm a';
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicename = params.get('servicename'); 
        const servicetypename = params.get('srvtypename');
        const isgeneric = params.get('isgeneric');
        const inclinic = params.get('inclinic');
        const inhouse = params.get('inhouse');
        const offerDiscount = params.get('offerdiscount');
        const hasArea = params.get('hasarea');

        if (isgeneric == 'false') {
            var serviceDurations = (
                <div className="col-md-6 pl-0">
                    <label class="col-form-label pb-4">I want my Service to be</label>
                    <div className="cardWrapWithShadow">
                        <div class="form-group row">
                            {this.state.durationList.map((durtn, index) =>
                                <div class="col-sm-4">
                                    <div class="form-check">
                                        <input type="radio" name="exampleRadios" id={index} className={durtn.serviceTypeDuration} 
                                            onChange={this.handleChangeServiceDuration} value={this.state.duration} required />
                                        <label class="form-check-label" for={index}>
                                            <p className="font-weight-normal">{durtn.serviceTypeDuration}</p>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
        else if (isgeneric == 'true' && hasArea == 'true') {
            var serviceDurations = (
                <div className="col-md-6 pl-0">
                    <label class="col-form-label pb-4">I want my Services</label>
                    <div class="button-group">
                        <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" id="selectLaserServices">
                            Select Services</button>
                        <ul class="dropdown-menu" id="selectLaserServicesDropDown">
                            {this.state.laserServiceTypes.map(srvtype =>
                                <li>
                                    <input type="checkbox" value={srvtype.servicetypeid} id={srvtype.servicetypeid}
                                        onChange={this.handleChangeGenericServiceList} />
                                    <label class="form-check-label" for={srvtype.servicetypeid}>
                                        {srvtype.servicetypename}
                                    </label>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            );
        }

        if (servicename == 'Massage') {
            var genderPreference = (
                <div className="col-md-6 pr-0">
                    <label class="col-form-label pb-4">I want my Service Provider to be</label>
                    <div className="cardWrapWithShadow">
                        <div class="form-group row">
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <input type="radio" name="genderPreference" id="1" value={this.state.genderpreference}
                                        onChange={this.handleChangeGenderPreference} />
                                    <label class="form-check-label" for="genderPreference1">
                                        <p className="font-weight-normal">Male</p>
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-4 p-0">
                                <div class="form-check">
                                    <input type="radio" name="genderPreference" id="2" value={this.state.genderpreference}
                                        onChange={this.handleChangeGenderPreference} />
                                    <label class="form-check-label" for="genderPreference2">
                                        <p className="font-weight-normal">Female</p>
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-4 p-0">
                                <div class="form-check">
                                    <input type="radio" name="genderPreference" id="3" value={this.state.genderpreference}
                                        onChange={this.handleChangeGenderPreference} />
                                    <label class="form-check-label" for="genderPreference3">
                                        <p className="font-weight-normal">Other</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (inclinic == 'true' & inhouse == 'true' || inclinic == 'false' & inhouse == 'false') {
            var incliniceInhouseItems = (
                <div className="col-md-12 pt-3">
                    <div className="col-md-6 pl-0">
                        <label class="col-form-label pb-4">I want my Service at</label>
                        <div className="cardWrapWithShadow">
                            <div class="form-group row pt-5 pl-2">
                                <div class="col-sm-4">
                                    <div class="form-check">
                                        <input type="radio" name="inclinicInhouse" id="true" value={this.state.inclinic}
                                            onChange={this.handleChangeInclinic} required />
                                        <label class="form-check-label" for="inclinicInhouse1">
                                            <p className="font-weight-normal">Inclinic</p>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-check">
                                        <input type="radio" name="inclinicInhouse" id="true" value={this.state.inhouse}
                                            onChange={this.handleChangeInhouse} required />
                                        <label class="form-check-label" for="inclinicInhouse2">
                                            <p className="font-weight-normal">Inhouse</p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (isgeneric == 'false') {

            if (this.state.servicePrice != 0) {

                console.log("Price not 0");

                if (this.state.referralBonus.referral_bonus > 0) {

                    var price = this.state.servicePrice;
                    var referralBonus = this.state.referralBonus.referral_bonus;
                    var calculateBonus = price * referralBonus / 100;
                    var actualPrice = calculateBonus - price;
                    localStorage.setItem('servicePrice', actualPrice);

                    console.log("Referral Bonus");
                }
                else if (this.state.referralBonus.referral_bonus == 0) {

                    console.log("Referral Bonus 0");

                    if (offerDiscount > 0) {

                        var price = this.state.servicePrice;
                        var discountedPrice = offerDiscount;
                        var calculateBonus = price * discountedPrice / 100;
                        var actualPrice = price - calculateBonus;
                        localStorage.setItem('servicePrice', actualPrice);
                    }
                    else if (this.state.hasStudentDiscount == true) {

                        var price = actualPrice;
                        var studentDiscount = this.state.studentDiscountData;
                        var calculateDiscount = price * studentDiscount / 100;
                        var priceAfterStudentDiscount = calculateDiscount - price;
                        localStorage.setItem('servicePrice', priceAfterStudentDiscount);
                    }
                    else {

                        console.log(this.state.servicePrice);

                        var actualPrice = this.state.servicePrice;
                        localStorage.setItem('servicePrice', actualPrice);
                    }
                }
            }
        }
        else if (isgeneric == 'true' && hasArea == 'false') {

            if (this.state.servicePrice != 0) {

                console.log("Price not 0");

                if (this.state.referralBonus.referral_bonus > 0) {

                    var price = this.state.servicePrice;
                    var referralBonus = this.state.referralBonus.referral_bonus;
                    var calculateBonus = price * referralBonus / 100;
                    var actualPrice = calculateBonus - price;
                    localStorage.setItem('servicePrice', actualPrice);

                    console.log("Referral Bonus");
                }
                else if (this.state.referralBonus.referral_bonus == 0) {

                    console.log("Referral Bonus 0");

                    if (offerDiscount > 0) {

                        var price = this.state.servicePrice;
                        var discountedPrice = offerDiscount;
                        var calculateBonus = price * discountedPrice / 100;
                        var actualPrice = price - calculateBonus;
                        localStorage.setItem('servicePrice', actualPrice);
                    }
                    else if (this.state.hasStudentDiscount == true) {

                        var price = actualPrice;
                        var studentDiscount = this.state.studentDiscountData;
                        var calculateDiscount = price * studentDiscount / 100;
                        var priceAfterStudentDiscount = calculateDiscount - price;
                        localStorage.setItem('servicePrice', priceAfterStudentDiscount);
                    }
                    else {

                        console.log(this.state.servicePrice);

                        var actualPrice = this.state.servicePrice;
                        localStorage.setItem('servicePrice', actualPrice);
                    }
                }
            }
        }

        if (this.state.referralBonus.referral_bonus != 0) {
            if (actualPrice != 0) {
                if (this.state.hasStudentDiscount == true) {

                    var price = actualPrice;
                    var studentDiscount = this.state.studentDiscountData;
                    var calculateDiscount = price * studentDiscount / 100;
                    var priceAfterStudentDiscount = calculateDiscount - price;
                    localStorage.setItem('servicePrice', priceAfterStudentDiscount);
                }
            }
        }

        if (this.state.availableSlots != '' && this.state.availableSlots != null) {

            var dialog = (<div className="text-center">
                <p>Unfortunately we are fully booked today. Please choose an alternative Date &Time from the list below.</p>
                <button type="button" class="btn btn-primary bg-black" data-toggle="modal" data-target="#exampleModal">
                    View List
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                    <div class="form-row">
                                        <div class="col mb-4">
                                            <select className="form-control" value={this.state.currentDate}
                                                onChange={this.handleChangeCurrentDate} required>
                                                <option value="">Select an option</option>
                                                {this.state.availableSlots.map((slot, index) =>
                                                    <option name={index} value={slot.availableDate} id={index}>
                                                        {slot.availableDate.replace(/-/g, '-')}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                        <div class="col mb-4">
                                            <select className="form-control" value={this.state.currentDateSlot}
                                                onChange={this.handleChangeCurrentDateSlot} required>
                                                <option value="">Select an option</option>
                                                {this.state.availibilityTimeSlots.map((slots1) =>
                                                    <option value={slots1}>{slots1}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
        }
        else if (this.state.availableSlotAvailibility == 'false') {
            var dialog = (<p></p>);
        }

        if (localStorage.getItem('redeemCode') == true) {

            console.log('yes');
            var showDiscountField = (<input type="text" />);
        }
        else {
            console.log('no');
            var showDiscountField = '';
        }

        document.querySelectorAll('input[type=number]')
            .forEach(e => e.oninput = () => {
                if (e.value.length >= 2) e.value = e.value.slice(0, 2);
                if (e.value.length === 1) e.value = '0' + e.value;
                if (!e.value) e.value = '00';
            });

        return (

            <div id="MainPageWrapper">
                {this.state.bookingPageLoader}
                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-gray p-2">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name text-white">{servicetypename}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                        <div className="row pt-4 pb-4">

                                            {incliniceInhouseItems}

                                            <div className="col-md-12 pt-5">
                                                <label class="col-form-label pb-4">I want my service at</label>
                                                <div className="cardWrapWithShadow">
                                                    <div class=" text-right">
                                                        <a href="/add-address" class="text-dark"><i class="fas fa-plus text-red pr-2"></i> Add new address</a>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="col-sm-9 bookingPageAddressWrap">
                                                            {this.state.allAddress.map(adr =>
                                                                <div class="form-check bookingPageAddress">
                                                                    <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                                        onChange={this.handleChangeAddressCheck} required />
                                                                    <label class="form-check-label">
                                                                        <p className="lead">{adr.address}</p>
                                                                    </label>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-md-12 pt-5">

                                                {serviceDurations}

                                                {genderPreference}
                                                
                                            </div>

                                            <div className="col-md-12 pt-5">
                                                <label class="col-form-label pb-4">I want my service on</label>
                                                <div className="col-md-12 cardWrapWithShadow mb-5">
                                                    <div className="col-md-6 pt-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Book a Date</label>
                                                            <div class="">
                                                                <ModernDatepicker
                                                                    className="form-control"
                                                                    date={this.state.bookingdate}
                                                                    format={'YYYY-MM-DD'}
                                                                    showBorder
                                                                    onChange={(date) => this.handleChangeBookingDate(date)}
                                                                    minDate={todayDate}
                                                                    placeholder={'Select a date'} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 pt-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Book a Time</label>
                                                            
                                                            <div class="">
                                                                <TimePicker
                                                                    showSecond={false}
                                                                    defaultValue={this.state.bookingtime}
                                                                    onChange={this.handleChangeBookingTime}
                                                                    //format={format}
                                                                    inputReadOnly
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {dialog}
                                            </div>

                                            <div className="col-md-12 pt-5">
                                                <label class="col-form-label pb-4">Notes for your service</label>
                                                <div className="col-md-12 cardWrapWithShadow">
                                                    <div className="md-form">
                                                        <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8"
                                                            placeholder="Add Booking Notes......" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row pt-5 pl-2">
                                            <div className="col-md-12">
                                                <p className="lead m-0">£ {actualPrice}</p>
                                            </div>
                                        </div>

                                        <div className="row pt-5 pl-2">
                                            <div className="col-md-12">
                                                <p>
                                                    Redeem Code
                                                </p>
                                                <p>
                                                    <input type="text" value={this.state.studentDiscountCode} onChange={this.handChangeDiscountCode} />
                                                    <button className="btn bg-black text-white" type="button" onClick={this.handleDiscountConfirm}>
                                                        Check
                                                    </button>
                                                </p>
                                                <p className="lead m-0">{priceAfterStudentDiscount}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="text-center mb-3">
                                                    <button className="btn btn-lg bg-black text-white float-right" type="submit">Confirm Booking</button>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    genericServices() {

        const format = 'h:mm a';
        const now = moment().hour(0).minute(0);

        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicetypename = params.get('srvtypename');
        console.log(servicetypename);
        const isgeneric = params.get('isgeneric');
        const hasArea = params.get('hasarea');
        const inclinic = params.get('inclinic');
        const inhouse = params.get('inhouse');
        const offerDiscount = params.get('offerdiscount');

        var serviceDurations = (
            <div className="col-md-6 pl-0">
                <label class="col-form-label pb-4">I want my Services</label>
                <div class="button-group">
                    <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"
                        id="selectLaserServices">Select services</button>
                    <ul class="dropdown-menu" id="selectLaserServicesDropDown">
                        {this.state.laserServiceTypes.map((srvtype, index) =>
                            <li>
                                <input type="checkbox" name={srvtype.price} className={srvtype.duration} value={srvtype.areaid}
                                    id={index} onChange={this.handleChangeGenericServiceList} />
                                <label class="form-check-label" for={srvtype.areaid}>
                                    {srvtype.areaname}
                                </label>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        );

        if (inclinic == 'true' & inhouse == 'true') {
            var incliniceInhouseItems = (
                <div className="col-md-12 pt-3">
                    <div className="col-md-6 pl-0">
                        <label class="col-form-label pb-4">I want my Service at</label>
                        <div className="cardWrapWithShadow">
                            <div class="form-group row">
                                <div class="col-sm-4">
                                    <div class="form-check">
                                        <input type="radio" name="inclinicInhouse" id="true" value={this.state.inclinic}
                                            onChange={this.handleChangeInclinic} required />
                                        <label class="form-check-label" for="inclinicInhouse1">
                                            <p className="font-weight-normal">Inclinic</p>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-sm-4 p-0">
                                    <div class="form-check">
                                        <input type="radio" name="inclinicInhouse" id="true" value={this.state.inhouse}
                                            onChange={this.handleChangeInhouse} required />
                                        <label class="form-check-label" for="inclinicInhouse2">
                                            <p className="font-weight-normal">Inhouse</p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (isgeneric == 'true' && hasArea == 'true') {

            if (this.state.totalPrice != 0) {

                if (this.state.referralBonus.referral_bonus > 0) {

                    var price = this.state.totalPrice;
                    var referralBonus = this.state.referralBonus.referral_bonus;
                    var calculateBonus = price * referralBonus / 100;
                    var actualPrice = calculateBonus - price;
                    localStorage.setItem('servicePrice', actualPrice);
                }
                else if (this.state.referralBonus.referral_bonus == 0) {

                    if (offerDiscount > 0) {

                        var price = this.state.totalPrice;
                        var discountedPrice = offerDiscount;
                        var calculateBonus = price * discountedPrice / 100;
                        var actualPrice = price - calculateBonus;
                        localStorage.setItem('servicePrice', actualPrice);
                    }
                    else if (this.state.hasStudentDiscount == true) {

                        var price = this.state.totalPrice;
                        var studentDiscount = this.state.studentDiscountData;
                        var calculateDiscount = price * studentDiscount / 100;
                        var priceAfterStudentDiscount = calculateDiscount - price;
                        localStorage.setItem('servicePrice', priceAfterStudentDiscount);
                    }
                    else {

                        var actualPrice = this.state.totalPrice;
                        localStorage.setItem('servicePrice', actualPrice);
                    }
                }
            }
        }

        if (this.state.availableSlots != '' && this.state.availableSlots != null) {

            var dialog = (<div className="text-center">
                <p>Unfortunately we are fully booked today. Please choose an alternative Date &Time from the list below.</p>
                <button type="button" class="btn btn-primary bg-black" data-toggle="modal" data-target="#exampleModal">
                    View List
                </button>

                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                    <div class="form-row">
                                        <div class="col mb-4">
                                            <select className="form-control" value={this.state.currentDate}
                                                onChange={this.handleChangeCurrentDate} required>
                                                <option value="">Select an option</option>
                                                {this.state.availableSlots.map((slot, index) =>
                                                    <option name={index} value={slot.availableDate} id={index}>{slot.availableDate}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div class="col mb-4">
                                            <select className="form-control" value={this.state.currentDateSlot}
                                                onChange={this.handleChangeCurrentDateSlot} required>
                                                <option value="">Select an option</option>
                                                {this.state.availibilityTimeSlots.map((slots1) =>
                                                    <option value={slots1}>{slots1}</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
        }
        else {

            var dialog = (<p></p>);
        }

        return (

            <div id="MainPageWrapper">
                {this.state.bookingPageLoader}
                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-gray p-2">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name text-white">{servicetypename}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                        <div className="row pt-4 pb-4">

                                            {incliniceInhouseItems}

                                            <div className="col-md-12 pt-5">
                                                <label class="col-form-label pb-4">I want my service at</label>
                                                <div className="cardWrapWithShadow">
                                                    <div class=" text-right">
                                                        <a href="/add-address" class="text-dark"><i class="fas fa-plus text-red pr-2"></i> Add new address</a>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="col-sm-9 bookingPageAddressWrap">
                                                            {this.state.allAddress.map(adr =>
                                                                <div class="form-check bookingPageAddress">
                                                                    <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                                        onChange={this.handleChangeAddressCheck} required />
                                                                    <label class="form-check-label">
                                                                        <p className="lead">{adr.address}</p>
                                                                    </label>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-md-12 pt-5">

                                                <div className="col-md-12 pb-5 pl-0">
                                                    {serviceDurations}
                                                </div>

                                                <label class="col-form-label pb-4">I want my service on</label>
                                                <div className="col-md-12 cardWrapWithShadow mb-5">
                                                    <div className="col-md-6 pt-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Book a Date</label>
                                                            <div class="">
                                                                <ModernDatepicker
                                                                    className="form-control"
                                                                    date={this.state.bookingdate}
                                                                    format={'YYYY-MM-DD'}
                                                                    showBorder
                                                                    onChange={(date) => this.handleChangeBookingDate(date)}
                                                                    minDate={this.state.bookingdate}
                                                                    placeholder={'Select a date'} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 pt-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Book a Time</label>
                                                            <div class="">
                                                                <TimePicker
                                                                    showSecond={false}
                                                                    defaultValue={this.state.bookingtime}
                                                                    onChange={this.handleChangeBookingTime}
                                                                    format={format}
                                                                    inputReadOnly
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {dialog}

                                            </div>

                                            <div className="col-md-12 pt-5">
                                                <label class="col-form-label pb-4">Notes for your service</label>
                                                <div className="col-md-12 cardWrapWithShadow">
                                                    <div className="md-form">
                                                        <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8"
                                                            placeholder="Add Booking Notes......" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row pt-5 pl-2">
                                            <div className="col-md-12">
                                                <p className="lead m-0">£ {actualPrice}</p>
                                            </div>
                                        </div>

                                        <div className="row pt-5 pl-2">
                                            <div className="col-md-12">
                                                <p>
                                                    Redeem Code
                                                </p>
                                                <p>
                                                    <input type="text" value={this.state.studentDiscountCode} onChange={this.handChangeDiscountCode} />
                                                    <button className="btn bg-black text-white" type="button" onClick={this.handleDiscountConfirm}>
                                                        Check
                                                    </button>
                                                </p>
                                                <p className="lead m-0">{priceAfterStudentDiscount}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="text-center mb-3">
                                                    <button className="btn btn-lg bg-black text-white float-right" type="submit">Confirm Booking</button>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    yesBookingPreferencesValues(addDatetime) {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicetypename = params.get('srvtypename');
        const bookinghours = params.get('srvtypeduration');
        localStorage.setItem('srvtypeduration', bookinghours);

        return (

            <div id="MainPageWrapper">

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-half-white p-4">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name">{servicetypename}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                        <div className="row pt-4 pb-4">

                                            <div className="col-md-12 pt-3">
                                                <label class="col-form-label pb-4">I want my service at</label>
                                                <div className="cardWrapWithShadow">
                                                    <div class=" text-right">
                                                        <a href="/add-address" class="text-dark"><i class="fas fa-plus text-red pr-2"></i> Add new address</a>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="col-sm-9 bookingPageAddressWrap">
                                                            {this.state.allAddress.map(adr =>
                                                                <div class="form-check bookingPageAddress">
                                                                    <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                                        onChange={this.handleChangeAddressCheck} required />
                                                                    <label class="form-check-label">
                                                                        <p className="lead">{adr.address}</p>
                                                                    </label>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-md-12 pt-5">
                                                <label class="col-form-label pb-4">I want my service on</label>
                                                <div className="col-md-12 cardWrapWithShadow mb-5">
                                                    <div className="col-md-6 pt-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Book a Date</label>
                                                            <div class="">
                                                                <ModernDatepicker
                                                                    className="form-control"
                                                                    date={this.state.bookingdate}
                                                                    format={'YYYY-MM-DD'}
                                                                    showBorder
                                                                    onChange={(date) => this.handleChangeBookingDate(date)}
                                                                    minDate={this.state.currentDate}
                                                                    placeholder={'Select a date'} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 pt-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Book a Time</label>
                                                            <div class="">
                                                                <select className="form-control" value={this.state.bookingtime}
                                                                    onChange={this.handleChangeBookingTime} >
                                                                    <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-md-12 pt-5">
                                                <div className="col-md-6 pl-0">
                                                    <label class="col-form-label pb-4">I want my Service to be</label>
                                                    <div className="cardWrapWithShadow">
                                                        <div class="form-group row">
                                                            <div class="col-sm-4">
                                                                <div class="form-check">
                                                                    <input type="radio" id="60" value={this.state.duration}
                                                                        onChange={this.handleChangeServiceDuration} required />
                                                                    <label class="form-check-label">
                                                                        <p className="font-weight-normal">60mins</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-4 p-0">
                                                                <div class="form-check">
                                                                    <input type="radio" id="90" value={this.state.duration}
                                                                        onChange={this.handleChangeServiceDuration} required />
                                                                    <label class="form-check-label">
                                                                        <p className="font-weight-normal">90mins</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-4 p-0">
                                                                <div class="form-check">
                                                                    <input type="radio" id="120" value={this.state.duration}
                                                                        onChange={this.handleChangeServiceDuration} required />
                                                                    <label class="form-check-label">
                                                                        <p className="font-weight-normal">120mins</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 pr-0">
                                                    <label class="col-form-label pb-4">I want my Service Provider to be</label>
                                                    <div className="cardWrapWithShadow">
                                                        <div class="form-group row">
                                                            <div class="col-sm-4">
                                                                <div class="form-check">
                                                                    <input type="radio" value={this.state.genderpreference}
                                                                        onChange={this.handleChangeGenderPreference} required />
                                                                    <label class="form-check-label">
                                                                        <p className="font-weight-normal">Male</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-4 p-0">
                                                                <div class="form-check">
                                                                    <input type="radio" value={this.state.genderpreference}
                                                                        onChange={this.handleChangeGenderPreference} required />
                                                                    <label class="form-check-label">
                                                                        <p className="font-weight-normal">Female</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-4 p-0">
                                                                <div class="form-check">
                                                                    <input type="radio" value={this.state.genderpreference}
                                                                        onChange={this.handleChangeGenderPreference} required />
                                                                    <label class="form-check-label">
                                                                        <p className="font-weight-normal">Other</p>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12 pt-5">
                                                <label class="col-form-label pb-4">Notes for your service</label>
                                                <div className="col-md-12 cardWrapWithShadow">
                                                    <div className="md-form">
                                                        <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8"
                                                            placeholder="Add Booking Notes......" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row pt-5 pl-2">
                                            <div className="col-md-12">
                                                <p><span className="lead text-red">£ {addDatetime.priceInHousePeakHour}</span> ({addDatetime.service_price.price_description})</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="text-center mb-3">
                                                    <button className="btn btn-lg bg-black text-white float-right" type="submit">Confirm Booking</button>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }

    noBookingPreferencesValues(addDatetime) {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const servicetypename = params.get('srvtypename');
        const bookinghours = params.get('srvtypeduration');
        localStorage.setItem('srvtypeduration', bookinghours);

        return (

            <div id="MainPageWrapper">

                <section className="account-details section-padding">
                    <div className="services-wrapper">
                        <div className="container">
                            <div className="row pb-4">

                                <div className="col-md-12">
                                    <div className="row bookingPageTpRw bg-half-white p-4">
                                        <div className="col-md-6">
                                            <p className="lead mb-0 service-name">{servicetypename}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <form onSubmit={this.handleSubmit} className="bookingPageForm">

                                        <div className="row pt-4 pb-4">

                                            <div className="col-md-12 pt-3">
                                                <label class="col-form-label pb-4">I want my Service at</label>
                                                <div className="cardWrapWithShadow">
                                                    <div class=" text-right">
                                                        <a href="/add-address" class="text-dark"><i class="fas fa-plus text-red pr-2"></i> Add new address</a>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="col-sm-9 bookingPageAddressWrap">
                                                            {this.state.allAddress.map(adr =>
                                                                <div class="form-check bookingPageAddress">
                                                                    <input type="radio" className={adr.postalCode} id={adr.addressID} name="rdoNewAddress" value={this.state.addresscheck}
                                                                        onChange={this.handleChangeAddressCheck} required />
                                                                    <label class="form-check-label">
                                                                        <p className="lead">{adr.address}</p>
                                                                    </label>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-md-12 pt-5">
                                                <label class="col-form-label pb-4">I want my Service on</label>
                                                <div className="col-md-12 cardWrapWithShadow mb-5">
                                                    <div className="col-md-6 pt-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Book a Date</label>
                                                            <div class="">
                                                                <ModernDatepicker
                                                                    className="form-control"
                                                                    date={this.state.bookingdate}
                                                                    format={'YYYY-MM-DD'}
                                                                    showBorder
                                                                    onChange={(date) => this.handleChangeBookingDate(date)}
                                                                    minDate={this.state.currentDate}
                                                                    placeholder={'Select a date'} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 pt-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Book a Time</label>
                                                            <div class="">
                                                                <select className="form-control" value={this.state.bookingtime}
                                                                    onChange={this.handleChangeBookingTime} >
                                                                    <option value="0">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-md-12 pt-5">
                                                <label class="col-form-label pb-4">Notes for your service</label>
                                                <div className="col-md-12 cardWrapWithShadow">
                                                    <div className="md-form">
                                                        <textarea className="form-control rounded-0" name="address" value={this.state.notes} onChange={this.handleChangeNotes} rows="8"
                                                            placeholder="Add Booking Notes......" />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row pt-5 pl-2">
                                            <div className="col-md-12">
                                                <p><span className="lead text-red">£ {this.state.price}</span> ({addDatetime.price_description})</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="text-center mb-3">
                                                    <button className="btn btn-lg bg-black text-white float-right" type="submit">Confirm Booking</button>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
