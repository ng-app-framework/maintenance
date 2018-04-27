import {EventEmitter, Injectable} from "@angular/core";
import {Observable}               from "rxjs";
import {MaintenanceCheckEndpoint} from "./MaintenanceCheckEndpoint";
import {MaintenanceConfig}        from "./MaintenanceConfig";
import {MaintenanceNotifier}      from "./MaintenanceNotifier";
import {MaintenanceViewHelper}    from "./MaintenanceViewHelper";

@Injectable()
export class MaintenanceChecker {

    stop = new EventEmitter<any>();

    constructor(
        public endpoint: MaintenanceCheckEndpoint,
        public notifier: MaintenanceNotifier,
        public viewHelper: MaintenanceViewHelper
    ) {
    }

    check() {
        Observable.interval(this.getCheckDelay())
                  .takeUntil(this.stop)
                  .flatMap(() => this.endpoint.get())
                  .subscribe((response: MaintenanceConfig) => {
                      this.updateViewHelper(response);
                      this.notifier.notifyIfApplicable();
                  });
        this.endpoint.get()
            .subscribe((response: MaintenanceConfig) => {
                this.updateViewHelper(response);
                this.notifier.notifyIfApplicable();
            });
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
