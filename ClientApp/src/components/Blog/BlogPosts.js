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
import WhatIsCollagen from '../../assets/img/whatIsCollagen.jpg';
import HotStoneMassage from '../../assets/img/hotStoneMassage.jpg';
import Balayage from '../../assets/img/BALAYAGE.jpg';


export class BlogPosts extends Component {
    displayName = BlogPosts.name

  render() {
      return (

          <section className="account-details section-padding mt-5">
              <div className="services-wrapper">
                  <div className="container-fluid">

                      <div className="row pb-4">

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={reasonsForHairLoss}
                                      alt="21 Reasons For Hair Loss In Women And How To Prevent It" />
                                  <div className="content">
                                      <h4 className="text-red">21 Reasons For Hair Loss In Women And How To Prevent It?</h4>
                                      <p>
                                          A sparse hairline could be the worst nightmare in a woman’s life. 
                                          It comes as no surprise that men are more vulnerable to losing their hair, 
                                          due to pattern baldness, as compared to women. However, women are extremely 
                                          sensitive about this matter and thinning of hair is a demoralizing story for them.
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/21 Reasons For Hair Loss In Women And How To Prevent It/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={causesOfHair} alt="Sample image"></img>
                                  <div className="content">
                                      <h4 className="text-red">Causes Of Hair Loss In Men, Hair Loss Treatments, Synonyms And Many More</h4>
                                      <p>
                                          Every morning, you stand in front of the mirror and feel like your hairline is receding, no need to 
                                          stress yourself as you are not the only one losing hair at a young age. Losing 50-100 hairs in a day 
                                          shouldn’t bother you too much. Researchers have found out that 50% of men will start facing hair thinning 
                                          when they are around 50. 
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/Causes Of Hair Loss In Men Hair Loss Treatments Synonyms And Many More/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={whyFacial} alt="Sample image"></img>
                                  <div className="content">
                                      <h4 className="text-red">WHAT IS A FACIAL AND WHY YOU SHOULD GO FOR IT?</h4>
                                      <p>
                                          The first thing people notice in you is your face; why not make it worth noticing. Off course it
                                      plays a vital role in showing off your personality. Taking adequate care of your face and its
                                      skin is a necessary thing to do in today’s time, just like taking a balanced diet, working out
                                      and sleeping 8 hours a day.
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/What is a facial and why you should go for it/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                      </div>

                      <div className="row pb-4">

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={sixBenefit} alt="Sample image"></img>
                                  <div className="content">
                                      <h4 className="text-red">Six Benefits Of Collagen Supplements</h4>
                                      <p>
                                          Collagen is the most abundantly found protein in our bodies. Being the main component of connective tissues, 
                                          making body parts, it is found in fats, ligaments, tendons, muscles and skin.
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/Six Benefits Of Collagen Supplements/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={Carboxytherapy} alt="Sample image"></img>
                                  <div className="content">
                                      <h4 className="text-red">Things to know about Carboxytherapy</h4>
                                      <p>It is a cosmetic treatment that treats cellulite and is considered great for curing dark under-eye circles and stretch marks.
                                          Those who opt for carboxytherapy stretch marks treatment see a clear improvement in processes like:</p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/Things to know about Carboxytherapy/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={swedishVsDeepTissue} alt="Sample image"></img>
                                  <div className="content">
                                      <h4 className="text-red">Swedish Massage Vs Deep Tissue Massage</h4>
                                      <p>It is a cosmetic treatment that treats cellulite and is considered great for curing dark under-eye circles and stretch marks.
                                          Those who opt for carboxytherapy stretch marks treatment see a clear improvement in processes like:</p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/Swedish Massage Vs Deep Tissue Massage/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                      </div>

                      <div className="row pb-4">

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={messageType} alt="Sample image"></img>
                                  <div className="content">
                                      <h4 className="text-red">Which Type of Massage Is Right For You?</h4>
                                      <p>
                                            Since the ancient times, massages are known to be great for treating various conditions.
                                            Their effectiveness against certain physical
                                            and mental issues has been worthwhile.
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/Which Type of Massage Is Right For You/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={gelNailExtensions} alt="Sample image"></img>
                                  <div className="content">
                                      <h4 className="text-red">Things You Should Know Before Gel Nail Extensions</h4>
                                      <p>A few years back, when someone wished for lengthy and sexy fingernails, acrylics 
                                        seemed to the only option. I remember the time when we were supposed to sit in a 
                                        nail spa or salon for an hour or maybe more to get our fingers shaped with a 
                                        jelly-like powder and we could never skip a fill-in once new growth was seen.</p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/Things You Should Know Before Gel Nail Extensions/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={EventManagementCompanies} alt="Sample image"></img>
                                  <div className="content">
                                      <h4 className="text-red">How Event Management Companies Benefit You?</h4>
                                      <p>A few years back, when someone wished for lengthy and sexy fingernails, acrylics
                                        seemed to the only option. I remember the time when we were supposed to sit in a
                                        nail spa or salon for an hour or maybe more to get our fingers shaped with a
                                        jelly-like powder and we could never skip a fill-in once new growth was seen.
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/How Event Management Companies Benefit You/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                      </div>

                      <div className="row pb-4">

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={bestDigitalAgency}
                                      alt="How To Find The Best Digital Marketing Agency?" />
                                  <div className="content">
                                      <h4 className="text-red">How To Find The Best Digital Marketing Agency?</h4>
                                      <p>
                                          Are you running a business or an organization and want a broad exposure
                                          for your product/services and operations? You definitely need the services
                                          of a well known and reliable
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/How To Find The Best Digital Marketing Agency/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={HotStoneMassage}
                                      alt="Health Benefits And Risks Of Hot Stone Massage" />
                                  <div className="content">
                                      <h4 className="text-red">Health Benefits And Risks Of Hot Stone Massage</h4>
                                      <p>
                                          One of the main and beneficial massage techniques, Hot Stone Massage not only 
                                          relaxes you but also helps in easing tight muscles and heals the damaged soft 
                                          tissues in the body.
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/Health Benefits And Risks Of Hot Stone Massage/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={LymphaticDrainageMassage}
                                      alt="Lymphatic Drainage Massage: What It Is And How To Perform It" />
                                  <div className="content">
                                      <h4 className="text-red">Lymphatic Drainage Massage: What It Is And How To Perform It?</h4>
                                      <p>
                                          Our lymphatic drainage system enables us to get rid of any waste present in our body. An 
                                          active and healthy lymphatic massage makes use of the natural movements of smooth muscle 
                                          tissue’s to eliminate the waste. However, there are some conditions that can disturb this 
                                          drainage.
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/Lymphatic Drainage Massage: What It Is And How To Perform It/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                      </div>

                      <div className="row pb-4">

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={WhatIsCollagen}
                                      alt="How To Find The Best Digital Marketing Agency?" />
                                  <div className="content">
                                      <h4 className="text-red">What is Collagen? Its uses and why is it beneficial for us?</h4>
                                      <p>
                                          You must have heard about the word ‘Collagen’ and its role in keeping the skin healthy. 
                                          But you might not know all about it. Let us tell you about it and how beneficial it is for our bodies. 
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/What is Collagen/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={Balayage}
                                      alt="What is Balayage and what makes it so popular?" />
                                  <div className="content">
                                      <h4 className="text-red">What is Balayage and what makes it so popular?</h4>
                                      <p>
                                          You must have heard about the word ‘Collagen’ and its role in keeping the skin healthy.
                                          But you might not know all about it. Let us tell you about it and how beneficial it is for our bodies.
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/What is Balayage and what makes it so popular/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                          <div className="col-md-4">
                              <div className="blogPostWrap">
                                  <img className="img-fluid rounded" src={Balayage}
                                      alt="Highlights Vs Balayage: Similarities, Differences And Which Technique To Go For?" />
                                  <div className="content">
                                      <h4 className="text-red">Highlights Vs Balayage: Similarities, Differences And Which Technique To Go For?</h4>
                                      <p>
                                          You must have heard about the word ‘Collagen’ and its role in keeping the skin healthy.
                                          But you might not know all about it. Let us tell you about it and how beneficial it is for our bodies.
                                      </p>
                                      <a class="btn bg-orange text-white" href={encodeURI('/Highlights Vs Balayage Similarities Differences And Which Technique To Go For/').replace(/%20/g, '-')}>
                                          Read more
                                      </a>
                                  </div>
                              </div>
                          </div>

                      </div>

                  </div>
              </div>
          </section>
    );
  }
}
