import {Router} from "@angular/router";
import {MaintenanceViewHelper} from "./MaintenanceViewHelper";
import {Injectable} from "@angular/core";
import {UnsubscribeAll} from "@ng-app-framework/core";
import {LocationProxy} from "@ng-app-framework/location";
import {AlertProxy} from "@ng-app-framework/alert";

@Injectable()
export class MaintenanceListener {

    constructor(public router?: Router,
                public location?: LocationProxy,
                public alert?: AlertProxy,
                public viewHelper?: MaintenanceViewHelper) {

    }

    listen() {
        this.viewHelper.onIsInMaintenanceWindowChange.takeUntil(UnsubscribeAll)
            .subscribe((value) => this.handleRoutes(value));
    }

    handleMaintenanceEnded() {
        this.router.navigateByUrl('/').then(() => {
            this.alert.success("The maintenance period has ended. We apologize for any inconvenience this may have caused.", "Maintenance");
        });
    }

    handleMaintenanceBegun() {
        this.router.navigateByUrl('/maintenance').then(() => {
            if (this.viewHelper.isDownUnexpectedly) {
                this.alert.error(this.viewHelper.unexpectedVerbiage, "Unexpected Maintenance");
                return;
            }
            this.alert.warning(this.viewHelper.scheduledVerbiage, "Scheduled Maintenance");
        });
    }

    handleRoutes(value) {
        if (value && this.location.path() !== '/maintenance') {
            this.handleMaintenanceBegun();
        }
        if (!value && this.location.path() === '/maintenance') {
            this.handleMaintenanceEnded();
        }
    }
}
