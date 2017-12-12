import {MaintenanceListener} from "../../src/app/Service/MaintenanceListener";
import {LocationMock, LocationProxy} from "@ng-app-framework/location";
import {MaintenanceViewHelperMock} from "../Mock/MaintenanceViewHelperMock";
import {AlertProxyMock} from "@ng-app-framework/alert";

describe('Module: Maintenance', () => {
    describe('Class: MaintenanceListener', () => {

        describe('After Instantiation', () => {
            let subject: MaintenanceListener;

            beforeEach(() => {
                subject = new MaintenanceListener(
                    <any>{
                        navigateByUrl: () => {
                        }
                    },
                    new LocationProxy(<any>new LocationMock()),
                    new AlertProxyMock(),
                    <any>new MaintenanceViewHelperMock()
                );
            });

            describe('Method: Listen', () => {
                it('should execute', () => {
                    // do something
                })
            });
        });

    });
});
