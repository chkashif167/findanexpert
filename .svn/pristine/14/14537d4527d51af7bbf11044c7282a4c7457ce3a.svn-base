import React, { Component } from 'react';
import { ProviderReply } from '../../ProviderReply';
import { ProviderSidebarLinks } from '../Profile/SidebarLinks';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';

export class ProviderEmailDetail extends Component {
    displayName = ProviderEmailDetail.name

    render() {
        const search = window.location.search;
        var decodedString = window.atob(search.replace('?', ''));
        const decodeParams = decodeURIComponent(decodedString);
        const params = new URLSearchParams(decodeParams);

        const getSubject = params.get('subject');
        const getFrom = params.get('from');
        const getBody = params.get('body');

        return (

            <div id="MainPageWrapper">

                <BreadCrumbs />

                <section className="account-details">
                    <div className="services-wrapper">
                        <div className="container-fluid">
                            <div className="row">

                                <ProviderSidebarLinks />

                                <div className="col-md-9 mb-5">
                                    <div className="emailDetailTop">
                                        <div className="iconWrap">
                                            <i class="fas fa-user-alt"></i>
                                        </div>
                                        <div className="textWrap">
                                            <p className="lead mb-0"><strong>{getSubject}</strong></p>
                                            <p className="lead mb-0">Findandexpert ({getFrom})</p>
                                        </div>
                                    </div>
                                    <div className="email-body pt-3 pb-5">
                                        <p>{getBody}</p>
                                    </div>
                                    <div className="emailReplyWrap">
                                        <p className="lead"><i class="fas fa-reply"></i> Findandexpert (support@selteq.net)</p>
                                        <ProviderReply />
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
