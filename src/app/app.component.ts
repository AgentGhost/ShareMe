import { Component, ChangeDetectionStrategy } from "@angular/core"

import { ButtonsComponent } from "./buttons/buttons.component"
import { HeaderComponent } from "./header/header.component"
import { SearchComponent } from "./search/search.component"
import { SongsComponent } from "./songs/songs.component"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
    // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- Eager is what the v22 migration chose to preserve the pre-v22 default CD behavior
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
    ButtonsComponent,
    HeaderComponent,
    SearchComponent,
    SongsComponent
]
})
export class AppComponent { }
