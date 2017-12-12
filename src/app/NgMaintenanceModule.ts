import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaintenanceComponent} from "./Component/MaintenanceComponent";
import {MaintenanceChecker} from "./Service/MaintenanceChecker";
import {RouterModule, Routes} from "@angular/router";
import {MaintenanceCheckEndpoint} from "./Service/MaintenanceCheckEndpoint";
import {MaintenanceConfig} from "./Service/MaintenanceConfig";
import {MaintenanceViewHelper} from "./Service/MaintenanceViewHelper";
import {MaintenanceNotifier} from "./Service/MaintenanceNotifier";
import {UpcomingMaintenanceComponent} from "./Component/UpcomingMaintenanceComponent";
import {MaintenanceListener} from "./Service/MaintenanceListener";
import {NgCoreModule} from "@ng-app-framework/core";
import {NgTimeModule} from "@ng-app-framework/time";
import {CommonModule} from "@angular/common";
import {NgSafeModule} from "@ng-app-framework/safe";
import {NgAlertModule} from "@ng-app-framework/alert";
import {NgLocationModule} from "@ng-app-framework/location";
import {NgApiModule} from "@ng-app-framework/api";

export const routes: Routes = [
    {
        path     : 'maintenance',
        component: MaintenanceComponent
    }
];

@NgModule({
    declarations: [MaintenanceComponent, UpcomingMaintenanceComponent],
    imports     : [
        CommonModule,
        NgCoreModule,
        RouterModule.forRoot(routes),
        NgApiModule,
        NgSafeModule,
        NgTimeModule,
        NgAlertModule,
        NgLocationModule
    ],
    exports     : [MaintenanceComponent, UpcomingMaintenanceComponent],
    providers   : [
        MaintenanceChecker,
        MaintenanceCheckEndpoint,
        MaintenanceViewHelper,
        MaintenanceConfig,
        MaintenanceNotifier,
        MaintenanceListener
    ]
})
export class NgMaintenanceModule {

    constructor(checker: MaintenanceChecker, listener: MaintenanceListener) {
    }

    static forRoot(config: MaintenanceConfig): ModuleWithProviders {
        return {
            ngModule : NgMaintenanceModule,
            providers: [
                {
                    provide : MaintenanceConfig,
                    useValue: config
                }
            ]
        };
    }
}

