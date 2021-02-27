import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-contacts';

  constructor(private readonly router: Router) {
  }

  toHome(): void {
    this.router.navigate(['/persons']);
  }
}
