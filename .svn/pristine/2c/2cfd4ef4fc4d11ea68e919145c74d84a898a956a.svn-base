import React, { Component } from 'react';
import { ProviderSidebarLinks } from '../Profile/SidebarLinks';
import { ProviderPendingAppointments } from './PendingAppointments';
import { ProviderCompletedAppointments } from './CompletedAppointments';
import { ProviderNextTask } from './ProviderNextTask';
import App from '../../../App';

export class ProviderAppointments extends Component {
    displayName = ProviderAppointments.name

    render() {
        return (
            this.ProviderAppointments()
        );
    }

    ProviderAppointments() {
        return (

            <div className="providerTasksWrap mb-5 p-5 profileBox">

                <div className="row pb-3">
                    <div className="col-md-12">
                        <ul class="nav nav-tabs nav-justified bg-white" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" data-toggle="tab" href="#next" role="tab">
                                    <div className="iconWrap">
                                        <i class="fas fa-step-forward pr-2"></i> Next Tasks
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#pending" role="tab">
                                    <div className="iconWrap">
                                        <i class="fas fa-hourglass pr-2"></i> Upcoming Tasks
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#completed" role="tab">
                                    <div className="iconWrap">
                                        <i class="fas fa-clipboard-check pr-2"></i> Completed Tasks
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row pb-4">
                    <div className="col-md-12">

                        <div class="tab-content">

                            <div class="tab-pane fade in show active" id="next" role="tabpanel">

                                <ProviderNextTask />

                            </div>

                            <div class="tab-pane fade in" id="pending" role="tabpanel">

                                <ProviderPendingAppointments />

                            </div>

                            <div class="tab-pane fade in" id="completed" role="tabpanel">

                                <ProviderCompletedAppointments />

                            </div>

                        </div>
                    </div>

                </div>
            </div>

            
        );
    }
}
