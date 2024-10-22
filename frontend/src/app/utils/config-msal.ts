import { Configuration } from 'msal';
import { environment } from '../../environments/environment';

export function MSALAngularConfigFactory(): any {
  return {
    popUp: false
  };
}
export function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: environment.clientId,
      authority: environment.authority,
      validateAuthority: true,
      redirectUri: environment.redirectUrl,
      postLogoutRedirectUri: environment.redirectUrl,
      navigateToLoginRequestUrl: true
    },
    cache: {
      storeAuthStateInCookie: false,
    }
  };
}