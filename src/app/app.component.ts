import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { StorageService } from './shared/service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-contacts';

  constructor(private readonly router: Router) {
    StorageService.setEndpoint(environment.endpoints.node);
  }

  toHome(): void {
    this.router.navigate(['/persons']);
  }
}
