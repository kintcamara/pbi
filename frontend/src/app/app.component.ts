import { Component } from '@angular/core';
import { AuthAzureService } from './service/azure/auth-azure.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-power-bi';
}
