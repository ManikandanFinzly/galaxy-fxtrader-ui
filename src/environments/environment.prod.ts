export const environment = {
  production: true,
  appCode : 'finzly.activity',
  keycloak: {
    clientId: 'finzly.portalui',
    redirectUri: `https://${window.location.hostname}`,
    issuer: `https://security${(window.location.host.split('-')[2].split('.')[0] ) ? ('-' +
    window.location.host.split('-')[2].split('.')[0])+'1' : '' }.finzly.
    ${getDomainExtension()}/auth/realms/BANKOS${((window.location.host.split('-')
    [2].split('.')[0] ) ? ('-' +window.location.host.split('-')[2].split('.')[0] ) :
    '' ).toUpperCase()}-${window.location.host.split('-')[0].toUpperCase()}-BANK`,    
    responseType: 'code',
    scope: 'openid profile email',
    requireHttps: true,
    showDebugInformation: true,
    disableAtHashCheck: true,
  }
 
};

function getDomainExtension(){
  let extension;
  extension = window.location.host.split('.')[2];
  return extension;
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
