import { Injectable } from '@angular/core';
import * as msal from '@azure/msal-browser'; // Make sure to import MSAL
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthAzureService {
  private myMSALObj!: msal.IPublicClientApplication;
  public access_token!: string;
  public accountObj: msal.AccountInfo | null = null; // Use AccountInfo type for better type safety
  public isLogin=new Subject();
  public loginRequest = { scopes: ['user.read'] };
  public accesTokenScopesApplication={ scopes: ['https://analysis.windows.net/powerbi/api/.default']}
  public accountId: string = "";

  constructor() {
    this.initMSAL();
  }
  

  private async initMSAL() {
    this.myMSALObj = await msal.PublicClientApplication.createPublicClientApplication(environment.APP_CLIENT);
    await this.initApp();
  }

  private async initApp() {
    try {
      const tokenResponse = await this.myMSALObj.handleRedirectPromise();

      if (tokenResponse) {
        this.accountObj = tokenResponse.account;
        this.access_token = tokenResponse.accessToken;
      } else {
        const currentAccounts = this.myMSALObj.getAllAccounts();
        if (!currentAccounts || currentAccounts.length === 0) {
          console.log("No user signed in");
        }{
          console.log("One user signed in");
          this.isLogin.next(currentAccounts[0]);
          this.accountObj = currentAccounts[0];
        }
      }
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  }

  async signIn() {
    const loginResponse= await this.myMSALObj.loginPopup(this.loginRequest)
    if(loginResponse){
      console.log('Login successful:', loginResponse);
      this.accountObj = loginResponse.account;
    }else{
      console.log('Login not:', loginResponse);
    }
  }

  signOut() {
    const logoutRequest = {
      account: this.myMSALObj.getAccountByHomeId(this.accountId)
    };
    this.myMSALObj.logoutRedirect(logoutRequest);
  }

  async getTokenPopup(request: msal.PopupRequest, account: msal.AccountInfo) {
    request.account = account;
    try {
      return await this.myMSALObj.acquireTokenSilent(request);
    } catch (error) {
      console.log("Silent token acquisition failed.");
      if (error instanceof msal.InteractionRequiredAuthError) {
        console.log("Acquiring token using popup");
        return await this.myMSALObj.acquireTokenPopup(request);
      } else {
        console.error(error);
        return null;
      }
    }
  }

  async getTokenRedirect(request: msal.RedirectRequest, account: msal.AccountInfo) {
    request.account = account;
    try {
      return await this.myMSALObj.acquireTokenSilent(request);
    } catch (error) {
       console.log("Silent token acquisition failed.");
      if (error instanceof msal.InteractionRequiredAuthError) {
        console.log("Acquiring token using redirect");
        this.myMSALObj.acquireTokenRedirect(request);
        return null;
      } else {
        console.error(error);
        return null;
      }
    }
  }


  async acquireTokenPowerBi() {
    try {
      const accounts:any[]=this.myMSALObj.getAllAccounts();
      if(accounts.length>0){
        const silentRequest = {
          scopes: ['https://analysis.windows.net/powerbi/api/.default'],
          account: accounts[0],
        };
        const response = await this.myMSALObj.acquireTokenSilent(silentRequest);
        return response.accessToken;
      }else{
        return null;
      }
    } catch (error) {
      console.error('Error acquiring token silently:', error);
      return null;
    }
  }
}