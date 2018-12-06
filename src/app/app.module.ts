import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { ServiceWorkerModule } from "@angular/service-worker"

import { DragulaModule } from "ng2-dragula"

import { environment } from "../environments/environment"

import { AppComponent } from "./app.component"
import { ButtonsComponent } from "./buttons/buttons.component"
import { HeaderComponent } from "./header/header.component"
import { SearchComponent } from "./search/search.component"
import { SongsComponent } from "./songs/songs.component"

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
    ReactiveFormsModule,
    DragulaModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ButtonsComponent,
    SongsComponent,
    SearchComponent,
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
