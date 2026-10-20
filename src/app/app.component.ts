import { Component } from "@angular/core"

import { ButtonsComponent } from "./buttons/buttons.component"
import { HeaderComponent } from "./header/header.component"
import { SearchComponent } from "./search/search.component"
import { SongsComponent } from "./songs/songs.component"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    imports: [
    ButtonsComponent,
    HeaderComponent,
    SearchComponent,
    SongsComponent
]
})
export class AppComponent { }
