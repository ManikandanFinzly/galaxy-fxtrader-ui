import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Router } from '@angular/router';

if (environment.production) {
  enableProdMode();
}
const spaProps = {
  bootstrappedModule: null,
  Router: Router
};

//platformBrowserDynamic().bootstrapModule(AppModule);


platformBrowserDynamic([
  {provide: 'localStoreRef', useValue: null },
  {provide: 'globalEventDispatcherRef', useValue: null }])
  .bootstrapModule(AppModule).then(module => {
      return spaProps.bootstrappedModule = module;
  });