import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { BrowserModule } from "@angular/platform-browser"
import { ServiceWorkerModule } from "@angular/service-worker"

import { environment } from "../environments/environment"

import { AppComponent } from "./app.component"
import { ButtonsComponent } from "./buttons/buttons.component"
import { HeaderComponent } from "./header/header.component"
import { SearchComponent } from "./search/search.component"
import { SongsComponent } from "./songs/songs.component"
import { SuggestionsComponent } from "./suggestions/suggestions.component"

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    ButtonsComponent,
    SongsComponent,
    SearchComponent,
    HeaderComponent,
    SuggestionsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
