import React, { Component } from 'react';
import loudSpeaker from '../../assets/img/loud.png';
import social1 from '../../assets/img/facebook.png';
import social2 from '../../assets/img/watsapp.png';
import social3 from '../../assets/img/twitter.png';
import social4 from '../../assets/img/insta.png';
import social5 from '../../assets/img/linkdin.png';
import social6 from '../../assets/img/share.png';

export class FiftyPercentSale extends Component {
    displayName = FiftyPercentSale.name

    render() {
        var bg = {
            background: '#eee',
            borderRadius: '5px'
        }
        var rgb = {
            background: '-webkit-linear-gradient(180deg,#41151d 0%,#ce2235 100%)'
        }

        document.getElementsByTagName("META")[2].content = 'Now offering 50% Discount exclusively on all services valid till 31-Dec-2019. Please visit us: findanexpert.net';
        document.getElementsByTagName("TITLE")[0].text = '50% Off Sale, Off White Sale, Off White Women Sale';

        return (
            <div>

                <section className="section-padding">
                    <div class="services-wrapper">
                        <div class="container">
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <h4 className="text-red font-weight-bold">Recommend a Friend today & receive 50% off any service!</h4>
                                    <p>
                                        If you love our services why not recommend Expert to Friends and Family. As a thank you we'll give both you and your friend 50% off any service. There's no limit to the amount of people you can refer or the amount of discounts you can earn, so get started today!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="fiftyPercentSaleRecommedFriend section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div class="row">

                                <div class="col-md-6">
                                    <img src={loudSpeaker} class="img-fluid" alt="Responsive image" />
                                </div>

                                <div class="col-md-6">

                                    <form class="text-center p-5" style={bg}>

                                        <h4 class="font-weight-bold mb-4 mt-0">Recommend a Friend Now!</h4>
                                        <input type="email" class="form-control mb-4" placeholder="Email" />
                                        <button class="btn btn-danger btn-block mb-2" type="submit" style={rgb}>Send</button>

                                        <h5>Or</h5>
                                        <h5> Recommend a Friend with</h5>
                                        <div class="d-flex justify-content-center">
                                            <div class="p-2">
                                                <a href="">
                                                    <img src={social1} class="img-fluid" alt="facebook" />
                                                </a>
                                            </div>
                                            <div class="p-2">
                                                <a href="">
                                                    <img src={social2} class="img-fluid" alt="whatsapp" />
                                                </a>
                                            </div>
                                            <div class="p-2">
                                                <a href="">
                                                    <img src={social3} class="img-fluid" alt="twitter" />
                                                </a>
                                            </div>
                                            <div class="p-2">
                                                <a href="">
                                                    <img src={social4} class="img-fluid" alt="instagram" />
                                                </a>
                                            </div>
                                            <div class="p-2">
                                                <a href="">
                                                    <img src={social5} class="img-fluid" alt="linkedin" />
                                                </a>
                                            </div>
                                            <div class="p-2">
                                                <a href="">
                                                    <img src={social6} class="img-fluid" alt="share" />
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                <section className="fiftyPercentSaleBoxes section-padding">
                    <div class="services-wrapper">
                        <div class="container">

                            <div className="row">

                                <div class="col-md-6">
                                    <div className="bg-pink">
                                        <h5 class="font-weight-bold">How do I claim my credit?</h5>
                                        <ul>
                                            <li>
                                                As soon as your friend has placed their
                                                first <br />order using our App, you will be eligible for
                                                <br />your 50% discount.
                                            </li>
                                            <li>
                                                Just book any service you wish and 50% <br />
                                                discount will be automatically applied to <br />your order.
                                            </li>
                                            <li>
                                                It's as simple as that.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div className="bg-pink terms">
                                        <h5 class="font-weight-bold">What are the terms and conditions?</h5>
                                        <ul>
                                            <li>
                                                We reserve the right to change the conditions <br />without any notice.
                                                The friend you recommend <br />must be a new client.
                                            </li>
                                            <li>
                                                The Discount cannot be exchanged for cash
                                            </li>
                                            <li>
                                                One year Expiry
                                            </li>
                                            <li>
                                                There's no limit to the number of friends you <br />recommend
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
