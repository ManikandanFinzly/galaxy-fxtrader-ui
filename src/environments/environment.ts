// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  appCode : 'finzly.activity',
  keycloak: {
    clientId: 'finzly.portalui',
    redirectUri: `https://${window.location.hostname}`,
    issuer: `https://security${(window.location.host.split('-')[2].split('.')[0] ) ? ('-' +window.location.host.split('-')[2].split('.')[0])+'1' : '' }.finzly.${getDomainExtension()}/auth/realms/BANKOS${((window.location.host.split('-')[2].split('.')[0] ) ? ('-' +window.location.host.split('-')[2].split('.')[0] ) :'' ).toUpperCase()}-${window.location.host.split('-')[0].toUpperCase()}-BANK`,    
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
