import {MaintenanceChecker} from "../../src/app/Service/MaintenanceChecker";
import {MaintenanceCheckEndpointMock} from "../Mock/MaintenanceCheckEndpointMock";
import {MaintenanceNotifierMock} from "../Mock/MaintenanceNotifierMock";
import {MaintenanceViewHelperMock} from "../Mock/MaintenanceViewHelperMock";

describe('Module: Maintenance', () => {
    describe('Class: MaintenanceChecker', () => {

        describe('After Instantiation', () => {
            let subject: MaintenanceChecker;

            beforeEach(() => {
                subject = new MaintenanceChecker(
                    <any>new MaintenanceCheckEndpointMock(),
                    <any>new MaintenanceNotifierMock(),
                    <any>new MaintenanceViewHelperMock()
                );
            });

            describe('Method: Check', () => {
                it('should execute', () => {
                    // do something
                })
            });
        });

    });
});
