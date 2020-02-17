import React, { Component } from 'react';
import { ProviderSidebarLinks } from '../Profile/SidebarLinks';
import { ProviderSchedular } from '../../ProviderSchedular';
import { BreadCrumbs } from '../../BreadCrumbs/BreadCrumbs';

export class EditSchedular extends Component {
    displayName = EditSchedular.name

    render() {
        return (

            <div id="MainPageWrapper">

                <ProviderSidebarLinks />

                <section class="section-padding customerProfile">
                    <div class="services-wrapper">
                        <div class="container pt-5">

                            <div class="row">

                                <div className="col-md-12 pt-5 pb-5">
     
                                    <ProviderSchedular />

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
