import {Observable} from 'rxjs/Observable';


export class MaintenanceCheckEndpointMock {

    path: string = '/maintenance-check.php';

    mockResponse = {};

    get() {
        return Observable.of(this.mockResponse);
    }
}
