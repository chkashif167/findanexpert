import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MainSlider } from '../components/MainSlider/MainSlider';
import { PopularServices } from '../components/Services/PopularServices';
import { RecommendedServices } from '../components/Services/RecommendedServices';
import { RecommendedServicesMobile } from '../components/Services/RecommendedServicesMobile';

import product_1 from '../assets/img/products_1.png';
import product_2 from '../assets/img/products_2.png';
import product_3 from '../assets/img/products_3.png';
import info_1 from '../assets/img/info_1.png';
import appleStore from '../assets/img/appleStore.png';
import playStore from '../assets/img/googleStore.png';
import offers_1 from '../assets/img/offers_1.png';
import offers_2 from '../assets/img/offers_2.png';
import offers_3 from '../assets/img/offers_3.png';
import offers_4 from '../assets/img/offers_4.png';
import clrdSctnBnr from '../assets/img/beautygirl.png';

import recomndImg1 from '../assets/img/recommended_img_1.png';
import recomndImg2 from '../assets/img/recommended_img_2.png';
import recomndImg3 from '../assets/img/recommended_img_3.png';
import recomndImg4 from '../assets/img/recommended_img_4.png';
import recomndImg5 from '../assets/img/recommended_img_5.png';

import { PopularServicesMobile } from './Services/PopularServiceMobile';

export class Home extends Component {
    displayName = Home.name


    render() {

        var Styles = {
            display: 'block'
        }

        document.title = "Book Any Services Anytime Anywhere – Find An Expert";
        document.getElementsByTagName("META")[2].content = "Find and expert provides the Beauty, Household, IT And Digital Marketing services that can be availed 24/7 hours. Just download the expert app and you will get all services under one roof in London, UK.";

        //var vid = document.getElementById("myVideo");
        //vid.autoplay = true;
        //vid.load();

        return (
            <div id="MainPageWrapper">

                <div className="no-mobile">
                    <div id="carousel-example-1z" className="carousel slide carousel-fade main-slider" data-ride="carousel">
                        <MainSlider />
                    </div>
                </div>
                    
                <div className="yes-mobile">
                    <video autoplay="true" muted loop playsinline width="100%" id="myVideo">
                        <source src="https://lia.training/video/welcometofuture.mp4" type="video/mp4" />
                    </video>
                </div>


                <div className="main-wrapper pb-4">

                    <section className="homeCirclesSection section-padding">
                        <div className="homeCircles-wrapper">
                            <div className="container-fluid">

                                <div className="row homeCirclesRw">

                                    <div className="col-md-3 text-center homeCircles">
                                        <Link to="/free-treatments" className="text-gray">
                                            <img className="w-auto" alt="free-treatments-expert" src={offers_2} width="auto" />
                                            <h5 className="icon-group__title"><strong>Free Treatments</strong></h5>
                                        </Link>
                                    </div>

                                    <div className="col-md-3 text-center homeCircles">
                                        <Link to="/gift-vouchers" className="text-gray">
                                            <img className="w-auto" alt="gift-vouchers-expert" src={offers_1} width="auto" />
                                            <h5 className="icon-group__title"><strong>Gift Vouchers</strong></h5>
                                        </Link>
                                    </div>

                                    <div className="col-md-3 text-center homeCircles noMobile">
                                        <Link to="/sale" className="text-gray">
                                            <img className="w-auto" alt="50%-off-sale-expert" src={offers_3} width="auto" />
                                            <h5 className="icon-group__title"><strong>50% Off Sale</strong></h5>
                                        </Link>
                                    </div>

                                    <div className="col-md-3 text-center homeCircles">
                                        <Link to="/student-discounts" className="text-gray">
                                            <img className="w-auto" alt="student-discount-expert" src={offers_4} width="auto" />
                                            <h5 className="icon-group__title"><strong>Student Discount</strong></h5>
                                        </Link>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="pb-4">
                        <div className="services-wrapper">
                            <div className="container-fluid">
                                <div className="row">

                                    <div className="col-md-2 info-col pr-0 noMobile">
                                        <div className="info-box section-bg-light" id="col_1">
                                            <a href="#">
                                                <img className="" src={info_1} alt="expert-mobile" width="auto" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="col-md-6 info-col noMobile">
                                        <div className="info-box section-bg-light" id="col_2">
                                            <p className="lead text">Want all the <strong>Services</strong> at your fingertips ? <strong>Download</strong> the Expert app <strong>Now</strong></p>
                                        </div>
                                    </div>

                                    <div className="col-md-4 info-col pl-0">
                                        <div class="info-box section-bg-light no-mobile" id="col_3">
                                            <div className="content">
                                                <a href="">
                                                    <img className="appleImage" src={appleStore} alt="expert-applestore" width="100%" />
                                                </a>
                                                <a href="">
                                                    <img className="gooleImage" src={playStore} alt="expert-playstore" width="100%" />
                                                </a>
                                            </div>
                                        </div>
                                        <div class="info-box section-bg-light yes-mobile" id="col_3">
                                            <h3>Download the expert app now</h3>
                                            <div>
                                                <a href="">
                                                    <img className="appleImage" src={appleStore} alt="" width="100%" />
                                                </a>
                                                <a href="">
                                                    <img className="gooleImage" src={playStore} alt="" width="100%" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="trendingNow pb-4 bg-white">
                        <div className="trendingNow-wrapper">
                            <div className="container-fluid">

                                <div className="row pb-3">
                                    <div className="col-md-12">
                                        <h1 className="homeSectionTitle"><strong>Trending Now</strong></h1>
                                    </div>
                                </div>

                                <div className="row" id="trendingNow">
                                    <PopularServices />
                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="fullWidthBanner mt-5 mb-5 bg-white">
                        <div className="overlay">
                            <div className="container-fluid">

                                <div className="row">

                                    <div className="col-md-9">
                                        <div className="bannerTextWrap no-mobile">
                                            <div className="content">
                                                <p className="text-white pb-4">
                                                    <span>
                                                        <span className="small">Claim your</span>
                                                        <br /><strong>Free Beauty Treatment</strong>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="content">
                                                <p className="text-white">
                                                    <span>
                                                        <span className="small"> By downloading</span>
                                                        <br /><strong> The Expert App.</strong>
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="content">
                                                <a href="">
                                                    <img className="appleImage" src={appleStore} alt="expert-applestore" width="100%" />
                                                </a>
                                                <a href="">
                                                    <img className="gooleImage" src={playStore} alt="expert-playstore" width="100%" />
                                                </a>
                                            </div>
                                        </div>

                                        <div className="bannerTextWrap yes-mobile">
                                            <div className="content">
                                                <p className="text-white pb-4">
                                                    <span>
                                                        <span className="small">
                                                            Any <strong>Service. </strong>
                                                            Any <strong>Where. </strong> 
                                                            Any <strong>Time.</strong>
                                                        </span>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="bannerImageWrap">
                                            <img className="card-img-top" src={clrdSctnBnr} alt="Girl smiling" />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>

                    <section className="serices pb-4 bg-white">
                        <div className="services-wrapper">
                            <div className="container-fluid">

                                <div className="row pb-3">
                                    <div className="col-md-12">
                                        <h2 className="homeSectionTitle"><strong>Only For You</strong></h2>
                                    </div>
                                </div>

                                <div className="row" id="recommendedServices">

                                    <RecommendedServices />

                                </div>

                            </div>
                        </div>
                    </section>

                </div>

            </div>
        );
    }
}
