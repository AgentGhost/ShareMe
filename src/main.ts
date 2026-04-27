import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  // enableProdMode is not needed in Angular 15+ for production builds
}

bootstrapApplication(AppComponent, {
  providers: []
}).catch(err => console.error(err));
