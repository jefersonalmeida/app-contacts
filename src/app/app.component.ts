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
  apiDefault = StorageService.getEndpoint() || environment.endpoints.node;

  apis = [
    {label: 'Node', value: environment.endpoints.node},
    {label: 'PHP', value: environment.endpoints.php},
  ];

  constructor(private readonly router: Router) {
    StorageService.setEndpoint(StorageService.getEndpoint() || environment.endpoints.node);
  }

  toHome(): void {
    this.router.navigate(['/persons']);
  }

  handleAPI(event: any): void {
    StorageService.setEndpoint(event);
  }
}
