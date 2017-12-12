import {Component, NgModule, Optional} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {NgMaintenanceModule, routes} from "./NgMaintenanceModule";
import {RouterModule} from "@angular/router";
import {MaintenanceConfig} from "./Service/MaintenanceConfig";
import {FormsModule} from "@angular/forms";
import {TimeFrame} from "@ng-app-framework/time";
import {MaintenanceListener} from "./Service/MaintenanceListener";

@Component({
    selector: 'app',
    template: `
        <label><input type="checkbox" [(ngModel)]="config.isDownUnexpectedly"/> Show Unexpected Maintenance
            Message</label>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {

    constructor(public config: MaintenanceConfig, timeFrame: TimeFrame, listener: MaintenanceListener) {
        let start = new Date();
        start.setMinutes(start.getMinutes() - 30);
        config.start = timeFrame.getTimestampOfDate(start);
        config.duration = 36000;
        listener.listen();

        listener.viewHelper.isInMaintenanceWindow = listener.viewHelper.inMaintenanceWindow();
    }
}

@NgModule({
    declarations: [AppComponent],
    imports     : [
        BrowserModule,
        FormsModule,
        CommonModule,
        RouterModule.forRoot(routes),
        NgMaintenanceModule
    ],
    exports     : [AppComponent],
    providers   : [],
    bootstrap   : [AppComponent]

})
export class AppModule {

}
