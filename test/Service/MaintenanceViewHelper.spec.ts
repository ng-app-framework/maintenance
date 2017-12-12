import {MaintenanceViewHelper} from "../../src/app/Service/MaintenanceViewHelper";
import {MaintenanceConfig} from "../../src/app/Service/MaintenanceConfig";
import {TimeFrame} from "@ng-app-framework/time";

describe('Module: Maintenance', () => {
    describe('Class: MaintenanceViewHelper', () => {

        describe('After Instantiation', () => {
            let subject: MaintenanceViewHelper;

            beforeEach(() => {
                subject = new MaintenanceViewHelper(
                    new MaintenanceConfig(),
                    new TimeFrame()
                );
            });

            describe('Method: ', () => {

            });
        });

    });
});
