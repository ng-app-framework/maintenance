import {EventEmitter, Injectable} from "@angular/core";
import {MaintenanceConfig}        from "./MaintenanceConfig";
import {SiteConfig}               from "@ng-app-framework/core";
import {TimeFrame}                from "@ng-app-framework/time";
import {Inject}                   from "@angular/core";

@Injectable()
export class MaintenanceViewHelper {

    oneSecondInMilliseconds = 1000;
    oneMinuteInMilliseconds = 60000;

    oneHourInMilliseconds = 3600;

    public unexpectedVerbiage = "There is an emergency maintenance occurring at this time. We apologize for any inconvenience this may cause.";
    public scheduledVerbiage  = "The site is currently undergoing maintenance. We apologize for any inconvenience this may cause.";

    scheduleHasChanged = false;

    onIsInMaintenanceWindowChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _isInMaintenanceWindow = false;

    shouldDisplayUpcomingMaintenanceMessage = false;

    notified = {
        twoHours     : false,
        oneHour      : false,
        thirtyMinutes: false
    };


    constructor(@Inject(MaintenanceConfig) public config: MaintenanceConfig, @Inject(TimeFrame) public timeFrame: TimeFrame) {
        this._isInMaintenanceWindow = this.inMaintenanceWindow();
    }

    public get start(): number {
        return this.config.start;
    }

    public set start(value: number) {

        if (this.config.start !== value) {
            this.config.start       = value;
            this.scheduleHasChanged = true;
        }
    }

    public get duration(): number {
        return this.config.duration;
    }

    public set duration(value: number) {
        if (this.config.duration !== value) {
            this.config.duration    = value;
            this.scheduleHasChanged = true;
        }
    }

    public get isDownUnexpectedly(): boolean {
        return this.config.isDownUnexpectedly;
    }

    public set isDownUnexpectedly(value: boolean) {
        this.config.isDownUnexpectedly = value;
    }

    public get isInMaintenanceWindow(): boolean {
        return this._isInMaintenanceWindow;
    }

    public set isInMaintenanceWindow(value: boolean) {
        if (this._isInMaintenanceWindow !== value) {
            this.onIsInMaintenanceWindowChange.emit(value);
        }
        this._isInMaintenanceWindow = value;
    }

    getLogo() {
        return SiteConfig.logoUrl;
    }

    inMaintenanceWindow() {
        return this.isDownUnexpectedly || this.timeFrame.isNowDuring(this.start, this.duration);
    }

    isBeforeMaintenanceWindow() {
        return !this.isInMaintenanceWindow && this.timeFrame.isNowBefore(this.start);
    }
}
