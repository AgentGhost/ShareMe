import { Component } from "@angular/core"
import { ServiceWorkerModule } from "@angular/service-worker"
import { CommonModule } from "@angular/common"
import { ButtonsComponent } from "./buttons/buttons.component"
import { HeaderComponent } from "./header/header.component"
import { SearchComponent } from "./search/search.component"
import { SongsComponent } from "./songs/songs.component"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    imports: [
        CommonModule,
        ButtonsComponent,
        HeaderComponent,
        SearchComponent,
        SongsComponent
    ]
})
export class AppComponent { }
