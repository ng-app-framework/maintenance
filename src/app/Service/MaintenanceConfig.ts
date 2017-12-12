import {Injectable} from "@angular/core";

@Injectable()
export class MaintenanceConfig {
    isDownUnexpectedly: boolean = false;
    start: number               = 0;
    duration: number            = 0;
}
