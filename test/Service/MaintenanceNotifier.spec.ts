import {MaintenanceNotifier} from "../../src/app/Service/MaintenanceNotifier";
import {MaintenanceViewHelperMock} from "../Mock/MaintenanceViewHelperMock";
import {AlertProxyMock} from "@ng-app-framework/alert";

describe('Module: Maintenance', () => {
    describe('Class: MaintenanceNotifier', () => {

        describe('After Instantiation', () => {
            let subject: MaintenanceNotifier;

            beforeEach(() => {
                subject = new MaintenanceNotifier(
                    <any>new MaintenanceViewHelperMock(),
                    <any>new AlertProxyMock()
                );
            });


            describe('Method: Notify If Applicable', () => {
                it('should execute', () => {
                    // do something
                })
            });
        });

    });
});
