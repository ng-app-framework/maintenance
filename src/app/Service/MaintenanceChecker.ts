import {Injectable} from "@angular/core";
import {MaintenanceCheckEndpoint} from "./MaintenanceCheckEndpoint";
import {MaintenanceConfig} from "./MaintenanceConfig";
import {MaintenanceNotifier} from "./MaintenanceNotifier";
import {MaintenanceViewHelper} from "./MaintenanceViewHelper";

@Injectable()
export class MaintenanceChecker {


    constructor(public endpoint: MaintenanceCheckEndpoint,
                public notifier: MaintenanceNotifier,
                public viewHelper: MaintenanceViewHelper) {
    }

    check() {
        this.endpoint.get().subscribe((response: MaintenanceConfig) => {
            this.updateViewHelper(response);
            this.notifier.notifyIfApplicable();
            this.checkAgainSoon();
        });
    }

    private checkAgainSoon() {
        setTimeout(() => this.check(), this.getCheckDelay());
    }

    private getCheckDelay() {
        let timeout = this.viewHelper.oneMinuteInMilliseconds;
        if (this.viewHelper.isInMaintenanceWindow) {
            timeout = timeout * 5;
        }
        return timeout;
    }

    private updateViewHelper(response: MaintenanceConfig) {
        this.viewHelper.isDownUnexpectedly    = response.isDownUnexpectedly;
        this.viewHelper.start                 = response.start;
        this.viewHelper.duration              = response.duration;
        this.viewHelper.isInMaintenanceWindow = this.viewHelper.inMaintenanceWindow();
    }
}
