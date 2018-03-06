import {Injectable}               from "@angular/core";
import {Endpoint, EndpointCaller} from "@ng-app-framework/api";
import {HttpRequest}              from "@angular/common/http";
import {Observable}               from "rxjs/Rx";

@Injectable()
export class MaintenanceCheckEndpoint extends Endpoint {

    module = 'Maintenance';
    /** change this to where your maintenance details are located **/
    path: string = '/maintenance.json';

    constructor(public caller: EndpointCaller) {
        super(caller);
    }

    get(): Observable<HttpRequest<any> | any> {
        return this.request('get')
                   .map(value => {
                       value.start    = parseInt(value.start + '');
                       value.duration = parseInt(value.duration + '');
                       return value;
                   });
    }


    getAbsoluteUrl() {
        return this.path;
    }
}
