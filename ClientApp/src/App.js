import React, { Component } from "react";
import { Route } from "react-router";
import { Redirect, Switch, BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";

import { Home } from "./components/Home";
import { SearchResults } from "./components/Services/SearchResults";
import { Offers } from "./components/Offers/Offers";
import { BecomeExpert } from "./components/BecomeExpert/BecomeExpert";
import { Referral } from "./components/Referral/Referral";
import { Watchlist } from "./components/Watchlist/Watchlist";
import { Help } from "./components/Help/Help";
import { CusomerAuthentication } from "./components/CustomerAccount/CusomerAuthentication";
import { YourAccount } from "./components/CustomerAccount/YourAccount/YourAccount";
import { Profile } from "./components/CustomerAccount/YourAccount/Profile";
import { SignOut } from "./components/SignOut";
import { ServiceTypeResults } from "./components/Services/ServiceTypeResults";
import { ServiceSingle } from "./components/Services/ServiceSingle";
import { EditProfile } from "./components/CustomerAccount/YourAccount/EditProfile";
import { BookingPage } from "./components/Booking/BookingPage";
import { CustomerBookings } from "./components/CustomerBookings/CustomerBookings";
import { addAddress } from "./components/CustomerAccount/YourAddresses/addAddress";
import { allAddress } from "./components/CustomerAccount/YourAddresses/allAddresses";
import { PaymentSuccessfull } from "./components/Payment/PaymentSuccessfull";
import { YourExperts } from "./components/CustomerAccount/YourExperts/YourExperts";
import { ProviderAuthentication } from "./components/BecomeExpert/ProviderAuthentication";
import { ProviderProfile } from "./components/BecomeExpert/Profile/Profile";
import { ProviderJobs } from "./components/BecomeExpert/Profile/Jobs";
import { ProviderEditProfile } from "./components/BecomeExpert/Profile/EditProfile";
import { ProviderEditServices } from "./components/BecomeExpert/Services/EditServices";
import { ProviderSignOut } from "./components/BecomeExpert/SignOut";
import { EditSchedular } from "./components/BecomeExpert/Schedular/EditSchedular";
import { AddDocuments } from "./components/BecomeExpert/Documents/AddDocuments";
import { ProviderAllServices } from "./components/BecomeExpert/Services/AllServices";
import { ProviderAllSchedules } from "./components/BecomeExpert/Schedular/AllSchedules";
import { ProviderMailbox } from "./components/BecomeExpert/Mailbox/Mailbox";
import { ProviderEmailDetail } from "./components/BecomeExpert/Mailbox/ProviderEmailDetail";
import { ProviderAppointments } from "./components/BecomeExpert/Apointments/ProviderAppointments";
import ChangeProviderPassword from "./components/BecomeExpert/Profile/ChangeProviderPasswordjs";
import { ProviderReviews } from "./components/BecomeExpert/Reviews/ProviderReviews";
import { ProviderEarnings } from "./components/BecomeExpert/Earnings/ProviderEarnings";
import { ProviderDocuments } from "./components/BecomeExpert/Documents/ProviderDocuments";
import { DisplayCustomerConsent } from "./components/ConsentForms/DisplayCustomerConsent";
import { CustomerBookingDetail } from "./components/CustomerBookings/CustomerBookingDetail";
import { ChangePassword } from "./components/CustomerAccount/YourAccount/ChangePassword";
import { EditCustomerBooking } from "./components/Booking/EditBooking";
import ProviderForgotPassword from "./components/BecomeExpert/Profile/ProviderForgotPassword";
import ProviderConfirmCodeForgotPassword from "./components/BecomeExpert/Profile/ProviderConfirmCodeForgotPassword";
import { ProviderUpdatePassword } from "./components/BecomeExpert/Profile/ProviderUpdatePassword";
import { ConfirmProvider } from "./components/BecomeExpert/Profile/ConfirmProvider";
import { SaveReferral } from "./components/Referral/SaveReferral";
import { ConfirmCustomer } from "./components/CustomerAccount/YourAccount/ConfirmCustomer";
import { CustomerForgotPassword } from "./components/CustomerAccount/YourAccount/ForgotPasswordLink";
import { CustomerUpdatePassword } from "./components/CustomerAccount/YourAccount/UpdatePassword";
import { SearchService } from "./components/SearchService";
import { ProviderSentEmailDetail } from "./components/BecomeExpert/Mailbox/ProviderSentEmailDetail";
import { DatePickerPage } from "./components/CustomerAccount/YourAccount/DatePickerPage";
import { CustomerInboxEmailDetails } from "./components/CustomerAccount/MailBox/CustomerInboxEmailDetails";
import { CustomerOutboxEmailDetails } from "./components/CustomerAccount/MailBox/CustomerOutboxEmailDetails";
import { CustomerPaymentDetails } from "./components/CustomerAccount/PaymentDetails/PaymentDetails";
import { CustomerMailbox } from "./components/CustomerAccount/MailBox/CustomerMailbox";
import { AddNewCard } from "./components/CustomerAccount/PaymentDetails/AddNewCard";
import { BookAgain } from "./components/CustomerAccount/YourExperts/BookAgain";
import { CheckOut } from "./components/Payment/CheckOut";
import { ProviderAppointmentDetail } from "./components/BecomeExpert/Apointments/ProviderAppointmentDetail";
import { AutoSuggest } from "./components/BecomeExpert/AutoSuggest";
import { UpdateCustomerAddress } from "./components/CustomerAccount/YourAddresses/UpdateCustomerAddress";
import { ProductOne } from "./components/StaticPages/ProductOne";
import { ProductTwo } from "./components/StaticPages/ProductTwo";
import { ProductThree } from "./components/StaticPages/ProductThree";
import { OffersOne } from "./components/StaticPages/OffersOne";
import { OffersTwo } from "./components/StaticPages/OffersTwo";
import { OffersThree } from "./components/StaticPages/OffersThree";
import { OffersFour } from "./components/StaticPages/OffersFour";
import { ProviderOffers } from "./components/StaticPages/ProviderOffers";
import { FiftyPercentSale } from "./components/StaticPages/FiftyPercentSale";
import { StudentDiscounts } from "./components/StaticPages/StudentDiscount";
import { GiftVouchers } from "./components/StaticPages/GiftVouchers";
import { FreeTreatments } from "./components/StaticPages/FreeTreatments";
import { FreeBeautyTreatment } from "./components/StaticPages/FreeBeautyTreatment";
import { LandingPages } from "./components/Offers/LandingPages";
import { FreeTraining } from "./components/StaticPages/FreeTraining";
import { PartnerWithExpert } from "./components/StaticPages/PartnerWithExpert";
import { NotFound } from "./components/Help/NotFound";
import { Chat } from "./components/Chat/Chat";
import { BlogPosts } from "./components/Blog/BlogPosts";
import { ReasonsForHairLoss } from "./components/Blog/ReasonsForHairLoss";
import { SearchServiceTypeFromFooter } from "./components/SearchServiceTypeFromFooter";
import { SimpleLayout } from "./components/SimpleLayout";
import { TwilioTest } from "./components/Chat/TwilioTest";
import { PrivacyPolicy } from "./components/Policies/PrivacyPolicy";
import { TermsAndConditions } from "./components/Policies/TermsAndConditions";
import { CookiesPolicy } from "./components/Policies/CookiesPolicy";
import { CausesOfHairHairLossMen } from "./components/Blog/HairLossInMen";
import { WhatIsFacial } from "./components/Blog/WhatIsFacial";
import { CollagenSupplements } from "./components/Blog/CollagenSupplements";
import { KnowAboutCarboxyTherapy } from "./components/Blog/KnowAboutCarboxyTherapy";
import { SwedishVsDeepTissue } from "./components/Blog/SwedishVsDeepTissue";
import { TypeOfMassage } from "./components/Blog/TypeOfMassage";
import { GelNailExtensionse } from "./components/Blog/GelNailExtensions";
import { EventManagementCompanies } from "./components/Blog/EventManagementCompanies";
import { BestDigitalMarketingAgency } from "./components/Blog/BestDigitalMarketingAgency";
import { HotStoneMassage } from "./components/Blog/HotStoneMassage";
import { LymphaticDrainageMassage } from "./components/Blog/LymphaticDrainageMassage";
import { ContactUs } from "./components/Help/ContactUs";
import { AboutUs } from "./components/Help/AboutUs";
import { HelpMobile } from "./components/Help/HelpMobile";
import { WhatisCollagen } from "./components/Blog/WhatisCollagen";
import { WhatIsBalayage } from "./components/Blog/WhatIsBalayage";
import { HighlightsVsBalayage } from "./components/Blog/HighlightsVsBalayage";
import CheckOutPayment from "./components/Payment/CheckOutPayment";
import ProviderCodeConfirmation from "./components/BecomeExpert/ProviderCodeConfirmation";
import ProviderResendConfirmationCode from "./components/BecomeExpert/ProviderResendConfirmationCode";

export default class App extends Component {
  displayName = App.name;

  static ApisBaseUrl = "https://api-acc.findanexpert.net";
  static ApisImageBaseUrl = "https://admin.findanexpert.net";

  render() {
    var currentLocation = window.location.pathname;
    if (
      currentLocation == "/special-pages/partner-with-expert" ||
      currentLocation == "/customer-help"
    ) {
      var layoutContent = (
        <SimpleLayout>
          <Route
            exact
            path="/special-pages/partner-with-expert"
            component={PartnerWithExpert}
          />
          <Route exact path="/customer-help" component={HelpMobile} />
        </SimpleLayout>
      );
    } else {
      var layoutContent = (
        <Layout>
          <Switch>
            <Route exact path="/" component={ProviderOffers} />
            <Route path="/show-services/" component={SearchService} />
            <Route path="/services" component={ServiceSingle} />
            <Route path="/service" component={SearchServiceTypeFromFooter} />
            <Route path="/service-type" component={ServiceTypeResults} />
            <Route path="/offers" component={Offers} />
            <Route path="/become-expert" component={BecomeExpert} />
            <Route path="/referral" component={Referral} />
            <Route path="/accept-referral" component={SaveReferral} />
            <Route path="/watchlist" component={Watchlist} />
            <Route path="/help" component={Help} />
            <Route
              path="/customer-authentication"
              component={CusomerAuthentication}
            />
            <Route path="/confirm-your-account" component={ConfirmCustomer} />
            <Route path="/your-account" component={YourAccount} />
            <Route path="/profile" component={Profile} />
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/change-password" component={ChangePassword} />
            <Route
              path="/forgot-password-link"
              component={CustomerForgotPassword}
            />
            <Route path="/update-password" component={CustomerUpdatePassword} />
            <Route path="/your-addresses" component={allAddress} />
            <Route path="/add-address" component={addAddress} />
            <Route path="/update-address" component={UpdateCustomerAddress} />
            <Route path="/your-emails" component={CustomerMailbox} />
            <Route
              path="/inbox-email-details"
              component={CustomerInboxEmailDetails}
            />
            <Route
              path="/outbox-email-details"
              component={CustomerOutboxEmailDetails}
            />
            <Route path="/signout" component={SignOut} />
            <Route path="/booking" component={BookingPage} />
            <Route path="/booking-detail" component={CustomerBookingDetail} />
            <Route path="/payment" component={CheckOutPayment} />
            <Route path="/checkout" component={CheckOut} />
            <Route
              path="/your-payment-details"
              component={CustomerPaymentDetails}
            />
            <Route path="/add-new-card" component={AddNewCard} />
            <Route
              path="/payment-success-message"
              component={PaymentSuccessfull}
            />
            <Route path="/customer-bookings" component={CustomerBookings} />
            <Route
              path="/edit-customer-booking"
              component={EditCustomerBooking}
            />
            <Route path="/your-experts" component={YourExperts} />
            <Route path="/book-again-your-expert" component={BookAgain} />
            <Route
              path="/customer-consent"
              component={DisplayCustomerConsent}
            />

            <Route
              path="/provider-authentication"
              component={ProviderAuthentication}
            />
            <Route
              path="/provider-confirm-account"
              component={ConfirmProvider}
            />
            <Route path="/provider-profile" component={ProviderProfile} />
            <Route path="/jobs" component={ProviderJobs} />
            <Route
              path="/provider-edit-profile"
              component={ProviderEditProfile}
            />
            <Route
              path="/provider-change-password"
              component={ChangeProviderPassword}
            />
            <Route
              path="/provider-forgot-password"
              component={ProviderForgotPassword}
            />
            <Route
              path="/provider-confirm-code-forgot-password"
              component={ProviderConfirmCodeForgotPassword}
            />
            <Route
              path="/provider-update-password"
              component={ProviderUpdatePassword}
            />
            <Route path="/provider-services" component={ProviderAllServices} />
            <Route
              path="/provider-edit-services"
              component={ProviderEditServices}
            />
            <Route
              path="/provider-schedular"
              component={ProviderAllSchedules}
            />
            <Route path="/provider-edit-schedular" component={EditSchedular} />
            <Route path="/provider-documents" component={ProviderDocuments} />
            <Route path="/provider-add-documents" component={AddDocuments} />
            <Route path="/provider-signout" component={ProviderSignOut} />
            <Route path="/provider-mailbox" component={ProviderMailbox} />
            <Route path="/email-details" component={ProviderEmailDetail} />
            <Route
              path="/sent-email-details"
              component={ProviderSentEmailDetail}
            />
            <Route
              path="/provider-appointments"
              component={ProviderAppointments}
            />
            <Route
              path="/provider-booking-detail"
              component={ProviderAppointmentDetail}
            />
            <Route path="/provider-reviews" component={ProviderReviews} />
            <Route path="/provider-earnings" component={ProviderEarnings} />
            <Route path="/chat" component={TwilioTest} />

            <Route path="/blogs" component={BlogPosts} />
            <Route
              path="/21-Reasons-For-Hair-Loss-In-Women-And-How-To-Prevent-It"
              component={ReasonsForHairLoss}
            />
            <Route
              path="/Causes-Of-Hair-Loss-In-Men-Hair-Loss-Treatments-Synonyms-And-Many-More"
              component={CausesOfHairHairLossMen}
            />
            <Route
              path="/What-is-a-facial-and-why-you-should-go-for-it"
              component={WhatIsFacial}
            />
            <Route
              path="/Six-Benefits-Of-Collagen-Supplements"
              component={CollagenSupplements}
            />
            <Route
              path="/Things-to-know-about-Carboxytherapy"
              component={KnowAboutCarboxyTherapy}
            />
            <Route
              path="/Swedish-Massage-Vs-Deep-Tissue-Massage"
              component={SwedishVsDeepTissue}
            />
            <Route
              path="/Which-Type-of-Massage-Is-Right-For-You"
              component={TypeOfMassage}
            />
            <Route
              path="/Things-You-Should-Know-Before-Gel-Nail-Extensions"
              component={GelNailExtensionse}
            />
            <Route
              path="/How-Event-Management-Companies-Benefit-You"
              component={EventManagementCompanies}
            />
            <Route
              path="/How-To-Find-The-Best-Digital-Marketing-Agency"
              component={BestDigitalMarketingAgency}
            />
            <Route
              path="/Health-Benefits-And-Risks-Of-Hot-Stone-Massage"
              component={HotStoneMassage}
            />
            <Route
              path="/Lymphatic-Drainage-Massage:-What-It-Is-And-How-To-Perform-It"
              component={LymphaticDrainageMassage}
            />
            <Route path="/What-is-Collagen" component={WhatisCollagen} />
            <Route
              path="/What-is-Balayage-and-what-makes-it-so-popular"
              component={WhatIsBalayage}
            />
            <Route
              path="/Highlights-Vs-Balayage-Similarities-Differences-And-Which-Technique-To-Go-For"
              component={HighlightsVsBalayage}
            />

            <Route path="/provider-offers" component={ProviderOffers} />
            <Route path="/free-treatments" component={FreeTreatments} />
            <Route path="/sale" component={FiftyPercentSale} />
            <Route path="/student-discounts" component={StudentDiscounts} />
            <Route path="/gift-vouchers" component={GiftVouchers} />

            <Route exact path="/special-pages" component={LandingPages} />
            <Route
              path="/special-pages/free-beauty-treatments"
              component={FreeBeautyTreatment}
            />
            <Route
              path="/special-pages/free-training"
              component={FreeTraining}
            />

            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-conditions" component={TermsAndConditions} />
            <Route path="/cookies-policy" component={CookiesPolicy} />
            <Route path="/contact-us" component={ContactUs} />
            <Route path="/about-us" component={AboutUs} />
            <Route
              path="/provider-code-confirmation"
              component={ProviderCodeConfirmation}
            />
            <Route
              path="/provider-resend-confirmation-code"
              component={ProviderResendConfirmationCode}
            />

            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      );
    }

    return <div>{layoutContent}</div>;
  }
}
