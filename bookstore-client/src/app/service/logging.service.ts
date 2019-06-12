import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoggingService {

    logError(error: Error | HttpErrorResponse) {
        // Send errors to server here
        console.log('LoggingService: ' + error.message);
        console.error(error);
    }
}
