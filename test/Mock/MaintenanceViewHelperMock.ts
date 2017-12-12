import {TimeFrame} from "@ng-app-framework/time";

export class MaintenanceViewHelperMock {
    isDownUnexpectedly: boolean                      = false;
    start: number                                    = (new Date()).valueOf() + (1000 * 60 * 60);
    duration: number                                 = 10000;
    isInMaintenanceWindow: boolean                   = false;
    oneMinuteInMilliseconds: number                  = 1000 * 60;
    shouldDisplayUpcomingMaintenanceMessage: boolean = false;
    timeFrame: TimeFrame                             = new TimeFrame();
    oneHourInMilliseconds: number                    = 1000 * 60 * 60;
    notified: any                                    = {};
    unexpectedVerbiage: string                       = 'unexpected verbiage';
    scheduledVerbiage: string                        = 'scheduled verbiage';

    inMaintenanceWindow() {
        return false;
    }

    isBeforeMaintenanceWindow() {
        return false;
    }
}
