import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

    showSuccess(message: string): void {
        if (message != null && message.trim().length > 0) {
            // Had an issue with the snackbar being ran outside of angular's zone.
            this.zone.run(() => {
                this.snackBar.open(message, 'X', {panelClass: ['success'], duration: 5000});
            });
        }
    }

    showError(message: string): void {
        if (message != null && message.trim().length > 0) {
            this.zone.run(() => {
                // The second parameter is the text in the button.
                // In the third, we send in the css class for the snack bar.
                this.snackBar.open("ERROR: " + message, 'X', {panelClass: ['error'], duration: 10000});
            });
        }
    }
}
