import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"

import { AppComponent } from "./app.component"
import { ButtonsComponent } from "./buttons/buttons.component"
import { SongsComponent } from "./songs/songs.component"
import { SearchComponent } from "./search/search.component"
import { HeaderComponent } from "./header/header.component"
import { ServiceWorkerModule } from "@angular/service-worker"
import { environment } from "../environments/environment"

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    SongsComponent,
    SearchComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
