import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import reasonsForHairLoss from '../../assets/img/21_reasons_hair_loss.jpg';
import causesOfHair from '../../assets/img/men-hair-loss.jpg';
import whyFacial from '../../assets/img/why-facial.jpg';
import sixBenefit from '../../assets/img/6-benefit.jpg';
import swedishVsDeepTissue from '../../assets/img/swedishVsDeepTissue.jpg';
import messageType from '../../assets/img/messageType.jpg';
import bestDigitalAgency from '../../assets/img/bestDigitalAgency.jpg';
import Carboxytherapy from '../../assets/img/Carboxytherapy.jpg';
import gelNailExtensions from '../../assets/img/gelNailExtensions.jpg';
import EventManagementCompanies from '../../assets/img/eventManagementCompany.jpg';
import LymphaticDrainageMassage from '../../assets/img/LymphaticDrainageMassage.jpg';
import Balayage from '../../assets/img/BALAYAGE.jpg';
import HotStoneMassage from '../../assets/img/hotStoneMassage.jpg';



export class SideBar extends Component {
    displayName = SideBar.name

    render() {

        return (

           
                       <div>
                            <h2>Related Blogs</h2>
                            <div class="row pb-4">

                                <div className="col-md-6">
                                    <a href={encodeURI('/21 Reasons For Hair Loss In Women And How To Prevent It/').replace(/%20/g, '-')}>21 Reasons For Hair Loss In Women And How To Prevent It?</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={reasonsForHairLoss} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/Causes Of Hair Loss In Men Hair Loss Treatments Synonyms And Many More/').replace(/%20/g, '-')}>Causes Of Hair Loss In Men, Hair Loss Treatments, Synonyms And Many More</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={causesOfHair} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/What is a facial and why you should go for it/').replace(/%20/g, '-')}>What is a facial and why you should go for it?</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={whyFacial} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/How Event Management Companies Benefit You/').replace(/%20/g, '-')}>How Event Management Companies Benefit You?</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={EventManagementCompanies} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/How To Find The Best Digital Marketing Agency/').replace(/%20/g, '-')}>How To Find The Best Digital Marketing Agency?</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={bestDigitalAgency} />
                                </div>
                            </div>

                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/Health Benefits And Risks Of Hot Stone Massage/').replace(/%20/g, '-')}>Health Benefits And Risks Of Hot Stone Massage</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={HotStoneMassage} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/Lymphatic Drainage Massage: What It Is And How To Perform It/').replace(/%20/g, '-')}>Lymphatic Drainage Massage: What It Is And How To Perform It?</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={LymphaticDrainageMassage} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/What is Collagen/').replace(/%20/g, '-')}>What is Collagen? Its uses and why is it beneficial for us?</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={bestDigitalAgency} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/Things You Should Know Before Gel Nail Extensions/').replace(/%20/g, '-')}>Things You Should Know Before Gel Nail Extensions</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={gelNailExtensions} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/Six Benefits Of Collagen Supplements/').replace(/%20/g, '-')}>Six Benefits Of Collagen Supplements</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={sixBenefit} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/Things to know about Carboxytherapy/').replace(/%20/g, '-')}>Things to know about Carboxytherapy</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={Carboxytherapy}/>
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/Swedish Massage Vs Deep Tissue Massage/').replace(/%20/g, '-')}>Swedish Massage Vs Deep Tissue Massage</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={swedishVsDeepTissue} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/Which Type of Massage Is Right For You/').replace(/%20/g, '-')}>Which Type of Massage Is Right For You?</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={messageType} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                <a href={encodeURI('/Things You Should Know Before Gel Nail Extensions/').replace(/%20/g, '-')}>Things You Should Know Before Gel Nail Extensions</a>
                                </div>
                                <div class="col-md-6">
                                <img className="w-100 img-fluid rounded" src={gelNailExtensions} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/What is Balayage and what makes it so popular?/').replace(/%20/g, '-')}>What is Balayage and what makes it so popular?</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={Balayage} />
                                </div>

                            </div>
                            <div class="row pb-4">

                                <div class="col-md-6">
                                    <a href={encodeURI('/Highlights Vs Balayage: Similarities, Differences And Which Technique To Go For/').replace(/%20/g, '-')}>Highlights Vs Balayage: Similarities, Differences And Which Technique To Go For</a>
                                </div>
                                <div class="col-md-6">
                                    <img className="w-100 img-fluid rounded" src={Balayage} />
                                </div>

                            </div>
               
                       </div>

        );
    }
}
