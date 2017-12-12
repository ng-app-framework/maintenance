import {MaintenanceViewHelper} from "./MaintenanceViewHelper";
import {Injectable} from "@angular/core";
import {AlertProxy} from "@ng-app-framework/alert";

@Injectable()
export class MaintenanceNotifier {

    constructor(public viewHelper: MaintenanceViewHelper, public alert: AlertProxy) {

    }

    notifyIfApplicable() {
        if (this.viewHelper.isBeforeMaintenanceWindow()) {
            this.notifyTwoDays();
            if (!this.notifyThirtyMinutes()) {
                if (!this.notifyOneHour()) {
                    this.notifyTwoHours();
                }
            }
        }
    }

    private notifyTwoDays() {

        if (this.viewHelper.timeFrame.isNowAfter(this.viewHelper.start - (this.viewHelper.oneHourInMilliseconds * 48))) {
            this.viewHelper.shouldDisplayUpcomingMaintenanceMessage = true;
        }
    }

    private notifyTwoHours() {
        if (this.viewHelper.timeFrame.isNowAfter(this.getTwoHoursBeforeMaintenance())) {
            this.notify('twoHours', 'two hours');
            return true;
        }
        return false;
    }

    private notifyOneHour() {
        if (this.viewHelper.timeFrame.isNowAfter(this.getOneHourBeforeMaintenance())) {
            this.notify('oneHour', 'one hour');
            return true;
        }
        return false;
    }

    private notifyThirtyMinutes() {
        if (this.viewHelper.timeFrame.isNowAfter(this.getThirtyMinutesBeforeMaintenance())) {
            this.notify('thirtyMinutes', 'thirty minutes');
            return true;
        }
        return false;
    }

    private getThirtyMinutesBeforeMaintenance() {
        return this.viewHelper.start - (this.viewHelper.oneHourInMilliseconds / 2);
    }

    private getOneHourBeforeMaintenance() {
        return this.viewHelper.start - (this.viewHelper.oneHourInMilliseconds);
    }

    private getTwoHoursBeforeMaintenance() {
        return this.viewHelper.start - (this.viewHelper.oneHourInMilliseconds * 2);
    }

    private notify(property: string, verbiage: string) {
        if (!this.viewHelper.notified[property]) {
            this.alert.warning(`Maintenance will begin in <strong>${verbiage}</strong>.`, 'Scheduled Maintenance');
            this.viewHelper.notified[property] = true;
        }
    }
}
