import { Component } from '@angular/core';
import { AuthAzureService } from '../../service/azure/auth-azure.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(private authService: AuthAzureService) {}
  
  async signIn() {
      await this.authService.signIn();
  }

  get getAccountObj(){
    return this.authService.accountObj;
  }
 
  signOut() {
    this.authService.signOut();
  }
}
