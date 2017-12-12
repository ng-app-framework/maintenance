import {Component, ViewEncapsulation} from "@angular/core";
import {MaintenanceViewHelper} from "../Service/MaintenanceViewHelper";
import {MaintenanceComponent} from "./MaintenanceComponent";

@Component({
    selector     : '.upcoming-maintenance',
    templateUrl  : './assets/upcoming-maintenance.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls    : ['./assets/maintenance.scss']
})
export class UpcomingMaintenanceComponent extends MaintenanceComponent {


    constructor(public viewHelper: MaintenanceViewHelper) {
        super(viewHelper);
    }
}
