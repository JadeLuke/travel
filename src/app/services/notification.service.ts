import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private snackBar: MatSnackBar, private router: Router  // Inject Router to navigate
) {
   }

   showSuccess(message: string):void {
    const snackBar = this.snackBar.open(message, 'View Favourites', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'success-snackbar'
    });
   snackBar.onAction().subscribe(() => {
    // Navigate to the favourites page when the action is clicked
    this.router.navigate(['/favourites']);
  });
}
   
  

   showError(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'error-snackbar'
    })
  }

}

