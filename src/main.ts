import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { connect } from '@rxjs-insights/devtools/connect';

connect();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
