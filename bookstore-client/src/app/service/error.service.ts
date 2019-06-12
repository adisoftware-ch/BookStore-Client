import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

    getClientErrorMessage(error: Error): string {
        console.log(error);
        return error.message ? error.message : error.toString();
    }

    getServerErrorMessage(error: HttpErrorResponse): string {

        console.log(error);

        let message = error.message;

        // Read server-side error response
        if (error.error != null) {
            for (const key in error.error) {
                // Prevents accidental iteration over properties inherited from an object’s prototype.
                if (error.error.hasOwnProperty(key)) {
                    message += ', ' + error.error[key];
                }
            }
        }

        return navigator.onLine ? message : 'No Internet Connection';
    }

}
