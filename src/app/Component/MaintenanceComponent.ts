import {Component, Inject, ViewEncapsulation} from "@angular/core";
import {TimeFrame}                            from "@ng-app-framework/time";
import {Observable}                           from "rxjs/Rx";
import {Subscription}                         from "rxjs/Subscription";
import {MaintenanceViewHelper}                from "../Service/MaintenanceViewHelper";

@Component({
    selector     : '.maintenance',
    templateUrl  : './assets/maintenance.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls    : ['./assets/maintenance.scss']
})
export class MaintenanceComponent {

    currentTime: Date = new Date();

    protected timeSubscription: Subscription;

    time = new TimeFrame();


    constructor(@Inject(MaintenanceViewHelper) public viewHelper: MaintenanceViewHelper) {
    }

    ngOnInit() {
        this.timeSubscription = Observable.interval(this.viewHelper.oneSecondInMilliseconds)
                                          .subscribe(value => {
                                              this.currentTime                      = new Date();
                                              this.viewHelper.isInMaintenanceWindow = this.viewHelper.inMaintenanceWindow();
                                          });

    }

    ngOnDestroy() {
        if (this.timeSubscription) {
            this.timeSubscription.unsubscribe();
            this.timeSubscription = null;
        }
    }

    getLocalStart() {
        return new Date(this.viewHelper.start * this.viewHelper.oneSecondInMilliseconds);
    }

    getLocalEnd() {
        return new Date((this.viewHelper.start + this.viewHelper.duration) * this.viewHelper.oneSecondInMilliseconds);
    }
}
